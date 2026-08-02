import { spyOn } from "bun:test";
import * as path from "node:path";
import * as buildModule from "@airis/airis-catalog/build";
import { ModelRegistry } from "@airis/airis-coding-agent/config/model-registry";
import { AuthStorage } from "@airis/airis-coding-agent/session/auth-storage";
import { TempDir } from "@airis/airis-utils";

const tempDir = TempDir.createSync("@model-registry-lazy-probe-");
const authStorage = await AuthStorage.create(path.join(tempDir.path(), "auth.db"));
const buildSpy = spyOn(buildModule, "buildModel");
try {
	new ModelRegistry(authStorage, path.join(tempDir.path(), "models.yml"));
	process.stdout.write(JSON.stringify({ buildCalls: buildSpy.mock.calls.length }));
} finally {
	buildSpy.mockRestore();
	authStorage.close();
	await tempDir.remove().catch(() => {});
}
