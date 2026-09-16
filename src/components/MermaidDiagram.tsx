import React, { useEffect, useRef, useState } from 'react';
import mermaid from 'mermaid';
import {
  Copy,
  Check,
  Code,
  Eye,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Maximize2,
  X,
  Layers,
  Activity,
  GitCommit,
  Cpu,
} from 'lucide-react';

interface MermaidDiagramProps {
  title: string;
  caption?: string;
  code: string;
}

// Initialize Mermaid once with dark theme configuration
mermaid.initialize({
  startOnLoad: false,
  theme: 'base',
  themeVariables: {
    darkMode: true,
    background: 'transparent',
    mainBkg: '#1a122c',
    primaryColor: '#25173e',
    primaryTextColor: '#f6f1fb',
    primaryBorderColor: '#9374b8',
    lineColor: '#cbbade',
    secondaryColor: '#2c1b47',
    secondaryTextColor: '#f6f1fb',
    secondaryBorderColor: '#8462a7',
    tertiaryColor: '#150e24',
    tertiaryTextColor: '#f6f1fb',
    tertiaryBorderColor: 'rgba(180, 160, 202, 0.35)',
    nodeBorder: '#9374b8',
    clusterBkg: 'rgba(30, 20, 50, 0.65)',
    clusterBorder: 'rgba(180, 160, 202, 0.45)',
    defaultLinkColor: '#cbbade',
    titleColor: '#f6f1fb',
    edgeLabelBackground: '#160e26',
    actorBkg: '#25173e',
    actorBorder: '#9374b8',
    actorTextColor: '#f6f1fb',
    actorLineColor: '#8b68b3',
    signalColor: '#cbbade',
    signalTextColor: '#f6f1fb',
    labelBoxBkgColor: '#25173e',
    labelBoxBorderColor: '#9374b8',
    labelTextColor: '#f6f1fb',
    loopTextColor: '#f6f1fb',
    noteBorderColor: '#ffd447',
    noteBkgColor: '#2e230a',
    noteTextColor: '#fff0b3',
    activationBorderColor: '#80ceb2',
    activationBkgColor: 'rgba(128, 206, 178, 0.25)',
    sequenceNumberColor: '#120b1f',
    stateBkg: '#1c132f',
    stateBorder: '#9374b8',
    stateLabelColor: '#f6f1fb',
    compositeBackground: '#160e26',
    altSectionBkgColor: 'rgba(30, 20, 50, 0.5)',
    fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
    fontSize: '13px',
  },
  themeCSS: `
    /* Crisp Nodes */
    .node rect, .node circle, .node ellipse, .node polygon {
      stroke-width: 1.5px !important;
      rx: 8px !important;
      ry: 8px !important;
      filter: drop-shadow(0 3px 10px rgba(0, 0, 0, 0.5));
    }
    .node .label {
      font-family: Inter, system-ui, sans-serif !important;
      font-weight: 500 !important;
      font-size: 13px !important;
      color: #f6f1fb !important;
      line-height: 1.4 !important;
    }
    /* Subgraphs / Clusters */
    .cluster rect {
      rx: 12px !important;
      ry: 12px !important;
      stroke-width: 1.5px !important;
      stroke-dasharray: 4 4 !important;
    }
    .cluster .label {
      font-family: Inter, system-ui, sans-serif !important;
      font-weight: 700 !important;
      font-size: 12.5px !important;
      text-transform: uppercase !important;
      letter-spacing: 0.05em !important;
      fill: #e8ddf5 !important;
    }
    /* Flow Paths & Connectors */
    .edgePath .path {
      stroke: #cbbade !important;
      stroke-width: 2px !important;
    }
    .arrowheadPath {
      fill: #cbbade !important;
      stroke: #cbbade !important;
    }
    .edgeLabel {
      background-color: #160e26 !important;
      color: #e4dcec !important;
      border: 1px solid rgba(180, 160, 202, 0.25) !important;
      border-radius: 6px !important;
      padding: 3px 7px !important;
      font-size: 11.5px !important;
      font-weight: 500 !important;
    }
    /* Sequence Diagram Elements */
    .actor {
      stroke: #9374b8 !important;
      fill: #25173e !important;
      stroke-width: 1.5px !important;
      rx: 8px !important;
      ry: 8px !important;
      filter: drop-shadow(0 3px 8px rgba(0,0,0,0.4));
    }
    text.actor > tspan {
      fill: #f6f1fb !important;
      font-family: Inter, system-ui, sans-serif !important;
      font-weight: 600 !important;
      font-size: 13px !important;
    }
    .messageText {
      fill: #f6f1fb !important;
      font-family: Inter, system-ui, sans-serif !important;
      font-size: 12px !important;
      stroke: none !important;
      font-weight: 500 !important;
    }
    .messageLine0, .messageLine1 {
      stroke: #cbbade !important;
      stroke-width: 1.5px !important;
    }
    .note {
      stroke: #ffd447 !important;
      fill: #2e230a !important;
      stroke-width: 1px !important;
      rx: 6px !important;
      ry: 6px !important;
    }
    .noteText {
      fill: #fff0b3 !important;
      font-family: Inter, system-ui, sans-serif !important;
      font-size: 12px !important;
      font-weight: 500 !important;
    }
    /* State Diagram Elements */
    .statediagram-state rect {
      stroke: #9374b8 !important;
      fill: #25173e !important;
      rx: 8px !important;
      ry: 8px !important;
      stroke-width: 1.5px !important;
      filter: drop-shadow(0 3px 8px rgba(0,0,0,0.4));
    }
    .statediagram-state .state-title {
      fill: #f6f1fb !important;
      font-weight: 600 !important;
      font-size: 13px !important;
    }
    .transition {
      stroke: #cbbade !important;
      stroke-width: 1.8px !important;
    }
  `,
  securityLevel: 'loose',
});

