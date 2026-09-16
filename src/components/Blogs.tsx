import React, { useState } from 'react';
import { BlogPost } from '../types';
import { BLOG_POSTS } from '../data/blogsData';
import { Calendar, Clock, ArrowRight, BookOpen, Layers } from 'lucide-react';
import { AllWritingsModal } from './AllWritingsModal';

interface BlogsProps {
  onSelectPost: (post: BlogPost) => void;
}

const PIN_COLORS = ['#9f75f7', '#eab308', '#10b981'];

export const Blogs: React.FC<BlogsProps> = ({ onSelectPost }) => {
  const [isAllWritingsOpen, setIsAllWritingsOpen] = useState(false);

  // Ensure posts are sorted descending by date
  const sortedPosts = [...BLOG_POSTS].sort((a, b) => {
    return new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime();
  });

  // Display only the first 3 posts on the main portfolio page
  const displayedPosts = sortedPosts.slice(0, 3);

  return (
    <section className="sec" id="blogs" style={{ paddingTop: '40px' }}>
      <div className="wrap">
        <div className="sec-head">
          <h2 className="h2" id="blogs-heading">
            Technical Writing
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
            systems research &amp; production postmortems
          </p>
        </div>

        <p
          style={{
            maxWidth: '58ch',
            margin: '-30px 0 46px',
            fontSize: '18px',
            color: 'var(--fg-soft)',
            lineHeight: '1.6',
          }}
        >
          Original engineering writeups on distributed consensus, deterministic financial rails for AI,
          durable state machines, and benchmark calibration. Grounded in code, failure cases, and architecture.
        </p>

        {/* 3 Featured Blog Article Cards in the style of "Let's build something" */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))',
            gap: '28px',
            paddingTop: '26px',
          }}
          className="lg:grid-cols-3"
        >
          {displayedPosts.map((post, idx) => {
            const is2026 = post.year === 2026;
            const pinColor = PIN_COLORS[idx % PIN_COLORS.length];
            const pinNumber = `0${idx + 1}`;

            return (
              <article
                key={post.id}
                onClick={() => onSelectPost(post)}
                className="thread group hover:-translate-y-1.5 transition-all duration-200 cursor-pointer"
                id={`card-${post.slug}`}
                style={{
                  background: '#d4c5ea',
                  border: '1.5px solid #ab92cd',
                  color: '#180829',
                  boxShadow: '0 24px 50px -20px rgba(0, 0, 0, 0.7), 0 0 0 1px rgba(171, 146, 205, 0.35)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  minHeight: '100%',
                }}
              >
                {/* Pin comment bubble badge */}
                <span
                  className="pin-comment"
                  aria-hidden="true"
                  style={{
                    background: pinColor,
                    borderColor: '#d4c5ea',
                    color: '#180829',
                  }}
                >
                  {pinNumber}
                </span>

                <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
                  {/* Message Header (.msg) */}
                  <div
                    className="msg"
                    style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      justifyContent: 'space-between',
                      gap: '8px',
                      marginBottom: '16px',
                      flexWrap: 'wrap',
                    }}
                  >
                    <div style={{ paddingLeft: '18px' }}>
                      <b style={{ color: '#180829' }}>Jyotirmya Sharma</b>
                      <time style={{ color: '#452e60', fontSize: '13px', marginLeft: '6px' }}>
                        {post.publishDate}
                      </time>
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '4px',
                          color: '#452e60',
                          fontSize: '12px',
                          marginTop: '3px',
                        }}
                      >
                        <Clock size={11} />
                        <span>{post.readingTime}</span>
                      </div>
                    </div>

                    <span
                      style={{
                        padding: '3px 10px',
                        borderRadius: '999px',
                        fontSize: '10.5px',
                        fontWeight: 700,
                        textTransform: 'uppercase',
                        letterSpacing: '0.04em',
                        background: is2026 ? '#bea8dc' : '#a7deb9',
                        color: is2026 ? '#180829' : '#034d36',
                        border: `1px solid ${is2026 ? '#9f85c3' : '#7cc794'}`,
                        whiteSpace: 'nowrap',
                        alignSelf: 'flex-start',
                      }}
                    >
                      {post.category}
                    </span>
                  </div>

                  {/* Inner Inset Composer Box (.composer) with darker shade */}
                  <div
                    className="composer"
                    style={{
                      flex: 1,
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '10px',
                      marginBottom: '16px',
                      background: '#c0acd9',
                      border: '1.5px solid #9c82be',
                      boxShadow: 'inset 0 1px 4px rgba(40, 15, 65, 0.08)',
                    }}
                  >
                    <label
                      style={{
                        fontSize: '11px',
                        letterSpacing: '0.05em',
                        textTransform: 'uppercase',
                        color: '#3d2558',
                        margin: 0,
                        fontWeight: 700,
                      }}
                    >
                      Systems Architecture &amp; Invariants
                    </label>

                    <h3
                      style={{
                        margin: '0',
                        font: '600 18.5px/1.3 var(--f-sans)',
                        letterSpacing: '-0.015em',
                        color: '#150524',
                      }}
                      className="group-hover:text-[var(--grape)] transition-colors"
                    >
                      {post.title}
                    </h3>

                    <p
                      style={{
                        margin: '0',
                        fontSize: '13.5px',
                        lineHeight: '1.5',
                        color: '#331c4b',
                      }}
                    >
                      {post.subtitle}
                    </p>

                    {/* Tags */}
                    <div
                      style={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        gap: '5px',
                        marginTop: 'auto',
                        paddingTop: '6px',
                      }}
                    >
                      {post.tags.map((tag, tIdx) => (
                        <span
                          key={tIdx}
                          style={{
                            fontSize: '11px',
                            padding: '2px 7px',
                            borderRadius: '6px',
                            background: '#ddd0ef',
                            border: '1px solid #9c82be',
                            color: '#241038',
                            fontFamily: 'var(--f-mono)',
                            fontWeight: 500,
                          }}
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>

                    {/* Micro Invariant / Diagram Pill */}
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '8px 11px',
                        borderRadius: '8px',
                        background: '#ab95c8',
                        border: '1px solid #8e73b2',
                        fontSize: '11.5px',
                        color: '#150524',
                        marginTop: '4px',
                      }}
                    >
                      <span style={{ fontWeight: 600, display: 'flex', alignItems: 'center', gap: '5px' }}>
                        <Layers size={13} color="#451880" />
                        <span style={{ fontWeight: 700, color: '#150524' }}>{post.mermaidDiagrams.length} Diagrams</span>
                      </span>
                      <span style={{ fontFamily: 'var(--f-mono)', fontSize: '11px', color: '#331c4b' }}>
                        Verified Code &amp; Benchmarks
                      </span>
                    </div>
                  </div>
                </div>

                {/* Composer Actions (.composer-actions) */}
                <div
                  className="composer-actions"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    width: '100%',
                    marginTop: 'auto',
                    paddingTop: '6px',
                  }}
                >
                  <span
                    className="btn btn-ghost"
                    style={{
                      height: '38px',
                      fontSize: '13px',
                      padding: '0 12px',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      pointerEvents: 'none',
                      background: '#b59ecc',
                      border: '1.5px solid #9175b5',
                      color: '#180829',
                    }}
                  >
                    <BookOpen size={13} />
                    <span>Full Deep Dive</span>
                  </span>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectPost(post);
                    }}
                    className="btn btn-ink"
                    style={{
                      height: '38px',
                      fontSize: '13.5px',
                      padding: '0 16px',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      background: '#1a082e',
                      color: '#ffffff',
                      border: '1.5px solid #1a082e',
                    }}
                    id={`btn-read-${post.slug}`}
                  >
                    <span>Read Article</span>
                    <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
                  </button>
                </div>
              </article>
            );
          })}
        </div>

        {/* Matching Box Below the Cards with exact previous content */}
        <div
          id="blogs-archive-summary-box"
          style={{
            marginTop: '56px',
            position: 'relative',
            background: 'var(--surface)',
            border: '1.5px solid var(--line)',
            borderRadius: '22px',
            padding: '36px 32px',
            boxShadow: '0 24px 60px -20px rgba(0, 0, 0, 0.7)',
          }}
          className="group hover:border-[var(--lav)] transition-colors duration-200"
        >
          <span
            className="tape"
            style={{
              top: '-14px',
              left: 'auto',
              right: '8%',
              transform: 'rotate(-3deg)',
              background:
                'repeating-linear-gradient(45deg, rgba(185, 156, 255, 0.85) 0 8px, rgba(216, 196, 255, 0.85) 8px 16px)',
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
                technical-publications: systems-architecture-and-invariants
              </span>
            </div>

            <span
              style={{
                fontFamily: 'var(--f-mono, monospace)',
                fontSize: '11px',
                fontWeight: 700,
                color: 'var(--lav)',
                background: 'rgba(185, 156, 255, 0.14)',
                border: '1px solid rgba(185, 156, 255, 0.35)',
                padding: '3px 10px',
                borderRadius: '999px',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '5px',
              }}
            >
              <BookOpen size={12} />
              {sortedPosts.length} PUBLICATIONS
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
                  background: 'var(--lav)',
                  color: 'var(--ink)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  boxShadow: '0 4px 14px rgba(185, 156, 255, 0.3)',
                }}
              >
                <BookOpen size={24} />
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
                  Systems Research, Distributed Consensus &amp; AI Invariants Archive
                </h4>
                <p
                  style={{
                    margin: 0,
                    fontSize: '15.5px',
                    color: 'var(--fg-soft)',
                    lineHeight: '1.6',
                  }}
                >
                  Showing 3 of {sortedPosts.length} publications · Click to explore full archive with interactive diagrams, formal state machines, and failure postmortems.
                </p>
              </div>
            </div>

            {/* Action Buttons with exact same content */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', alignItems: 'flex-start' }}>
              <button
                type="button"
                onClick={() => setIsAllWritingsOpen(true)}
                id="btn-view-all-writings"
                className="btn btn-butter group"
                style={{
                  fontSize: '14.5px',
                  height: '44px',
                  padding: '0 24px',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                }}
              >
                <BookOpen size={16} />
                <span>View All My Writings ({sortedPosts.length})</span>
                <ArrowRight size={15} className="group-hover:translate-x-0.5 transition-transform" />
              </button>
              <span
                style={{
                  fontSize: '11.5px',
                  color: 'var(--fg-soft)',
                  fontFamily: 'var(--f-mono)',
                  paddingLeft: '4px',
                }}
              >
                Showing 3 of {sortedPosts.length} · Full archive
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* All Writings Modal */}
      <AllWritingsModal
        isOpen={isAllWritingsOpen}
        onClose={() => setIsAllWritingsOpen(false)}
        posts={sortedPosts}
        onSelectPost={onSelectPost}
      />
    </section>
  );
};
