import "./App.css";
import "./mobile.css";
import { DemoVideoPlayer } from "./components/DemoVideoPlayer";
import { HeroDemo } from "./components/HeroDemo";
import { MobileNav } from "./components/MobileNav";
import {
  demoVideo,
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
        <pre>{`Original: "{{subtitle}}"\nSimplified: ...\nHard words:\n- churned: mixed hard, beat\n- crawled out: climbed out`}</pre>
      </div>
    </div>
  );
}

function App() {
  return (
    <main>
      <div className="site-nav-wrap">
        <header className="site-nav" aria-label="Main navigation">
          <a className="brand" href="#top" aria-label="Subtitle Lookup home">
            <span>
              Subtitle Lookup
              <small>for IINA</small>
            </span>
          </a>
          <nav className="site-nav-links" aria-label="Site sections">
            {navLinks.map((link) => (
              <a key={link.href} href={link.href}>
                {link.label}
              </a>
            ))}
          </nav>
          <MobileNav />
        </header>
      </div>

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
            {featureNotes.map((note) => (
              <li key={note}>{note}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section story-section" id="watch">
        <div className="story-copy">
          <p className="eyebrow">{storyCopy.eyebrow}</p>
          <h2>{storyCopy.headline}</h2>
          <p>{storyCopy.body}</p>
        </div>
        <div className="story-media">
          <DemoVideoPlayer src={demoVideo.src} title={demoVideo.title} caption={demoVideo.caption} />
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
        </div>
      </section>

      <section className="section output-section" id="output">
        <div className="output-copy">
          <p className="eyebrow">What you get back</p>
          <h2>Same format every time. No surprises.</h2>
          <p>
            Not a chat thread, not a wall of text. The AI rewrites the line in plain English, then lists the hard words
            with simple synonyms — short enough to read before you press space.
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
            Everything lives in IINA → Settings → Plugins → Subtitle Lookup. No accounts, no API keys, nothing going
            through a server I control. The plugin just builds a URL and opens it.
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
          <p>Grab the release if you just want it working. Clone and build if you're curious how it's put together.</p>
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
        <p>Made by <a href={githubUrl}>Abdullah Elbedwehy</a> — an Egyptian learning English through movies.</p>
        <a href={`${githubUrl}/releases`}>Download on GitHub</a>
      </footer>

      <div className="mobile-install-bar">
        <a className="button primary" href={`${githubUrl}/releases`}>
          Get the plugin
        </a>
      </div>
    </main>
  );
}

export default App;
