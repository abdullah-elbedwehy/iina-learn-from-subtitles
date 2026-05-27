import { describe, it, expect } from "vitest";
import { buildLookupURL, PROVIDER_URLS, DEFAULT_PROVIDER } from "../src/providers";

describe("buildLookupURL", () => {
  it("builds URL for a known provider", () => {
    const url = buildLookupURL("perplexity", "hello world");
    expect(url.startsWith(PROVIDER_URLS.perplexity)).toBe(true);
    expect(url).toContain("hello%20world");
  });

  it("falls back to default provider for unknown id", () => {
    const url = buildLookupURL("unknown_provider", "test");
    expect(url.startsWith(PROVIDER_URLS[DEFAULT_PROVIDER])).toBe(true);
  });

  it("URL-encodes special characters", () => {
    const url = buildLookupURL("google_ai", "what \"this\"?");
    expect(url).toContain("%22this%22");
    expect(url).toContain("%3F");
  });

  it("handles empty query", () => {
    const url = buildLookupURL("claude", "");
    expect(url).toBe(PROVIDER_URLS.claude);
  });

  it("encodes newlines", () => {
    const url = buildLookupURL("chatgpt", "line1\nline2");
    expect(url).toContain("%0A");
  });
});

describe("PROVIDER_URLS", () => {
  it("includes all expected providers", () => {
    expect(Object.keys(PROVIDER_URLS).sort()).toEqual(
      ["chatgpt", "claude", "google_ai", "grok", "perplexity"],
    );
  });

  it("every URL ends with =", () => {
    for (const url of Object.values(PROVIDER_URLS)) {
      expect(url.endsWith("=")).toBe(true);
    }
  });
});
