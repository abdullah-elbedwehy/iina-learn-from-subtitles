import { describe, it, expect } from "vitest";
import { substitute, extractVariableNames } from "../src/template";

describe("substitute", () => {
  it("replaces a single placeholder", () => {
    expect(substitute("Hello {{name}}", { name: "world" })).toBe("Hello world");
  });

  it("replaces multiple placeholders", () => {
    expect(
      substitute("{{a}} and {{b}}", { a: "foo", b: "bar" }),
    ).toBe("foo and bar");
  });

  it("replaces the same placeholder multiple times", () => {
    expect(substitute("{{x}}-{{x}}", { x: "z" })).toBe("z-z");
  });

  it("leaves unknown placeholders untouched", () => {
    expect(substitute("Hi {{unknown}}", { name: "x" })).toBe("Hi {{unknown}}");
  });

  it("handles empty template", () => {
    expect(substitute("", { a: "b" })).toBe("");
  });

  it("handles template with no placeholders", () => {
    expect(substitute("plain text", { a: "b" })).toBe("plain text");
  });

  it("handles multi-line template", () => {
    expect(
      substitute("Line1: {{a}}\nLine2: {{b}}", { a: "1", b: "2" }),
    ).toBe("Line1: 1\nLine2: 2");
  });

  it("handles values with special characters", () => {
    expect(
      substitute("{{q}}", { q: "what's \"this\" & that?" }),
    ).toBe("what's \"this\" & that?");
  });

  it("handles empty string values", () => {
    expect(substitute("[{{a}}]", { a: "" })).toBe("[]");
  });
});

describe("extractVariableNames", () => {
  it("returns variable names in order", () => {
    expect(extractVariableNames("{{a}} {{b}} {{c}}")).toEqual(["a", "b", "c"]);
  });

  it("deduplicates", () => {
    expect(extractVariableNames("{{a}} {{a}} {{b}}")).toEqual(["a", "b"]);
  });

  it("returns empty array for no placeholders", () => {
    expect(extractVariableNames("plain text")).toEqual([]);
  });

  it("returns empty array for empty string", () => {
    expect(extractVariableNames("")).toEqual([]);
  });
});
