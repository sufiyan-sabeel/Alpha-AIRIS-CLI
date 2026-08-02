// @ts-nocheck — example file; install @airis/airis-coding-agent before running
import type { ExtensionAPI } from "@airis/airis-coding-agent";

export default function myPlugin(airs: ExtensionAPI) {
  pi.on("session_start", async (_event, ctx) => {
    ctx.ui.notify("my-plugin loaded from example marketplace!", "info");
  });
}
