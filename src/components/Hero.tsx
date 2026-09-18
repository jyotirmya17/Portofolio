import React from 'react';

interface HeroProps {
  onCopyEmail: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onCopyEmail }) => {
  const keywords = [
    'distributed systems',
    'backend',
    'AI',
    'reliability',
    'infrastructure',
    'distributed systems',
    'backend',
    'AI',
    'reliability',
    'infrastructure',
  ];

  return (
    <>
      <section className="hero" id="top">
        <div className="wrap">
          <p className="status" id="hero-status">
            <i aria-hidden="true" />
            Currently building &amp; exploring
          </p>

          <div>
            <div className="name-wrap" id="hero-name-container">
              <h1 className="name" id="hero-title">
                <span>Jyotirmya</span>
                <span>Sharma</span>
                <span className="sr-only">, software engineer</span>
              </h1>
              <div className="sel" aria-hidden="true">
                <b />
                <b />
                <b />
                <b />
              </div>
              <span className="sel-tag" aria-hidden="true">
                Software Engineer
              </span>
              <p className="hi" aria-hidden="true">
                <span>hi, that's me!</span>
                <svg
                  viewBox="0 0 60 44"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M48 6c-8 6-22 18-34 26" />
                  <path d="M13 22l1 11 11-3" />
                </svg>
              </p>
              <span className="cursor c-sanika" aria-hidden="true">
                <span className="cur-in">
                  <svg viewBox="0 0 22 24">
                    <path
                      d="M2 1.5v19l5.2-4.6 3.6 7.6 3.3-1.5-3.6-7.5h7z"
                      fill="#3FA2FF"
                      stroke="#fff"
                      strokeWidth="1.6"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <span className="lbl">jyotirmya</span>
                </span>
              </span>
            </div>
          </div>

          <p className="lede" id="hero-lede">
            <strong>
              <span className="highlight">Backend-focused.</span>{' '}
              <span className="highlight">Systems-minded.</span>
            </strong>{' '}
            I build software that works when things go wrong.
            <span
              style={{
                display: 'block',
                marginTop: '12px',
                fontSize: '0.92em',
                lineHeight: '1.55',
                color: 'var(--fg-soft)',
              }}
            >
              I'm a B.Tech CSE student at BIT Mesra, currently building distributed systems, backend
              infrastructure, and AI-powered products.
            </span>
          </p>

          <div className="cta" id="hero-cta-group">
            <a className="btn btn-ink" href="#work" id="btn-see-work">
              See what I've built
            </a>
            <button className="btn btn-ghost" type="button" onClick={onCopyEmail} id="btn-say-hello">
              Say hello
            </button>
          </div>
        </div>

        {/* Floating collaborative cursors matching reference */}
        <span className="cursor float c-front" aria-hidden="true">
          <span className="cur-in">
            <svg viewBox="0 0 22 24">
              <path
                d="M2 1.5v19l5.2-4.6 3.6 7.6 3.3-1.5-3.6-7.5h7z"
                fill="#8B8FFF"
                stroke="#fff"
                strokeWidth="1.6"
                strokeLinejoin="round"
              />
            </svg>
            <span className="lbl">distributed systems</span>
          </span>
        </span>

        <span className="cursor float c-product" aria-hidden="true">
          <span className="cur-in">
            <svg viewBox="0 0 22 24">
              <path
                d="M2 1.5v19l5.2-4.6 3.6 7.6 3.3-1.5-3.6-7.5h7z"
                fill="#FFD447"
                stroke="#fff"
                strokeWidth="1.6"
                strokeLinejoin="round"
              />
            </svg>
            <span className="lbl">backend-focused</span>
          </span>
        </span>

        <span className="cursor float c-stack" aria-hidden="true">
          <span className="cur-in">
            <svg viewBox="0 0 22 24">
              <path
                d="M2 1.5v19l5.2-4.6 3.6 7.6 3.3-1.5-3.6-7.5h7z"
                fill="#45D39C"
                stroke="#fff"
                strokeWidth="1.6"
                strokeLinejoin="round"
              />
            </svg>
            <span className="lbl">reliability-first</span>
          </span>
        </span>
      </section>

      {/* Scrolling keywords marquee matching user specification */}
      <div className="ticker-wrap" aria-label="Key areas of focus">
        <div className="ticker-content">
          {keywords.map((word, i) => (
            <span key={i}>{word}</span>
          ))}
          {keywords.map((word, i) => (
            <span key={`dup-${i}`}>{word}</span>
          ))}
        </div>
      </div>
    </>
  );
};
