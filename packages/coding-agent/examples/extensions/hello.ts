/**
 * Hello Tool - Minimal custom tool example
 *
 * Demonstrates using ExtensionAPI's logger, injected `airs.zod`, and airs module access.
 */
import type { ExtensionAPI } from "@airis/airis-coding-agent";

export default function (airs: ExtensionAPI) {
	const { z } = airs.zod;

	airs.registerTool({
		name: "hello",
		label: "Hello",
		description: "A simple greeting tool",
		parameters: z.object({
			name: z.string().describe("Name to greet"),
		}),

		async execute(_toolCallId, params, _onUpdate, _ctx, _signal) {
			const { name } = params;

			// Use logger for debugging
			airs.logger.debug("Hello tool executed", { name });

			return {
				content: [{ type: "text", text: `Hello, ${name}!` }],
				details: { greeted: name },
			};
		},
	});
}
