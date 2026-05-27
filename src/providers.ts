export type ProviderId =
  | "google_ai"
  | "perplexity"
  | "claude"
  | "chatgpt"
  | "grok";

export const PROVIDER_URLS: Record<ProviderId, string> = {
  google_ai:  "https://www.google.com/search?udm=50&q=",
  perplexity: "https://www.perplexity.ai/search?q=",
  claude:     "https://claude.ai/new?q=",
  chatgpt:    "https://chatgpt.com/?q=",
  grok:       "https://grok.com/?q=",
};

export const DEFAULT_PROVIDER: ProviderId = "google_ai";

export function buildLookupURL(provider: string, query: string): string {
  const id = (provider in PROVIDER_URLS ? provider : DEFAULT_PROVIDER) as ProviderId;
  return PROVIDER_URLS[id] + encodeURIComponent(query);
}
