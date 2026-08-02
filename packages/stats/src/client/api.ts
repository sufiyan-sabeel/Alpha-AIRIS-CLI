import type {
	BehaviorDashboardStats,
	CostDashboardStats,
	FolderStats,
	GainDashboardStats,
	MessageStats,
	ModelDashboardStats,
	OverviewStats,
	ProviderDashboardStats,
	RequestDetails,
	TimeRange,
	ToolDashboardStats,
} from "./types";

const AAIRIS_BASE = "/api";

export class ApiError extends Error {
	status: number;
	endpoint: string;

	constructor(status: number, endpoint: string, message: string) {
		super(message);
		this.name = "ApiError";
		this.status = status;
		this.endpoint = endpoint;
	}
}

async function fetchJson<T>(endpoint: string, options?: RequestInit): Promise<T> {
	const res = await fetch(endpoint, options);
	if (!res.ok) {
		throw new ApiError(res.status, endpoint, `HTTP error ${res.status} on ${endpoint}`);
	}
	return res.json() as Promise<T>;
}

export async function getOverviewStats(range: TimeRange = "24h", signal?: AbortSignal): Promise<OverviewStats> {
	return fetchJson<OverviewStats>(`${AAIRIS_BASE}/stats/overview?range=${encodeURIComponent(range)}`, {
		signal,
	});
}

export async function getModelDashboardStats(
	range: TimeRange = "24h",
	signal?: AbortSignal,
): Promise<ModelDashboardStats> {
	return fetchJson<ModelDashboardStats>(`${AAIRIS_BASE}/stats/model-dashboard?range=${encodeURIComponent(range)}`, {
		signal,
	});
}

export async function getCostDashboardStats(
	range: TimeRange = "24h",
	signal?: AbortSignal,
): Promise<CostDashboardStats> {
	return fetchJson<CostDashboardStats>(`${AAIRIS_BASE}/stats/costs?range=${encodeURIComponent(range)}`, { signal });
}

export async function getRecentRequests(limit = 50, signal?: AbortSignal): Promise<MessageStats[]> {
	return fetchJson<MessageStats[]>(`${AAIRIS_BASE}/stats/recent?limit=${limit}`, { signal });
}

export async function getRecentErrors(
	range: TimeRange = "24h",
	limit = 50,
	signal?: AbortSignal,
): Promise<MessageStats[]> {
	return fetchJson<MessageStats[]>(`${AAIRIS_BASE}/stats/errors?range=${encodeURIComponent(range)}&limit=${limit}`, {
		signal,
	});
}

export async function getRequestDetails(id: number, signal?: AbortSignal): Promise<RequestDetails> {
	return fetchJson<RequestDetails>(`${AAIRIS_BASE}/request/${id}`, { signal });
}

export async function sync(signal?: AbortSignal): Promise<{ processed: number; files: number; totalMessages: number }> {
	return fetchJson<{ processed: number; files: number; totalMessages: number }>(`${AAIRIS_BASE}/sync`, { signal });
}

export async function getBehaviorDashboardStats(
	range: TimeRange = "24h",
	signal?: AbortSignal,
): Promise<BehaviorDashboardStats> {
	return fetchJson<BehaviorDashboardStats>(`${AAIRIS_BASE}/stats/behavior?range=${encodeURIComponent(range)}`, {
		signal,
	});
}

export async function getFolderStats(range: TimeRange = "24h", signal?: AbortSignal): Promise<FolderStats[]> {
	return fetchJson<FolderStats[]>(`${AAIRIS_BASE}/stats/folders?range=${encodeURIComponent(range)}`, { signal });
}

export async function getGainDashboardStats(
	range: TimeRange = "24h",
	project?: string | null,
	signal?: AbortSignal,
): Promise<GainDashboardStats> {
	const params = new URLSearchParams({ range });
	if (project) params.set("project", project);
	return fetchJson<GainDashboardStats>(`${AAIRIS_BASE}/stats/gain?${params}`, { signal });
}

export async function getToolDashboardStats(
	range: TimeRange = "24h",
	signal?: AbortSignal,
): Promise<ToolDashboardStats> {
	return fetchJson<ToolDashboardStats>(`${AAIRIS_BASE}/stats/tools?range=${encodeURIComponent(range)}`, { signal });
}

export async function getProviderDashboardStats(
	range: TimeRange = "24h",
	signal?: AbortSignal,
): Promise<ProviderDashboardStats> {
	return fetchJson<ProviderDashboardStats>(`${AAIRIS_BASE}/stats/providers?range=${encodeURIComponent(range)}`, {
		signal,
	});
}
