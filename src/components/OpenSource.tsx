import React from 'react';
import { GitPullRequest, GitMerge, ExternalLink, Sparkles, CheckCircle2, Terminal } from 'lucide-react';

interface PullRequestItem {
  number: number;
  title: string;
  repo: string;
  tag: string;
  url: string;
  description: string;
  impact: string;
}

const FEATURED_PRS: PullRequestItem[] = [
  {
    number: 1979,
    title: 'fix(core): validate REPOWISE_EMBEDDING_DIMS at parse points (#826)',
    repo: 'repowise-dev/repowise',
    tag: 'Core / Parser & Embeddings',
    url: 'https://github.com/repowise-dev/repowise/pull/1979',
    description:
      'Enforced strict validation of vector embedding dimensions at initial AST parse points rather than allowing malformed payloads to cascade into downstream execution.',
    impact:
      'Eliminated silent schema-mismatch panics and improved diagnostic telemetry before payload serialization across distributed workers.',
  },
  {
    number: 1720,
    title: 'fix(cli): warn when cascade budget truncates regeneration',
    repo: 'repowise-dev/repowise',
    tag: 'CLI & Observability',
    url: 'https://github.com/repowise-dev/repowise/pull/1720',
    description:
      'Introduced proactive terminal warnings and threshold diagnostics when the token cascade budget triggers truncated regeneration sequences during multi-file passes.',
    impact:
      'Prevents partial state corruption in deep repository generation loops, alerting developers with actionable budget recommendations.',
  },
  {
    number: 1256,
    title: 'fix(ts): allow Node.js package exports wildcard to cross directory boundaries',
    repo: 'repowise-dev/repowise',
    tag: 'TypeScript Resolver & AST',
    url: 'https://github.com/repowise-dev/repowise/pull/1256',
    description:
      'Patched TypeScript module resolution logic to properly resolve Node.js package.json subpath export wildcards navigating across nested directory boundaries.',
    impact:
      'Resolved false-negative import errors in complex modern monorepos and improved cross-package symbol discovery.',
  },
];

