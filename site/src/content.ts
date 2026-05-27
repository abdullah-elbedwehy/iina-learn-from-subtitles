export const githubUrl = "https://github.com/abdullah-elbedwehy/iina-learn-from-subtitles";

export const navLinks = [
  { label: "Demo", href: "#demo" },
  { label: "Output", href: "#output" },
  { label: "Install", href: "#install" },
  { label: "GitHub", href: githubUrl },
] as const;

export const heroCopy = {
  eyebrow: "IINA plugin",
  headline: "Explain the subtitle. Keep watching.",
  lede:
    "Subtitle Lookup reads whatever English subtitle is on screen in IINA, pauses playback, and opens your chosen AI with the line already in context. No copy-paste. No tab juggling.",
} as const;

export const storyCopy = {
  eyebrow: "Why it exists",
  headline: "Built for the moment a phrase kills the mood.",
  body:
    "I learn English through movies. It works until someone drops a line like malicious prosecution and I lose five minutes to Wikipedia. I wanted the word explained in easy English, with the original phrase still there, then spacebar and keep watching.",
} as const;

export const demoPhases = [
  { id: "watch", label: "English subtitle on screen" },
  { id: "trigger", label: "Press Shift+T in IINA" },
  { id: "lookup", label: "Browser opens with the explanation" },
  { id: "resume", label: "Read it, close the tab, press space" },
] as const;

export const exampleLookup = {
  subtitle: "you're going to be faced with a charge of malicious prosecution.",
  simplified:
    "Someone is going to accuse you of starting a fake court case against another person on purpose to hurt them.",
  hardWords: [
    { term: "charge", synonyms: "accusation, formal complaint, case" },
    {
      term: "malicious prosecution",
      synonyms: "wrongful lawsuit, false legal case, abuse of court",
    },
  ],
} as const;

export const flowSteps = [
  {
    title: "Watch with subtitles on",
    description: "Open any movie in IINA. The lookup uses whatever subtitle line is visible when you press the shortcut.",
  },
  {
    title: "Hit your shortcut",
    description: "Default is Shift+T. The plugin can pause the video and grab the current line plus recent scene context.",
  },
  {
    title: "Read and resume",
    description: "Your browser opens to Google AI Mode, Perplexity, Claude, ChatGPT, or Grok. Close the tab and keep watching.",
  },
] as const;

export const providers = ["Google AI Mode", "Perplexity", "Claude", "ChatGPT", "Grok"] as const;

export const featureNotes = [
  "No API keys in the plugin",
  "No plugin server",
  "Editable system prompt",
  "Custom keyboard shortcut",
  "Optional pause on lookup",
  "Recent subtitle context",
] as const;

export const installSteps = {
  release: {
    title: "From a release",
    steps: [
      "Download the latest .iinaplgz from GitHub Releases.",
      "Double-click it. IINA installs the plugin.",
      "Restart IINA and open Settings → Plugins → Subtitle Lookup.",
    ],
  },
  source: {
    title: "From source",
    commands: "npm install\nnpm run build",
    note: "Drop the built folder into ~/Library/Application Support/com.colliderli.iina/plugins/ and rename it to end with .iinaplugin.",
  },
} as const;
