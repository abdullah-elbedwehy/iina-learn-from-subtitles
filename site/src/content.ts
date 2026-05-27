export const githubUrl = "https://github.com/abdullah-elbedwehy/iina-learn-from-subtitles";

export const navLinks = [
  { label: "How it works", href: "#how-it-works" },
  { label: "Example", href: "#example" },
  { label: "Install", href: "#install" },
  { label: "GitHub", href: githubUrl },
] as const;

export const flowSteps = [
  {
    title: "Watch with English subtitles",
    description: "Keep the movie open in IINA and wait for a line you want to understand.",
  },
  {
    title: "Press Shift+T",
    description: "The plugin reads the subtitle on screen and pauses playback for you.",
  },
  {
    title: "Read a simple explanation",
    description: "Your chosen AI opens with the subtitle, context, meaning, tone, and synonyms.",
  },
] as const;

export const exampleLookup = {
  subtitle: "you're going to be faced with a charge of malicious prosecution.",
  word: "malicious prosecution",
  context:
    "The speaker is warning that the other person could be accused of starting a false legal case on purpose to hurt someone.",
  synonyms: ["false accusation", "wrongful lawsuit", "abuse of the legal system"],
} as const;

export const providers = ["Google AI Mode", "Perplexity", "Claude", "ChatGPT", "Grok"] as const;

export const featureNotes = [
  "Editable system prompt",
  "Provider choice",
  "Shortcut-friendly",
  "Optional pause",
  "No plugin server",
] as const;
