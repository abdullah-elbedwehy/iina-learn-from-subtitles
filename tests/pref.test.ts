import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { Script, createContext } from "node:vm";
import { describe, expect, it } from "vitest";

const prefHtml = readFileSync(resolve(__dirname, "..", "pref.html"), "utf8");
const scriptSource = prefHtml.match(/<script>([\s\S]*)<\/script>/)?.[1] ?? "";

interface ListenerRecord {
  handler(event: WheelEventLike): void;
  options?: unknown;
}

interface WheelEventLike {
  deltaY: number;
  deltaMode: number;
  preventDefault(): void;
  stopPropagation(): void;
}

function makeElement(overrides: Record<string, unknown> = {}) {
  const listeners = new Map<string, ListenerRecord[]>();

  return {
    type: "text",
    value: "",
    checked: false,
    placeholder: "",
    scrollHeight: 0,
    clientHeight: 0,
    scrollTop: 0,
    classList: {
      add() {},
      remove() {},
    },
    addEventListener(type: string, handler: ListenerRecord["handler"], options?: unknown) {
      listeners.set(type, [...(listeners.get(type) ?? []), { handler, options }]);
    },
    dispatchEvent() {},
    __listeners: listeners,
    ...overrides,
  };
}

function runPreferenceScript() {
  const shortcutInput = makeElement({ type: "text" });
  const promptInput = makeElement({
    type: "textarea",
    scrollHeight: 900,
    clientHeight: 240,
  });

  const context = createContext({
    document: {
      getElementById(id: string) {
        return id === "prompt-input" ? promptInput : shortcutInput;
      },
      querySelector() {
        return null;
      },
    },
    window: {
      addEventListener() {},
    },
    Event: class Event {},
    setTimeout() {},
  });

  new Script(scriptSource).runInContext(context);

  return { promptInput };
}

describe("preference prompt editor", () => {
  it("marks the system prompt textarea as a vertical scroll container", () => {
    expect(prefHtml).toContain('id="prompt-input"');
    expect(prefHtml).toMatch(/#prompt-input\s*\{[^}]*overflow-y:\s*(auto|scroll)/s);
  });

  it("scrolls the prompt textarea from wheel input before the pane can steal it", () => {
    const { promptInput } = runPreferenceScript();
    const wheelListener = promptInput.__listeners.get("wheel")?.[0];
    let prevented = false;
    let stopped = false;

    expect(wheelListener?.options).toEqual({ passive: false });

    wheelListener?.handler({
      deltaY: 120,
      deltaMode: 0,
      preventDefault() {
        prevented = true;
      },
      stopPropagation() {
        stopped = true;
      },
    });

    expect(promptInput.scrollTop).toBe(120);
    expect(prevented).toBe(true);
    expect(stopped).toBe(true);
  });
});
