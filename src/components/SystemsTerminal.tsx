import React, { useState, useRef, useEffect } from 'react';
import { Terminal, Minimize2, Maximize2, X, ChevronRight, Activity, Zap } from 'lucide-react';

interface SystemsTerminalProps {
  onTogglePikachu?: () => void;
  pikachuActive?: boolean;
}

export const SystemsTerminal: React.FC<SystemsTerminalProps> = ({
  onTogglePikachu,
  pikachuActive = true,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputVal, setInputVal] = useState('');
  const [history, setHistory] = useState<Array<{ cmd: string; output: string | React.ReactNode }>>([
    {
      cmd: 'welcome',
      output: (
        <div>
          <span style={{ color: 'var(--mint)', fontWeight: 600 }}>
            Jyotirmya Sharma — Systems &amp; Backend Engineering CLI v1.0.4
          </span>
          <br />
          Type <span style={{ color: 'var(--butter)' }}>help</span> to list available commands, or{' '}
          <span style={{ color: 'var(--blue)' }}>prs</span> to see open source contributions.
        </div>
      ),
    },
  ]);

  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [history, isOpen]);

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    const raw = inputVal.trim();
    if (!raw) return;

    const cmd = raw.toLowerCase();
    setInputVal('');

    let res: React.ReactNode = '';

    switch (cmd) {
      case 'help':
        res = (
          <div style={{ lineHeight: '1.6' }}>
            <div style={{ color: 'var(--butter)', fontWeight: 600, marginBottom: '4px' }}>Available commands:</div>
            <div>• <strong style={{ color: 'var(--blue)' }}>whoami</strong> : Current role, university &amp; engineering profile</div>
            <div>• <strong style={{ color: 'var(--blue)' }}>status</strong> : Live cluster health &amp; active focus</div>
            <div>• <strong style={{ color: 'var(--blue)' }}>stack</strong> : Backend, distributed systems, &amp; AI stack</div>
            <div>• <strong style={{ color: 'var(--blue)' }}>prs</strong> : Recent open source merged PRs</div>
            <div>• <strong style={{ color: 'var(--blue)' }}>pikachu</strong> : Toggle Pikachu cursor pet (currently: {pikachuActive ? 'ACTIVE' : 'OFF'})</div>
            <div>• <strong style={{ color: 'var(--blue)' }}>contact</strong> : Email &amp; social profiles</div>
            <div>• <strong style={{ color: 'var(--blue)' }}>clear</strong> : Clear terminal logs</div>
          </div>
        );
        break;

      case 'whoami':
        res = (
          <div>
            Jyotirmya Sharma — Software Engineering Intern at <strong>ULTRATEND</strong>.
            <br />
            B.Tech in CSE student at Birla Institute of Technology, Mesra (2023–2027).
            <br />
            Backend engineer specializing in distributed systems, concurrency, and AI infrastructure.
          </div>
        );
        break;

      case 'status':
        res = (
          <div>
            <span style={{ color: 'var(--mint)' }}>● ALL SYSTEMS OPERATIONAL</span>
            <br />
            Node: BIT-MESRA-01 | Region: ap-south-1 | Latency: 14ms
            <br />
            Active: Building concurrent data pipelines &amp; LLM re-ranking at ULTRATEND.
          </div>
        );
        break;

      case 'stack':
        res = (
          <div>
            <span style={{ color: 'var(--lav)' }}>Languages:</span> Python, C++20, TypeScript, Go, C, SQL
            <br />
            <span style={{ color: 'var(--lav)' }}>Backend:</span> Node.js, FastAPI, Express, PostgreSQL, Redis
            <br />
            <span style={{ color: 'var(--lav)' }}>Systems:</span> Consistent Hashing, Lamport Clocks, Quorum Consensus, Protobuf
            <br />
            <span style={{ color: 'var(--lav)' }}>AI Infra:</span> LLM Re-ranking, Isolation Forest, RAG, Embeddings
          </div>
        );
        break;

      case 'prs':
        res = (
          <div>
            <span style={{ color: 'var(--mint)', fontWeight: 600 }}>10+ Merged Pull Requests:</span>
            <br />
            • PR #1979: fix(core): validate REPOWISE_EMBEDDING_DIMS at parse points
            <br />
            • PR #1720: fix(cli): warn when cascade budget truncates regeneration
            <br />
            • PR #1256: fix(ts): allow Node.js package exports wildcard to cross directory boundaries
            <br />
            • PR #5257: screenpipe: fix(ui) pipe inventory count in recents
          </div>
        );
        break;

      case 'pikachu':
        if (onTogglePikachu) {
          onTogglePikachu();
          res = `Pikachu cursor companion is now ${!pikachuActive ? 'SUMMONED ⚡ (Walking)' : 'RESTING (Off)'}.`;
        } else {
          res = 'Pikachu companion toggled!';
        }
        break;

      case 'contact':
        res = (
          <div>
            Email: <a href="mailto:jyotirmyasharma@gmail.com" style={{ color: 'var(--blue)', textDecoration: 'underline' }}>jyotirmyasharma@gmail.com</a>
            <br />
            GitHub: <a href="https://github.com/jyotirmya17" target="_blank" rel="noreferrer" style={{ color: 'var(--blue)', textDecoration: 'underline' }}>github.com/jyotirmya17</a>
            <br />
            LinkedIn: <a href="https://www.linkedin.com/in/jyotirmya-sharma-6a0b94263" target="_blank" rel="noreferrer" style={{ color: 'var(--blue)', textDecoration: 'underline' }}>linkedin.com/in/jyotirmya-sharma</a>
          </div>
        );
        break;

      case 'clear':
        setHistory([]);
        return;

      default:
        res = `Command not recognized: "${raw}". Type "help" for valid commands.`;
    }

    setHistory((prev) => [...prev, { cmd: raw, output: res }]);
  };

  return (
    <>
      {/* Docked Launcher Bar in Bottom Left */}
      <div
        style={{
          position: 'fixed',
          bottom: '20px',
          left: '20px',
          zIndex: 900,
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
        }}
      >
        <button
          onClick={() => setIsOpen(!isOpen)}
          style={{
            background: 'rgba(25, 17, 40, 0.92)',
            border: '1.5px solid var(--line)',
            color: 'var(--fg)',
            padding: '8px 14px',
            borderRadius: '999px',
            fontSize: '13px',
            fontWeight: 600,
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            cursor: 'pointer',
            backdropFilter: 'blur(8px)',
            boxShadow: '0 4px 14px rgba(0, 0, 0, 0.35)',
            transition: 'border-color 0.15s ease, transform 0.15s ease',
          }}
          className="hover:border-[var(--blue)] hover:translate-y-[-1px]"
          id="btn-terminal-toggle"
          title="Open interactive engineer terminal"
        >
          <Terminal size={14} style={{ color: 'var(--mint)' }} />
          <span>CLI Terminal</span>
          <span
            style={{
              width: '6px',
              height: '6px',
              borderRadius: '50%',
              background: 'var(--mint)',
              boxShadow: '0 0 0 2px rgba(69, 211, 156, 0.3)',
            }}
          />
        </button>
      </div>

      {/* Terminal Drawer / Popover Window */}
      {isOpen && (
        <div
          style={{
            position: 'fixed',
            bottom: '70px',
            left: '20px',
            width: 'min(480px, calc(100vw - 40px))',
            height: '380px',
            background: '#120c1d',
            border: '1.5px solid var(--line)',
            borderRadius: '16px',
            boxShadow: '0 20px 40px rgba(0, 0, 0, 0.6)',
            zIndex: 999,
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            fontFamily: 'var(--f-mono, monospace)',
          }}
          id="systems-terminal-window"
        >
          {/* Terminal Title Bar */}
          <div
            style={{
              background: '#1d132e',
              borderBottom: '1px solid var(--line)',
              padding: '8px 14px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#ff5f56' }} />
              <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#ffbd2e' }} />
              <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#27c93f' }} />
              <span
                style={{
                  fontSize: '12px',
                  color: 'var(--fg-soft)',
                  marginLeft: '8px',
                  fontWeight: 500,
                }}
              >
                jyotirmya@systems:~
              </span>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              style={{
                background: 'transparent',
                border: 'none',
                color: 'var(--fg-soft)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
              }}
              title="Close terminal"
            >
              <X size={14} />
            </button>
          </div>

          {/* Terminal Output Area */}
          <div
            style={{
              flex: 1,
              padding: '14px',
              overflowY: 'auto',
              fontSize: '13px',
              lineHeight: '1.55',
              color: '#d6ccdf',
            }}
          >
            {history.map((item, idx) => (
              <div key={idx} style={{ marginBottom: '12px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--lav)' }}>
                  <ChevronRight size={13} style={{ color: 'var(--mint)' }} />
                  <span style={{ fontWeight: 600 }}>{item.cmd}</span>
                </div>
                <div style={{ marginTop: '3px', paddingLeft: '18px', color: '#c7bed1' }}>
                  {item.output}
                </div>
              </div>
            ))}
            <div ref={bottomRef} />
          </div>

          {/* Terminal Input Form */}
          <form
            onSubmit={handleCommand}
            style={{
              borderTop: '1px solid var(--line)',
              padding: '8px 12px',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              background: '#160f24',
            }}
          >
            <ChevronRight size={14} style={{ color: 'var(--mint)' }} />
            <input
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              placeholder="type 'help', 'status', 'prs', 'pikachu'..."
              style={{
                flex: 1,
                background: 'transparent',
                border: 'none',
                color: 'var(--fg)',
                outline: 'none',
                fontSize: '13px',
                fontFamily: 'inherit',
              }}
              autoFocus
            />
          </form>
        </div>
      )}
    </>
  );
};
