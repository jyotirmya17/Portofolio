import React, { useState, useEffect, useRef } from 'react';
import { BlogPost } from '../types';
import { MermaidDiagram } from './MermaidDiagram';
import { MarkdownProse, renderInline } from './MarkdownProse';
import {
  X,
  ArrowLeft,
  Calendar,
  Clock,
  Tag,
  Copy,
  Check,
  Share2,
  ExternalLink,
  ChevronRight,
  BookOpen,
  Layers,
  AlertTriangle,
  Lightbulb,
} from 'lucide-react';

interface BlogReaderModalProps {
  post: BlogPost | null;
  onClose: () => void;
  onSelectPost: (post: BlogPost) => void;
  allPosts: BlogPost[];
}

export const BlogReaderModal: React.FC<BlogReaderModalProps> = ({
  post,
  onClose,
  onSelectPost,
  allPosts,
}) => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [copiedCode, setCopiedCode] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('intro');
  const contentRef = useRef<HTMLDivElement>(null);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  // Lock body scroll when open
  useEffect(() => {
    if (post) {
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [post]);

  // Handle scroll progress tracking
  const handleScroll = () => {
    if (!contentRef.current) return;
    const { scrollTop, scrollHeight, clientHeight } = contentRef.current;
    const total = scrollHeight - clientHeight;
    if (total > 0) {
      setScrollProgress(Math.min(100, Math.max(0, (scrollTop / total) * 100)));
    }

    // Determine active section for TOC
    const headings = contentRef.current.querySelectorAll<HTMLElement>('[data-section]');
    let current = 'intro';
    headings.forEach((h) => {
      const top = h.getBoundingClientRect().top;
      if (top <= 180) {
        current = h.getAttribute('data-section') || current;
      }
    });
    setActiveSection(current);
  };

  const handleCopyCode = () => {
    if (!post) return;
    navigator.clipboard.writeText(post.codeSnippet.code);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const handleCopyShareLink = () => {
    if (!post) return;
    const url = `${window.location.origin}/#blog-${post.slug}`;
    navigator.clipboard.writeText(url);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const scrollToSection = (sectionId: string) => {
    if (!contentRef.current) return;
    const target = contentRef.current.querySelector(`[data-section="${sectionId}"]`);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  if (!post) return null;

  const tocItems = [
    { id: 'intro', label: '1. Introduction' },
    { id: 'problem', label: '2. The Core Problem' },
    { id: 'why-fails', label: '3. Why Obvious Solutions Fail' },
    { id: 'architecture', label: '4. Mental Model & Architecture' },
    { id: 'implementation', label: '5. Implementation' },
    { id: 'diagrams', label: '6. System Diagrams' },
    { id: 'code', label: '7. Code Example' },
    { id: 'trade-offs', label: '8. Trade-Off Analysis' },
    { id: 'failures', label: '9. Failure Modes' },
    { id: 'learned', label: '10. What I Learned' },
    { id: 'next', label: '11. What I Would Change Next' },
    { id: 'conclusion', label: '12. Conclusion' },
    { id: 'related', label: '13. Related Projects' },
    { id: 'references', label: '14. References & Research' },
  ];

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        background: 'rgba(5, 3, 9, 0.94)',
        backdropFilter: 'blur(16px)',
        display: 'flex',
        flexDirection: 'column',
      }}
      id="blog-reader-overlay"
    >
      {/* Sticky Reader Header */}
      <header
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 50,
          background: 'rgba(12, 8, 20, 0.96)',
          borderBottom: '1.5px solid var(--line)',
          backdropFilter: 'blur(12px)',
        }}
      >
        <div
          style={{
            maxWidth: '1200px',
            margin: '0 auto',
            padding: '12px 20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '16px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px', minWidth: 0 }}>
            <button
              onClick={onClose}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                background: 'rgba(255, 255, 255, 0.06)',
                border: '1px solid var(--line)',
                color: 'var(--fg)',
                padding: '6px 14px',
                borderRadius: '999px',
                fontSize: '13.5px',
                fontWeight: 600,
                cursor: 'pointer',
                whiteSpace: 'nowrap',
              }}
              className="hover:bg-white/10"
              id="reader-back-btn"
            >
              <ArrowLeft size={14} />
              <span>Back</span>
            </button>

            <div style={{ minWidth: 0, display: 'flex', flexDirection: 'column' }}>
              <span
                style={{
                  fontSize: '14px',
                  fontWeight: 600,
                  color: 'var(--fg)',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}
              >
                {post.title}
              </span>
              <span
                style={{
                  fontSize: '11.5px',
                  color: 'var(--lav)',
                  fontFamily: 'var(--f-mono)',
                }}
              >
                By Jyotirmya Sharma · {post.readingTime}
              </span>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <button
              onClick={handleCopyShareLink}
              title="Copy share link"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '5px',
                background: 'transparent',
                border: '1px solid var(--line)',
                color: 'var(--fg-soft)',
                padding: '6px 12px',
                borderRadius: '8px',
                fontSize: '12.5px',
                cursor: 'pointer',
              }}
              className="hover:text-white"
            >
              {copiedLink ? <Check size={13} color="var(--mint)" /> : <Share2 size={13} />}
              <span className="hidden sm:inline">{copiedLink ? 'Link Copied' : 'Share'}</span>
            </button>

            <button
              onClick={onClose}
              style={{
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid var(--line)',
                color: 'var(--fg)',
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
              }}
              title="Close (Esc)"
              id="reader-close-btn"
            >
              <X size={16} />
            </button>
          </div>
        </div>

        {/* Reading Progress Indicator Bar */}
        <div
          style={{
            height: '3px',
            background: 'rgba(255, 255, 255, 0.05)',
            width: '100%',
          }}
        >
          <div
            style={{
              height: '100%',
              width: `${scrollProgress}%`,
              background: 'linear-gradient(90deg, var(--lav) 0%, var(--mint) 100%)',
              transition: 'width 0.1s ease',
            }}
          />
        </div>
      </header>

      {/* Main Body with Sidebar TOC and Reader Document */}
      <div
        ref={contentRef}
        onScroll={handleScroll}
        style={{
          flex: 1,
          overflowY: 'auto',
          padding: '40px 20px 80px',
        }}
      >
        <div
          style={{
            maxWidth: '1160px',
            margin: '0 auto',
            display: 'grid',
            gridTemplateColumns: 'minmax(0, 1fr) 260px',
            gap: '50px',
          }}
          className="max-lg:!grid-cols-1"
        >
          {/* Main Article Prose Column */}
          <article
            style={{
              minWidth: 0,
              color: 'var(--fg)',
              fontSize: '17px',
              lineHeight: '1.75',
            }}
          >
            {/* 1. Header Metadata & Title */}
            <div style={{ marginBottom: '36px', borderBottom: '1.5px solid var(--line)', paddingBottom: '32px' }}>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  flexWrap: 'wrap',
                  marginBottom: '16px',
                }}
              >
                <span
                  style={{
                    background: 'var(--lav)',
                    color: '#120b1e',
                    padding: '3px 10px',
                    borderRadius: '999px',
                    fontSize: '12px',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '0.04em',
                  }}
                >
                  {post.category}
                </span>
                <span
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '5px',
                    color: 'var(--fg-soft)',
                    fontSize: '13px',
                  }}
                >
                  <Calendar size={13} />
                  {post.publishDate}
                </span>
                <span
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '5px',
                    color: 'var(--fg-soft)',
                    fontSize: '13px',
                  }}
                >
                  <Clock size={13} />
                  {post.readingTime}
                </span>
              </div>

              <h1
                style={{
                  font: '700 clamp(30px, 4vw, 44px)/1.15 var(--f-sans)',
                  letterSpacing: '-0.025em',
                  margin: '0 0 16px',
                  color: 'var(--fg)',
                }}
              >
                {post.title}
              </h1>

              <p
                style={{
                  fontSize: '19px',
                  lineHeight: '1.5',
                  color: 'var(--fg-soft)',
                  margin: '0 0 24px',
                }}
              >
                {post.subtitle}
              </p>

              {/* Author Strip */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '14px',
                  padding: '14px 18px',
                  background: 'rgba(255, 255, 255, 0.03)',
                  border: '1px solid var(--line)',
                  borderRadius: '12px',
                }}
              >
                <div
                  style={{
                    width: '38px',
                    height: '38px',
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, var(--lav), var(--blue))',
                    color: '#08070b',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 800,
                    fontSize: '15px',
                  }}
                >
                  JS
                </div>
                <div>
                  <div style={{ fontWeight: 600, fontSize: '14.5px' }}>Jyotirmya Sharma</div>
                  <div style={{ fontSize: '12.5px', color: 'var(--fg-soft)' }}>
                    B.Tech in CSE @ BIT Mesra · Software Engineering Intern @ ULTRATEND
                  </div>
                </div>
              </div>
            </div>

            {/* 2. Executive Summary Callout */}
            <div
              style={{
                padding: '20px 24px',
                borderRadius: '14px',
                background: 'rgba(180, 160, 202, 0.08)',
                border: '1.5px solid rgba(180, 160, 202, 0.25)',
                marginBottom: '40px',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  fontSize: '12px',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '0.06em',
                  color: 'var(--lav)',
                  marginBottom: '8px',
                }}
              >
                <Lightbulb size={14} />
                Executive Summary
              </div>
              <div style={{ margin: 0, fontSize: '15.5px', lineHeight: '1.65', color: '#e4dcec' }}>
                <MarkdownProse content={post.summary} />
              </div>
            </div>

            {/* 3. Section: Introduction */}
            <section data-section="intro" style={{ marginBottom: '48px' }}>
              <h2
                style={{
                  font: '600 24px/1.3 var(--f-sans)',
                  color: 'var(--fg)',
                  margin: '0 0 16px',
                  paddingBottom: '8px',
                  borderBottom: '1px solid var(--line)',
                }}
              >
                1. Introduction
              </h2>
              <MarkdownProse content={post.intro} />
            </section>

            {/* 4. Section: The Problem */}
            <section data-section="problem" style={{ marginBottom: '48px' }}>
              <h2
                style={{
                  font: '600 24px/1.3 var(--f-sans)',
                  color: 'var(--fg)',
                  margin: '0 0 16px',
                  paddingBottom: '8px',
                  borderBottom: '1px solid var(--line)',
                }}
              >
                2. The Core Problem
              </h2>
              <MarkdownProse content={post.problem} />
            </section>

            {/* 5. Section: Why Obvious Fails */}
            <section data-section="why-fails" style={{ marginBottom: '48px' }}>
              <h2
                style={{
                  font: '600 24px/1.3 var(--f-sans)',
                  color: 'var(--fg)',
                  margin: '0 0 16px',
                  paddingBottom: '8px',
                  borderBottom: '1px solid var(--line)',
                }}
              >
                3. Why Obvious Solutions Fail
              </h2>
              <MarkdownProse content={post.whyObviousFails} />
            </section>

            {/* 6. Section: Architecture & Mental Model */}
            <section data-section="architecture" style={{ marginBottom: '48px' }}>
              <h2
                style={{
                  font: '600 24px/1.3 var(--f-sans)',
                  color: 'var(--fg)',
                  margin: '0 0 16px',
                  paddingBottom: '8px',
                  borderBottom: '1px solid var(--line)',
                }}
              >
                4. Mental Model &amp; Architecture
              </h2>
              <MarkdownProse content={post.architectureMentalModel} />
            </section>

            {/* 7. Section: Technical Implementation */}
            <section data-section="implementation" style={{ marginBottom: '48px' }}>
              <h2
                style={{
                  font: '600 24px/1.3 var(--f-sans)',
                  color: 'var(--fg)',
                  margin: '0 0 16px',
                  paddingBottom: '8px',
                  borderBottom: '1px solid var(--line)',
                }}
              >
                5. Technical Implementation
              </h2>
              <MarkdownProse content={post.technicalImplementation} />
            </section>

            {/* 8. Section: Mermaid Diagrams */}
            <section data-section="diagrams" style={{ marginBottom: '48px' }}>
              <h2
                style={{
                  font: '600 24px/1.3 var(--f-sans)',
                  color: 'var(--fg)',
                  margin: '0 0 16px',
                  paddingBottom: '8px',
                  borderBottom: '1px solid var(--line)',
                }}
              >
                6. Architecture &amp; Execution Diagrams
              </h2>
              <p style={{ fontSize: '15px', color: 'var(--fg-soft)', margin: '0 0 20px' }}>
                The following interactive Mermaid diagrams illustrate the system state transitions,
                network boundaries, and concurrency locks. Toggle between visual diagram rendering
                and raw Mermaid syntax.
              </p>
              {post.mermaidDiagrams.map((diag, dIdx) => (
                <MermaidDiagram
                  key={dIdx}
                  title={diag.title}
                  caption={diag.caption}
                  code={diag.code}
                />
              ))}
            </section>

            {/* 9. Section: Code Snippet */}
            <section data-section="code" style={{ marginBottom: '48px' }}>
              <h2
                style={{
                  font: '600 24px/1.3 var(--f-sans)',
                  color: 'var(--fg)',
                  margin: '0 0 16px',
                  paddingBottom: '8px',
                  borderBottom: '1px solid var(--line)',
                }}
              >
                7. Production Implementation Code
              </h2>
              <p style={{ fontSize: '15px', color: 'var(--fg-soft)', margin: '0 0 16px' }}>
                {post.codeSnippet.description}
              </p>
              <div
                style={{
                  borderRadius: '14px',
                  border: '1.5px solid var(--line)',
                  background: '#090710',
                  overflow: 'hidden',
                  boxShadow: '0 6px 24px rgba(0,0,0,0.5)',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '10px 16px',
                    borderBottom: '1px solid var(--line)',
                    background: 'rgba(255, 255, 255, 0.03)',
                  }}
                >
                  <span
                    style={{
                      fontFamily: 'var(--f-mono)',
                      fontSize: '12px',
                      color: 'var(--lav)',
                    }}
                  >
                    {post.codeSnippet.filename}
                  </span>
                  <button
                    onClick={handleCopyCode}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                      background: 'rgba(255, 255, 255, 0.06)',
                      border: '1px solid var(--line)',
                      color: 'var(--fg-soft)',
                      padding: '4px 10px',
                      borderRadius: '6px',
                      fontSize: '11.5px',
                      cursor: 'pointer',
                    }}
                  >
                    {copiedCode ? <Check size={12} color="var(--mint)" /> : <Copy size={12} />}
                    <span>{copiedCode ? 'Copied' : 'Copy'}</span>
                  </button>
                </div>
                <pre
                  style={{
                    margin: 0,
                    padding: '20px',
                    fontFamily: 'var(--f-mono)',
                    fontSize: '13px',
                    lineHeight: '1.65',
                    color: '#d6c8e8',
                    overflowX: 'auto',
                  }}
                >
                  <code>{post.codeSnippet.code}</code>
                </pre>
              </div>
            </section>

            {/* 10. Section: Trade-Off Analysis */}
            <section data-section="trade-offs" style={{ marginBottom: '48px' }}>
              <h2
                style={{
                  font: '600 24px/1.3 var(--f-sans)',
                  color: 'var(--fg)',
                  margin: '0 0 16px',
                  paddingBottom: '8px',
                  borderBottom: '1px solid var(--line)',
                }}
              >
                8. Architectural Trade-Off Analysis
              </h2>
              <div style={{ display: 'grid', gap: '14px' }}>
                {post.tradeOffs.map((t, idx) => (
                  <div
                    key={idx}
                    style={{
                      padding: '16px 20px',
                      borderRadius: '12px',
                      background: 'rgba(255, 255, 255, 0.02)',
                      border: '1px solid var(--line)',
                    }}
                  >
                    <div style={{ fontWeight: 600, fontSize: '15.5px', color: 'var(--fg)', marginBottom: '8px' }}>
                      {renderInline(t.decision)}
                    </div>
                    <div style={{ fontSize: '14px', lineHeight: '1.55', marginBottom: '6px' }}>
                      <strong style={{ color: 'var(--mint)' }}>Advantage:</strong> {renderInline(t.advantage)}
                    </div>
                    <div style={{ fontSize: '14px', lineHeight: '1.55', color: 'var(--fg-soft)' }}>
                      <strong style={{ color: 'var(--butter)' }}>Drawback:</strong> {renderInline(t.drawback)}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* 11. Section: Failure Cases */}
            <section data-section="failures" style={{ marginBottom: '48px' }}>
              <h2
                style={{
                  font: '600 24px/1.3 var(--f-sans)',
                  color: 'var(--fg)',
                  margin: '0 0 16px',
                  paddingBottom: '8px',
                  borderBottom: '1px solid var(--line)',
                }}
              >
                9. Failure Modes &amp; Mitigations
              </h2>
              <div style={{ display: 'grid', gap: '14px' }}>
                {post.failureCases.map((f, idx) => (
                  <div
                    key={idx}
                    style={{
                      padding: '16px 20px',
                      borderRadius: '12px',
                      background: 'rgba(25, 12, 18, 0.4)',
                      border: '1px solid rgba(255, 100, 100, 0.2)',
                    }}
                  >
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        fontWeight: 600,
                        fontSize: '15px',
                        color: '#ffb3b3',
                        marginBottom: '6px',
                      }}
                    >
                      <AlertTriangle size={14} />
                      {renderInline(f.scenario)}
                    </div>
                    <div style={{ fontSize: '14px', color: 'var(--fg-soft)', marginBottom: '6px' }}>
                      <strong>Impact:</strong> {renderInline(f.impact)}
                    </div>
                    <div style={{ fontSize: '14px', color: 'var(--fg)' }}>
                      <strong style={{ color: 'var(--mint)' }}>Mitigation:</strong> {renderInline(f.mitigation)}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* 12. Section: What I Learned */}
            <section data-section="learned" style={{ marginBottom: '48px' }}>
              <h2
                style={{
                  font: '600 24px/1.3 var(--f-sans)',
                  color: 'var(--fg)',
                  margin: '0 0 16px',
                  paddingBottom: '8px',
                  borderBottom: '1px solid var(--line)',
                }}
              >
                10. What I Learned (and What Surprised Me)
              </h2>
              <MarkdownProse content={post.whatILearned} />
            </section>

            {/* 13. Section: What I Would Change Next */}
            <section data-section="next" style={{ marginBottom: '48px' }}>
              <h2
                style={{
                  font: '600 24px/1.3 var(--f-sans)',
                  color: 'var(--fg)',
                  margin: '0 0 16px',
                  paddingBottom: '8px',
                  borderBottom: '1px solid var(--line)',
                }}
              >
                11. What I Would Change in V2
              </h2>
              <MarkdownProse content={post.whatIWouldChangeNext} />
            </section>

            {/* 14. Section: Conclusion */}
            <section data-section="conclusion" style={{ marginBottom: '48px' }}>
              <h2
                style={{
                  font: '600 24px/1.3 var(--f-sans)',
                  color: 'var(--fg)',
                  margin: '0 0 16px',
                  paddingBottom: '8px',
                  borderBottom: '1px solid var(--line)',
                }}
              >
                12. Conclusion
              </h2>
              <MarkdownProse content={post.conclusion} />
            </section>

            {/* 15. Section: Related Projects */}
            <section data-section="related" style={{ marginBottom: '48px' }}>
              <h2
                style={{
                  font: '600 24px/1.3 var(--f-sans)',
                  color: 'var(--fg)',
                  margin: '0 0 16px',
                  paddingBottom: '8px',
                  borderBottom: '1px solid var(--line)',
                }}
              >
                13. Related Projects &amp; Repositories
              </h2>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }} className="max-sm:!grid-cols-1">
                {post.relatedProjects.map((p, idx) => (
                  <a
                    key={idx}
                    href={p.repo}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: 'block',
                      padding: '16px 20px',
                      borderRadius: '12px',
                      background: 'rgba(255, 255, 255, 0.03)',
                      border: '1.5px solid var(--line)',
                      textDecoration: 'none',
                      color: 'inherit',
                      transition: 'border-color 0.15s ease',
                    }}
                    className="hover:border-[var(--lav)]"
                  >
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        fontWeight: 600,
                        fontSize: '15px',
                        color: 'var(--fg)',
                        marginBottom: '6px',
                      }}
                    >
                      <span>{p.name}</span>
                      <ExternalLink size={13} color="var(--lav)" />
                    </div>
                    <p style={{ margin: 0, fontSize: '13px', color: 'var(--fg-soft)', lineHeight: '1.5' }}>
                      {p.description}
                    </p>
                  </a>
                ))}
              </div>
            </section>

            {/* 16. Section: References */}
            <section data-section="references" style={{ marginBottom: '48px' }}>
              <h2
                style={{
                  font: '600 24px/1.3 var(--f-sans)',
                  color: 'var(--fg)',
                  margin: '0 0 16px',
                  paddingBottom: '8px',
                  borderBottom: '1px solid var(--line)',
                }}
              >
                14. References &amp; Further Reading
              </h2>
              <div style={{ display: 'grid', gap: '12px' }}>
                {post.references.map((r, idx) => (
                  <div
                    key={idx}
                    style={{
                      padding: '14px 18px',
                      borderRadius: '10px',
                      background: 'rgba(255, 255, 255, 0.02)',
                      border: '1px solid var(--line)',
                    }}
                  >
                    <div style={{ fontWeight: 600, fontSize: '14.5px', color: 'var(--fg)' }}>
                      {r.title}
                    </div>
                    <div
                      style={{
                        fontSize: '12.5px',
                        color: 'var(--lav)',
                        fontFamily: 'var(--f-mono)',
                        margin: '3px 0 6px',
                      }}
                    >
                      {r.source}
                    </div>
                    <div style={{ fontSize: '13.5px', color: 'var(--fg-soft)', lineHeight: '1.5' }}>
                      {r.note}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Bottom Next/Prev Article Navigation */}
            <div
              style={{
                marginTop: '60px',
                paddingTop: '32px',
                borderTop: '1.5px solid var(--line)',
                display: 'flex',
                justifyContent: 'space-between',
                gap: '16px',
                flexWrap: 'wrap',
              }}
            >
              <button
                onClick={onClose}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '10px 20px',
                  borderRadius: '999px',
                  background: 'rgba(255, 255, 255, 0.06)',
                  border: '1.5px solid var(--line)',
                  color: 'var(--fg)',
                  fontSize: '14px',
                  fontWeight: 600,
                  cursor: 'pointer',
                }}
              >
                <ArrowLeft size={14} />
                <span>Return to Portfolio</span>
              </button>

              <div style={{ display: 'flex', gap: '10px' }}>
                {allPosts
                  .filter((p) => p.id !== post.id)
                  .slice(0, 2)
                  .map((otherPost) => (
                    <button
                      key={otherPost.id}
                      onClick={() => onSelectPost(otherPost)}
                      style={{
                        padding: '8px 16px',
                        borderRadius: '999px',
                        background: 'rgba(180, 160, 202, 0.1)',
                        border: '1px solid var(--line)',
                        color: 'var(--lav)',
                        fontSize: '12.5px',
                        fontWeight: 600,
                        cursor: 'pointer',
                        whiteSpace: 'nowrap',
                      }}
                      className="hover:bg-white/10"
                    >
                      Next: {otherPost.category} →
                    </button>
                  ))}
              </div>
            </div>
          </article>

          {/* Sticky Right Sidebar: Table of Contents */}
          <aside
            style={{
              position: 'sticky',
              top: '80px',
              height: 'fit-content',
              maxHeight: 'calc(100vh - 120px)',
              overflowY: 'auto',
              padding: '20px',
              borderRadius: '16px',
              background: 'rgba(16, 11, 26, 0.95)',
              border: '1.5px solid var(--line)',
            }}
            className="max-lg:hidden"
          >
            <div
              style={{
                fontSize: '11px',
                fontWeight: 700,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color: 'var(--lav)',
                marginBottom: '14px',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
              }}
            >
              <BookOpen size={13} />
              <span>Table of Contents</span>
            </div>

            <nav style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              {tocItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  style={{
                    textAlign: 'left',
                    padding: '6px 10px',
                    borderRadius: '6px',
                    fontSize: '12.5px',
                    lineHeight: '1.4',
                    border: 'none',
                    background: activeSection === item.id ? 'rgba(180, 160, 202, 0.15)' : 'transparent',
                    color: activeSection === item.id ? 'var(--fg)' : 'var(--fg-soft)',
                    fontWeight: activeSection === item.id ? 600 : 400,
                    cursor: 'pointer',
                    transition: 'all 0.1s ease',
                  }}
                  className="hover:text-white"
                >
                  {item.label}
                </button>
              ))}
            </nav>

            {/* Author Quick Card in Sidebar */}
            <div
              style={{
                marginTop: '24px',
                paddingTop: '16px',
                borderTop: '1px solid rgba(255, 255, 255, 0.08)',
                fontSize: '12px',
                color: 'var(--fg-soft)',
                lineHeight: '1.5',
              }}
            >
              <div style={{ color: 'var(--fg)', fontWeight: 600, marginBottom: '2px' }}>
                Jyotirmya Sharma
              </div>
              <div>BIT Mesra '25 · ULTRATEND</div>
              <div style={{ color: 'var(--lav)', marginTop: '4px', fontFamily: 'var(--f-mono)', fontSize: '11px' }}>
                Backend &amp; AI Infrastructure
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};
