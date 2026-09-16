import React, { useEffect, useRef } from 'react';
import { PROJECTS } from '../data';
import { Project } from '../types';

interface ProjectsProps {
  onInspectArchitecture?: (projectId: string) => void;
}

export const Projects: React.FC<ProjectsProps> = ({ onInspectArchitecture }) => {
  const bodiesRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    function equalize() {
      const bodies = bodiesRef.current.filter(Boolean) as HTMLDivElement[];
      bodies.forEach((b) => (b.style.minHeight = ''));
      if (window.innerWidth <= 760) return;
      const bar = 64;
      const avail = window.innerHeight - bar - 40;
      let maxH = 0;
      bodies.forEach((b) => {
        maxH = Math.max(maxH, b.offsetHeight);
      });
      if (avail > 280) maxH = Math.min(maxH, avail);
      bodies.forEach((b) => {
        b.style.minHeight = `${maxH}px`;
      });
    }

    equalize();
    window.addEventListener('resize', equalize);
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(equalize);
    }
    return () => {
      window.removeEventListener('resize', equalize);
    };
  }, []);

  const renderProjectPreview = (proj: Project) => {
    switch (proj.id) {
      case 'p-governor':
        return (
          <div className="w-full bg-[#0b0a11] rounded-lg p-4 font-mono text-xs text-[#dcd1ea] border border-white/10 shadow-inner">
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/10">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#27c93f]" />
                <span className="ml-2 text-[11px] text-white/50">spend-governor-daemon: v1.4.2</span>
              </div>
              <span className="px-2 py-0.5 rounded text-[10px] bg-emerald-500/20 text-emerald-400 font-semibold">
                SECURE
              </span>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-white/70">
                <span>PAYOUT_REQ: #TX-9042</span>
                <span className="text-cyan-400">RazorpayX Test Gateway</span>
              </div>
              <div className="p-2.5 rounded bg-black/40 border border-white/5 space-y-1.5">
                <div className="flex items-center gap-2">
                  <span className="text-emerald-400 font-bold">✓</span>
                  <span className="text-white/80">Deterministic Cap:</span>
                  <span className="text-white ml-auto">₹45,000 / ₹1,00,000 daily</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-emerald-400 font-bold">✓</span>
                  <span className="text-white/80">Isolation Forest Anomaly Score:</span>
                  <span className="text-emerald-300 ml-auto">0.038 (Clean)</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-emerald-400 font-bold">✓</span>
                  <span className="text-white/80">Instruction Provenance:</span>
                  <span className="text-violet-300 ml-auto">sha256:7f4a8b... validated</span>
                </div>
              </div>
              <div className="pt-2 text-[11px] flex justify-between items-center text-white/60">
                <span>Idempotency Key: <code className="text-amber-300">IDEM-8319-LOCK</code></span>
                <span className="text-emerald-400 font-semibold">DISBURSED · 12ms</span>
              </div>
            </div>
          </div>
        );

      case 'p-quorum':
        return (
          <div className="w-full bg-[#090b14] rounded-lg p-4 font-mono text-xs text-[#cce2ff] border border-white/10 shadow-inner">
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/10">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#27c93f]" />
                <span className="ml-2 text-[11px] text-white/50">quorum-cluster: N=5, R=2, W=2</span>
              </div>
              <span className="px-2 py-0.5 rounded text-[10px] bg-blue-500/20 text-blue-400 font-semibold">
                SYNCED
              </span>
            </div>
            <div className="grid grid-cols-3 gap-2 mb-3 text-center text-[11px]">
              <div className="p-2 rounded bg-blue-950/40 border border-blue-500/20">
                <div className="text-blue-400 font-bold">Node 1 (Leader)</div>
                <div className="text-white/60">Token: 0x1A4F</div>
                <div className="text-emerald-400 text-[10px]">Active · Lamport 284</div>
              </div>
              <div className="p-2 rounded bg-blue-950/40 border border-blue-500/20">
                <div className="text-blue-400 font-bold">Node 2 (Replica)</div>
                <div className="text-white/60">Token: 0x5D88</div>
                <div className="text-emerald-400 text-[10px]">Active · Lamport 284</div>
              </div>
              <div className="p-2 rounded bg-blue-950/40 border border-blue-500/20">
                <div className="text-blue-400 font-bold">Node 3 (Replica)</div>
                <div className="text-white/60">Token: 0x92BC</div>
                <div className="text-amber-400 text-[10px]">Read Repair OK</div>
              </div>
            </div>
            <div className="p-2 rounded bg-black/40 border border-white/5 text-[11px] space-y-1">
              <div className="text-white/80">Protobuf TCP Payload: <span className="text-blue-300">OP_PUT(k="session_store", v="q_active")</span></div>
              <div className="text-emerald-400">Quorum Achieved (2/2 acks in 2.1ms) · Consistent Hash Match</div>
            </div>
          </div>
        );

      case 'p-linklytics':
      case 'p-hireflow':
        return (
          <div className="w-full bg-[#0e0c15] rounded-lg p-3.5 sm:p-4 font-mono text-xs text-[#fef1d6] border border-white/10 shadow-inner">
            <div className="flex items-center justify-between pb-2.5 mb-2.5 border-b border-white/10">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#27c93f]" />
                <span className="ml-2 text-[11px] text-white/70 font-semibold">linklytics: production-dashboard</span>
              </div>
              <span className="px-2 py-0.5 rounded text-[9.5px] bg-emerald-500/20 text-emerald-400 font-bold tracking-wider flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                LIVE
              </span>
            </div>

            <div className="space-y-2 text-[10.5px]">
              {/* TRAFFIC */}
              <div className="p-2 rounded bg-black/40 border border-white/5 space-y-1">
                <div className="text-[10px] font-bold tracking-wider text-amber-300 uppercase">
                  TRAFFIC
                </div>
                <div className="grid grid-cols-2 gap-x-3 gap-y-0.5 text-white/80">
                  <div className="flex justify-between">
                    <span className="text-white/50">Requests</span>
                    <span className="font-semibold text-white">10,284 concurrent</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/50">Throughput</span>
                    <span className="font-semibold text-emerald-400">18.7K req/s</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/50">P95 Latency</span>
                    <span className="font-semibold text-emerald-400">18ms</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/50">Success Rate</span>
                    <span className="font-semibold text-emerald-400">99.94%</span>
                  </div>
                </div>
              </div>

              {/* REDIRECT PATH & ANALYTICS */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {/* REDIRECT PATH */}
                <div className="p-2 rounded bg-black/40 border border-amber-500/20 space-y-1">
                  <div className="flex items-center justify-between text-[10px] font-bold tracking-wider text-amber-300 uppercase">
                    <span>REDIRECT PATH</span>
                    <span className="text-[9px] px-1 py-0.5 rounded bg-amber-500/20 text-amber-300 font-normal">GET /r/7xK2</span>
                  </div>
                  <div className="space-y-0.5 text-[10px]">
                    <div className="flex justify-between">
                      <span className="text-white/50">Status</span>
                      <span className="font-semibold text-emerald-400">302 ✓</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/50">Cache</span>
                      <span className="font-semibold text-amber-200">HIT</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/50">Latency</span>
                      <span className="font-bold text-emerald-400">11ms</span>
                    </div>
                  </div>
                </div>

                {/* ANALYTICS */}
                <div className="p-2 rounded bg-black/40 border border-white/5 space-y-1">
                  <div className="text-[10px] font-bold tracking-wider text-sky-300 uppercase">
                    ANALYTICS
                  </div>
                  <div className="space-y-0.5 text-[10px]">
                    <div className="flex justify-between">
                      <span className="text-white/50">Events</span>
                      <span className="font-semibold text-sky-300">ASYNC</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/50">Queue Lag</span>
                      <span className="font-semibold text-white/90">42ms</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/50">Processing</span>
                      <span className="font-semibold text-emerald-400">18.2K events/s</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* PAYMENTS & (SUBSCRIPTION + OBSERVABILITY) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {/* PAYMENTS */}
                <div className="p-2 rounded bg-black/40 border border-white/5 space-y-1">
                  <div className="text-[10px] font-bold tracking-wider text-purple-300 uppercase">
                    PAYMENTS
                  </div>
                  <div className="space-y-0.5 text-[10px]">
                    <div className="flex justify-between">
                      <span className="text-white/50">Razorpay</span>
                      <span className="text-emerald-400 font-semibold">CONNECTED ✓</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/50">Webhook</span>
                      <span className="text-emerald-400 font-semibold">HMAC-SHA256 ✓</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/50">Idempotency</span>
                      <span className="text-emerald-400 font-semibold">PASSED ✓</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/50">Replay</span>
                      <span className="text-emerald-400 font-semibold">SAFE ✓</span>
                    </div>
                  </div>
                </div>

                {/* SUBSCRIPTION & OBSERVABILITY */}
                <div className="p-2 rounded bg-black/40 border border-white/5 space-y-1.5">
                  <div>
                    <div className="text-[10px] font-bold tracking-wider text-amber-300 uppercase">
                      SUBSCRIPTION
                    </div>
                    <div className="space-y-0.5 text-[10px] pt-0.5">
                      <div className="flex justify-between">
                        <span className="text-white/50">State</span>
                        <span className="text-emerald-400 font-semibold">ACTIVE</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-white/50">Transitions</span>
                        <span className="text-emerald-400 font-semibold">VALIDATED ✓</span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-1 border-t border-white/5">
                    <div className="text-[10px] font-bold tracking-wider text-emerald-400 uppercase">
                      OBSERVABILITY
                    </div>
                    <div className="space-y-0.5 text-[10px] pt-0.5">
                      <div className="flex justify-between">
                        <span className="text-white/50">Errors</span>
                        <span className="text-emerald-400 font-semibold">0.06%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-white/50">Health</span>
                        <span className="text-emerald-400 font-bold">ALL SYSTEMS OPERATIONAL</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'p-collabcode':
        return (
          <div className="w-full bg-[#0a120e] rounded-lg p-4 font-mono text-xs text-[#d1fae5] border border-white/10 shadow-inner">
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/10">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#27c93f]" />
                <span className="ml-2 text-[11px] text-white/50">collabcode: cluster-prod-aws-ecs</span>
              </div>
              <span className="px-2 py-0.5 rounded text-[10px] bg-emerald-500/20 text-emerald-300 font-semibold">
                3 PEERS CONNECTED
              </span>
            </div>
            <div className="p-2.5 rounded bg-black/40 border border-white/5 text-[11.5px] leading-relaxed space-y-1">
              <div><span className="text-white/40">1 |</span> <span className="text-emerald-400">template</span> &lt;<span className="text-cyan-300">typename</span> T&gt;</div>
              <div><span className="text-white/40">2 |</span> <span className="text-purple-400">class</span> <span className="text-amber-300">LockFreeQueue</span> &#123;</div>
              <div><span className="text-white/40">3 |</span>   <span className="text-purple-400">std::atomic</span>&lt;Node*&gt; head, tail; <span className="bg-emerald-500/30 text-emerald-200 px-1 py-0.5 rounded text-[10px] ml-2">Cursor: Dev_B</span></div>
              <div><span className="text-white/40">4 |</span> &#125;;</div>
            </div>
            <div className="pt-2 text-[11px] flex justify-between text-white/60">
              <span>Socket.io State Sync · Conflict Free</span>
              <span className="text-emerald-300 font-semibold">Roundtrip: 14ms</span>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <section className="sec" id="work" style={{ paddingTop: '40px' }}>
      <div className="wrap">
        <div className="sec-head">
          <h2 className="h2" id="work-heading">
            Things I've built
          </h2>
          <p className="note">
            <svg
              viewBox="0 0 50 34"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M46 28C34 30 18 26 8 10" />
              <path d="M4 18l3-10 10 2" />
            </svg>
            four systems, experiments &amp; infrastructure
          </p>
        </div>

        <p
          style={{
            maxWidth: '56ch',
            margin: '-30px 0 50px',
            fontSize: '18px',
            color: 'var(--fg-soft)',
            lineHeight: '1.6',
          }}
        >
          A few systems, products, and experiments I've spent an unreasonable amount of time thinking about.
        </p>

        <div className="stack">
          {PROJECTS.map((proj, idx) => (
            <article
              key={proj.id}
              className={`proj ${proj.themeClass}`}
              style={{ '--i': idx } as React.CSSProperties}
              id={proj.id}
            >
              <a className="tab" href={`#${proj.id}`}>
                {proj.tabTitle}
              </a>
              <div
                className="proj-body"
                ref={(el) => {
                  bodiesRef.current[idx] = el;
                }}
              >
                <div>
                  <div className="proj-category">{proj.category}</div>
                  <h3>{proj.title}</h3>
                  <p className="desc">{proj.description}</p>
                  {(proj.id === 'p-linklytics' || proj.id === 'p-hireflow') && (
                    <div
                      style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(110px, 1fr))',
                        gap: '8px',
                        margin: '0 0 20px',
                      }}
                      aria-label="LinkLytics metrics"
                    >
                      <div
                        style={{
                          background: 'var(--chip)',
                          border: '1.5px solid var(--edge)',
                          borderRadius: '10px',
                          padding: '8px 12px',
                        }}
                      >
                        <div style={{ font: '700 16px/1.2 var(--f-mono)', color: 'var(--t)' }}>10K+</div>
                        <div
                          style={{
                            font: '600 10px/1.2 var(--f-sans)',
                            opacity: 0.85,
                            textTransform: 'uppercase',
                            letterSpacing: '0.04em',
                            marginTop: '3px',
                          }}
                        >
                          CONCURRENT REQUESTS
                        </div>
                      </div>
                      <div
                        style={{
                          background: 'var(--chip)',
                          border: '1.5px solid var(--edge)',
                          borderRadius: '10px',
                          padding: '8px 12px',
                        }}
                      >
                        <div style={{ font: '700 16px/1.2 var(--f-mono)', color: 'var(--t)' }}>&lt;20ms</div>
                        <div
                          style={{
                            font: '600 10px/1.2 var(--f-sans)',
                            opacity: 0.85,
                            textTransform: 'uppercase',
                            letterSpacing: '0.04em',
                            marginTop: '3px',
                          }}
                        >
                          P95 REDIRECT LATENCY
                        </div>
                      </div>
                      <div
                        style={{
                          background: 'var(--chip)',
                          border: '1.5px solid var(--edge)',
                          borderRadius: '10px',
                          padding: '8px 12px',
                        }}
                      >
                        <div style={{ font: '700 16px/1.2 var(--f-mono)', color: 'var(--t)' }}>99.9%</div>
                        <div
                          style={{
                            font: '600 10px/1.2 var(--f-sans)',
                            opacity: 0.85,
                            textTransform: 'uppercase',
                            letterSpacing: '0.04em',
                            marginTop: '3px',
                          }}
                        >
                          REQUEST SUCCESS RATE
                        </div>
                      </div>
                    </div>
                  )}
                  <p className="learn-h">What I learned</p>
                  <p className="learn">{proj.learned}</p>
                  <ul className="tools" aria-label="Built with">
                    {proj.tools.map((tool, tIdx) => (
                      <li key={tIdx}>{tool}</li>
                    ))}
                  </ul>
                  <div className="links" style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                    <a
                      className="btn solid"
                      href={proj.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      id={`link-code-${proj.id}`}
                    >
                      View code on GitHub
                    </a>
                    {(proj.id === 'p-governor' || proj.id === 'p-quorum') && onInspectArchitecture && (
                      <button
                        type="button"
                        onClick={() => onInspectArchitecture(proj.id)}
                        className="btn ghost"
                        style={{
                          background: 'rgba(255, 255, 255, 0.08)',
                          border: '1.5px solid var(--line)',
                          color: 'var(--fg)',
                          cursor: 'pointer',
                        }}
                        id={`btn-inspect-${proj.id}`}
                      >
                        Inspect Architecture
                      </button>
                    )}
                  </div>
                </div>

                <figure className="shot">
                  <span className="tape" aria-hidden="true" />
                  {renderProjectPreview(proj)}
                </figure>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
