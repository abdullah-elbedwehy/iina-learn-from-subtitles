import { useCallback, useEffect, useState } from "react";
import { demoPhases, exampleLookup } from "../content";
import "./HeroDemo.css";

const TIMELINE = [
  { id: "watch", duration: 2000 },
  { id: "trigger", duration: 1400 },
  { id: "lookup", duration: 4500 },
  { id: "resume", duration: 2300 },
] as const;

function useDemoPhase() {
  const [phaseIndex, setPhaseIndex] = useState(0);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setPhaseIndex((current) => (current + 1) % TIMELINE.length);
    }, TIMELINE[phaseIndex].duration);

    return () => window.clearTimeout(timer);
  }, [phaseIndex]);

  const goToPhase = useCallback((index: number) => {
    setPhaseIndex(index);
  }, []);

  return {
    phase: TIMELINE[phaseIndex],
    phaseIndex,
    goToPhase,
  };
}

export function HeroDemo() {
  const { phase, phaseIndex, goToPhase } = useDemoPhase();

  return (
    <div
      className="hero-demo"
      data-phase={phase.id}
      aria-label="Animated demo of Subtitle Lookup inside IINA"
    >
      <div className="hero-demo-stage" aria-hidden="true">
        <div className="iina-window">
          <div className="iina-titlebar">
            <span className="iina-dot" />
            <span className="iina-dot" />
            <span className="iina-dot" />
            <span className="iina-title">IINA · Legal drama rip</span>
            <span className="iina-playing">Playing</span>
          </div>

          <div className="iina-screen">
            <div className="iina-scene">
              <div className="iina-scene-glow" />
            </div>
            <div className="iina-subtitle-wrap">
              <span className="iina-scan-ring" aria-hidden="true" />
              <p className="iina-subtitle">"{exampleLookup.subtitle}"</p>
            </div>
            <span className="iina-paused">Paused</span>
          </div>

          <div className="iina-toolbar">
            <span className="iina-progress">
              <span className="iina-progress-fill" />
            </span>
            <span className="iina-shortcut-wrap">
              <span className="iina-shortcut-ripple" />
              <kbd className="iina-shortcut">Shift+T</kbd>
            </span>
          </div>
        </div>

        <div className="browser-window">
          <div className="browser-titlebar">
            <span />
            <span />
            <span />
            <span className="browser-tab">Google AI Mode</span>
          </div>
          <div className="browser-body">
            <p className="lookup-line lookup-original">
              <strong>Original:</strong>
              <span>"{exampleLookup.subtitle}"</span>
            </p>
            <p className="lookup-line lookup-simplified">
              <strong>Simplified:</strong>
              <span>{exampleLookup.simplified}</span>
            </p>
            <div className="lookup-line lookup-words">
              <strong>Hard words:</strong>
              <ul>
                {exampleLookup.hardWords.map((entry) => (
                  <li key={entry.term}>
                    {entry.term}: {entry.synonyms}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <p className="resume-hint">
          Close tab · press <kbd className="space-key">Space</kbd> · keep watching
        </p>
      </div>

      <ol className="hero-demo-steps" aria-label="Demo steps">
        {demoPhases.map((step, index) => (
          <li key={step.id}>
            <button
              type="button"
              className="hero-demo-step"
              data-active={index === phaseIndex}
              aria-current={index === phaseIndex ? "step" : undefined}
              aria-label={`Step ${index + 1}: ${step.label}`}
              onClick={() => goToPhase(index)}
            >
              <span>{index + 1}</span>
              <p>{step.label}</p>
            </button>
          </li>
        ))}
      </ol>
    </div>
  );
}
