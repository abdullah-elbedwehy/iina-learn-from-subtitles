<div align="center">

# 🎬 Subtitle Lookup

### Learn English the fun way — straight from the movies you already watch.

An [IINA](https://iina.io) plugin that turns any subtitle line into an instant vocabulary lesson. Pause, press a shortcut, and an AI explains the hard word in simple English. No more pausing, switching apps, copy-pasting, losing the scene.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![IINA](https://img.shields.io/badge/IINA-1.4+-blueviolet)](https://iina.io)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178c6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tests](https://img.shields.io/badge/tests-39%20passing-brightgreen)](./tests)


site : https://iina-learn-from-subtitles.vercel.app/

<img src="docs/screenshots/settings.png" alt="Subtitle Lookup settings panel" width="520" />

</div>

---

## ✨ What it does

1. You're watching a movie in IINA with English subtitles
2. A word or phrase stumps you
3. You hit **Shift+T** (or whatever you set)
4. The video pauses, your browser opens, and the AI gives you back:

```
Original: "He struggled so hard that eventually he churned that cream into butter and crawled out."

Simplified: He kept trying with all his strength until, after a long time, his movements
turned the liquid into something solid — and that's how he escaped.

Hard words:
- struggled: fought hard, pushed himself, kept trying
- eventually: finally, in the end, after a long time
- churned: mixed hard, beat, stirred fast
- crawled out: climbed out slowly, pulled himself out
```

Read it, close the tab, hit space, keep watching.

## 📸 What it looks like

| Settings panel | A real lookup |
|:---:|:---:|
| <img src="docs/screenshots/settings.png" alt="Settings" width="380" /> | <img src="docs/screenshots/lookup.png" alt="Lookup result" width="380" /> |

## 🚀 Install

> [!NOTE]
> Requires **IINA 1.4+** on macOS.

### The easy way (recommended)

1. Go to [**Releases**](https://github.com/abdullah-elbedwehy/iina-learn-from-subtitles/releases)
2. Under the latest release, expand **Assets** and download **`subtitle-lookup.iinaplgz`**
3. Double-click the `.iinaplgz` file — IINA installs it automatically
4. Restart IINA
5. Open **IINA → Settings → Plugins → Subtitle Lookup** to confirm it's enabled and configure your shortcut
6. Open any movie with English subtitles and press **Shift+T** to test

> [!NOTE]
> If double-clicking doesn't work, open IINA manually, go to **Settings → Plugins**, click the **+** button, and select the `.iinaplgz` file.

### From source

```bash
git clone https://github.com/abdullah-elbedwehy/iina-learn-from-subtitles.git
cd iina-learn-from-subtitles
npm install
npm run build
```

Then copy the folder to the IINA plugins directory:

```bash
cp -R . ~/Library/Application\ Support/com.colliderli.iina/plugins/subtitle-lookup.iinaplugin
```

Restart IINA. The plugin should appear under Settings → Plugins.

> [!TIP]
> Run `npm run watch` during development — Parcel rebuilds `dist/index.js` on every save. Just reload the plugin in IINA (Settings → Plugins → Subtitle Lookup → ↺) without restarting.

## 🎯 How to use

1. Open a movie in IINA. Make sure English subtitles are on.
2. Hit **Shift+T** when you see a word you don't know.
3. Your default browser opens to your chosen AI with the explanation.
4. Hit **space** in IINA to keep watching.

The current subtitle is what gets looked up — whatever's visible on screen at the moment you press the shortcut.

## 🔍 How it works

No API key, no server, no account. Here's the full chain:

1. **Subtitle observer** — `src/index.ts` listens to `mpv.sub-text.changed` via IINA's event system. Every time the subtitle line changes, it's pushed into a rolling buffer (`src/history.ts`).

2. **Shortcut triggers lookup** — when you press Shift+T, `performLookup()` in `src/lookup.ts` runs. It reads the current subtitle from mpv, grabs the last N lines from the buffer, and optionally pauses playback.

3. **Template substitution** — `src/template.ts` replaces `{{subtitle}}`, `{{recent_subtitles}}`, `{{title}}`, etc. in your system prompt with real values. The full prompt becomes the query string.

4. **Opens a URL** — the prompt is `encodeURIComponent`-encoded and appended to your chosen provider's URL (e.g. `https://www.google.com/search?udm=50&q=`). IINA calls `utils.open()` to open it in your default browser.

5. **AI replies in the browser** — the AI sees your prompt and subtitle, responds in the structured format. No data goes through any server I control.

The structured output format (Original → Simplified → Hard words) is enforced by the system prompt, not the plugin code. You can rewrite it entirely from Settings.

## ⚙️ Settings

Open them from IINA → Settings → Plugins → Subtitle Lookup → Settings.

| Setting | What it does |
|---|---|
| **AI Provider** | Pick where the lookup goes. Default: Google AI Mode (fastest). |
| **Keyboard Shortcut** | Click the field and press your combo. Takes effect after IINA reloads the plugin. |
| **Pause video** | Whether to pause when you trigger a lookup. On by default. |
| **Include episode name** | Sends the movie/episode title to the AI as extra context. |
| **Recent subtitle lines** | How many past subtitle lines to send for scene context (0 = none, default 5). |
| **System Prompt** | The exact instructions sent to the AI. Edit any part you want. |

## 🛠️ Customize the prompt

The system prompt is just text. Rewrite any part of it. Use these placeholders — they get replaced with live data when you trigger a lookup:

| Placeholder | Becomes |
|---|---|
| `{{subtitle}}` | The current subtitle line |
| `{{title}}` | Movie or episode title |
| `{{filename}}` | Source file name |
| `{{time}}` | Current playback time |
| `{{duration}}` | Total length |
| `{{recent_subtitles}}` | Last N subtitle lines (set via the "Recent subtitle lines" field) |

> [!TIP]
> Want explanations in **Arabic**? Add `Explain everything in Arabic.` to the end of the prompt. Want it more concise? Add `Maximum 3 lines total.` It's just plain English instructions — the AI listens.

## 🤖 Supported AI providers

| Provider | URL trick | Vibe |
|---|---|---|
| **Google AI Mode** | `?udm=50` | Fastest. Best for quick lookups. |
| **Perplexity** | `?q=` | Best at scene-level context and follow-up questions. |
| **Claude** | `?q=` | Most natural-sounding explanations. |
| **ChatGPT** | `?q=` | Solid all-around. |
| **Grok** | `?q=` | Casual tone, can handle slang well. |

All five work by opening their web URL with your query — **no API keys, no accounts wired into the plugin, no data passing through any server I control**. You're just opening a search URL.

## 🧰 Development

```bash
npm install      # one-time
npm run build    # build src/ → dist/
npm test         # run vitest (39 tests)
npm run watch    # rebuild on save
```

<details>
<summary>Project layout</summary>

```
src/
├── index.ts         IINA wiring + mpv subtitle observer
├── lookup.ts        performLookup (dependency-injected for tests)
├── providers.ts     URLs, types, URL builder
├── prompt.ts        Default system prompt
├── template.ts      {{var}} substitution
├── history.ts       Rolling subtitle buffer
└── time.ts          Seconds → human format

tests/               vitest, 39 tests
dist/                built bundle (committed for direct install)
pref.html           settings UI
Info.json            IINA plugin manifest
```

</details>

## 🤝 Contributing

Issues and PRs welcome. If a provider URL breaks, or you want a new one added, open an issue with the URL pattern.

## 📄 License

[MIT](./LICENSE) — do whatever you want with it.

## 🧑 Built by

**[Abdullah Elbedwehy](https://github.com/abdullah-elbedwehy)** — built this for myself first, sharing because someone else might want it too.

If it helps you, a ⭐ on the repo means a lot.
