import "./App.css";
import { HeroDemo } from "./components/HeroDemo";
import {
  exampleLookup,
  featureNotes,
  flowSteps,
  githubUrl,
  heroCopy,
  installSteps,
  navLinks,
  providers,
  storyCopy,
} from "./content";

function SettingsMock() {
  return (
    <div className="settings-mock" aria-label="Preview of the IINA plugin settings panel">
      <div className="settings-row">
        <p className="settings-label">AI Provider</p>
        <div className="settings-options">
          <span className="is-active">Google AI Mode</span>
          <span>Perplexity</span>
          <span>Claude</span>
          <span>ChatGPT</span>
          <span>Grok</span>
        </div>
      </div>
      <div className="settings-row">
        <p className="settings-label">Keyboard Shortcut</p>
        <kbd>Shift+T</kbd>
      </div>
      <div className="settings-row">
        <p className="settings-label">Pause video when triggered</p>
        <span className="settings-toggle is-on">On</span>
      </div>
      <div className="settings-row">
        <p className="settings-label">Recent subtitle lines</p>
        <span className="settings-value">5</span>
      </div>
      <div className="settings-row settings-row-wide">
        <p className="settings-label">System Prompt</p>
        <pre>{`Original: "{{subtitle}}"\nSimplified: ...\nHard words:\n- charge: accusation, case`}</pre>
      </div>
    </div>
  );
}

function App() {
  return (
    <main>
      <header className="site-nav" aria-label="Main navigation">
        <a className="brand" href="#top" aria-label="Subtitle Lookup home">
          <img className="brand-logo" src="/iina-logo.png" alt="" width={38} height={38} />
          <span>
            Subtitle Lookup
            <small>for IINA</small>
          </span>
        </a>
        <nav>
          {navLinks.map((link) => (
            <a key={link.href} href={link.href}>
              {link.label}
            </a>
          ))}
        </nav>
      </header>

      <section className="hero" id="top">
        <div className="hero-demo-wrap" id="demo">
          <HeroDemo />
        </div>

        <div className="hero-copy">
          <p className="eyebrow">{heroCopy.eyebrow}</p>
          <h1>{heroCopy.headline}</h1>
          <p className="hero-lede">{heroCopy.lede}</p>
          <div className="hero-actions">
            <a className="button primary" href={`${githubUrl}/releases`}>
              Get the plugin
            </a>
            <a className="button secondary" href={githubUrl}>
              View on GitHub
            </a>
          </div>
          <ul className="hero-trust">
            {featureNotes.slice(0, 3).map((note) => (
              <li key={note}>{note}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section story-section">
        <div className="story-copy">
          <p className="eyebrow">{storyCopy.eyebrow}</p>
          <h2>{storyCopy.headline}</h2>
          <p>{storyCopy.body}</p>
        </div>
        <ol className="flow-list">
          {flowSteps.map((step, index) => (
            <li key={step.title}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <div>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section className="section output-section" id="output">
        <div className="output-copy">
          <p className="eyebrow">What you get back</p>
          <h2>The plugin asks the AI for this exact shape.</h2>
          <p>
            Not a chat thread. Not a dictionary dump. A short rewrite of the line, then the hard words with simpler
            synonyms you can remember before you hit space again.
          </p>
        </div>
        <article className="output-panel" aria-label="Example lookup output">
          <p>
            <strong>Original</strong>
            <span>"{exampleLookup.subtitle}"</span>
          </p>
          <p>
            <strong>Simplified</strong>
            <span>{exampleLookup.simplified}</span>
          </p>
          <div>
            <strong>Hard words</strong>
            <ul>
              {exampleLookup.hardWords.map((entry) => (
                <li key={entry.term}>
                  <em>{entry.term}</em>: {entry.synonyms}
                </li>
              ))}
            </ul>
          </div>
        </article>
      </section>

      <section className="section settings-section">
        <div className="settings-copy">
          <p className="eyebrow">Inside IINA</p>
          <h2>Pick the AI, tune the prompt, set your shortcut.</h2>
          <p>
            Everything lives in IINA → Settings → Plugins → Subtitle Lookup. No accounts wired into the plugin. It
            just opens a URL with your query.
          </p>
          <div className="provider-strip">
            {providers.map((provider) => (
              <span key={provider}>{provider}</span>
            ))}
          </div>
        </div>
        <SettingsMock />
      </section>

      <section className="section install-section" id="install">
        <div className="install-copy">
          <p className="eyebrow">Install</p>
          <h2>Requires IINA 1.4+ on macOS.</h2>
          <p>Use a packaged release when you can. Build from source if you prefer.</p>
        </div>

        <div className="install-grid">
          <article>
            <h3>{installSteps.release.title}</h3>
            <ol>
              {installSteps.release.steps.map((step) => (
                <li key={step}>{step}</li>
              ))}
            </ol>
            <a className="button primary" href={`${githubUrl}/releases`}>
              Open releases
            </a>
          </article>

          <article>
            <h3>{installSteps.source.title}</h3>
            <pre>
              <code>{installSteps.source.commands}</code>
            </pre>
            <p>{installSteps.source.note}</p>
          </article>
        </div>
      </section>

      <footer className="site-footer">
        <p>Built by Abdullah Elbedwehy for movie English learners.</p>
        <a href={githubUrl}>Star it on GitHub</a>
      </footer>
    </main>
  );
}

export default App;
