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

          {/* Social Links in the form of Logos directly below the about me content */}
          <div className="about-socials" id="about-social-links" style={{ marginTop: '30px' }}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                marginBottom: '14px',
              }}
            >
              <span
                style={{
                  fontFamily: 'var(--f-mono, monospace)',
                  fontSize: '11.5px',
                  fontWeight: 700,
                  letterSpacing: '0.06em',
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
                    width: '6px',
                    height: '6px',
                    borderRadius: '50%',
                    background: 'var(--lav)',
                  }}
                  aria-hidden="true"
                />
                Social &amp; Professional Links
              </span>
              <div style={{ height: '1px', flex: 1, background: 'var(--line)', maxWidth: '140px' }} />
            </div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
                gap: '12px',
                maxWidth: '560px',
              }}
            >
              {/* LinkedIn Logo Link */}
              <a
                href="https://www.linkedin.com/in/jyotirmya-sharma-aa3485210/"
                target="_blank"
                rel="noopener noreferrer"
                id="about-link-linkedin"
                className="group social-logo-btn"
                aria-label="Jyotirmya Sharma LinkedIn Profile"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '11px 15px',
                  background: '#1d132c',
                  border: '1.5px solid var(--line)',
                  borderRadius: '14px',
                  color: 'var(--fg)',
                  textDecoration: 'none',
                  cursor: 'pointer',
                }}
              >
                <div
                  style={{
                    width: '38px',
                    height: '38px',
                    borderRadius: '10px',
                    background: '#0a66c2',
                    color: '#ffffff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    boxShadow: '0 4px 12px rgba(10, 102, 194, 0.4)',
                  }}
                  className="group-hover:scale-105 transition-transform"
                >
                  <Linkedin size={21} strokeWidth={2.3} />
                </div>
                <div style={{ minWidth: 0 }}>
                  <div
                    style={{
                      fontSize: '14px',
                      fontWeight: 700,
                      lineHeight: 1.2,
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                    }}
                  >
                    <span>LinkedIn</span>
                    <ArrowUpRight
                      size={13}
                      className="opacity-40 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all text-[var(--lav)]"
                    />
                  </div>
                  <div
                    style={{
                      fontSize: '11.5px',
                      color: 'var(--fg-soft)',
                      fontFamily: 'var(--f-mono, monospace)',
                      marginTop: '2px',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                    }}
                  >
                    /in/jyotirmya-sharma
                  </div>
                </div>
              </a>

              {/* GitHub Logo Link */}
              <a
                href="https://github.com/jyotirmya17"
                target="_blank"
                rel="noopener noreferrer"
                id="about-link-github"
                className="group social-logo-btn"
                aria-label="Jyotirmya Sharma GitHub Profile"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '11px 15px',
                  background: '#1d132c',
                  border: '1.5px solid var(--line)',
                  borderRadius: '14px',
                  color: 'var(--fg)',
                  textDecoration: 'none',
                  cursor: 'pointer',
                }}
              >
                <div
                  style={{
                    width: '38px',
                    height: '38px',
                    borderRadius: '10px',
                    background: '#24292e',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    color: '#ffffff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.5)',
                  }}
                  className="group-hover:scale-105 transition-transform"
                >
                  <Github size={21} strokeWidth={2.3} />
                </div>
                <div style={{ minWidth: 0 }}>
                  <div
                    style={{
                      fontSize: '14px',
                      fontWeight: 700,
                      lineHeight: 1.2,
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                    }}
                  >
                    <span>GitHub</span>
                    <ArrowUpRight
                      size={13}
                      className="opacity-40 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all text-[var(--lav)]"
                    />
                  </div>
                  <div
                    style={{
                      fontSize: '11.5px',
                      color: 'var(--fg-soft)',
                      fontFamily: 'var(--f-mono, monospace)',
                      marginTop: '2px',
                    }}
                  >
                    @jyotirmya17
                  </div>
                </div>
              </a>

              {/* Resume Logo Link (Opens PDF Viewer & Print Modal) */}
              <button
                type="button"
                onClick={() => setIsResumeOpen(true)}
                id="about-link-resume"
                className="group social-logo-btn"
                aria-label="View and Print Jyotirmya Sharma Resume PDF"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '11px 15px',
                  background: '#1d132c',
                  border: '1.5px solid var(--line)',
                  borderRadius: '14px',
                  color: 'var(--fg)',
                  cursor: 'pointer',
                  textAlign: 'left',
                }}
              >
                <div
                  style={{
                    width: '38px',
                    height: '38px',
                    borderRadius: '10px',
                    background: '#e11d48',
                    color: '#ffffff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    boxShadow: '0 4px 12px rgba(225, 29, 72, 0.4)',
                    position: 'relative',
                  }}
                  className="group-hover:scale-105 transition-transform"
                >
                  <FileText size={21} strokeWidth={2.3} />
                  <span
                    style={{
                      position: 'absolute',
                      bottom: '-3px',
                      right: '-4px',
                      fontSize: '8px',
                      fontWeight: 900,
                      background: '#ffffff',
                      color: '#e11d48',
                      padding: '1px 3px',
                      borderRadius: '3px',
                      lineHeight: 1,
                      fontFamily: 'var(--f-mono, monospace)',
                      boxShadow: '0 1px 3px rgba(0,0,0,0.3)',
                    }}
                  >
                    PDF
                  </span>
                </div>
                <div style={{ minWidth: 0 }}>
                  <div
                    style={{
                      fontSize: '14px',
                      fontWeight: 700,
                      lineHeight: 1.2,
                      display: 'flex',
                      alignItems: 'center',
                      gap: '5px',
                    }}
                  >
                    <span>Resume</span>
                    <span
                      style={{
                        fontSize: '9.5px',
                        padding: '1px 4px',
                        borderRadius: '4px',
                        background: 'rgba(225, 29, 72, 0.2)',
                        color: '#fb7185',
                        border: '1px solid rgba(225, 29, 72, 0.35)',
                        fontFamily: 'var(--f-mono, monospace)',
                        fontWeight: 700,
                      }}
                    >
                      PDF
                    </span>
                  </div>
                  <div
                    style={{
                      fontSize: '11.5px',
                      color: 'var(--fg-soft)',
                      fontFamily: 'var(--f-mono, monospace)',
                      marginTop: '2px',
                    }}
                  >
                    View &amp; Print PDF
                  </div>
                </div>
              </button>

              {/* Gmail Logo Link */}
              <a
                href="mailto:jyotirmya.jm@gmail.com"
                id="about-link-gmail"
                className="group social-logo-btn"
                aria-label="Send email to Jyotirmya Sharma via Gmail"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '11px 15px',
                  background: '#1d132c',
                  border: '1.5px solid var(--line)',
                  borderRadius: '14px',
                  color: 'var(--fg)',
                  textDecoration: 'none',
                  cursor: 'pointer',
                }}
              >
                <div
                  style={{
                    width: '38px',
                    height: '38px',
                    borderRadius: '10px',
                    background: '#ea4335',
                    color: '#ffffff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    boxShadow: '0 4px 12px rgba(234, 67, 53, 0.4)',
                  }}
                  className="group-hover:scale-105 transition-transform"
                >
                  <Mail size={21} strokeWidth={2.3} />
                </div>
                <div style={{ minWidth: 0 }}>
                  <div
                    style={{
                      fontSize: '14px',
                      fontWeight: 700,
                      lineHeight: 1.2,
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                    }}
                  >
                    <span>Gmail</span>
                    <ArrowUpRight
                      size={13}
                      className="opacity-40 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all text-[var(--lav)]"
                    />
                  </div>
                  <div
                    style={{
                      fontSize: '11.5px',
                      color: 'var(--fg-soft)',
                      fontFamily: 'var(--f-mono, monospace)',
                      marginTop: '2px',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                    }}
                  >
                    jyotirmya.jm@gmail.com
                  </div>
                </div>
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

