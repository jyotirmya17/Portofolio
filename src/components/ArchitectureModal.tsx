import React from 'react';
import { X, ShieldCheck, Database, Cpu, ArrowRight, CheckCircle2, Lock, GitCommit, Layers } from 'lucide-react';

interface ArchitectureModalProps {
  projectId: string | null;
  onClose: () => void;
}

export const ArchitectureModal: React.FC<ArchitectureModalProps> = ({ projectId, onClose }) => {
  if (!projectId) return null;

  const isGovernor = projectId === 'p-governor';
  const isQuorum = projectId === 'p-quorum';

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        background: 'rgba(10, 6, 18, 0.85)',
        backdropFilter: 'blur(8px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
      }}
      onClick={onClose}
    >
      <div
        style={{
          background: '#191128',
          border: '1.5px solid var(--line)',
          borderRadius: '20px',
          maxWidth: '780px',
          width: '100%',
          maxHeight: '90vh',
          overflowY: 'auto',
          padding: 'clamp(20px, 3vw, 32px)',
          position: 'relative',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.6)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            background: 'rgba(255, 255, 255, 0.08)',
            border: 'none',
            color: 'var(--fg)',
            borderRadius: '50%',
            width: '36px',
            height: '36px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
          }}
          aria-label="Close modal"
        >
          <X size={18} />
        </button>

        {isGovernor && (
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
              <span
                style={{
                  fontSize: '12px',
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  color: 'var(--grape)',
                  background: 'rgba(216, 180, 254, 0.12)',
                  padding: '3px 10px',
                  borderRadius: '6px',
                }}
              >
                Architecture Inspection
              </span>
            </div>
            <h3 style={{ fontSize: '24px', fontWeight: 700, margin: '0 0 12px 0', color: '#fff' }}>
              Agent Spend Governor — Execution Pipeline
            </h3>
            <p style={{ color: 'var(--fg-soft)', fontSize: '15px', lineHeight: '1.6', marginBottom: '24px' }}>
              How an autonomous AI-agent payout intent travels through deterministic policy gates, anomaly
              detection, idempotency locks, and bank rails.
            </p>

            {/* Pipeline Flowchart */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '28px' }}>
              {[
                {
                  step: '01',
                  title: 'Ingress & Provenance Verification',
                  desc: 'Agent submits execution intent with cryptographic instruction hash and task context.',
                  badge: 'FastAPI / Ed25519',
                },
                {
                  step: '02',
                  title: 'Deterministic Policy Engine',
                  desc: 'Evaluates hard constraints: per-transaction ceiling, cumulative 24h budget, vendor allowlist.',
                  badge: 'Sub-millisecond Rule Engine',
                },
                {
                  step: '03',
                  title: 'Statistical Anomaly Detector',
                  desc: 'Calculates anomaly score against historical agent behavior using Isolation Forest.',
                  badge: 'Scikit-Learn / Isolation Forest',
                },
                {
                  step: '04',
                  title: 'Atomic Idempotency Lock & Ledger',
                  desc: 'PostgreSQL advisory locks prevent duplicate agent concurrent retries and double-spending.',
                  badge: 'PostgreSQL ACID Transaction',
                },
                {
                  step: '05',
                  title: 'Bank Rail Payout & Audit Entry',
                  desc: 'Dispatches signed webhook to RazorpayX API and persists append-only tamper-evident audit record.',
                  badge: 'RazorpayX & Immutable Hash Chain',
                },
              ].map((stage, idx) => (
                <div
                  key={idx}
                  style={{
                    background: 'rgba(255, 255, 255, 0.03)',
                    border: '1px solid rgba(255, 255, 255, 0.07)',
                    borderRadius: '12px',
                    padding: '14px 18px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '14px',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                    <span
                      style={{
                        fontFamily: 'var(--f-mono, monospace)',
                        fontSize: '13px',
                        color: 'var(--grape)',
                        fontWeight: 700,
                      }}
                    >
                      {stage.step}
                    </span>
                    <div>
                      <h4 style={{ margin: 0, fontSize: '15.5px', fontWeight: 600, color: 'var(--fg)' }}>
                        {stage.title}
                      </h4>
                      <p style={{ margin: 0, fontSize: '13.5px', color: 'var(--fg-soft)', marginTop: '2px' }}>
                        {stage.desc}
                      </p>
                    </div>
                  </div>
                  <span
                    style={{
                      fontSize: '11px',
                      color: '#d6ccdf',
                      background: 'rgba(255, 255, 255, 0.06)',
                      padding: '4px 8px',
                      borderRadius: '6px',
                      whiteSpace: 'nowrap',
                      flexShrink: 0,
                    }}
                  >
                    {stage.badge}
                  </span>
                </div>
              ))}
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <a
                href="https://github.com/jyotirmya17/razorpay-agent-spend-governor"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-ink"
                style={{ fontSize: '14px', height: '40px' }}
              >
                View Repository on GitHub
              </a>
            </div>
          </div>
        )}

        {isQuorum && (
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
              <span
                style={{
                  fontSize: '12px',
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  color: 'var(--blue)',
                  background: 'rgba(63, 162, 255, 0.12)',
                  padding: '3px 10px',
                  borderRadius: '6px',
                }}
              >
                Systems Design Blueprint
              </span>
            </div>
            <h3 style={{ fontSize: '24px', fontWeight: 700, margin: '0 0 12px 0', color: '#fff' }}>
              Quorum — Distributed KV Replication Topology
            </h3>
            <p style={{ color: 'var(--fg-soft)', fontSize: '15px', lineHeight: '1.6', marginBottom: '24px' }}>
              How keys are partitioned across node rings, synchronized with Lamport clocks, and healed
              via asynchronous read repair.
            </p>

            {/* Pipeline Flowchart */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '28px' }}>
              {[
                {
                  step: '01',
                  title: 'Consistent Hashing Ring (Murmur3)',
                  desc: 'Keys mapped onto 2^32 ring with 128 virtual tokens per physical node to prevent hotspotting.',
                  badge: 'MurmurHash3 / C++20 std::map',
                },
                {
                  step: '02',
                  title: 'Quorum Coordinator (W + R > N)',
                  desc: 'Replication factor N=3. Coordinator dispatches asynchronous parallel RPCs to top-N nodes.',
                  badge: 'TCP Sockets / Protobuf',
                },
                {
                  step: '03',
                  title: 'Lamport Timestamps & Conflict Resolution',
                  desc: 'Each mutation carries logical timestamp + node ID. Last-Write-Wins (LWW) guarantees deterministic convergence.',
                  badge: 'Logical Clock / LWW',
                },
                {
                  step: '04',
                  title: 'Asynchronous Read Repair',
                  desc: 'When read quorum detects stale replicas, coordinator spawns background thread to update lagging nodes.',
                  badge: 'Background Worker Threads',
                },
                {
                  step: '05',
                  title: 'Heartbeat & Failure Detector',
                  desc: 'Phi Accrual or periodic gossip pings detect unresponsive nodes and route traffic to healthy replicas.',
                  badge: 'Crash Fault Tolerant',
                },
              ].map((stage, idx) => (
                <div
                  key={idx}
                  style={{
                    background: 'rgba(255, 255, 255, 0.03)',
                    border: '1px solid rgba(255, 255, 255, 0.07)',
                    borderRadius: '12px',
                    padding: '14px 18px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '14px',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                    <span
                      style={{
                        fontFamily: 'var(--f-mono, monospace)',
                        fontSize: '13px',
                        color: 'var(--blue)',
                        fontWeight: 700,
                      }}
                    >
                      {stage.step}
                    </span>
                    <div>
                      <h4 style={{ margin: 0, fontSize: '15.5px', fontWeight: 600, color: 'var(--fg)' }}>
                        {stage.title}
                      </h4>
                      <p style={{ margin: 0, fontSize: '13.5px', color: 'var(--fg-soft)', marginTop: '2px' }}>
                        {stage.desc}
                      </p>
                    </div>
                  </div>
                  <span
                    style={{
                      fontSize: '11px',
                      color: '#d6ccdf',
                      background: 'rgba(255, 255, 255, 0.06)',
                      padding: '4px 8px',
                      borderRadius: '6px',
                      whiteSpace: 'nowrap',
                      flexShrink: 0,
                    }}
                  >
                    {stage.badge}
                  </span>
                </div>
              ))}
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <a
                href="https://github.com/jyotirmya17/quorum"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-ink"
                style={{ fontSize: '14px', height: '40px' }}
              >
                View Repository on GitHub
              </a>
            </div>
          </div>
        )}

        {!isGovernor && !isQuorum && (
          <div>
            <h3 style={{ fontSize: '20px', fontWeight: 600, margin: '0 0 8px 0', color: '#fff' }}>
              Project Architecture
            </h3>
            <p style={{ color: 'var(--fg-soft)', fontSize: '14.5px' }}>
              Detailed systems layout and architecture flow.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
