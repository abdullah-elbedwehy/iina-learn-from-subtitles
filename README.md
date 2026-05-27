<div align="center">

# 🎬 Subtitle Lookup

### Learn English the fun way — straight from the movies you already watch.

An [IINA](https://iina.io) plugin that turns any subtitle line into an instant vocabulary lesson. Pause, press a shortcut, and an AI explains the hard word in simple English. No more pausing, switching apps, copy-pasting, losing the scene.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![IINA](https://img.shields.io/badge/IINA-1.4+-blueviolet)](https://iina.io)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178c6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tests](https://img.shields.io/badge/tests-39%20passing-brightgreen)](./tests)

<img src="docs/screenshots/settings.png" alt="Subtitle Lookup settings panel" width="520" />

</div>

---

## 🙋 Why I made this

I learn English through movies. It works — until a character drops a phrase like *"a charge of malicious prosecution"* and I'm stuck. Pausing, opening a tab, typing the word, reading three Wikipedia pages, coming back. Five minutes later the mood is gone.

I wanted something instant. One shortcut. Get the word explained in *easy* English, with the original phrase still there next to it, and a couple of simpler synonyms I can remember. Then back to the movie.

That's what this plugin does.

## ✨ What it does

1. You're watching a movie in IINA with English subtitles
2. A word stumps you
3. You hit **Shift+T** (or whatever you set)
4. The video pauses, your browser opens, and the AI gives you back:

```
Original: "you're going to be faced with a charge of malicious prosecution."

Simplified: Someone is going to accuse you of starting a fake court
case against another person on purpose to hurt them.

Hard words:
- charge: accusation, formal complaint, case
- malicious prosecution: wrongful lawsuit, false legal case, abuse of court
```

That's it. Read it, close the tab, hit space, keep watching.

## 📸 What it looks like

| Settings panel | A real lookup |
|:---:|:---:|
| <img src="docs/screenshots/settings.png" alt="Settings" width="380" /> | <img src="docs/screenshots/lookup.png" alt="Lookup result" width="380" /> |

## 🚀 Install

> [!NOTE]
> Requires **IINA 1.4+** on macOS.

### The easy way

1. Grab the latest `.iinaplgz` from [Releases](https://github.com/abdullah-elbedwehy/iina-learn-from-subtitles/releases)
2. Double-click it. IINA installs it for you.
3. Restart IINA.

### From source

```bash
git clone https://github.com/abdullah-elbedwehy/iina-learn-from-subtitles.git
cd iina-learn-from-subtitles
npm install
npm run build
```

Then drop the whole folder into `~/Library/Application Support/com.colliderli.iina/plugins/` and rename it to end with `.iinaplugin`.

## 🎯 How to use

1. Open a movie in IINA. Make sure English subtitles are on.
2. Hit **Shift+T** when you see a word you don't know.
3. Your default browser opens to your chosen AI with the explanation.
4. Hit **space** in IINA to keep watching.

The current subtitle is what gets looked up — whatever's visible on screen at the moment you press the shortcut.

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
