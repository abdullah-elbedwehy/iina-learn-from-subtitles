import { performLookup } from "./lookup";
import { SubtitleHistory } from "./history";

const { core, mpv, menu, utils, preferences, event, console } = iina;

const DEFAULT_CONTEXT_LINES = 5;
const DEFAULT_SHORTCUT = "Shift+T";

function parseIntSafe(value: unknown, fallback: number): number {
  const n = parseInt(String(value ?? ""), 10);
  return isNaN(n) ? fallback : n;
}

const history = new SubtitleHistory(
  parseIntSafe(preferences.get("context_lines"), DEFAULT_CONTEXT_LINES),
);

// Subtitle observer: push every new sub-text into the history buffer.
// IINA exposes mpv property changes as events named `mpv.<property>.changed`.
event.on("mpv.sub-text.changed", () => {
  try {
    const text = mpv.getString("sub-text");
    history.push(text);
  } catch (e) {
    console.log(`subtitle observer error: ${e}`);
  }
});

// When a new file loads, capacity may need refresh from prefs in case user changed it.
event.on("iina.file-loaded", () => {
  history.clear();
  history.setCapacity(parseIntSafe(preferences.get("context_lines"), DEFAULT_CONTEXT_LINES));
});

function getNumber(name: string): number {
  const anyMpv = mpv as unknown as { getNumber?: (k: string) => number };
  if (typeof anyMpv.getNumber === "function") {
    return anyMpv.getNumber(name);
  }
  const parsed = parseFloat(mpv.getString(name));
  return isNaN(parsed) ? 0 : parsed;
}

function handleLookup(): void {
  // Refresh capacity in case the user changed it without reloading the file.
  history.setCapacity(parseIntSafe(preferences.get("context_lines"), DEFAULT_CONTEXT_LINES));

  performLookup({
    getSubtitle: () => mpv.getString("sub-text"),
    getTitle: () => (mpv.getString("media-title") || core.status.title || "").trim(),
    getFilename: () => (mpv.getString("filename") || "").trim(),
    getTimePos: () => getNumber("time-pos"),
    getDuration: () => getNumber("duration"),
    history,
    prefs: { get: (k: string) => preferences.get(k) as string | undefined },
    pause: () => mpv.set("pause", true),
    showOSD: (m: string) => core.osd(m),
    openURL: (u: string) => utils.open(u),
  });
}

const shortcut = (preferences.get("shortcut") as string) || DEFAULT_SHORTCUT;

menu.addItem(
  menu.item("Look up subtitle", handleLookup, { keyBinding: shortcut }),
);
