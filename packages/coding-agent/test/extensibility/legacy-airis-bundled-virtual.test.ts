import { describe, expect, it } from "bun:test";
import * as path from "node:path";
import {
	__getLegacyAirisBundledModulesGlobal,
	__synthesizeLegacyPiBundledSourceWithModules,
	resolveBundledVirtualSpecifier,
} from "@airis/airis-coding-agent/extensibility/plugins/legacy-airis-compat";
import { TempDir } from "@airis/airis-utils";
import type { BunPlugin } from "bun";

// Regression for issue #3423: Bun 1.3.14 made `--compile` extras unreachable
// via every filesystem-style API. The compat layer now routes canonical
// `@airis/airis-*` imports through virtual modules backed by live host module
// references. The synthesizer must preserve every named/default export.
describe("legacy-airis bundled virtual module synthesizer (issue #3423)", () => {
	const modules = {
		"@airis/airis-coding-agent": {
			VERSION: "16.1.17",
			defineTool: () => undefined,
			Type: { Object: () => undefined },
		},
		"@airis/airis-utils": {
			isCompiledBinary: () => false,
			default: () => "default-export",
			VERSION: "16.1.17",
		},
		typebox: {
			Type: { Object: () => undefined },
		},
	};
	const globalKey = __getLegacyAirisBundledModulesGlobal();

	it("emits one ES named export per enumerable namespace key", () => {
		const src = __synthesizeLegacyPiBundledSourceWithModules("@airis/airis-coding-agent", modules);
		expect(src).toContain(
			`const __airis_bundled = globalThis[${JSON.stringify(globalKey)}]["@airis/airis-coding-agent"];`,
		);
		expect(src).toContain('export const VERSION = __airis_bundled["VERSION"];');
		expect(src).toContain('export const defineTool = __airis_bundled["defineTool"];');
		expect(src).toContain('export const Type = __airis_bundled["Type"];');
		// Every named export emerges from a live module lookup — never the FS.
		expect(src).not.toMatch(/\$bunfs|file:\/\//);
	});

	it("forwards `default` through `export default` so default imports survive", () => {
		const src = __synthesizeLegacyPiBundledSourceWithModules("@airis/airis-utils", modules);
		expect(src).toContain("export default __airis_bundled.default;");
		// Default and named exports coexist on the same module.
		expect(src).toContain('export const VERSION = __airis_bundled["VERSION"];');
		expect(src).toContain('export const isCompiledBinary = __airis_bundled["isCompiledBinary"];');
	});

	it("omits `default` line when the registered namespace has no default export", () => {
		const src = __synthesizeLegacyPiBundledSourceWithModules("@airis/airis-coding-agent", modules);
		expect(src).not.toContain("export default");
	});

	it("throws when asked to synthesize a key the bundled modules do not cover", () => {
		expect(() => __synthesizeLegacyPiBundledSourceWithModules("@airis/airis-not-bundled", modules)).toThrow(
			/no bundled module registered for @alpha-airis-cli\/pi-not-bundled/,
		);
	});

	it("addresses the same globalThis key the install function would stash to", () => {
		// The emitted source MUST read from the exact key the install function
		// writes to — a rename of either side breaks every legacy extension
		// load with a `Cannot read properties of undefined` at first import.
		const src = __synthesizeLegacyPiBundledSourceWithModules("typebox", modules);
		expect(src.startsWith(`const __airis_bundled = globalThis[${JSON.stringify(globalKey)}]["typebox"];`)).toBe(true);
	});

	it("end-to-end: synthesized source resolves named bindings against a runtime globalThis entry", () => {
		// Evaluate the synthesized source in isolation. Bun's loader normally
		// turns it into an ES module; here we use `new Function` to exercise
		// the inner globalThis lookup + property-getter pattern in isolation —
		// it would `throw` if the emitted code addressed the wrong stash key
		// or skipped an enumerable export.
		Reflect.set(globalThis, globalKey, modules);
		try {
			const src = __synthesizeLegacyPiBundledSourceWithModules("@airis/airis-coding-agent", modules);
			// Strip the ES export prefix and run the body as a plain script so
			// we can read `__airis_bundled` from the returned closure.
			const body = src
				.split("\n")
				.filter(line => line.startsWith("const __airis_bundled"))
				.join("\n");
			const fn = new Function(`${body}; return __airis_bundled;`);
			const live: unknown = fn();
			if (typeof live !== "object" || live === null) {
				throw new Error("synthetic module did not resolve an object namespace");
			}
			expect("VERSION" in live ? live.VERSION : undefined).toBe("16.1.17");
			expect(typeof ("defineTool" in live ? live.defineTool : undefined)).toBe("function");
			expect(typeof ("Type" in live ? live.Type : undefined)).toBe("object");
		} finally {
			Reflect.deleteProperty(globalThis, globalKey);
		}
	});

	it("routes Bun plugin resolution through the bundled namespace so onLoad can serve extension imports", async () => {
		using tempDir = TempDir.createSync("@airis-legacy-airis-bundled-virtual-");
		const entryPath = tempDir.join("extension-entry.ts");
		const bundlePath = tempDir.join("extension-entry.bundle.mjs");

		await Bun.write(
			entryPath,
			[
				'import { legacyAnswer } from "airis-legacy-airis-bundled:@airis/airis-utils";',
				"process.stdout.write(legacyAnswer);",
				"",
			].join("\n"),
		);

		expect(resolveBundledVirtualSpecifier("@airis/airis-utils")).toEqual({
			namespace: "airis-legacy-airis-bundled",
			path: "@airis/airis-utils",
		});
		expect(resolveBundledVirtualSpecifier("airis-legacy-airis-bundled:@airis/airis-utils")).toEqual({
			namespace: "airis-legacy-airis-bundled",
			path: "@airis/airis-utils",
		});

		const onLoadPaths: string[] = [];
		const plugin: BunPlugin = {
			name: "airis-legacy-airis-bundled-virtual-regression",
			setup(build) {
				build.onResolve({ filter: /^airis-legacy-airis-bundled:.+$/, namespace: "file" }, args =>
					resolveBundledVirtualSpecifier(args.path),
				);
				build.onResolve({ filter: /.*/, namespace: "airis-legacy-airis-bundled" }, args =>
					resolveBundledVirtualSpecifier(args.path),
				);
				build.onLoad({ filter: /.*/, namespace: "airis-legacy-airis-bundled" }, args => {
					onLoadPaths.push(args.path);
					return {
						contents: `export const legacyAnswer = ${JSON.stringify(`served:${args.path}`)};`,
						loader: "js",
					};
				});
			},
		};

		const buildResult = await Bun.build({
			entrypoints: [entryPath],
			external: ["bun"],
			format: "esm",
			plugins: [plugin],
			target: "bun",
		});
		const buildLogs = buildResult.logs.map(log => log.message).join("\n");
		expect(buildResult.success, buildLogs).toBe(true);
		await Bun.write(bundlePath, await buildResult.outputs[0]!.text());
		expect(onLoadPaths).toEqual(["@airis/airis-utils"]);

		const proc = Bun.spawn([process.execPath, `./${path.basename(bundlePath)}`], {
			cwd: path.dirname(bundlePath),
			stderr: "pipe",
			stdout: "pipe",
		});
		const [stdout, stderr, exitCode] = await Promise.all([
			new Response(proc.stdout).text(),
			new Response(proc.stderr).text(),
			proc.exited,
		]);

		expect(exitCode, stderr).toBe(0);
		expect(stderr).toBe("");
		expect(stdout).toBe("served:@airis/airis-utils");
	});
});