export const MermaidDiagram: React.FC<MermaidDiagramProps> = ({ title, caption, code }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [svgHtml, setSvgHtml] = useState<string>('');
  const [copied, setCopied] = useState(false);
  const [viewMode, setViewMode] = useState<'diagram' | 'code'>('diagram');
  const [renderError, setRenderError] = useState<string | null>(null);
  const [zoom, setZoom] = useState<number>(1);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Detect diagram type for aesthetic badge
  const diagramType = React.useMemo(() => {
    const trimmed = code.trim();
    if (trimmed.startsWith('sequenceDiagram')) return { label: 'Sequence Flow', icon: Activity };
    if (trimmed.startsWith('stateDiagram')) return { label: 'State Machine', icon: GitCommit };
    if (trimmed.startsWith('flowchart') || trimmed.startsWith('graph')) return { label: 'Architecture', icon: Cpu };
    return { label: 'System Diagram', icon: Layers };
  }, [code]);

  useEffect(() => {
    let isMounted = true;
    const renderId = `mermaid-${Math.random().toString(36).substring(2, 9)}`;

    mermaid
      .render(renderId, code)
      .then((res) => {
        if (isMounted) {
          // Normalize SVG style attributes to ensure fluid responsiveness and no clipping
          const processedSvg = res.svg
            .replace(/style="max-width:[^"]*"/i, 'style="width: 100%; height: auto; max-width: 100%; display: block; margin: 0 auto;"')
            .replace(/<svg\s+([^>]*?)id="[^"]*"/i, `<svg $1 id="${renderId}" class="mermaid-svg-root"`);
          setSvgHtml(processedSvg);
          setRenderError(null);
        }
      })
      .catch((err) => {
        if (isMounted) {
          console.warn('Mermaid rendering error:', err);
          setRenderError(String(err));
          setViewMode('code');
        }
      });

    return () => {
      isMounted = false;
    };
  }, [code]);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleZoomIn = () => setZoom((z) => Math.min(2, Math.round((z + 0.2) * 10) / 10));
  const handleZoomOut = () => setZoom((z) => Math.max(0.6, Math.round((z - 0.2) * 10) / 10));
  const handleResetZoom = () => setZoom(1);

  // Close full screen on Escape key
  useEffect(() => {
    if (!isFullscreen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsFullscreen(false);
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isFullscreen]);

  const DiagramIcon = diagramType.icon;

  const diagramContent = (
    <div
      style={{
        position: 'relative',
        minHeight: '220px',
        overflow: 'auto',
        background: '#0a0614',
        backgroundImage: 'radial-gradient(circle, rgba(180, 160, 202, 0.12) 1px, transparent 1px)',
        backgroundSize: '22px 22px',
        padding: '36px 24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {viewMode === 'diagram' ? (
        renderError ? (
          <div style={{ padding: '24px', color: 'var(--butter)', fontSize: '13.5px', textAlign: 'center' }}>
            <p style={{ margin: '0 0 8px', fontWeight: 600 }}>Failed to render visual SVG diagram.</p>
            <p style={{ margin: 0, fontSize: '12px', color: 'var(--fg-soft)' }}>
              Switching to raw Mermaid syntax view.
            </p>
          </div>
        ) : (
          <div
            style={{
              transform: `scale(${zoom})`,
              transformOrigin: 'top center',
              transition: 'transform 0.18s ease-out',
              width: '100%',
              maxWidth: isFullscreen ? '1100px' : '820px',
              margin: '0 auto',
            }}
          >
            <div
              ref={containerRef}
              style={{
                width: '100%',
                display: 'flex',
                justifyContent: 'center',
              }}
              dangerouslySetInnerHTML={{ __html: svgHtml }}
            />
          </div>
        )
      ) : (
        <pre
          style={{
            margin: 0,
            width: '100%',
            padding: '20px',
            background: 'rgba(0, 0, 0, 0.5)',
            borderRadius: '12px',
            border: '1px solid var(--line)',
            fontFamily: 'var(--f-mono)',
            fontSize: '12.5px',
            lineHeight: '1.65',
            color: '#d6c8e8',
            overflowX: 'auto',
          }}
        >
          <code>{code}</code>
        </pre>
      )}
    </div>
  );

  return (
    <>
      {/* Standard Inline Diagram Card */}
      <div
        style={{
          margin: '32px 0',
          borderRadius: '16px',
          border: '1.5px solid var(--line)',
          background: 'rgba(15, 10, 24, 0.95)',
          overflow: 'hidden',
          boxShadow: '0 10px 32px -10px rgba(0, 0, 0, 0.65)',
        }}
      >
        {/* Header Bar */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '12px 18px',
            borderBottom: '1.5px solid var(--line)',
            background: 'rgba(255, 255, 255, 0.03)',
            flexWrap: 'wrap',
            gap: '10px',
          }}
        >
          {/* Title & Badge */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span
              style={{
                fontSize: '11px',
                fontFamily: 'var(--f-mono)',
                fontWeight: 700,
                letterSpacing: '0.06em',
                color: 'var(--lav)',
                textTransform: 'uppercase',
                padding: '3px 8px',
                borderRadius: '6px',
                background: 'rgba(180, 160, 202, 0.15)',
                border: '1px solid rgba(180, 160, 202, 0.25)',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '5px',
              }}
            >
              <DiagramIcon size={12} />
              {diagramType.label}
            </span>
            <span style={{ fontSize: '14.5px', fontWeight: 600, color: 'var(--fg)' }}>{title}</span>
          </div>

          {/* Interactive Controls Toolbar */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            {/* Zoom Controls (only in diagram mode) */}
            {viewMode === 'diagram' && !renderError && (
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  background: 'rgba(0, 0, 0, 0.35)',
                  borderRadius: '8px',
                  padding: '2px',
                  border: '1px solid var(--line)',
                }}
              >
                <button
                  type="button"
                  onClick={handleZoomOut}
                  title="Zoom Out"
                  style={{
                    background: 'transparent',
                    border: 'none',
                    color: 'var(--fg-soft)',
                    padding: '4px 6px',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                  }}
                  className="hover:text-white"
                >
                  <ZoomOut size={13} />
                </button>
                <span
                  onClick={handleResetZoom}
                  title="Click to reset zoom"
                  style={{
                    fontSize: '10.5px',
                    fontFamily: 'var(--f-mono)',
                    color: 'var(--fg-soft)',
                    padding: '0 6px',
                    cursor: 'pointer',
                    userSelect: 'none',
                  }}
                  className="hover:text-white"
                >
                  {Math.round(zoom * 100)}%
                </span>
                <button
                  type="button"
                  onClick={handleZoomIn}
                  title="Zoom In"
                  style={{
                    background: 'transparent',
                    border: 'none',
                    color: 'var(--fg-soft)',
                    padding: '4px 6px',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                  }}
                  className="hover:text-white"
                >
                  <ZoomIn size={13} />
                </button>
                {zoom !== 1 && (
                  <button
                    type="button"
                    onClick={handleResetZoom}
                    title="Reset Zoom"
                    style={{
                      background: 'transparent',
                      border: 'none',
                      color: 'var(--lav)',
                      padding: '4px 6px',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                    }}
                  >
                    <RotateCcw size={11} />
                  </button>
                )}
              </div>
            )}

            {/* Expand / Fullscreen Button */}
            <button
              type="button"
              onClick={() => setIsFullscreen(true)}
              title="Expand diagram full screen"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                padding: '4px 8px',
                fontSize: '11.5px',
                borderRadius: '6px',
                border: '1px solid var(--line)',
                background: 'rgba(255, 255, 255, 0.04)',
                color: 'var(--fg-soft)',
                cursor: 'pointer',
              }}
              className="hover:text-white hover:border-[var(--lav)]"
            >
              <Maximize2 size={12} />
              <span className="hidden sm:inline">Expand</span>
            </button>

            {/* View Mode Toggle: Visual vs Mermaid Code */}
            <div
              style={{
                display: 'flex',
                background: 'rgba(0, 0, 0, 0.35)',
                borderRadius: '8px',
                padding: '2px',
                border: '1px solid var(--line)',
              }}
            >
              <button
                type="button"
                onClick={() => setViewMode('diagram')}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  padding: '4px 9px',
                  fontSize: '11.5px',
                  fontWeight: 600,
                  borderRadius: '6px',
                  border: 'none',
                  background: viewMode === 'diagram' ? 'var(--line)' : 'transparent',
                  color: viewMode === 'diagram' ? 'var(--fg)' : 'var(--fg-soft)',
                  cursor: 'pointer',
                }}
              >
                <Eye size={12} />
                <span>Visual</span>
              </button>
              <button
                type="button"
                onClick={() => setViewMode('code')}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  padding: '4px 9px',
                  fontSize: '11.5px',
                  fontWeight: 600,
                  borderRadius: '6px',
                  border: 'none',
                  background: viewMode === 'code' ? 'var(--line)' : 'transparent',
                  color: viewMode === 'code' ? 'var(--fg)' : 'var(--fg-soft)',
                  cursor: 'pointer',
                }}
              >
                <Code size={12} />
                <span>Source</span>
              </button>
            </div>

            {/* Copy Button */}
            <button
              type="button"
              onClick={handleCopy}
              title="Copy Mermaid source syntax"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                padding: '5px 10px',
                fontSize: '11.5px',
                fontWeight: 600,
                borderRadius: '6px',
                border: '1px solid var(--line)',
                background: 'rgba(255, 255, 255, 0.05)',
                color: 'var(--fg-soft)',
                cursor: 'pointer',
              }}
              className="hover:text-white"
            >
              {copied ? <Check size={12} color="var(--mint)" /> : <Copy size={12} />}
              <span className="hidden sm:inline">{copied ? 'Copied' : 'Copy'}</span>
            </button>
          </div>
        </div>

        {/* Visual Diagram Canvas */}
        {diagramContent}

        {/* Caption Footer */}
        {caption && (
          <div
            style={{
              padding: '11px 18px',
              borderTop: '1px solid rgba(255, 255, 255, 0.06)',
              background: 'rgba(10, 6, 18, 0.9)',
              fontSize: '13px',
              color: 'var(--fg-soft)',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
            }}
          >
            <span
              style={{
                width: '6px',
                height: '6px',
                borderRadius: '50%',
                background: 'var(--lav)',
                flexShrink: 0,
              }}
            />
            <span>{caption}</span>
          </div>
        )}
      </div>

      {/* Expanded Fullscreen View Modal */}
      {isFullscreen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(7, 4, 12, 0.92)',
            backdropFilter: 'blur(10px)',
            zIndex: 10000,
            display: 'flex',
            flexDirection: 'column',
            padding: '24px',
          }}
          onClick={(e) => {
            if (e.target === e.currentTarget) setIsFullscreen(false);
          }}
        >
          {/* Fullscreen Header */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '16px',
              padding: '12px 20px',
              background: 'rgba(20, 14, 32, 0.9)',
              border: '1px solid var(--line)',
              borderRadius: '12px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span
                style={{
                  fontSize: '11px',
                  fontFamily: 'var(--f-mono)',
                  fontWeight: 700,
                  color: 'var(--lav)',
                  textTransform: 'uppercase',
                  padding: '2px 8px',
                  borderRadius: '6px',
                  background: 'rgba(180, 160, 202, 0.15)',
                }}
              >
                {diagramType.label}
              </span>
              <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 600, color: 'var(--fg)' }}>
                {title}
              </h3>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              {/* Zoom Controls */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  background: 'rgba(0, 0, 0, 0.4)',
                  borderRadius: '8px',
                  padding: '2px',
                  border: '1px solid var(--line)',
                }}
              >
                <button
                  type="button"
                  onClick={handleZoomOut}
                  style={{
                    background: 'transparent',
                    border: 'none',
                    color: 'var(--fg-soft)',
                    padding: '4px 8px',
                    cursor: 'pointer',
                  }}
                >
                  <ZoomOut size={14} />
                </button>
                <span style={{ fontSize: '11.5px', fontFamily: 'var(--f-mono)', padding: '0 8px' }}>
                  {Math.round(zoom * 100)}%
                </span>
                <button
                  type="button"
                  onClick={handleZoomIn}
                  style={{
                    background: 'transparent',
                    border: 'none',
                    color: 'var(--fg-soft)',
                    padding: '4px 8px',
                    cursor: 'pointer',
                  }}
                >
                  <ZoomIn size={14} />
                </button>
                <button
                  type="button"
                  onClick={handleResetZoom}
                  style={{
                    background: 'transparent',
                    border: 'none',
                    color: 'var(--lav)',
                    padding: '4px 8px',
                    cursor: 'pointer',
                  }}
                >
                  <RotateCcw size={12} />
                </button>
              </div>

              {/* Close Fullscreen */}
              <button
                type="button"
                onClick={() => setIsFullscreen(false)}
                style={{
                  background: 'rgba(255, 255, 255, 0.08)',
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
              >
                <X size={16} />
              </button>
            </div>
          </div>

          {/* Fullscreen Canvas */}
          <div
            style={{
              flex: 1,
              borderRadius: '14px',
              border: '1.5px solid var(--line)',
              overflow: 'auto',
              boxShadow: '0 20px 60px rgba(0, 0, 0, 0.8)',
            }}
          >
            {diagramContent}
          </div>

          {caption && (
            <div
              style={{
                marginTop: '12px',
                textAlign: 'center',
                fontSize: '13px',
                color: 'var(--fg-soft)',
              }}
            >
              {caption}
            </div>
          )}
        </div>
      )}
    </>
  );
};
