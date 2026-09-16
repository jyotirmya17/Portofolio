import React, { useEffect } from 'react';
import { BlogPost } from '../types';
import {
  X,
  BookOpen,
  Calendar,
  Clock,
  ArrowRight,
  Layers,
  Sparkles,
} from 'lucide-react';

interface AllWritingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  posts: BlogPost[];
  onSelectPost: (post: BlogPost) => void;
}

// Distinct signature palette per blog topic to bring vibrant, purposeful color
const POST_COLOR_THEMES: Record<
  string,
  {
    accent: string;
    accentRgb: string;
    badgeBg: string;
    badgeBorder: string;
    badgeText: string;
    tagBg: string;
    tagBorder: string;
    tagText: string;
    cardBorderHover: string;
    cardShadowHover: string;
    gradientGlow: string;
    btnBg: string;
    btnHoverBg: string;
    btnText: string;
  }
> = {
  'b-agent-governance': {
    accent: '#c49cf5',
    accentRgb: '196, 156, 245',
    badgeBg: 'rgba(196, 156, 245, 0.16)',
    badgeBorder: 'rgba(196, 156, 245, 0.4)',
    badgeText: '#dfccfa',
    tagBg: 'rgba(196, 156, 245, 0.08)',
    tagBorder: 'rgba(196, 156, 245, 0.2)',
    tagText: '#d8c2f8',
    cardBorderHover: 'rgba(196, 156, 245, 0.65)',
    cardShadowHover: '0 16px 40px -10px rgba(196, 156, 245, 0.32)',
    gradientGlow:
      'radial-gradient(circle at 10% 10%, rgba(196, 156, 245, 0.12) 0%, transparent 60%)',
    btnBg: 'rgba(196, 156, 245, 0.14)',
    btnHoverBg: '#c49cf5',
    btnText: '#c49cf5',
  },
  'b-distributed-state': {
    accent: '#80ceb2',
    accentRgb: '128, 206, 178',
    badgeBg: 'rgba(128, 206, 178, 0.16)',
    badgeBorder: 'rgba(128, 206, 178, 0.4)',
    badgeText: '#aef0d9',
    tagBg: 'rgba(128, 206, 178, 0.08)',
    tagBorder: 'rgba(128, 206, 178, 0.2)',
    tagText: '#b0f1da',
    cardBorderHover: 'rgba(128, 206, 178, 0.65)',
    cardShadowHover: '0 16px 40px -10px rgba(128, 206, 178, 0.32)',
    gradientGlow:
      'radial-gradient(circle at 10% 10%, rgba(128, 206, 178, 0.12) 0%, transparent 60%)',
    btnBg: 'rgba(128, 206, 178, 0.14)',
    btnHoverBg: '#80ceb2',
    btnText: '#80ceb2',
  },
  'b-reliable-workflows': {
    accent: '#74c0fc',
    accentRgb: '116, 192, 252',
    badgeBg: 'rgba(116, 192, 252, 0.16)',
    badgeBorder: 'rgba(116, 192, 252, 0.4)',
    badgeText: '#bfe4ff',
    tagBg: 'rgba(116, 192, 252, 0.08)',
    tagBorder: 'rgba(116, 192, 252, 0.2)',
    tagText: '#bfe4ff',
    cardBorderHover: 'rgba(116, 192, 252, 0.65)',
    cardShadowHover: '0 16px 40px -10px rgba(116, 192, 252, 0.32)',
    gradientGlow:
      'radial-gradient(circle at 10% 10%, rgba(116, 192, 252, 0.12) 0%, transparent 60%)',
    btnBg: 'rgba(116, 192, 252, 0.14)',
    btnHoverBg: '#74c0fc',
    btnText: '#74c0fc',
  },
  'b-evaluating-ai': {
    accent: '#ffd447',
    accentRgb: '255, 212, 71',
    badgeBg: 'rgba(255, 212, 71, 0.16)',
    badgeBorder: 'rgba(255, 212, 71, 0.4)',
    badgeText: '#ffec99',
    tagBg: 'rgba(255, 212, 71, 0.08)',
    tagBorder: 'rgba(255, 212, 71, 0.2)',
    tagText: '#ffec99',
    cardBorderHover: 'rgba(255, 212, 71, 0.65)',
    cardShadowHover: '0 16px 40px -10px rgba(255, 212, 71, 0.32)',
    gradientGlow:
      'radial-gradient(circle at 10% 10%, rgba(255, 212, 71, 0.12) 0%, transparent 60%)',
    btnBg: 'rgba(255, 212, 71, 0.14)',
    btnHoverBg: '#ffd447',
    btnText: '#ffd447',
  },
};

