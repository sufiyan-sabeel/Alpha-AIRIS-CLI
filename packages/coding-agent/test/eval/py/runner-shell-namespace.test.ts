import { describe, expect, it } from "bun:test";
import * as path from "node:path";

/**
 * Regression tests for the shell helper's namespace binding.
 *
 * The runner rewrites `!cmd` into `__airis.shell("cmd")` — an attribute access on
 * an object, not a plain identifier lookup. An earlier revision declared the
 * helper as `def __airis.shell(...)`, which is a SyntaxError, and registered only
 * the literal dict key "__airis.shell". That made the module unimportable, and
 * had it imported, the generated code would still have raised NameError.
 *
 * These tests pin both halves of the contract: the callable must exist under the
 * `__airis` namespace object, and `!cmd` must resolve through it.
 */

interface RunnerFrame {
	type?: string;
	id?: string;
	data?: string;
	status?: string;
}

const pythonPath = Bun.env.PYTHON ?? "python3";
const runnerPath = path.resolve(import.meta.dir, "../../../src/eval/py/runner.py");
const repoRoot = path.resolve(import.meta.dir, "../../../../..");
const encoder = new TextEncoder();

async function runCell(code: string): Promise<RunnerFrame[]> {
	const proc = Bun.spawn([pythonPath, "-u", runnerPath], {
		cwd: repoRoot,
		stdin: "pipe",
		stdout: "pipe",
		stderr: "pipe",
		env: {
			...process.env,
			PYTHONUNBUFFERED: "1",
			PYTHONIOENCODING: "utf-8",
		},
	});
	const stderr = new Response(proc.stderr).text();
	const reader = proc.stdout.getReader();
	const decoder = new TextDecoder();
	let pending = "";
	const frames: RunnerFrame[] = [];

	async function readFrame(): Promise<RunnerFrame> {
		while (true) {
			const newline = pending.indexOf("\n");
			if (newline >= 0) {
				const line = pending.slice(0, newline);
				pending = pending.slice(newline + 1);
				return JSON.parse(line) as RunnerFrame;
			}
			const { value, done } = await reader.read();
			if (done) {
				throw new Error(`Python runner exited before done frame: ${await stderr}`);
			}
			pending += decoder.decode(value, { stream: true });
		}
	}

	try {
		proc.stdin.write(encoder.encode(`${JSON.stringify({ id: "r1", code })}\n`));
		proc.stdin.flush();
		while (true) {
			const frame = await readFrame();
			frames.push(frame);
			if (frame.type === "done") break;
		}
		proc.stdin.write(encoder.encode(`${JSON.stringify({ type: "exit" })}\n`));
		proc.stdin.end();
		const exitCode = await proc.exited;
		if (exitCode !== 0) {
			throw new Error(`Python runner exited ${exitCode}: ${await stderr}`);
		}
		return frames;
	} finally {
		try {
			reader.releaseLock();
		} catch {
			// Reader may already be released by stream closure.
		}
		try {
			proc.kill("SIGKILL");
		} catch {
			// Process already exited.
		}
	}
}

function stdoutOf(frames: RunnerFrame[]): string {
	return frames
		.filter(frame => frame.type === "stdout")
		.map(frame => frame.data ?? "")
		.join("");
}

describe("Python runner shell namespace", () => {
	it("binds __airis.shell and __airis_shell in the user namespace", async () => {
		const stdout = stdoutOf(
			await runCell(
				[
					"print('ns=' + str(callable(getattr(__airis, 'shell', None))))",
					"print('fn=' + str(callable(globals().get('__airis_shell'))))",
				].join("\n"),
			),
		);

		expect(stdout).toContain("ns=True");
		expect(stdout).toContain("fn=True");
	});

	it("resolves an explicit __airis.shell() call to shell output lines", async () => {
		const stdout = stdoutOf(
			await runCell(
				[
					"out = __airis.shell('echo ns-ok')",
					"print('lines=' + repr(list(out)) + ' rc=' + str(out.returncode))",
				].join("\n"),
			),
		);

		expect(stdout).toContain("lines=['ns-ok'] rc=0");
	});

	it("keeps the IPython-compatible .n and .s accessors on !cmd results", async () => {
		const stdout = stdoutOf(
			await runCell(
				[
					"out = !printf 'a\\nb\\n'",
					"print('nlines=' + str(len(out.n.splitlines())) + ' s=' + out.s)",
				].join("\n"),
			),
		);

		expect(stdout).toContain("nlines=2 s=a b");
	});
});
