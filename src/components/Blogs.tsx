import React, { useState } from 'react';
import { BlogPost } from '../types';
import { BLOG_POSTS } from '../data/blogsData';
import { Calendar, Clock, ArrowRight, BookOpen, Layers } from 'lucide-react';
import { AllWritingsModal } from './AllWritingsModal';

interface BlogsProps {
  onSelectPost: (post: BlogPost) => void;
}

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

        {/* 3 Featured Blog Article Cards */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
            gap: '24px',
          }}
        >
          {displayedPosts.map((post, idx) => {
            const is2026 = post.year === 2026;
            return (
              <article
                key={post.id}
                onClick={() => onSelectPost(post)}
                style={{
                  background: 'var(--surface)',
                  border: '1.5px solid var(--line)',
                  borderRadius: '24px',
                  padding: '30px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  cursor: 'pointer',
                  position: 'relative',
                  transition: 'transform 0.18s ease, border-color 0.18s ease, box-shadow 0.18s ease',
                  boxShadow: '0 8px 24px -12px rgba(0, 0, 0, 0.5)',
                }}
                className="hover:!border-[var(--lav)] hover:-translate-y-1 group"
                id={`card-${post.slug}`}
              >
                <div>
                  {/* Category & Date Metadata Header */}
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      gap: '8px',
                      marginBottom: '16px',
                      flexWrap: 'wrap',
                    }}
                  >
                    <span
                      style={{
                        padding: '4px 10px',
                        borderRadius: '999px',
                        fontSize: '11.5px',
                        fontWeight: 700,
                        textTransform: 'uppercase',
                        letterSpacing: '0.04em',
                        background: is2026 ? 'rgba(180, 160, 202, 0.15)' : 'rgba(128, 206, 178, 0.15)',
                        color: is2026 ? 'var(--lav)' : 'var(--mint)',
                        border: `1px solid ${is2026 ? 'rgba(180, 160, 202, 0.3)' : 'rgba(128, 206, 178, 0.3)'}`,
                      }}
                    >
                      {post.category}
                    </span>

                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                        fontSize: '12.5px',
                        color: 'var(--fg-soft)',
                      }}
                    >
                      <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <Calendar size={12} />
                        {post.publishDate}
                      </span>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <Clock size={12} />
                        {post.readingTime}
                      </span>
                    </div>
                  </div>

                  {/* Title & Subtitle */}
                  <h3
                    style={{
                      margin: '0 0 10px',
                      font: '600 21px/1.25 var(--f-sans)',
                      letterSpacing: '-0.02em',
                      color: 'var(--fg)',
                    }}
                    className="group-hover:text-[var(--lav)] transition-colors"
                  >
                    {post.title}
                  </h3>

                  <p
                    style={{
                      fontSize: '14.5px',
                      lineHeight: '1.5',
                      color: 'var(--fg-soft)',
                      margin: '0 0 16px',
                    }}
                  >
                    {post.subtitle}
                  </p>

                  {/* Tags */}
                  <div
                    style={{
                      display: 'flex',
                      flexWrap: 'wrap',
                      gap: '6px',
                      marginBottom: '20px',
                    }}
                  >
                    {post.tags.map((tag, tIdx) => (
                      <span
                        key={tIdx}
                        style={{
                          fontSize: '11.5px',
                          padding: '2px 8px',
                          borderRadius: '6px',
                          background: 'rgba(255, 255, 255, 0.04)',
                          border: '1px solid var(--line)',
                          color: '#c9bed3',
                          fontFamily: 'var(--f-mono)',
                        }}
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Footer Action Button */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    paddingTop: '16px',
                    borderTop: '1px solid rgba(255, 255, 255, 0.06)',
                  }}
                >
                  <span
                    style={{
                      fontSize: '13.5px',
                      fontWeight: 600,
                      color: 'var(--lav)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                    }}
                    className="group-hover:translate-x-1 transition-transform"
                  >
                    <span>Read Article</span>
                    <ArrowRight size={14} />
                  </span>

                  <span
                    style={{
                      fontSize: '11.5px',
                      fontFamily: 'var(--f-mono)',
                      color: 'var(--fg-soft)',
                    }}
                  >
                    {post.mermaidDiagrams.length} Diagrams · Code
                  </span>
                </div>
              </article>
            );
          })}
        </div>

        {/* Action Button: View All My Writings */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: '44px',
            gap: '12px',
          }}
        >
          <button
            type="button"
            onClick={() => setIsAllWritingsOpen(true)}
            id="btn-view-all-writings"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '12px',
              padding: '14px 32px',
              borderRadius: '999px',
              background: 'linear-gradient(135deg, rgba(180, 160, 202, 0.18) 0%, rgba(30, 18, 50, 0.85) 100%)',
              border: '1.5px solid var(--lav)',
              color: '#f6f1fb',
              fontSize: '15.5px',
              fontWeight: 600,
              cursor: 'pointer',
              boxShadow: '0 8px 24px -6px rgba(180, 160, 202, 0.28), 0 0 0 1px rgba(180, 160, 202, 0.1)',
              transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
            }}
            className="hover:scale-[1.03] hover:shadow-[0_12px_32px_rgba(180,160,202,0.4)] hover:border-[#dfd0f2] active:scale-[0.98] group"
          >
            <BookOpen size={18} color="var(--lav)" className="group-hover:rotate-6 transition-transform" />
            <span>View All My Writings ({sortedPosts.length})</span>
            <ArrowRight size={17} className="group-hover:translate-x-1 transition-transform" />
          </button>
          <span style={{ fontSize: '12.5px', color: 'var(--fg-soft)', fontFamily: 'var(--f-mono)' }}>
            Showing 3 of {sortedPosts.length} publications · Click to explore full archive
          </span>
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
