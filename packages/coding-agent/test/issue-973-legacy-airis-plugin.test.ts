import { afterEach, beforeEach, describe, expect, it } from "bun:test";
import * as fs from "node:fs";
import * as path from "node:path";
import { loadExtensions } from "@airis/airis-coding-agent/extensibility/extensions/loader";
import { TempDir } from "@airis/airis-utils";

const currentAirisCodingAgentPath = Bun.resolveSync("@airis/airis-coding-agent", import.meta.dir);
const currentPiExtensionsPath = Bun.resolveSync("@airis/airis-coding-agent/extensibility/extensions", import.meta.dir);

describe("issue #973: legacy Pi plugin imports", () => {
	let projectDir: TempDir;
	let extensionPath: string;

	beforeEach(() => {
		projectDir = TempDir.createSync("@issue-973-");
		const pluginDir = path.join(projectDir.path(), "legacy-airis-plugin");
		extensionPath = path.join(pluginDir, "dist", "extension.ts");
		fs.mkdirSync(path.dirname(extensionPath), { recursive: true });
		fs.writeFileSync(
			path.join(pluginDir, "package.json"),
			JSON.stringify({
				name: "legacy-airis-plugin",
				version: "1.0.0",
				airs: {
					extensions: ["./dist/extension.ts"],
				},
			}),
		);
		fs.writeFileSync(
			extensionPath,
			[
				'import { isToolCallEventType as legacyRoot } from "@mariozechner/pi-coding-agent";',
				'import { isToolCallEventType as legacyExtensions } from "@mariozechner/pi-coding-agent/extensibility/extensions";',
				`import { isToolCallEventType as modernRoot } from ${JSON.stringify(currentAirisCodingAgentPath)};`,
				`import { isToolCallEventType as modernExtensions } from ${JSON.stringify(currentPiExtensionsPath)};`,
				"",
				'if (legacyRoot !== modernRoot) throw new Error("legacy root import did not remap");',
				'if (legacyExtensions !== modernExtensions) throw new Error("legacy extension import did not remap");',
				"",
				"export default function(pi) {",
				'\tpi.registerCommand("legacy-airis-ext", { handler: async () => {} });',
				"}",
			].join("\n"),
		);
	});

	afterEach(() => {
		projectDir.removeSync();
	});

	it("loads plugin extensions that still import legacy @mariozechner Pi packages", async () => {
		const result = await loadExtensions([extensionPath], projectDir.path());
		const extension = result.extensions.find(ext => ext.path === extensionPath);

		expect(result.errors).toEqual([]);
		expect(extension).toBeDefined();
		expect(extension?.commands.has("legacy-airis-ext")).toBe(true);
	});
});
