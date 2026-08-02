/**
 * API Demo Extension
 *
 * Demonstrates using ExtensionAPI's logger, injected `airs.zod`, and airs module access.
 * These features are now exposed directly on the ExtensionAPI, matching
 * the CustomToolAPI interface.
 */
import type { ExtensionAPI } from "@airis/airis-coding-agent";

export default function (airs: ExtensionAPI) {
	const { z } = airs.zod;

	// Access the logger for debugging
	airs.logger.debug("API demo extension loaded");

	airs.registerTool({
		name: "api_demo",
		label: "API Demo",
		description: "Demonstrates ExtensionAPI capabilities: logger, zod, and airs module access",
		parameters: z.object({
			message: z.string().describe("Test message"),
			logLevel: z.enum(["error", "warn", "debug"]).default("debug").describe("Log level to use"),
		}),

		async execute(_toolCallId, params, _onUpdate, ctx, _signal) {
			const { message, logLevel } = params;

			// Use logger at specified level
			airs.logger[logLevel]("API demo tool executed", { message, logLevel });

			// Access airs module utilities
			const { logger: airisLogger } = airs.airs;
			airisLogger.debug("Accessed airs module from extension", { sessionFile: ctx.sessionManager.getSessionFile() });

			// Get session information
			const sessionInfo = `Session: ${ctx.sessionManager.getSessionFile()}`;
			const modelInfo = ctx.model ? `Model: ${ctx.model.id}` : "Model: none";

			return {
				content: [
					{
						type: "text",
						text: [
							`API Demo Tool executed successfully!`,
							``,
							`Message: ${message}`,
							`Log Level: ${logLevel}`,
							``,
							`Features demonstrated:`,
							`1. ✓ Logger access via airs.logger`,
							`2. ✓ Zod access via airs.zod`,
							`3. ✓ Airis module access via airs.airs`,
							``,
							`Context:`,
							`- ${sessionInfo}`,
							`- ${modelInfo}`,
							`- CWD: ${ctx.cwd}`,
						].join("\n"),
					},
				],
				details: {
					message,
					logLevel,
					sessionFile: ctx.sessionManager.getSessionFile(),
					modelId: ctx.model?.id,
				},
			};
		},
	});

	// Demonstrate event handling with logger
	airs.on("session_start", async () => {
		airs.logger.debug("Session started", { extension: "api-demo" });
	});

	airs.on("agent_start", async () => {
		airs.logger.debug("Agent started", { extension: "api-demo" });
	});
}