const DEFAULT_THEME = {
  accent: '#c49cf5',
  accentRgb: '196, 156, 245',
  badgeBg: 'rgba(196, 156, 245, 0.16)',
  badgeBorder: 'rgba(196, 156, 245, 0.4)',
  badgeText: '#dfccfa',
  tagBg: 'rgba(196, 156, 245, 0.08)',
  tagBorder: 'rgba(196, 156, 245, 0.2)',
  tagText: '#d8c2f8',
  cardBorderHover: 'rgba(196, 156, 245, 0.65)',
  cardShadowHover: '0 16px 40px -10px rgba(196, 156, 245, 0.32)',
  gradientGlow:
    'radial-gradient(circle at 10% 10%, rgba(196, 156, 245, 0.12) 0%, transparent 60%)',
  btnBg: 'rgba(196, 156, 245, 0.14)',
  btnHoverBg: '#c49cf5',
  btnText: '#c49cf5',
};

export const AllWritingsModal: React.FC<AllWritingsModalProps> = ({
  isOpen,
  onClose,
  posts,
  onSelectPost,
}) => {
  // Prevent background body scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [isOpen]);

  // Handle Escape key to close
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="all-writings-title"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        background: 'rgba(7, 4, 15, 0.88)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px 16px',
        animation: 'fadeIn 0.2s ease-out',
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '1020px',
          maxHeight: '90vh',
          background: 'linear-gradient(180deg, #170f26 0%, #0e0817 100%)',
          border: '1.5px solid rgba(180, 160, 202, 0.22)',
          borderRadius: '24px',
          boxShadow:
            '0 28px 80px -15px rgba(0, 0, 0, 0.9), 0 0 0 1px rgba(180, 160, 202, 0.12)',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          animation: 'scaleUp 0.22s ease-out',
          position: 'relative',
        }}
      >
        {/* Vibrant Multi-Color Accent Strip at the Top */}
        <div
          style={{
            height: '3px',
            width: '100%',
            background:
              'linear-gradient(90deg, #c49cf5 0%, #80ceb2 33%, #74c0fc 66%, #ffd447 100%)',
            flexShrink: 0,
          }}
        />

        {/* Modal Header */}
        <div
          style={{
            padding: '24px 30px 20px',
            borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
            background:
              'radial-gradient(ellipse 60% 80% at 50% 0%, rgba(180, 160, 202, 0.12), transparent 80%)',
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
            gap: '16px',
            flexShrink: 0,
          }}
        >
          <div>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '4px 12px',
                borderRadius: '999px',
                background: 'rgba(180, 160, 202, 0.14)',
                border: '1px solid rgba(180, 160, 202, 0.32)',
                color: 'var(--lav)',
                fontSize: '11.5px',
                fontFamily: 'var(--f-mono)',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.06em',
                marginBottom: '10px',
              }}
            >
              <Sparkles size={13} color="#ffd447" />
              <span>Technical Publications &amp; Research</span>
              <span style={{ opacity: 0.5 }}>•</span>
              <span style={{ color: '#80ceb2' }}>{posts.length} Articles</span>
            </div>

            <h2
              id="all-writings-title"
              style={{
                margin: '0 0 6px',
                font: '700 25px/1.2 var(--f-sans)',
                letterSpacing: '-0.025em',
                color: '#ffffff',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
              }}
            >
              All Published Writings
            </h2>

            <p
              style={{
                margin: 0,
                fontSize: '14.5px',
                color: 'var(--fg-soft)',
                lineHeight: '1.5',
              }}
            >
              Deep-dive essays on distributed consensus, financial agent rails, fault tolerance,
              and benchmark evaluation.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close modal"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '40px',
              height: '40px',
              borderRadius: '12px',
              border: '1px solid rgba(180, 160, 202, 0.25)',
              background: 'rgba(255, 255, 255, 0.05)',
              color: 'var(--fg-soft)',
              cursor: 'pointer',
              flexShrink: 0,
              transition: 'all 0.18s ease',
            }}
            className="hover:text-white hover:border-[#c49cf5] hover:bg-[rgba(196,156,245,0.2)] hover:scale-105"
          >
            <X size={20} />
          </button>
        </div>

        {/* Scrollable Blog Cards Grid - Clean, Direct, and Colorful (No Filters) */}
        <div
          style={{
            padding: '28px 30px',
            overflowY: 'auto',
            flex: 1,
          }}
        >
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(390px, 1fr))',
              gap: '22px',
            }}
          >
            {posts.map((post) => {
              const theme = POST_COLOR_THEMES[post.id] || DEFAULT_THEME;

              return (
                <article
                  key={post.id}
                  onClick={() => {
                    onClose();
                    onSelectPost(post);
                  }}
                  style={{
                    background: '#130c20',
                    backgroundImage: theme.gradientGlow,
                    border: '1.5px solid rgba(255, 255, 255, 0.08)',
                    borderRadius: '20px',
                    padding: '24px 26px',
                    cursor: 'pointer',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    position: 'relative',
                    transition:
                      'transform 0.2s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.2s ease, box-shadow 0.2s ease',
                    boxShadow: '0 8px 24px -10px rgba(0, 0, 0, 0.6)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = theme.cardBorderHover;
                    e.currentTarget.style.boxShadow = theme.cardShadowHover;
                    e.currentTarget.style.transform = 'translateY(-3px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.08)';
                    e.currentTarget.style.boxShadow = '0 8px 24px -10px rgba(0, 0, 0, 0.6)';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                  id={`all-writings-card-${post.slug}`}
                >
                  <div>
                    {/* Top Row: Colorful Category Pill & Publish Info */}
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        gap: '10px',
                        marginBottom: '14px',
                        flexWrap: 'wrap',
                      }}
                    >
                      <span
                        style={{
                          padding: '4px 11px',
                          borderRadius: '999px',
                          fontSize: '11px',
                          fontWeight: 700,
                          textTransform: 'uppercase',
                          letterSpacing: '0.05em',
                          background: theme.badgeBg,
                          color: theme.badgeText,
                          border: `1px solid ${theme.badgeBorder}`,
                          boxShadow: `0 0 14px -3px rgba(${theme.accentRgb}, 0.3)`,
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
                          <Calendar size={12} style={{ color: theme.accent, opacity: 0.8 }} />
                          {post.publishDate}
                        </span>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                          <Clock size={12} style={{ opacity: 0.7 }} />
                          {post.readingTime}
                        </span>
                      </div>
                    </div>

                    {/* Post Title */}
                    <h3
                      style={{
                        margin: '0 0 10px',
                        font: '600 19px/1.3 var(--f-sans)',
                        letterSpacing: '-0.015em',
                        color: '#ffffff',
                        transition: 'color 0.15s ease',
                      }}
                    >
                      {post.title}
                    </h3>

                    {/* Post Subtitle */}
                    <p
                      style={{
                        fontSize: '13.5px',
                        lineHeight: '1.55',
                        color: 'var(--fg-soft)',
                        margin: '0 0 18px',
                      }}
                    >
                      {post.subtitle}
                    </p>
                  </div>

                  {/* Card Bottom: Tags, Diagrams, & Colorful Action Button */}
                  <div>
                    {/* Tags */}
                    <div
                      style={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        gap: '6px',
                        marginBottom: '16px',
                      }}
                    >
                      {post.tags.slice(0, 4).map((tag, tIdx) => (
                        <span
                          key={tIdx}
                          style={{
                            fontSize: '11px',
                            padding: '3px 8px',
                            borderRadius: '6px',
                            background: theme.tagBg,
                            border: `1px solid ${theme.tagBorder}`,
                            color: theme.tagText,
                            fontFamily: 'var(--f-mono)',
                            fontWeight: 500,
                          }}
                        >
                          #{tag}
                        </span>
                      ))}
                      {post.tags.length > 4 && (
                        <span
                          style={{
                            fontSize: '11px',
                            padding: '3px 6px',
                            color: 'var(--fg-soft)',
                            fontFamily: 'var(--f-mono)',
                          }}
                        >
                          +{post.tags.length - 4} more
                        </span>
                      )}
                    </div>

                    {/* Footer Row: Diagram count & CTA Button */}
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        paddingTop: '14px',
                        borderTop: '1px solid rgba(255, 255, 255, 0.06)',
                        gap: '12px',
                        flexWrap: 'wrap',
                      }}
                    >
                      <span
                        style={{
                          fontSize: '12px',
                          fontFamily: 'var(--f-mono)',
                          color: 'var(--fg-soft)',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '6px',
                        }}
                      >
                        <Layers size={13} style={{ color: theme.accent }} />
                        <span>{post.mermaidDiagrams.length} Mermaid Diagrams</span>
                      </span>

                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          onClose();
                          onSelectPost(post);
                        }}
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '6px',
                          fontSize: '13px',
                          fontWeight: 600,
                          color: theme.btnText,
                          background: theme.btnBg,
                          border: `1.5px solid ${theme.badgeBorder}`,
                          padding: '7px 15px',
                          borderRadius: '10px',
                          cursor: 'pointer',
                          transition: 'all 0.18s ease',
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = theme.btnHoverBg;
                          e.currentTarget.style.color = '#0e0817';
                          e.currentTarget.style.borderColor = theme.btnHoverBg;
                          e.currentTarget.style.transform = 'translateX(2px)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = theme.btnBg;
                          e.currentTarget.style.color = theme.btnText;
                          e.currentTarget.style.borderColor = theme.badgeBorder;
                          e.currentTarget.style.transform = 'translateX(0)';
                        }}
                      >
                        <span>Read Full Essay</span>
                        <ArrowRight size={14} />
                      </button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>

        {/* Modal Footer */}
        <div
          style={{
            padding: '14px 30px',
            borderTop: '1px solid rgba(255, 255, 255, 0.08)',
            background: 'rgba(0, 0, 0, 0.2)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            fontSize: '12.5px',
            color: 'var(--fg-soft)',
            flexShrink: 0,
          }}
        >
          <span>
            Displaying all <strong style={{ color: '#ffffff' }}>{posts.length}</strong> technical
            publications
          </span>
          <span style={{ fontFamily: 'var(--f-mono)', fontSize: '11px', opacity: 0.7 }}>
            Press <kbd style={{ padding: '2px 6px', borderRadius: '4px', background: 'rgba(255,255,255,0.08)' }}>Esc</kbd> to close
          </span>
        </div>
      </div>
    </div>
  );
};
