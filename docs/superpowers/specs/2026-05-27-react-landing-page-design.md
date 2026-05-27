# React Landing Page Design

## Summary

Build a small React landing page for Subtitle Lookup. The page should explain what the IINA plugin does, make installation obvious, and feel visually connected to IINA through a clean macOS product style.

## Confirmed Direction

The approved direction is **A. Mac app extension** from the visual companion. It should be simple, good-looking, and clear for GitHub visitors.

## Audience

Primary visitors are IINA users and English learners who arrive from GitHub or a shared link. They should understand the plugin in less than a minute and know how to try it.

## Page Goals

1. Explain the core behavior: press a shortcut while a subtitle is visible, pause IINA, open an AI explanation.
2. Show that it supports provider choice and prompt customization without making settings the main story.
3. Make install and GitHub actions easy to find.
4. Include one concrete example around "malicious prosecution" so the learning use case is visible.
5. Use at least one project-bound visual asset generated with the image generation workflow.

## Visual Direction

Use a bright macOS-inspired product page. The IINA site is the inspiration: airy spacing, soft blue and violet light, clean typography, and a clear download action. Do not copy the page layout or IINA branding directly.

Theme sentence: a learner is checking the project page on a laptop in the afternoon before installing a small media-player utility. The page should feel light, reassuring, and quick to scan.

Color strategy: restrained to committed. Use tinted neutrals with a blue action color and a small violet or cyan supporting glow. Avoid a one-note blue page by adding warm off-white surfaces and neutral ink.

Typography: use a modern system stack for reliability. Strong weight contrast is enough; do not introduce a heavy custom font dependency for this small repo.

## Content Structure

### Hero

Headline: "Learn English from the subtitle on screen."

Support copy should say that the plugin pauses IINA and opens a simple AI explanation for the current subtitle line.

Primary action: install or view releases.

Secondary action: view GitHub or see how it works.

Hero visual: a generated polished product-style image or composition that shows a macOS media player moment with a subtitle line and an AI explanation panel. It should contain no brand logos and no inaccurate UI text that users must rely on.

### How It Works

Use a compact three-step explanation:

1. Watch with English subtitles.
2. Press Shift+T.
3. Read the explanation in your chosen AI provider.

### Example

Show:

Subtitle: "you're going to be faced with a charge of malicious prosecution."

In context: the speaker is warning that the other person could be accused of starting a false legal case on purpose to hurt someone.

Word: malicious prosecution.

Synonyms: false accusation, wrongful lawsuit, abuse of the legal system.

### Feature Notes

Mention the practical features without turning the page into a dashboard:

- Perplexity, ChatGPT, Grok, Claude, and Google AI Mode support.
- Editable system prompt.
- Keyboard shortcut.
- Optional pause.
- No plugin server and no API key inside the plugin.

### Install

Provide two paths:

- Releases: double-click the packaged plugin when available.
- Source: run npm install and npm run build, then place the folder in the IINA plugins directory.

Include a short note that the user plans to add a small video later. The page can reserve a small "demo video coming soon" area or a simple link target, but should not require a video file now.

## Implementation Scope

Add a React website alongside the plugin code without disrupting the IINA plugin build. Use Vite for the website because it is a small static React page and easy to host on GitHub Pages later.

Expected files:

- `site/index.html`
- `site/package.json`
- `site/src/main.tsx`
- `site/src/App.tsx`
- `site/src/App.css`
- `site/src/assets/hero-subtitle-lookup.png`

Keep the existing plugin package untouched except for documentation links if needed.

## Testing And Verification

Run the website build command. Open the local page in a browser, inspect desktop and mobile widths, and capture screenshots. Check that text does not overlap, links are visible, the generated image loads, and the page remains useful without the future demo video.

Also run the existing plugin tests to ensure the new website files did not disturb the plugin workspace.

## Out Of Scope

Do not add analytics, backend code, account flows, real provider integrations on the website, or a video recorder. Do not replace the plugin README. Do not use IINA logos unless the project already has explicit permission and a local asset.
