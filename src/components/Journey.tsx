import React from 'react';
import { JOURNEY_ITEMS } from '../data';

export const Journey: React.FC = () => {
  return (
    <section className="sec" id="journey">
      <div className="wrap vh">
        <div className="vh-side">
          <h2 className="h2" style={{ marginBottom: '22px' }} id="journey-heading">
            How I got here
          </h2>
          <p>
            I didn't start out thinking about distributed systems or AI infrastructure. I just kept
            building things, breaking them, and becoming increasingly curious about what was happening
            underneath.
          </p>
        </div>

        <div className="panel" id="journey-panel">
          <div className="panel-top">
            <span>Jyotirmya's journey</span>
            <small>5 versions</small>
          </div>

          {JOURNEY_ITEMS.map((item, idx) => {
            if (item.isCurrent) {
              return (
                <div
                  key={idx}
                  className="ver ver-static"
                  style={{ '--c': item.colorVar } as React.CSSProperties}
                >
                  <div className="head">
                    <span className="role">
                      {item.role} · {item.org} <span className="badge">Current</span>
                    </span>
                    <span className="when">{item.year}</span>
                  </div>
                  <p className="mt-3 mb-1 text-[15.5px] leading-relaxed text-[#d6ccdf]">
                    {item.changes[0]}
                  </p>
                  {item.secondary && (
                    <div className="text-[13.5px] font-mono text-cyan-300/80 mb-2">
                      Focus: {item.secondary}
                    </div>
                  )}
                  {item.tools && (
                    <ul className="tools" aria-label="Stack" style={{ marginTop: '14px' }}>
                      {item.tools.map((tool, tIdx) => (
                        <li key={tIdx}>{tool}</li>
                      ))}
                    </ul>
                  )}
                </div>
              );
            }

            return (
              <details
                key={idx}
                className="ver"
                style={{ '--c': item.colorVar } as React.CSSProperties}
                open={item.isOpen}
              >
                <summary>
                  <span className="role">{item.role}</span>
                  <span className="when">{item.when}</span>
                  <span className="org">{item.org}</span>
                  <span className="tog">
                    <span className="o">Show changes</span>
                    <span className="c">Hide changes</span>
                  </span>
                </summary>
                <ul className="changes">
                  {item.changes.map((change, cIdx) => (
                    <li key={cIdx}>{change}</li>
                  ))}
                </ul>
                {item.tools && (
                  <ul className="tools" aria-label="Stack">
                    {item.tools.map((tool, tIdx) => (
                      <li key={tIdx}>{tool}</li>
                    ))}
                  </ul>
                )}
              </details>
            );
          })}
        </div>
      </div>
    </section>
  );
};
