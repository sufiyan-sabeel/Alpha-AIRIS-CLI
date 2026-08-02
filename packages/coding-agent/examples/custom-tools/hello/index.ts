import type { CustomToolFactory } from "@airis/airis-coding-agent";

const factory: CustomToolFactory = airs => ({
	name: "hello",
	label: "Hello",
	description: "A simple greeting tool",
	parameters: airs.zod.object({
		name: airs.zod.string().describe("Name to greet"),
	}),

	async execute(_toolCallId, params, _onUpdate, _ctx, _signal) {
		const { name } = params;
		return {
			content: [{ type: "text", text: `Hello, ${name}!` }],
			details: { greeted: name },
		};
	},
});

export default factory;
