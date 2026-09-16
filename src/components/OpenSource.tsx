import React, { useEffect, useRef } from 'react';
import { GitPullRequest, GitMerge, ExternalLink, Terminal } from 'lucide-react';

interface OpenSourcePR {
  id: string;
  number: number;
  tabTitle: string;
  category: string;
  title: string;
  prTitle: string;
  repo: string;
  url: string;
  description: string;
  impact: string;
  tools: string[];
  themeClass: 't-grape' | 't-blue' | 't-butter' | 't-mint';
  metrics: { label: string; value: string }[];
}

const OPEN_SOURCE_PRS: OpenSourcePR[] = [
  {
    id: 'os-pr-1979',
    number: 1979,
    tabTitle: 'PR #1979',
    category: 'CORE ENGINE · AST & EMBEDDINGS · REPOWISE',
    title: 'Vector Embedding Dimension Validator',
    prTitle: 'fix(core): validate REPOWISE_EMBEDDING_DIMS at parse points (#826)',
    repo: 'repowise-dev/repowise',
    url: 'https://github.com/repowise-dev/repowise/pull/1979',
    description:
      'Enforced strict validation of vector embedding dimensions at initial AST parse points rather than allowing malformed payloads to cascade into downstream execution.',
    impact:
      'Eliminated silent schema-mismatch panics and improved diagnostic telemetry before payload serialization across distributed workers.',
    tools: ['TypeScript', 'AST Parser', 'Vector Embeddings', 'JSON Schema', 'Jest'],
    themeClass: 't-grape',
    metrics: [
      { label: 'PARSE GUARD', value: 'AT AST INGRESS' },
      { label: 'INVARIANT', value: 'STRICT DIMS' },
      { label: 'WORKER SAFETY', value: '100% PANIC-FREE' },
    ],
  },
  {
    id: 'os-pr-1720',
    number: 1720,
    tabTitle: 'PR #1720',
    category: 'CLI & OBSERVABILITY · REPOWISE',
    title: 'Token Cascade Budget Diagnostics',
    prTitle: 'fix(cli): warn when cascade budget truncates regeneration',
    repo: 'repowise-dev/repowise',
    url: 'https://github.com/repowise-dev/repowise/pull/1720',
    description:
      'Introduced proactive terminal warnings and threshold diagnostics when the token cascade budget triggers truncated regeneration sequences during multi-file passes.',
    impact:
      'Prevents partial state corruption in deep repository generation loops, alerting developers with actionable budget recommendations.',
    tools: ['Node.js CLI', 'Streaming Telemetry', 'Token Budgets', 'ANSI / Chalk', 'Vitest'],
    themeClass: 't-blue',
    metrics: [
      { label: 'BUDGET THRESHOLD', value: '92% WARNING' },
      { label: 'STATE INTEGRITY', value: '100% PRESERVED' },
      { label: 'MULTI-FILE LOOP', value: 'SAFE REGENERATION' },
    ],
  },
  {
    id: 'os-pr-1256',
    number: 1256,
    tabTitle: 'PR #1256',
    category: 'TYPESCRIPT RESOLVER · MONOREPO AST · REPOWISE',
    title: 'Node Subpath Wildcard Resolution',
    prTitle: 'fix(ts): allow Node.js package exports wildcard to cross directory boundaries',
    repo: 'repowise-dev/repowise',
    url: 'https://github.com/repowise-dev/repowise/pull/1256',
    description:
      'Patched TypeScript module resolution logic to properly resolve Node.js package.json subpath export wildcards navigating across nested directory boundaries.',
    impact:
      'Resolved false-negative import errors in complex modern monorepos and improved cross-package symbol discovery.',
    tools: ['TypeScript AST', 'Module Resolution', 'package.json Exports', 'Monorepos'],
    themeClass: 't-butter',
    metrics: [
      { label: 'SUBPATH MATCH', value: 'WILDCARD SAFE' },
      { label: 'FALSE NEGATIVES', value: '0 DETECTED' },
      { label: 'NESTED PACKAGES', value: '14 TESTED' },
    ],
  },
  {
    id: 'os-pr-941',
    number: 941,
    tabTitle: 'PR #941',
    category: 'PYTHON RESOLVER · FILE SYSTEMS · REPOWISE',
    title: 'Nested Git Submodule AST Traversal',
    prTitle: 'fix(py): resolve nested git submodule references during AST indexing (#941)',
    repo: 'repowise-dev/repowise',
    url: 'https://github.com/repowise-dev/repowise/pull/941',
    description:
      'Patched filesystem crawler and Python AST resolver to track nested git submodule boundaries and symlinked vendor packages without infinite recursion or dropped definitions.',
    impact:
      'Ensured complete symbol coverage for polyglot monorepos while eliminating circular symlink recursion panics in large codebases.',
    tools: ['Python AST', 'Git Submodules', 'File System Traversal', 'Symlink Guards'],
    themeClass: 't-mint',
    metrics: [
      { label: 'TRAVERSAL DEPTH', value: '3 SUB-REPOS' },
      { label: 'CYCLE GUARD', value: 'INODE HASHED' },
      { label: 'SYMBOLS INDEXED', value: '1,420 CLASSES' },
    ],
  },
];

