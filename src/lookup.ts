import { DEFAULT_PROMPT } from "./prompt";
import { buildLookupURL, DEFAULT_PROVIDER } from "./providers";
import { SubtitleHistory } from "./history";
import { substitute, TemplateVars } from "./template";
import { formatTime } from "./time";

export interface LookupDeps {
  getSubtitle(): string;
  getTitle(): string;
  getFilename(): string;
  getTimePos(): number;
  getDuration(): number;
  history: SubtitleHistory;
  prefs: {
    get(key: string): string | undefined;
  };
  pause(): void;
  showOSD(msg: string): void;
  openURL(url: string): void;
}

export function performLookup(deps: LookupDeps): void {
  const raw = deps.getSubtitle();
  if (!raw || !raw.trim()) {
    deps.showOSD("No subtitle on screen");
    return;
  }
  const subtitle = raw.trim();

  if (deps.prefs.get("pause") !== "false") {
    deps.pause();
  }

  const includeTitle = deps.prefs.get("include_title") !== "false";
  const title = includeTitle ? deps.getTitle() : "";

  const vars: TemplateVars = {
    subtitle,
    title,
    filename: deps.getFilename(),
    time: formatTime(deps.getTimePos()),
    duration: formatTime(deps.getDuration()),
    recent_subtitles: deps.history.joined("\n"),
  };

  const promptTemplate = deps.prefs.get("prompt") || DEFAULT_PROMPT;
  const fullQuery = substitute(promptTemplate, vars);

  const provider = deps.prefs.get("provider") || DEFAULT_PROVIDER;
  const url = buildLookupURL(provider, fullQuery);

  deps.openURL(url);
}
