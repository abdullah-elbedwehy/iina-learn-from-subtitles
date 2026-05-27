import { describe, it, expect } from "vitest";
import { SubtitleHistory } from "../src/history";

describe("SubtitleHistory", () => {
  it("starts empty", () => {
    const h = new SubtitleHistory(5);
    expect(h.recent()).toEqual([]);
    expect(h.joined()).toBe("");
  });

  it("pushes lines up to capacity", () => {
    const h = new SubtitleHistory(3);
    h.push("a");
    h.push("b");
    h.push("c");
    expect(h.recent()).toEqual(["a", "b", "c"]);
  });

  it("drops oldest when over capacity", () => {
    const h = new SubtitleHistory(3);
    h.push("a");
    h.push("b");
    h.push("c");
    h.push("d");
    expect(h.recent()).toEqual(["b", "c", "d"]);
  });

  it("deduplicates consecutive identical lines", () => {
    const h = new SubtitleHistory(5);
    h.push("a");
    h.push("a");
    h.push("a");
    h.push("b");
    h.push("b");
    expect(h.recent()).toEqual(["a", "b"]);
  });

  it("re-adds a line if a different line came between", () => {
    const h = new SubtitleHistory(5);
    h.push("a");
    h.push("b");
    h.push("a");
    expect(h.recent()).toEqual(["a", "b", "a"]);
  });

  it("ignores empty and whitespace-only lines", () => {
    const h = new SubtitleHistory(5);
    h.push("");
    h.push("   ");
    h.push("\n\t");
    h.push("real");
    expect(h.recent()).toEqual(["real"]);
  });

  it("trims whitespace from lines", () => {
    const h = new SubtitleHistory(5);
    h.push("  hello  ");
    expect(h.recent()).toEqual(["hello"]);
  });

  it("ignores everything when capacity is 0", () => {
    const h = new SubtitleHistory(0);
    h.push("a");
    h.push("b");
    expect(h.recent()).toEqual([]);
  });

  it("joins lines with custom separator", () => {
    const h = new SubtitleHistory(5);
    h.push("a");
    h.push("b");
    h.push("c");
    expect(h.joined(" | ")).toBe("a | b | c");
  });

  it("joins lines with newline by default", () => {
    const h = new SubtitleHistory(5);
    h.push("a");
    h.push("b");
    expect(h.joined()).toBe("a\nb");
  });

  it("setCapacity shrinks buffer when smaller", () => {
    const h = new SubtitleHistory(5);
    h.push("a"); h.push("b"); h.push("c"); h.push("d"); h.push("e");
    h.setCapacity(2);
    expect(h.recent()).toEqual(["d", "e"]);
  });

  it("setCapacity allows growth", () => {
    const h = new SubtitleHistory(2);
    h.push("a"); h.push("b");
    h.setCapacity(5);
    h.push("c"); h.push("d");
    expect(h.recent()).toEqual(["a", "b", "c", "d"]);
  });

  it("clear empties the buffer and resets last-line tracking", () => {
    const h = new SubtitleHistory(5);
    h.push("a");
    h.clear();
    expect(h.recent()).toEqual([]);
    h.push("a");
    expect(h.recent()).toEqual(["a"]);
  });
});