export const OpenSource: React.FC = () => {
  return (
    <section className="sec" id="opensource" style={{ paddingTop: '60px', paddingBottom: '70px' }}>
      <div className="wrap">
        {/* Section Header */}
        <div style={{ marginBottom: '36px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
            <p className="note" style={{ transform: 'rotate(-2deg)', margin: 0 }}>
              community &amp; developer tooling
            </p>
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                background: 'rgba(139, 143, 255, 0.12)',
                border: '1px solid rgba(139, 143, 255, 0.35)',
                color: 'var(--lav)',
                fontSize: '13px',
                fontWeight: 600,
                padding: '3px 10px',
                borderRadius: '999px',
              }}
            >
              <GitMerge size={13} />
              10+ Merged PRs
            </span>
          </div>

          <h2 className="h2" style={{ fontSize: 'clamp(34px, 4.5vw, 52px)', marginBottom: '16px' }} id="opensource-heading">
            Open Source Contributions
          </h2>

          <p
            style={{
              color: 'var(--fg-soft)',
              fontSize: '18px',
              lineHeight: '1.65',
              maxWidth: '820px',
              margin: 0,
            }}
          >
            I contribute maintainer-reviewed improvements and bug fixes to open source developer tools,
            codebase analyzers, and CLI utilities. With{' '}
            <strong style={{ color: 'var(--fg)' }}>10+ merged pull requests</strong>, I focus on solving
            AST parsing edge cases, validation invariants, and runtime reliability issues.
          </p>
        </div>

        {/* PR Highlights Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '22px',
            marginBottom: '36px',
          }}
        >
          {FEATURED_PRS.map((pr) => (
            <article
              key={pr.number}
              id={`pr-card-${pr.number}`}
              style={{
                background: 'var(--surface)',
                border: '1.5px solid var(--line)',
                borderRadius: '18px',
                padding: '24px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                transition: 'transform 0.18s ease, border-color 0.18s ease, box-shadow 0.18s ease',
              }}
              className="group hover:border-[var(--blue)] hover:translate-y-[-3px]"
            >
              <div>
                {/* PR Meta Badges */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: '16px',
                    gap: '8px',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '5px',
                        background: 'rgba(69, 211, 156, 0.15)',
                        border: '1px solid rgba(69, 211, 156, 0.4)',
                        color: 'var(--mint)',
                        fontSize: '12.5px',
                        fontWeight: 600,
                        padding: '3px 9px',
                        borderRadius: '6px',
                      }}
                    >
                      <GitMerge size={12} />
                      Merged #{pr.number}
                    </span>
                    <span
                      style={{
                        fontSize: '13px',
                        color: 'var(--fg-soft)',
                        fontFamily: 'var(--f-mono, monospace)',
                      }}
                    >
                      {pr.repo}
                    </span>
                  </div>

                  <span
                    style={{
                      fontSize: '12px',
                      color: 'var(--lav)',
                      background: 'rgba(139, 143, 255, 0.1)',
                      padding: '2px 8px',
                      borderRadius: '4px',
                      fontWeight: 500,
                    }}
                  >
                    {pr.tag}
                  </span>
                </div>

                {/* PR Title */}
                <h3
                  style={{
                    fontSize: '17.5px',
                    fontWeight: 600,
                    lineHeight: '1.45',
                    color: 'var(--fg)',
                    marginBottom: '14px',
                    fontFamily: 'var(--f-mono, monospace)',
                  }}
                >
                  {pr.title}
                </h3>

                {/* 2-3 Liner Description */}
                <p
                  style={{
                    fontSize: '15px',
                    lineHeight: '1.6',
                    color: 'var(--fg-soft)',
                    marginBottom: '12px',
                  }}
                >
                  {pr.description}
                </p>

                {/* Engineering Impact */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '8px',
                    background: 'rgba(255, 255, 255, 0.03)',
                    border: '1px solid rgba(255, 255, 255, 0.06)',
                    borderRadius: '10px',
                    padding: '10px 12px',
                    marginBottom: '20px',
                  }}
                >
                  <CheckCircle2
                    size={15}
                    style={{ color: 'var(--mint)', marginTop: '3px', flexShrink: 0 }}
                  />
                  <span
                    style={{
                      fontSize: '13.5px',
                      color: '#c2bbcb',
                      lineHeight: '1.5',
                    }}
                  >
                    {pr.impact}
                  </span>
                </div>
              </div>

              {/* Action Button: View on GitHub for the exact PR */}
              <div>
                <a
                  href={pr.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  id={`btn-view-pr-${pr.number}`}
                  className="btn btn-ink"
                  style={{
                    width: '100%',
                    justifyContent: 'center',
                    fontSize: '14.5px',
                    height: '42px',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                  }}
                >
                  <GitPullRequest size={15} />
                  <span>View PR #{pr.number} on GitHub</span>
                  <ExternalLink size={14} style={{ opacity: 0.8 }} />
                </a>
              </div>
            </article>
          ))}
        </div>

        {/* Global PRs Banner / Summary Link */}
        <div
          style={{
            background: 'linear-gradient(135deg, rgba(63, 162, 255, 0.08) 0%, rgba(139, 143, 255, 0.05) 100%)',
            border: '1.5px dashed rgba(63, 162, 255, 0.35)',
            borderRadius: '16px',
            padding: '20px 24px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '16px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div
              style={{
                width: '42px',
                height: '42px',
                borderRadius: '10px',
                background: 'var(--blue)',
                color: 'var(--ink)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}
            >
              <Terminal size={22} />
            </div>
            <div>
              <h4 style={{ margin: 0, fontSize: '16.5px', fontWeight: 600, color: 'var(--fg)' }}>
                10+ Total Merged Pull Requests Across Repowise &amp; Ecosystem Tools
              </h4>
              <p style={{ margin: 0, fontSize: '14px', color: 'var(--fg-soft)', marginTop: '2px' }}>
                Including fixes to Python submodule resolution, cascade budgets, and node export wildcards.
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '12px' }}>
            <a
              href="https://github.com/repowise-dev/repowise/pulls?q=is%3Apr+author%3Ajyotirmya17"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-ghost"
              style={{ fontSize: '14px', height: '40px' }}
              id="btn-all-repowise-prs"
            >
              <GitMerge size={14} />
              <span>All Repowise PRs</span>
            </a>
            <a
              href="https://github.com/jyotirmya17"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-butter"
              style={{ fontSize: '14px', height: '40px' }}
              id="btn-github-profile-os"
            >
              <span>GitHub Profile</span>
              <ExternalLink size={14} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
