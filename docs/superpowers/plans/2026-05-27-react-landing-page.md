# React Landing Page Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a small React landing page that explains the Subtitle Lookup IINA plugin and guides visitors to install it.

**Architecture:** Add an isolated Vite React app under `site/` so the existing IINA plugin build remains unchanged. Keep copy and repeated data in `site/src/content.ts`, render the page in `site/src/App.tsx`, and place the generated hero asset in `site/src/assets/`.

**Tech Stack:** React, Vite, TypeScript, Vitest, Testing Library, CSS animations with `prefers-reduced-motion`.

---

### Task 1: Site Content Contract

**Files:**
- Create: `site/src/content.ts`
- Test: `site/src/content.test.ts`

- [ ] **Step 1: Write the failing test**

```ts
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
        expect.objectContaining({ label: "GitHub", href: "https://github.com/abdullah-elbedwehy/iina-learn-from-subtitles" }),
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
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run site/src/content.test.ts`

Expected: FAIL because `site/src/content.ts` does not exist.

- [ ] **Step 3: Write minimal implementation**

Create `site/src/content.ts` exporting `navLinks`, `flowSteps`, `exampleLookup`, and `providers` with the exact values asserted above.

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run site/src/content.test.ts`

Expected: PASS.

### Task 2: React Page And Animation Contract

**Files:**
- Create: `site/src/App.tsx`
- Create: `site/src/App.test.tsx`
- Create: `site/src/main.tsx`
- Create: `site/src/vite-env.d.ts`

- [ ] **Step 1: Write the failing test**

```tsx
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import App from "./App";

describe("App", () => {
  it("renders the approved landing page headline and install target", () => {
    render(<App />);

    expect(screen.getByRole("heading", { level: 1, name: "Learn English from the subtitle on screen." })).toBeTruthy();
    expect(screen.getByRole("link", { name: "Install from releases" })).toHaveAttribute("href", "#install");
  });

  it("renders the animated extension flow with accessible status text", () => {
    render(<App />);

    expect(screen.getByLabelText("Animated preview of the subtitle lookup workflow")).toBeTruthy();
    expect(screen.getByText("1. Subtitle appears")).toBeTruthy();
    expect(screen.getByText("2. Shift+T pauses IINA")).toBeTruthy();
    expect(screen.getByText("3. AI opens the explanation")).toBeTruthy();
  });

  it("keeps the future demo video area non-blocking", () => {
    render(<App />);

    expect(screen.getByText("Demo video coming soon")).toBeTruthy();
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `cd site && npm test -- --run src/App.test.tsx`

Expected: FAIL because React app files do not exist yet.

- [ ] **Step 3: Write minimal implementation**

Build the React page using content from `content.ts`. Include a hero, animated workflow preview, how-it-works section, example section, feature notes, demo placeholder, and install section.

- [ ] **Step 4: Run test to verify it passes**

Run: `cd site && npm test -- --run src/App.test.tsx`

Expected: PASS.

### Task 3: Styling And Generated Hero Asset

**Files:**
- Create: `site/src/App.css`
- Create: `site/src/assets/hero-subtitle-lookup.png`

- [ ] **Step 1: Generate the hero asset**

Use the image generation tool to create a soft macOS-style product visual: a media-player-like window with a subtitle moment and a small AI explanation panel. Save it as `site/src/assets/hero-subtitle-lookup.png`.

- [ ] **Step 2: Implement styling**

Write responsive CSS with OKLCH colors, light macOS-inspired surfaces, an animated workflow preview, hover feedback, and reduced-motion support.

- [ ] **Step 3: Verify CSS contract manually**

Check that the CSS contains `@media (prefers-reduced-motion: reduce)`, animation names for the workflow, and no banned gradient text or side-stripe accent borders.

### Task 4: Vite Site Shell

**Files:**
- Create: `site/index.html`
- Create: `site/package.json`
- Create: `site/tsconfig.json`
- Create: `site/vite.config.ts`
- Create: `site/vitest.setup.ts`

- [ ] **Step 1: Add the Vite package shell**

Create scripts for `dev`, `build`, `preview`, and `test`. Include React, Vite, TypeScript, Vitest, Testing Library, and jsdom.

- [ ] **Step 2: Install dependencies**

Run: `cd site && npm install`

Expected: `site/package-lock.json` is created and dependencies install.

- [ ] **Step 3: Run checks**

Run: `cd site && npm test -- --run`

Expected: PASS.

Run: `cd site && npm run build`

Expected: PASS.

Run: `npm test`

Expected: Existing plugin tests pass.

### Task 5: Browser Verification And Commit

**Files:**
- Modify only if QA reveals issues: `site/src/App.tsx`, `site/src/App.css`

- [ ] **Step 1: Start the site**

Run: `cd site && npm run dev -- --host 127.0.0.1`

- [ ] **Step 2: Verify in browser**

Open the local URL. Check desktop and mobile widths. Confirm no text overlap, asset loads, animation communicates the flow, reduced-motion CSS exists, and install links are visible.

- [ ] **Step 3: Commit only website-related files**

Stage `docs/superpowers/plans/2026-05-27-react-landing-page.md` and `site/` files. Do not stage existing unrelated changes to `pref.html` or `tests/pref.test.ts`.

Commit message: `Add React landing page`
