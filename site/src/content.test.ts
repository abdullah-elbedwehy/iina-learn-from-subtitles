import { describe, expect, it } from "vitest";
import { exampleLookup, flowSteps, navLinks, providers } from "./content";

describe("landing page content", () => {
  it("explains the subtitle lookup flow in three steps", () => {
    expect(flowSteps.map((step) => step.title)).toEqual([
      "Watch with English subtitles",
      "Press Shift+T",
      "Read a simple explanation",
    ]);
  });

  it("keeps the approved malicious prosecution example", () => {
    expect(exampleLookup.word).toBe("malicious prosecution");
    expect(exampleLookup.subtitle).toContain("charge of malicious prosecution");
    expect(exampleLookup.synonyms).toEqual([
      "false accusation",
      "wrongful lawsuit",
      "abuse of the legal system",
    ]);
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
    expect(providers).toEqual([
      "Google AI Mode",
      "Perplexity",
      "Claude",
      "ChatGPT",
      "Grok",
    ]);
  });
});
