import { describe, it, expect } from "vitest";
import { formatTime } from "../src/time";

describe("formatTime", () => {
  it("formats seconds under a minute", () => {
    expect(formatTime(5)).toBe("0:05");
    expect(formatTime(45)).toBe("0:45");
  });

  it("formats minutes and seconds", () => {
    expect(formatTime(75)).toBe("1:15");
    expect(formatTime(599)).toBe("9:59");
    expect(formatTime(600)).toBe("10:00");
  });

  it("formats hours when over 3600 seconds", () => {
    expect(formatTime(3600)).toBe("1:00:00");
    expect(formatTime(3661)).toBe("1:01:01");
    expect(formatTime(7325)).toBe("2:02:05");
  });

  it("handles 0", () => {
    expect(formatTime(0)).toBe("0:00");
  });

  it("handles fractional seconds by flooring", () => {
    expect(formatTime(75.9)).toBe("1:15");
  });

  it("returns empty string for invalid input", () => {
    expect(formatTime(NaN)).toBe("");
    expect(formatTime(-1)).toBe("");
    expect(formatTime(null)).toBe("");
    expect(formatTime(undefined)).toBe("");
  });
});
