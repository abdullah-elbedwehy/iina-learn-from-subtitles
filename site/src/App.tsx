import "./App.css";
import heroImage from "./assets/hero-subtitle-lookup.png";
import { exampleLookup, featureNotes, flowSteps, githubUrl, navLinks, providers } from "./content";

function AnimatedWorkflow() {
  return (
    <div className="workflow" aria-label="Animated preview of the subtitle lookup workflow">
      <div className="workflow-screen">
        <div className="workflow-bar">
          <span />
          <span />
          <span />
        </div>
        <div className="movie-frame">
          <div className="scene-light" />
          <div className="subtitle-bubble">"a charge of malicious prosecution"</div>
          <div className="pause-pill">Paused</div>
        </div>
        <div className="player-controls" aria-hidden="true">
          <span />
          <strong>Shift+T</strong>
          <span />
        </div>
      </div>

      <div className="workflow-answer">
        <div className="answer-spark">*</div>
        <p className="answer-label">AI vocabulary helper</p>
        <h3>{exampleLookup.word}</h3>
        <p>{exampleLookup.context}</p>
        <div className="answer-tags">
          {exampleLookup.synonyms.map((synonym) => (
            <span key={synonym}>{synonym}</span>
          ))}
        </div>
      </div>

      <ol className="workflow-status">
        <li>1. Subtitle appears</li>
        <li>2. Shift+T pauses IINA</li>
        <li>3. AI opens the explanation</li>
      </ol>
    </div>
  );
}

function App() {
  return (
    <main>
      <header className="site-nav" aria-label="Main navigation">
        <a className="brand" href="#top" aria-label="Subtitle Lookup home">
          <span className="brand-mark">S</span>
          <span>Subtitle Lookup</span>
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
        <div className="hero-copy">
          <p className="eyebrow">IINA plugin for movie English</p>
          <h1>Learn English from the subtitle on screen.</h1>
          <p className="hero-lede">
            Press a shortcut while watching in IINA. The video pauses, your current subtitle becomes context,
            and your chosen AI opens with a simple vocabulary explanation.
          </p>
          <div className="hero-actions">
            <a className="button primary" href="#install">
              Install from releases
            </a>
            <a className="button secondary" href={githubUrl}>
              View on GitHub
            </a>
          </div>
          <div className="hero-proof">
            <span>No plugin server</span>
            <span>Editable prompt</span>
            <span>Provider choice</span>
          </div>
        </div>

        <div className="mobile-first-flow" aria-label="Quick workflow preview">
          <AnimatedWorkflow />
        </div>

        <div className="hero-media" aria-label="Generated product visual of subtitle lookup in IINA">
          <img src={heroImage} alt="A macOS-style media player with a subtitle lookup assistant panel" />
        </div>
      </section>

      <section className="section intro-section" id="how-it-works">
        <div className="section-heading">
          <p className="eyebrow">How it works</p>
          <h2>One shortcut, one clear explanation.</h2>
        </div>
        <div className="steps-grid">
          {flowSteps.map((step, index) => (
            <article className="step" key={step.title}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section experience-section">
        <div className="experience-copy">
          <p className="eyebrow">The extension idea</p>
          <h2>It keeps the learning moment attached to the movie.</h2>
          <p>
            Instead of switching apps, guessing the word, or losing the scene, the plugin sends the subtitle line
            as context. The answer can focus on meaning, tone, example usage, and synonyms.
          </p>
        </div>
        <AnimatedWorkflow />
      </section>

      <section className="section example-section" id="example">
        <div className="example-card">
          <div>
            <p className="eyebrow">Real lookup shape</p>
            <h2>From a hard phrase to a useful meaning.</h2>
          </div>
          <blockquote>"{exampleLookup.subtitle}"</blockquote>
          <dl>
            <div>
              <dt>In context</dt>
              <dd>{exampleLookup.context}</dd>
            </div>
            <div>
              <dt>Word</dt>
              <dd>{exampleLookup.word}</dd>
            </div>
            <div>
              <dt>Synonyms</dt>
              <dd>{exampleLookup.synonyms.join(", ")}</dd>
            </div>
          </dl>
        </div>
      </section>

      <section className="section features-section" aria-label="Plugin features">
        <div className="feature-copy">
          <p className="eyebrow">Small plugin, useful controls</p>
          <h2>Choose the AI and tune the prompt.</h2>
          <p>
            Keep it simple, or customize the system prompt for Arabic explanations, shorter answers, slang notes,
            or a specific study format.
          </p>
        </div>
        <div className="feature-panel">
          <div className="provider-list">
            {providers.map((provider) => (
              <span key={provider}>{provider}</span>
            ))}
          </div>
          <ul>
            {featureNotes.map((note) => (
              <li key={note}>{note}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section install-section" id="install">
        <div>
          <p className="eyebrow">Install</p>
          <h2>Try it in IINA.</h2>
          <p>
            Use a packaged release when it is available, or build from source and place the plugin folder in IINA's
            plugins directory.
          </p>
        </div>
        <div className="install-panel">
          <a className="button primary" href={`${githubUrl}/releases`}>
            Get the latest release
          </a>
          <pre>
            <code>{`npm install
npm run build`}</code>
          </pre>
          <p>Then place the folder in IINA's plugin directory and restart IINA.</p>
        </div>
        <div className="demo-note">
          <strong>Demo video coming soon</strong>
          <span>You can add your short walkthrough here later without redesigning the page.</span>
        </div>
      </section>
    </main>
  );
}

export default App;
