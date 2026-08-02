import { describe, expect, it } from "bun:test";
import { InternalUrlRouter } from "@airis/airis-coding-agent/internal-urls";

describe("OmpProtocolHandler", () => {
	it("treats airis://docs as the documentation root", async () => {
		const resource = await InternalUrlRouter.instance().resolve("airis://docs");

		expect(resource.content).toContain("# Documentation");
		expect(resource.content).toContain("tools/read.md");
	});

	it("resolves docs-prefixed documentation paths", async () => {
		const router = InternalUrlRouter.instance();
		const direct = await router.resolve("airis://tools/read.md");
		const prefixed = await router.resolve("airis://docs/tools/read.md");

		expect(prefixed.content).toBe(direct.content);
		expect(prefixed.content).toContain("# read");
	});
});
