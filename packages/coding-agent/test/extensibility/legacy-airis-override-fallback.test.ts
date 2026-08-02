import { describe, expect, it } from "bun:test";
import {
	__resolveTypeBoxShimPath,
	__validateLegacyPiPackageRootOverrides,
} from "@airis/airis-coding-agent/extensibility/plugins/legacy-airis-compat";

// Regression for issue #2168: in compiled-binary mode the package-root
// override branch of `resolveCanonicalPiSpecifier` returned a bunfs path
// without checking the target was actually present. When `bun --compile`
// quietly dropped one of the extra entrypoints (observed on macOS arm64
// release builds), the rewrite still emitted a `file://` URL to a missing
// module, defeating the #1216 fallback that only fired on the throwing
// `getResolvedSpecifier` path. The fix validates each override at module
// init so missing entries fall through to canonical resolution and Bun
// resolves the import from the extension's own `node_modules`.
//
// Follow-up (issue #3423): on Bun 1.3.14 the compiled binary's
// `/$bunfs/...` paths are unreachable via every filesystem API, so
// compiled-binary mode now routes through `airis-legacy-airis-bundled:` virtual
// specifiers instead. Those entries must always pass validation because
// the bundled registry — not the filesystem — is the source of truth.
describe("legacy pi compat package-root override validation (issue #2168)", () => {
	it("keeps overrides whose filesystem targets exist", () => {
		const candidates = {
			"@airis/airis-ai": "/tmp/exists-ai.js",
			"@airis/airis-utils": "/tmp/exists-utils.js",
		};
		const result = __validateLegacyPiPackageRootOverrides(candidates, () => true);
		expect(result).toEqual(candidates);
	});

	it("drops overrides whose filesystem targets are missing on disk", () => {
		const candidates = {
			"@airis/airis-ai": "/tmp/exists-ai.js",
			"@airis/airis-coding-agent": "/tmp/exists-shim.js",
			"@airis/airis-utils": "/$bunfs/root/packages/utils/src/index.js",
			"@airis/airis-tui": "/$bunfs/root/packages/tui/src/index.js",
		};
		const missing = new Set(["/$bunfs/root/packages/utils/src/index.js", "/$bunfs/root/packages/tui/src/index.js"]);
		const result = __validateLegacyPiPackageRootOverrides(candidates, p => !missing.has(p));
		expect(result).toEqual({
			"@airis/airis-ai": "/tmp/exists-ai.js",
			"@airis/airis-coding-agent": "/tmp/exists-shim.js",
		});
		// `pi-utils` and `pi-tui` are absent so the resolver falls through to
		// `getResolvedSpecifier` (which throws under bunfs), which triggers
		// the catch in `rewriteLegacyPiImports` that leaves the specifier
		// unchanged for native `node_modules` resolution.
		expect(result).not.toHaveProperty("@airis/airis-utils");
		expect(result).not.toHaveProperty("@airis/airis-tui");
	});

	it("drops every override when none of the filesystem targets exist", () => {
		const candidates = {
			"@airis/airis-utils": "/$bunfs/root/packages/utils/src/index.js",
			"@airis/airis-tui": "/$bunfs/root/packages/tui/src/index.js",
		};
		const result = __validateLegacyPiPackageRootOverrides(candidates, () => false);
		expect(result).toEqual({});
	});

	it("keeps virtual airis-legacy-airis-bundled: entries without touching the filesystem (issue #3423)", () => {
		// Bun 1.3.14 `fs.existsSync` returns false for every bunfs path, so the
		// pre-#3423 fix dropped every override in compiled mode. The new
		// virtual scheme is the source of truth in compiled-binary mode; the
		// validator MUST short-circuit before any filesystem probe.
		let probed = false;
		const candidates = {
			"@airis/airis-ai": "airis-legacy-airis-bundled:@airis/airis-ai",
			"@airis/airis-coding-agent": "airis-legacy-airis-bundled:@airis/airis-coding-agent",
			"@airis/airis-agent-core": "airis-legacy-airis-bundled:@airis/airis-agent-core",
			"@airis/airis-natives": "airis-legacy-airis-bundled:@airis/airis-natives",
			"@airis/airis-tui": "airis-legacy-airis-bundled:@airis/airis-tui",
			"@airis/airis-utils": "airis-legacy-airis-bundled:@airis/airis-utils",
		};
		const result = __validateLegacyPiPackageRootOverrides(candidates, () => {
			probed = true;
			return false;
		});
		expect(result).toEqual(candidates);
		expect(probed).toBe(false);
	});

	it("mixes virtual and filesystem entries: virtuals always pass, filesystems gated", () => {
		const candidates = {
			"@airis/airis-ai": "airis-legacy-airis-bundled:@airis/airis-ai",
			"@airis/airis-coding-agent": "/dev/source/legacy-airis-coding-agent-shim.ts",
			"@airis/airis-tui": "/missing/path.ts",
		};
		const missing = new Set(["/missing/path.ts"]);
		const result = __validateLegacyPiPackageRootOverrides(candidates, p => !missing.has(p));
		expect(result).toEqual({
			"@airis/airis-ai": "airis-legacy-airis-bundled:@airis/airis-ai",
			"@airis/airis-coding-agent": "/dev/source/legacy-airis-coding-agent-shim.ts",
		});
	});
});

// Regression for the merge of issue #3414 (typebox shim fall-through) and
// issue #3423 (compiled-binary virtual namespace). `__resolveTypeBoxShimPath`
// must serve the virtual specifier in compiled mode without probing the FS,
// and in dev/install mode drop the shim to `null` when the source file is
// missing so `resolveTypeBoxSpecifier` returns `undefined` and bare
// `typebox` / `@sinclair/typebox` imports fall through to native resolution.
describe("legacy pi compat typebox shim path resolution (issues #3414, #3423)", () => {
	it("returns the virtual specifier in compiled-binary mode without touching the filesystem", () => {
		let probed = false;
		const result = __resolveTypeBoxShimPath(true, "/ignored/source/typebox.ts", () => {
			probed = true;
			return false;
		});
		expect(result).toBe("airis-legacy-airis-bundled:typebox");
		expect(probed).toBe(false);
	});

	it("returns the on-disk source path in dev mode when the shim file exists", () => {
		const result = __resolveTypeBoxShimPath(false, "/dev/src/typebox.ts", () => true);
		expect(result).toBe("/dev/src/typebox.ts");
	});

	it("drops the shim to null in dev mode when the source file is missing (issue #3414)", () => {
		const result = __resolveTypeBoxShimPath(false, "/dev/src/typebox.ts", () => false);
		expect(result).toBeNull();
	});
});
