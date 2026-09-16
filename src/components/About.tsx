import React, { useState } from 'react';
import { Linkedin, Github, Mail, FileText, ArrowUpRight } from 'lucide-react';
import { ResumeModal } from './ResumeModal';

export const About: React.FC = () => {
  const [isResumeOpen, setIsResumeOpen] = useState(false);

  const careItems = [
    { title: 'Systems that fail gracefully', desc: 'Reliability is a feature.' },
    { title: 'Simple interfaces, complex engineering', desc: "Hide the complexity, don't ignore it." },
    { title: 'AI that actually works', desc: 'Less prompting. More engineering.' },
    { title: 'Understanding the why', desc: "I'd rather understand a system than memorize its API." },
    { title: 'Shipping', desc: 'Ideas are useful. Running software is better.' },
  ];

  return (
    <section className="sec" id="about">
      <div className="wrap about">
        <div>
          <p className="note" style={{ transform: 'rotate(-2deg)', marginBottom: '18px' }}>
            about me
          </p>
          <h2 className="statement" id="about-heading">
            I like building things that look simple from the outside and interesting underneath.
          </h2>
          <div className="about-copy">
            <p>
              I'm a software engineer who enjoys working close to the backend — designing APIs, thinking
              about concurrency, debugging failures, and figuring out what happens when systems stop
              behaving perfectly.
            </p>
            <p style={{ marginTop: '16px' }}>
              I've built everything from distributed key-value stores in C++ to AI systems and production
              backend services. More recently, I've been exploring the harder side of AI engineering:
              making agents reliable, observable, secure, and safe enough to interact with real systems.
            </p>
            <p style={{ marginTop: '16px' }}>
              I care less about using the newest technology and more about understanding why a system works,
              where it breaks, and how to make it better.
            </p>
          </div>

          {/* Simple, monotonous social links with respective logos */}
          <div className="about-socials" id="about-social-links" style={{ marginTop: '26px' }}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                marginBottom: '12px',
              }}
            >
              <span
                style={{
                  fontFamily: 'var(--f-mono, monospace)',
                  fontSize: '11px',
                  fontWeight: 700,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  color: 'var(--lav)',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                }}
              >
                <span
                  style={{
                    display: 'inline-block',
                    width: '5px',
                    height: '5px',
                    borderRadius: '50%',
                    background: 'var(--lav)',
                  }}
                  aria-hidden="true"
                />
                Connect &amp; Socials
              </span>
              <div style={{ height: '1px', flex: 1, background: 'var(--line)', maxWidth: '120px' }} />
            </div>

            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '10px',
                alignItems: 'center',
              }}
            >
              {/* LinkedIn Monotone Logo Link */}
              <a
                href="https://www.linkedin.com/in/jyotirmya-sharma-aa3485210/"
                target="_blank"
                rel="noopener noreferrer"
                id="about-link-linkedin"
                className="monotone-social-btn"
                aria-label="LinkedIn Profile"
                title="LinkedIn: /in/jyotirmya-sharma"
              >
                <Linkedin size={18} strokeWidth={2} />
                <span>LinkedIn</span>
                <ArrowUpRight size={13} className="arrow-hint" />
              </a>

              {/* GitHub Monotone Logo Link */}
              <a
                href="https://github.com/jyotirmya17"
                target="_blank"
                rel="noopener noreferrer"
                id="about-link-github"
                className="monotone-social-btn"
                aria-label="GitHub Profile"
                title="GitHub: @jyotirmya17"
              >
                <Github size={18} strokeWidth={2} />
                <span>GitHub</span>
                <ArrowUpRight size={13} className="arrow-hint" />
              </a>

              {/* Resume Monotone Logo Button */}
              <button
                type="button"
                onClick={() => setIsResumeOpen(true)}
                id="about-link-resume"
                className="monotone-social-btn"
                aria-label="View Resume PDF"
                title="Resume (View & Print PDF)"
              >
                <FileText size={18} strokeWidth={2} />
                <span>Resume</span>
                <span className="monotone-badge">PDF</span>
              </button>

              {/* Gmail Monotone Logo Link */}
              <a
                href="mailto:jyotirmya.jm@gmail.com"
                id="about-link-gmail"
                className="monotone-social-btn"
                aria-label="Send Email via Gmail"
                title="Email: jyotirmya.jm@gmail.com"
              >
                <Mail size={18} strokeWidth={2} />
                <span>Gmail</span>
                <ArrowUpRight size={13} className="arrow-hint" />
              </a>
            </div>
          </div>
        </div>

        <div className="board-note">
          <div className="sticky" id="sticky-note-care">
            <span className="tape" aria-hidden="true" />
            <h3>Things I care about</h3>
            <ul>
              {careItems.map((item, idx) => (
                <li key={idx}>
                  <span className="val-title">{item.title}</span>
                  <span className="val-desc">{item.desc}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="chips">
            <span className="chip">B.E. CS @ BIT Mesra</span>
            <span className="chip">ULTRATEND</span>
            <span className="chip">Distributed Systems · Backend · AI Infra</span>
          </div>
        </div>
      </div>

      {/* Verified Resume Modal (attached PDF viewer + printer) */}
      <ResumeModal isOpen={isResumeOpen} onClose={() => setIsResumeOpen(false)} />
    </section>
  );
};