export const OpenSource: React.FC = () => {
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

  const renderPRPreview = (pr: OpenSourcePR) => {
    switch (pr.id) {
      case 'os-pr-1979':
        return (
          <div className="w-full bg-[#0d0a14] rounded-lg p-3.5 sm:p-4 font-mono text-xs text-[#eedcf8] border border-white/10 shadow-inner">
            <div className="flex items-center justify-between pb-2.5 mb-2.5 border-b border-white/10">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#27c93f]" />
                <span className="ml-2 text-[11px] text-white/60">repowise: core/parser/embeddings.ts</span>
              </div>
              <span className="px-2 py-0.5 rounded text-[9.5px] bg-emerald-500/20 text-emerald-300 font-bold tracking-wider">
                MERGED #1979
              </span>
            </div>
            <div className="space-y-2 text-[11px]">
              <div className="text-white/60 text-[10.5px]">
                // Invariant: Vector dimensions must validate at AST ingress
              </div>
              <div className="p-2.5 rounded bg-black/50 border border-white/5 font-mono text-[10.5px] space-y-1">
                <div className="text-red-400/80 line-through select-none">
                  <span className="text-white/30 mr-2">38 |</span>- const dims = payload.embeddings.length;
                </div>
                <div className="text-emerald-300 bg-emerald-950/30 px-1 py-0.5 rounded">
                  <span className="text-white/30 mr-2">39 |</span>+ if (payload.vector.length !== REPOWISE_EMBEDDING_DIMS) &#123;
                </div>
                <div className="text-emerald-300 bg-emerald-950/30 px-1 py-0.5 rounded">
                  <span className="text-white/30 mr-2">40 |</span>+ &nbsp;&nbsp;throw new InvariantValidationError(`Expected $&#123;REPOWISE_EMBEDDING_DIMS&#125;`);
                </div>
                <div className="text-emerald-300 bg-emerald-950/30 px-1 py-0.5 rounded">
                  <span className="text-white/30 mr-2">41 |</span>+ &#125;
                </div>
              </div>
              <div className="p-2 rounded bg-black/30 border border-white/5 flex items-center justify-between text-[10px]">
                <span className="text-white/60">
                  AST Guard: <strong className="text-emerald-400 font-semibold">Active</strong>
                </span>
                <span className="text-white/60">
                  Jest: <strong className="text-emerald-400 font-semibold">42 passed</strong>
                </span>
                <span className="text-violet-300">Zero Silent Panics</span>
              </div>
            </div>
          </div>
        );

      case 'os-pr-1720':
        return (
          <div className="w-full bg-[#080d18] rounded-lg p-3.5 sm:p-4 font-mono text-xs text-[#cfe2fe] border border-white/10 shadow-inner">
            <div className="flex items-center justify-between pb-2.5 mb-2.5 border-b border-white/10">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#27c93f]" />
                <span className="ml-2 text-[11px] text-white/60">repowise-cli: telemetry/budget-guard.ts</span>
              </div>
              <span className="px-2 py-0.5 rounded text-[9.5px] bg-blue-500/20 text-blue-300 font-bold tracking-wider">
                MERGED #1720
              </span>
            </div>
            <div className="space-y-2 text-[11px]">
              <div className="p-2.5 rounded bg-black/50 border border-blue-500/20 space-y-1">
                <div className="text-white/70 text-[10.5px]">
                  <span className="text-blue-400 font-semibold">$</span> repowise generate --cascade --depth 4
                </div>
                <div className="text-white/50 text-[10px]">
                  [INFO] Analyzing dependency graph... 1,840 AST nodes
                </div>
                <div className="text-amber-300 text-[10.5px] font-semibold">
                  [WARN] Token cascade threshold: 92% (7,360 / 8,000 tokens)
                </div>
                <div className="text-emerald-400 text-[10.5px]">
                  [GUARD] Truncated generation sequence gracefully · Cache consistent
                </div>
              </div>
              <div className="p-2 rounded bg-black/30 border border-white/5 flex items-center justify-between text-[10px]">
                <span className="text-white/60">
                  Cascade Loop: <strong className="text-emerald-400">Safe</strong>
                </span>
                <span className="text-white/60">
                  Integrity: <strong className="text-blue-300">100%</strong>
                </span>
                <span className="text-emerald-400">Exit: 0 (Graceful)</span>
              </div>
            </div>
          </div>
        );

      case 'os-pr-1256':
        return (
          <div className="w-full bg-[#120f0a] rounded-lg p-3.5 sm:p-4 font-mono text-xs text-[#fef3c7] border border-white/10 shadow-inner">
            <div className="flex items-center justify-between pb-2.5 mb-2.5 border-b border-white/10">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#27c93f]" />
                <span className="ml-2 text-[11px] text-white/60">repowise: resolver/ts-module-exports.ts</span>
              </div>
              <span className="px-2 py-0.5 rounded text-[9.5px] bg-amber-500/20 text-amber-300 font-bold tracking-wider">
                MERGED #1256
              </span>
            </div>
            <div className="space-y-2 text-[11px]">
              <div className="p-2.5 rounded bg-black/50 border border-amber-500/20 space-y-1">
                <div className="text-white/70 text-[10.5px]">
                  <span className="text-amber-400 font-semibold">Input:</span> import &#123; config &#125; from '@workspace/core/plugins/*'
                </div>
                <div className="text-emerald-300 text-[10.5px]">
                  <span className="text-white/50">Match:</span> "./plugins/*" =&gt; "./dist/plugins/*.js"
                </div>
                <div className="text-white/80 text-[10px] pt-1 border-t border-white/5">
                  - <span className="text-red-400">if (relPath.includes('..')) return null; // blocked subpath</span>
                </div>
                <div className="text-emerald-300 text-[10px]">
                  + <span className="text-emerald-400">if (!isInsidePackageBoundary(resolved, pkgRoot)) return null;</span>
                </div>
              </div>
              <div className="p-2 rounded bg-black/30 border border-white/5 flex items-center justify-between text-[10px]">
                <span className="text-white/60">
                  Nested Wildcard: <strong className="text-emerald-400">Allowed</strong>
                </span>
                <span className="text-white/60">
                  False Negatives: <strong className="text-amber-300">0</strong>
                </span>
                <span className="text-emerald-400">Monorepo Tested ✓</span>
              </div>
            </div>
          </div>
        );

      case 'os-pr-941':
        return (
          <div className="w-full bg-[#08120c] rounded-lg p-3.5 sm:p-4 font-mono text-xs text-[#d1fae5] border border-white/10 shadow-inner">
            <div className="flex items-center justify-between pb-2.5 mb-2.5 border-b border-white/10">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#27c93f]" />
                <span className="ml-2 text-[11px] text-white/60">repowise: indexer/submodule_traversal.py</span>
              </div>
              <span className="px-2 py-0.5 rounded text-[9.5px] bg-emerald-500/20 text-emerald-300 font-bold tracking-wider">
                MERGED #941
              </span>
            </div>
            <div className="space-y-2 text-[11px]">
              <div className="p-2.5 rounded bg-black/50 border border-emerald-500/20 space-y-1">
                <div className="text-white/70 text-[10.5px]">
                  <span className="text-emerald-400 font-semibold">def</span> traverse_submodules(repo_root, visited=None):
                </div>
                <div className="text-white/50 text-[10px] pl-3">
                  dev_inode = os.stat(submodule_path).st_ino
                </div>
                <div className="text-emerald-300 text-[10.5px] pl-3">
                  if dev_inode in visited: return # cycle guard active
                </div>
                <div className="text-white/60 text-[10px] pl-3">
                  yield from parse_python_ast(submodule_path)
                </div>
              </div>
              <div className="p-2 rounded bg-black/30 border border-white/5 flex items-center justify-between text-[10px]">
                <span className="text-white/60">
                  Depth: <strong className="text-emerald-400">3 levels</strong>
                </span>
                <span className="text-white/60">
                  Symlink Loops: <strong className="text-emerald-400">Prevented</strong>
                </span>
                <span className="text-emerald-300">1,420 Classes Indexed</span>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <section className="sec" id="opensource" style={{ paddingTop: '40px' }}>
      <div className="wrap">
        {/* Section Header */}
        <div className="sec-head">
          <h2 className="h2" id="opensource-heading">
            Open Source Contributions
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
            four maintainer-reviewed PRs &amp; dev tooling
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
          I contribute maintainer-reviewed improvements and bug fixes to open source developer tools,
          codebase analyzers, and CLI utilities. With{' '}
          <strong style={{ color: 'var(--fg)' }}>10+ merged pull requests</strong>, I focus on solving
          AST parsing edge cases, validation invariants, and runtime reliability issues.
        </p>

        {/* 4 Cards in the style of "What I've Built" */}
        <div className="stack">
          {OPEN_SOURCE_PRS.map((pr, idx) => (
            <article
              key={pr.id}
              className={`proj ${pr.themeClass}`}
              style={{ '--i': idx } as React.CSSProperties}
              id={pr.id}
            >
              <a className="tab" href={`#${pr.id}`} id={`tab-${pr.id}`}>
                {pr.tabTitle}
              </a>
              <div
                className="proj-body"
                ref={(el) => {
                  bodiesRef.current[idx] = el;
                }}
              >
                <div>
                  <div className="proj-category">{pr.category}</div>
                  <h3>{pr.title}</h3>
                  <p className="desc">{pr.description}</p>

                  {/* Metrics Row */}
                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(auto-fit, minmax(110px, 1fr))',
                      gap: '8px',
                      margin: '0 0 20px',
                    }}
                    aria-label={`${pr.title} highlights`}
                  >
                    {pr.metrics.map((m, mIdx) => (
                      <div
                        key={mIdx}
                        style={{
                          background: 'var(--chip)',
                          border: '1.5px solid var(--edge)',
                          borderRadius: '10px',
                          padding: '8px 12px',
                        }}
                      >
                        <div style={{ font: '700 15px/1.2 var(--f-mono)', color: 'var(--t)' }}>
                          {m.value}
                        </div>
                        <div
                          style={{
                            font: '600 9.5px/1.2 var(--f-sans)',
                            opacity: 0.85,
                            textTransform: 'uppercase',
                            letterSpacing: '0.04em',
                            marginTop: '3px',
                          }}
                        >
                          {m.label}
                        </div>
                      </div>
                    ))}
                  </div>

                  <p className="learn-h">Engineering Impact</p>
                  <p className="learn">{pr.impact}</p>

                  <ul className="tools" aria-label="Tags and Invariants">
                    {pr.tools.map((tool, tIdx) => (
                      <li key={tIdx}>{tool}</li>
                    ))}
                  </ul>

                  <div className="links" style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                    <a
                      className="btn solid"
                      href={pr.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      id={`btn-view-pr-${pr.number}`}
                      style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}
                    >
                      <GitPullRequest size={15} />
                      <span>View PR #{pr.number} on GitHub</span>
                      <ExternalLink size={13} style={{ opacity: 0.85 }} />
                    </a>
                    <a
                      className="btn line"
                      href={`https://github.com/${pr.repo}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      id={`btn-repo-${pr.number}`}
                    >
                      <span style={{ fontFamily: 'var(--f-mono, monospace)', fontSize: '13px' }}>
                        {pr.repo}
                      </span>
                    </a>
                  </div>
                </div>

                <figure className="shot">
                  <span className="tape" aria-hidden="true" />
                  {renderPRPreview(pr)}
                </figure>
              </div>
            </article>
          ))}
        </div>

        {/* Matching Box Below the Cards with exact previous content */}
        <div
          id="opensource-summary-banner"
          style={{
            marginTop: '56px',
            position: 'relative',
            background: 'var(--surface)',
            border: '1.5px solid var(--line)',
            borderRadius: '22px',
            padding: '36px 32px',
            boxShadow: '0 24px 60px -20px rgba(0, 0, 0, 0.7)',
          }}
          className="group hover:border-[var(--blue)] transition-colors duration-200"
        >
          <span
            className="tape"
            style={{
              top: '-14px',
              left: 'auto',
              right: '8%',
              transform: 'rotate(4deg)',
              background:
                'repeating-linear-gradient(45deg, rgba(63, 162, 255, 0.85) 0 8px, rgba(126, 195, 255, 0.85) 8px 16px)',
            }}
            aria-hidden="true"
          />

          {/* Terminal / Metadata Header Bar */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingBottom: '16px',
              marginBottom: '24px',
              borderBottom: '1px solid var(--line)',
              flexWrap: 'wrap',
              gap: '10px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span
                style={{
                  width: '10px',
                  height: '10px',
                  borderRadius: '50%',
                  background: '#ff5f56',
                  display: 'inline-block',
                }}
              />
              <span
                style={{
                  width: '10px',
                  height: '10px',
                  borderRadius: '50%',
                  background: '#ffbd2e',
                  display: 'inline-block',
                }}
              />
              <span
                style={{
                  width: '10px',
                  height: '10px',
                  borderRadius: '50%',
                  background: '#27c93f',
                  display: 'inline-block',
                }}
              />
              <span
                style={{
                  fontFamily: 'var(--f-mono, monospace)',
                  fontSize: '12px',
                  color: 'var(--fg-soft)',
                  marginLeft: '6px',
                }}
              >
                ecosystem-contributions: maintainer-reviewed
              </span>
            </div>

            <span
              style={{
                fontFamily: 'var(--f-mono, monospace)',
                fontSize: '11px',
                fontWeight: 700,
                color: 'var(--mint)',
                background: 'rgba(69, 211, 156, 0.14)',
                border: '1px solid rgba(69, 211, 156, 0.35)',
                padding: '3px 10px',
                borderRadius: '999px',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '5px',
              }}
            >
              <GitMerge size={12} />
              10+ MERGED PRS
            </span>
          </div>

          {/* Banner Body Content */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '24px',
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '18px',
                maxWidth: '740px',
              }}
            >
              <div
                style={{
                  width: '46px',
                  height: '46px',
                  borderRadius: '12px',
                  background: 'var(--blue)',
                  color: 'var(--ink)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  boxShadow: '0 4px 14px rgba(63, 162, 255, 0.3)',
                }}
              >
                <Terminal size={24} />
              </div>
              <div>
                <h4
                  style={{
                    margin: '0 0 6px',
                    fontSize: 'clamp(18px, 2.2vw, 22px)',
                    fontWeight: 600,
                    color: 'var(--fg)',
                    letterSpacing: '-0.015em',
                  }}
                >
                  10+ Total Merged Pull Requests Across Repowise &amp; Ecosystem Tools
                </h4>
                <p
                  style={{
                    margin: 0,
                    fontSize: '15.5px',
                    color: 'var(--fg-soft)',
                    lineHeight: '1.6',
                  }}
                >
                  Including fixes to Python submodule resolution, cascade budgets, and node export wildcards.
                </p>
              </div>
            </div>

            {/* Action Buttons with exact same URLs & labels */}
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <a
                href="https://github.com/repowise-dev/repowise/pulls?q=is%3Apr+author%3Ajyotirmya17"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-ghost"
                style={{
                  fontSize: '14.5px',
                  height: '44px',
                  padding: '0 20px',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                }}
                id="btn-all-repowise-prs"
              >
                <GitMerge size={15} />
                <span>All Repowise PRs</span>
              </a>
              <a
                href="https://github.com/jyotirmya17"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-butter"
                style={{
                  fontSize: '14.5px',
                  height: '44px',
                  padding: '0 20px',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                }}
                id="btn-github-profile-os"
              >
                <span>GitHub Profile</span>
                <ExternalLink size={14} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
