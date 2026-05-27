import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import App from "./App";

describe("App", () => {
  it("renders the approved landing page headline and install target", () => {
    render(<App />);

    expect(
      screen.getByRole("heading", {
        level: 1,
        name: "Learn English from the subtitle on screen.",
      }),
    ).toBeTruthy();
    expect(screen.getByRole("link", { name: "Install from releases" })).toHaveAttribute("href", "#install");
  });

  it("renders the animated extension flow with accessible status text", () => {
    render(<App />);

    expect(screen.getAllByLabelText("Animated preview of the subtitle lookup workflow")).toHaveLength(2);
    expect(screen.getAllByText("1. Subtitle appears")).toHaveLength(2);
    expect(screen.getAllByText("2. Shift+T pauses IINA")).toHaveLength(2);
    expect(screen.getAllByText("3. AI opens the explanation")).toHaveLength(2);
  });

  it("keeps the future demo video area non-blocking", () => {
    render(<App />);

    expect(screen.getByText("Demo video coming soon")).toBeTruthy();
  });
});
