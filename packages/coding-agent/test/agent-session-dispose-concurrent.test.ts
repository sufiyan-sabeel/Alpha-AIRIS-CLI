import { afterEach, beforeEach, describe, expect, it, vi } from "bun:test";
import * as path from "node:path";
import { Agent } from "@airis/airis-agent-core";
import { createMockModel } from "@airis/airis-ai/providers/mock";
import { getBundledModel } from "@airis/airis-catalog/models";
import { AsyncJobManager } from "@airis/airis-coding-agent/async";
import { ModelRegistry } from "@airis/airis-coding-agent/config/model-registry";
import { Settings } from "@airis/airis-coding-agent/config/settings";
import { HindsightSessionState } from "@airis/airis-coding-agent/hindsight/state";
import { MnemosyneSessionState, setMnemosyneSessionState } from "@airis/airis-coding-agent/mnemosyne/state";
import { AgentSession } from "@airis/airis-coding-agent/session/agent-session";
import { AuthStorage } from "@airis/airis-coding-agent/session/auth-storage";
import { SessionManager } from "@airis/airis-coding-agent/session/session-manager";
import { logger, TempDir } from "@airis/airis-utils";

async function flushMicrotasks(): Promise<void> {
	await Promise.resolve();
	await Promise.resolve();
	await Promise.resolve();
}

describe("AgentSession concurrent disposal", () => {
	let tempDir: TempDir;
	let authStorage: AuthStorage;
	let session: AgentSession | undefined;

	beforeEach(async () => {
		tempDir = TempDir.createSync("@airis-dispose-concurrent-");
		authStorage = await AuthStorage.create(path.join(tempDir.path(), "auth.db"));
		authStorage.setRuntimeApiKey("anthropic", "test-key");
	});

	afterEach(async () => {
		vi.useRealTimers();
		const current = session;
		session = undefined;
		if (current) await current.dispose();
		authStorage.close();
		AsyncJobManager.resetForTests();
		vi.restoreAllMocks();
		tempDir.removeSync();
	});

	function createSession(ownedAsyncJobManager?: AsyncJobManager): AgentSession {
		const model = getBundledModel("anthropic", "claude-sonnet-4-5");
		if (!model) throw new Error("expected bundled model");
		const mock = createMockModel({ handler: () => ({ content: ["ok"] }) });
		const agent = new Agent({
			getApiKey: () => "test-key",
			initialState: { model, systemPrompt: ["test"], tools: [] },
			streamFn: mock.stream,
		});
		session = new AgentSession({
			agent,
			sessionManager: SessionManager.inMemory(tempDir.path()),
			settings: Settings.isolated(),
			modelRegistry: new ModelRegistry(authStorage, path.join(tempDir.path(), "models.yml")),
			ownedAsyncJobManager,
			agentId: "Main",
		});
		return session;
	}

	it("starts independent writers together and closes persistence after their barrier", async () => {
		const owned = new AsyncJobManager({ maxRunningJobs: 1, retentionMs: 1_000, onJobComplete: () => {} });
		const asyncGate = Promise.withResolvers<void>();
		const hindsightGate = Promise.withResolvers<void>();
		const mnemosyneGate = Promise.withResolvers<void>();
		const asyncStarted = Promise.withResolvers<void>();
		const order: string[] = [];
		vi.spyOn(owned, "dispose").mockImplementation(async () => {
			order.push("async:start");
			asyncStarted.resolve();
			await asyncGate.promise;
			order.push("async:end");
			return true;
		});

		const current = createSession(owned);
		const hindsight: HindsightSessionState = Object.create(HindsightSessionState.prototype);
		vi.spyOn(hindsight, "flushRetainQueue").mockImplementation(async () => {
			order.push("hindsight:start");
			await hindsightGate.promise;
			order.push("hindsight:end");
		});
		vi.spyOn(hindsight, "dispose").mockImplementation(() => {});
		current.setHindsightSessionState(hindsight);

		const mnemosyne: MnemosyneSessionState = Object.create(MnemosyneSessionState.prototype);
		vi.spyOn(mnemosyne, "dispose").mockImplementation(async () => {
			order.push("mnemosyne:start");
			await mnemosyneGate.promise;
			order.push("mnemosyne:end");
		});
		setMnemosyneSessionState(current, mnemosyne);

		let persistenceClosed = false;
		vi.spyOn(current.sessionManager, "close").mockImplementation(async () => {
			persistenceClosed = true;
			order.push("session:close");
		});

		const dispose = current.dispose();
		try {
			await asyncStarted.promise;
			await Promise.resolve();
			expect(order).toContain("hindsight:start");
			expect(order).toContain("mnemosyne:start");
			expect(order).not.toContain("async:end");
			expect(order).not.toContain("hindsight:end");
			expect(order).not.toContain("mnemosyne:end");
			expect(persistenceClosed).toBe(false);
		} finally {
			asyncGate.resolve();
			hindsightGate.resolve();
			mnemosyneGate.resolve();
		}
		await dispose;
		session = undefined;

		const closeAt = order.indexOf("session:close");
		expect(closeAt).toBeGreaterThan(order.indexOf("async:end"));
		expect(closeAt).toBeGreaterThan(order.indexOf("hindsight:end"));
		expect(closeAt).toBeGreaterThan(order.indexOf("mnemosyne:end"));
	});

	it("bounds post-prompt work that ignores abort", async () => {
		vi.useFakeTimers();
		const warn = vi.spyOn(logger, "warn").mockImplementation(() => {});
		const current = createSession();
		const hangingTask = Promise.withResolvers<void>();
		current.trackPostPromptTaskForTests(hangingTask.promise);

		const dispose = current.dispose();
		await flushMicrotasks();
		vi.advanceTimersByTime(5_000);
		await flushMicrotasks();
		await dispose;
		session = undefined;

		expect(warn).toHaveBeenCalledWith(
			"Post-prompt tasks still draining at dispose deadline",
			expect.objectContaining({ error: "Error: Timed out draining post-prompt tasks during dispose" }),
		);
	});

	it("clears the owned async manager when its dispose rejects", async () => {
		const warn = vi.spyOn(logger, "warn").mockImplementation(() => {});
		const owned = new AsyncJobManager({ maxRunningJobs: 1, retentionMs: 1_000, onJobComplete: () => {} });
		vi.spyOn(owned, "dispose").mockRejectedValue(new Error("async dispose failed"));
		AsyncJobManager.setInstance(owned);
		const current = createSession(owned);

		await current.dispose();
		session = undefined;

		expect(AsyncJobManager.instance()).toBeUndefined();
		expect(warn).toHaveBeenCalledWith("Session dispose subsystem failed during parallel teardown", {
			error: "Error: async dispose failed",
		});
	});
});
