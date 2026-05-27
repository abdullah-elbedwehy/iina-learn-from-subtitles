import { describe, expect, it } from "vitest";
import { demoPhases, exampleLookup, flowSteps, heroCopy, navLinks, providers } from "./content";

describe("landing page content", () => {
  it("explains the subtitle lookup flow in three steps", () => {
    expect(flowSteps.map((step) => step.title)).toEqual([
      "Watch with subtitles on",
      "Hit your shortcut",
      "Read and resume",
    ]);
  });

  it("keeps the malicious prosecution example in plugin output shape", () => {
    expect(exampleLookup.subtitle).toContain("charge of malicious prosecution");
    expect(exampleLookup.hardWords).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ term: "malicious prosecution" }),
        expect.objectContaining({ term: "charge" }),
      ]),
    );
  });

  it("includes install and GitHub navigation targets", () => {
    expect(navLinks).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ label: "Install", href: "#install" }),
        expect.objectContaining({
          label: "GitHub",
          href: "https://github.com/abdullah-elbedwehy/iina-learn-from-subtitles",
        }),
      ]),
    );
  });

  it("lists supported AI providers", () => {
    expect(providers).toEqual(["Google AI Mode", "Perplexity", "Claude", "ChatGPT", "Grok"]);
  });

  it("frames the hero around the IINA movie moment", () => {
    expect(heroCopy.eyebrow).toBe("IINA plugin");
    expect(demoPhases).toHaveLength(4);
  });
});
