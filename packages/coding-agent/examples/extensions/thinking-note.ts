import type { ExtensionFactory } from "@airis/airis-coding-agent";
import { Container, Text } from "@airis/airis-tui";

const extension: ExtensionFactory = airs => {
	airs.setLabel("Thinking note");
	airs.registerAssistantThinkingRenderer((context, theme) => {
		const container = new Container();
		container.addChild(new Text(theme.fg("dim", `thinking chars: ${context.text.length}`), 1, 0));
		return container;
	});
};

export default extension;
