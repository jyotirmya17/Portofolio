import React from 'react';

export const About: React.FC = () => {
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
    </section>
  );
};
