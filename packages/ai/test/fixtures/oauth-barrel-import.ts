import {
	AnthropicOAuthFlow as RootAnthropicOAuthFlow,
	loginAnthropic as rootLoginAnthropic,
	refreshAnthropicToken as rootRefreshAnthropicToken,
} from "@airis/airis-ai";
import {
	AnthropicOAuthFlow as OAuthAnthropicOAuthFlow,
	loginAnthropic as oauthLoginAnthropic,
	refreshAnthropicToken as oauthRefreshAnthropicToken,
} from "@airis/airis-ai/registry/oauth";
import "@airis/airis-ai/providers/anthropic";
import "@airis/airis-ai/auth-storage";

const publicExports = [
	RootAnthropicOAuthFlow,
	rootLoginAnthropic,
	rootRefreshAnthropicToken,
	OAuthAnthropicOAuthFlow,
	oauthLoginAnthropic,
	oauthRefreshAnthropicToken,
];

if (publicExports.some(value => !value)) {
	throw new Error("Anthropic OAuth exports are unavailable");
}
