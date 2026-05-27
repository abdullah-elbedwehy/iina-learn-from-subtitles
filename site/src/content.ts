export const githubUrl = "https://github.com/abdullah-elbedwehy/iina-learn-from-subtitles";

export const navLinks = [
  { label: "Demo", href: "#demo" },
  { label: "How it works", href: "#watch" },
  { label: "Output", href: "#output" },
  { label: "Install", href: "#install" },
  { label: "GitHub", href: githubUrl },
] as const;

export const heroCopy = {
  eyebrow: "IINA plugin",
  headline: "Explain the subtitle. Keep watching.",
  lede:
    "Press one key when something on screen stops you. The plugin grabs the subtitle, opens your AI with the line already there, and optionally pauses so you actually have time to read the answer. No copy-paste, no switching apps manually.",
} as const;

export const storyCopy = {
  eyebrow: "Why I built this",
  headline: "Built for the moment a phrase stops you cold.",
  body:
    "I'm Egyptian and I've been learning English through movies for the past couple of years — legal dramas, thrillers, crime films. I can follow most of it. But then a character drops some slang or a fast one-liner and I'm suddenly lost. Pausing to look it up kills the whole mood. I wanted something that shows me the explanation right there, keeps the original line visible next to it, then gets out of the way. Nothing like that existed for IINA, so I built it myself.",
} as const;

export const demoVideo = {
  src: "/subtitle-lookup-demo.mp4",
  title: "Subtitle Lookup demo in IINA",
  caption: "A real Shift+T lookup from a movie subtitle — watch what the plugin actually does.",
} as const;

export const demoPhases = [
  { id: "watch", label: "English subtitle on screen" },
  { id: "trigger", label: "Press Shift+T in IINA" },
  { id: "lookup", label: "Browser opens with the explanation" },
  { id: "resume", label: "Read it, close the tab, press space" },
] as const;

export const exampleLookup = {
  subtitle: "He struggled so hard that eventually he churned that cream into butter and crawled out.",
  simplified:
    "He kept trying with all his strength until, after a long time, his movements turned the liquid into something solid — and that's how he escaped.",
  hardWords: [
    { term: "struggled", synonyms: "fought hard, pushed himself, kept trying" },
    { term: "eventually", synonyms: "finally, in the end, after a long time" },
    { term: "churned", synonyms: "mixed hard, beat, stirred fast" },
    { term: "crawled out", synonyms: "climbed out slowly, pulled himself out" },
  ],
} as const;

export const flowSteps = [
  {
    title: "Watch with subtitles on",
    description: "Open any video in IINA. The plugin works with whatever subtitle file IINA is already showing — .srt, .ass, anything.",
  },
  {
    title: "Hit your shortcut",
    description: "Default is Shift+T. The plugin grabs the current line, optionally pauses, and sends it to your chosen AI with the recent scene as context.",
  },
  {
    title: "Read it and get back",
    description: "Your browser opens with the explanation ready. Read it, close the tab, press space — you're back in the movie.",
  },
] as const;

export const providers = ["Google AI Mode", "Perplexity", "Claude", "ChatGPT", "Grok"] as const;

export const featureNotes = [
  "No API keys required",
  "No server in the middle",
  "Editable system prompt",
  "Custom keyboard shortcut",
  "Optional pause on lookup",
  "Recent subtitle context",
] as const;

export const installSteps = {
  release: {
    title: "From a release",
    steps: [
      'Click "Open releases" below and go to the latest release.',
      "Under Assets, download subtitle-lookup.iinaplgz.",
      "Double-click the file — IINA installs it automatically.",
      "Restart IINA.",
      "Open Settings → Plugins → Subtitle Lookup to configure.",
    ],
  },
  source: {
    title: "From source",
    commands: "npm install\nnpm run build",
    note: "Drop the built folder into ~/Library/Application Support/com.colliderli.iina/plugins/ and rename it to end with .iinaplugin.",
  },
} as const;
