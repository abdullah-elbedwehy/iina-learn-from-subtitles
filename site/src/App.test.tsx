import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import App from "./App";

describe("App", () => {
  it("renders the product-focused headline and release target", () => {
    render(<App />);

    expect(
      screen.getByRole("heading", {
        level: 1,
        name: "Explain the subtitle. Keep watching.",
      }),
    ).toBeTruthy();
    expect(screen.getByRole("link", { name: "Get the plugin" })).toHaveAttribute(
      "href",
      "https://github.com/abdullah-elbedwehy/iina-learn-from-subtitles/releases",
    );
  });

  it("renders the hero demo with the practical workflow steps", () => {
    render(<App />);

    expect(screen.getByLabelText("Animated demo of Subtitle Lookup inside IINA")).toBeTruthy();
    expect(screen.getByRole("button", { name: "Step 1: English subtitle on screen" })).toBeTruthy();
    expect(screen.getByRole("button", { name: "Step 2: Press Shift+T in IINA" })).toBeTruthy();
    expect(screen.getByRole("button", { name: "Step 3: Browser opens with the explanation" })).toBeTruthy();
    expect(screen.getByRole("button", { name: "Step 4: Read it, close the tab, press space" })).toBeTruthy();
  });

  it("lets users jump between demo steps while auto-play continues", () => {
    render(<App />);

    const demo = screen.getByLabelText("Animated demo of Subtitle Lookup inside IINA");
    const stepOne = screen.getByRole("button", { name: "Step 1: English subtitle on screen" });
    const stepThree = screen.getByRole("button", { name: "Step 3: Browser opens with the explanation" });

    fireEvent.click(stepThree);
    expect(demo).toHaveAttribute("data-phase", "lookup");
    expect(stepThree).toHaveAttribute("aria-current", "step");

    fireEvent.click(stepOne);
    expect(demo).toHaveAttribute("data-phase", "watch");
    expect(stepOne).toHaveAttribute("aria-current", "step");
  });

  it("shows the exact lookup output shape from the plugin prompt", () => {
    render(<App />);

    const output = screen.getByRole("article", { name: "Example lookup output" });
    expect(output).toHaveTextContent("malicious prosecution");
    expect(output).toHaveTextContent("wrongful lawsuit, false legal case, abuse of court");
  });
});
