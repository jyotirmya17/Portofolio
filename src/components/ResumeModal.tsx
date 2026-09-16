import React from 'react';
import { X, Printer, Mail, Github, Linkedin, MapPin, Phone } from 'lucide-react';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 99999,
        background: 'rgba(8, 4, 16, 0.88)',
        backdropFilter: 'blur(10px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '16px',
      }}
      onClick={onClose}
      id="resume-modal-backdrop"
    >
      <div
        style={{
          background: '#ffffff',
          color: '#111827',
          borderRadius: '16px',
          maxWidth: '860px',
          width: '100%',
          maxHeight: '92vh',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: '0 30px 70px -15px rgba(0, 0, 0, 0.8), 0 0 0 1px rgba(255, 255, 255, 0.15)',
          position: 'relative',
          overflow: 'hidden',
        }}
        onClick={(e) => e.stopPropagation()}
        id="resume-modal-container"
      >
        {/* Top Control Bar (Screen only, hidden in print) */}
        <div
          className="no-print"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '14px 24px',
            background: '#191128',
            color: '#f6f1fb',
            borderBottom: '1px solid rgba(255, 255, 255, 0.12)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span
              style={{
                fontFamily: 'var(--f-mono, monospace)',
                fontSize: '11px',
                fontWeight: 700,
                letterSpacing: '0.05em',
                textTransform: 'uppercase',
                background: 'rgba(185, 156, 255, 0.2)',
                color: 'var(--lav)',
                border: '1px solid rgba(185, 156, 255, 0.35)',
                padding: '3px 8px',
                borderRadius: '6px',
              }}
            >
              PDF Document
            </span>
            <span style={{ fontSize: '13.5px', fontWeight: 600 }}>
              Jyotirmya Sharma — Resume (Verified)
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <button
              type="button"
              onClick={handlePrint}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '6px 14px',
                borderRadius: '8px',
                background: 'var(--lav)',
                color: '#180829',
                fontSize: '12.5px',
                fontWeight: 700,
                border: 'none',
                cursor: 'pointer',
              }}
              className="hover:brightness-110 active:scale-95 transition-all"
              id="btn-print-resume"
              title="Print or save as PDF"
            >
              <Printer size={14} />
              <span>Print / Save PDF</span>
            </button>

            <button
              type="button"
              onClick={onClose}
              style={{
                background: 'rgba(255, 255, 255, 0.1)',
                border: 'none',
                color: '#f6f1fb',
                borderRadius: '8px',
                width: '32px',
                height: '32px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
              }}
              className="hover:bg-white/20 transition-colors"
              aria-label="Close modal"
              id="btn-close-resume-modal"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Scrollable Printable Document Canvas */}
        <div
          style={{
            padding: '36px 40px',
            overflowY: 'auto',
            fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
            fontSize: '13.5px',
            lineHeight: '1.5',
            color: '#1f2937',
            background: '#ffffff',
          }}
          id="printable-resume"
        >
          {/* Header */}
          <header style={{ textAlign: 'center', borderBottom: '2px solid #111827', paddingBottom: '14px', marginBottom: '16px' }}>
            <h1
              style={{
                margin: '0 0 6px',
                fontSize: '26px',
                fontWeight: 800,
                letterSpacing: '0.04em',
                color: '#111827',
                textTransform: 'uppercase',
              }}
            >
              JYOTIRMYA SHARMA
            </h1>
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'center',
                alignItems: 'center',
                gap: '8px 14px',
                fontSize: '12.5px',
                color: '#4b5563',
              }}
            >
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                <MapPin size={13} color="#6b7280" /> Jaipur, Rajasthan
              </span>
              <span>•</span>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                <Phone size={13} color="#6b7280" /> +91 9461791345
              </span>
              <span>•</span>
              <a
                href="mailto:jyotirmya.jm@gmail.com"
                style={{ color: '#2563eb', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '4px' }}
              >
                <Mail size={13} /> jyotirmya.jm@gmail.com
              </a>
              <span>•</span>
              <a
                href="https://www.linkedin.com/in/jyotirmya-sharma-aa3485210/"
                target="_blank"
                rel="noreferrer"
                style={{ color: '#2563eb', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '4px' }}
              >
                <Linkedin size={13} /> linkedin.com/in/jyotirmya-sharma-aa3485210
              </a>
              <span>•</span>
              <a
                href="https://github.com/jyotirmya17"
                target="_blank"
                rel="noreferrer"
                style={{ color: '#2563eb', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '4px' }}
              >
                <Github size={13} /> github.com/jyotirmya17
              </a>
            </div>
          </header>

          {/* Summary */}
          <section style={{ marginBottom: '16px' }}>
            <h2
              style={{
                fontSize: '14px',
                fontWeight: 700,
                textTransform: 'uppercase',
                borderBottom: '1.5px solid #374151',
                paddingBottom: '3px',
                marginBottom: '6px',
                color: '#111827',
                letterSpacing: '0.03em',
              }}
            >
              Summary
            </h2>
            <p style={{ margin: 0, textAlign: 'justify', fontSize: '13px', lineHeight: '1.55' }}>
              Computer Science undergraduate with hands-on experience building <strong>distributed, multi-tiered systems</strong>:
              implemented a quorum-replicated (N=3, W=2, R=2) key-value store from scratch in C++20 with Lamport-timestamp conflict
              resolution and asynchronous read-repair, and shipped production-grade backend services in Node.js, FastAPI, and PostgreSQL
              at scale. Comfortable with object-oriented design, algorithmic complexity, and relational database systems, and have
              merged <strong>8+ peer-reviewed pull requests</strong> to the open-source project <a href="https://github.com/repowise-dev/repowise" target="_blank" rel="noreferrer" style={{ color: '#2563eb', textDecoration: 'underline' }}>repowise-dev/repowise</a>.
            </p>
          </section>

          {/* Education */}
          <section style={{ marginBottom: '16px' }}>
            <h2
              style={{
                fontSize: '14px',
                fontWeight: 700,
                textTransform: 'uppercase',
                borderBottom: '1.5px solid #374151',
                paddingBottom: '3px',
                marginBottom: '6px',
                color: '#111827',
                letterSpacing: '0.03em',
              }}
            >
              Education
            </h2>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', fontWeight: 700 }}>
              <span style={{ fontSize: '13.5px', color: '#111827' }}>Birla Institute of Technology, Mesra</span>
              <span style={{ fontSize: '12.5px', color: '#4b5563' }}>Sept 2023 – Aug 2027</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', color: '#4b5563', fontSize: '13px' }}>
              <span>Bachelor of Technology in Computer Science, <strong>CGPA: 8.3</strong></span>
              <span>Ranchi, Jharkhand</span>
            </div>
          </section>

          {/* Experience */}
          <section style={{ marginBottom: '16px' }}>
            <h2
              style={{
                fontSize: '14px',
                fontWeight: 700,
                textTransform: 'uppercase',
                borderBottom: '1.5px solid #374151',
                paddingBottom: '3px',
                marginBottom: '8px',
                color: '#111827',
                letterSpacing: '0.03em',
              }}
            >
              Experience
            </h2>

            {/* Ultratend */}
            <div style={{ marginBottom: '12px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <span style={{ fontWeight: 700, fontSize: '13.5px', color: '#111827' }}>
                  Software Engineering Intern – Ultratend <span style={{ fontWeight: 400, color: '#4b5563' }}>— Node.js, Express.js, FastAPI, Docker, PostgreSQL</span>
                </span>
                <span style={{ fontSize: '12.5px', fontWeight: 600, color: '#4b5563', whiteSpace: 'nowrap' }}>
                  May 2026 – Present
                </span>
              </div>
              <ul style={{ margin: '4px 0 0', paddingLeft: '18px', lineHeight: '1.5' }}>
                <li>
                  Architected a 3-service microservices backend in Node.js/Express and async FastAPI, containerized with Docker so a single failure cannot cascade across the system.
                </li>
                <li>
                  Built a concurrent Python data-ingestion pipeline using the Strategy pattern, deduplicating and validating exhibitor records before persisting to PostgreSQL.
                </li>
                <li>
                  Shipped a stateless FastAPI inference service for a hybrid recommendation model (collaborative filtering + content-based + Gemini re-ranking), adding JWT authentication and PostgreSQL indexing ahead of production launch.
                </li>
              </ul>
            </div>

            {/* Labelbox */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <span style={{ fontWeight: 700, fontSize: '13.5px', color: '#111827' }}>
                  RL Task Engineer – Labelbox (via Alignerr, contract) <span style={{ fontWeight: 400, color: '#4b5563' }}>— Python, RL Training Pipelines</span>
                </span>
                <span style={{ fontSize: '12.5px', fontWeight: 600, color: '#4b5563', whiteSpace: 'nowrap' }}>
                  Remote | July 2026
                </span>
              </div>
              <ul style={{ margin: '4px 0 0', paddingLeft: '18px', lineHeight: '1.5' }}>
                <li>
                  Authored and debugged reinforcement learning tasks (truss-optimization) for a third-party training pipeline and evaluation harness, working independently inside an unfamiliar codebase.
                </li>
                <li>
                  Resolved scoring-calibration issues flagged across CI review rounds, iterating on task design from automated grading feedback.
                </li>
              </ul>
            </div>
          </section>

          {/* Projects */}
          <section style={{ marginBottom: '16px' }}>
            <h2
              style={{
                fontSize: '14px',
                fontWeight: 700,
                textTransform: 'uppercase',
                borderBottom: '1.5px solid #374151',
                paddingBottom: '3px',
                marginBottom: '8px',
                color: '#111827',
                letterSpacing: '0.03em',
              }}
            >
              Projects
            </h2>

            {/* Quorum */}
            <div style={{ marginBottom: '10px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <span style={{ fontWeight: 700, fontSize: '13.5px', color: '#111827' }}>
                  Quorum — Distributed In-Memory Key-Value Store
                </span>
                <a
                  href="https://github.com/jyotirmya17/quorum"
                  target="_blank"
                  rel="noreferrer"
                  style={{ fontSize: '12.5px', color: '#2563eb', textDecoration: 'none', fontWeight: 600 }}
                >
                  GitHub ↗
                </a>
              </div>
              <div style={{ fontSize: '12px', color: '#4b5563', fontStyle: 'italic', marginBottom: '3px' }}>
                Tools: C++20, Custom TCP Sockets, Protocol Buffers, CMake, Multithreading
              </div>
              <ul style={{ margin: 0, paddingLeft: '18px', lineHeight: '1.45' }}>
                <li>
                  Built a distributed key-value store from scratch in C++20, partitioning data with consistent hashing over virtual nodes for even load distribution.
                </li>
                <li>
                  Implemented quorum-based replication (N=3, W=2, R=2) with Lamport-timestamp conflict resolution and asynchronous read-repair, tolerating node failure without blocking reads.
                </li>
                <li>
                  Validated fault tolerance by killing live cluster nodes mid-operation, confirming zero data loss across every test run.
                </li>
              </ul>
            </div>

            {/* Agent Spend Governor */}
            <div style={{ marginBottom: '10px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <span style={{ fontWeight: 700, fontSize: '13.5px', color: '#111827' }}>
                  Agent Spend Governor — Defense Layer for Autonomous AI-Agent Payments
                </span>
                <div style={{ fontSize: '12.5px', display: 'flex', gap: '8px' }}>
                  <a
                    href="https://agent-spend-governor.vercel.app"
                    target="_blank"
                    rel="noreferrer"
                    style={{ color: '#2563eb', textDecoration: 'none', fontWeight: 600 }}
                  >
                    Live ↗
                  </a>
                  <span>|</span>
                  <a
                    href="https://github.com/jyotirmya17/agent-spend-governor"
                    target="_blank"
                    rel="noreferrer"
                    style={{ color: '#2563eb', textDecoration: 'none', fontWeight: 600 }}
                  >
                    GitHub ↗
                  </a>
                </div>
              </div>
              <div style={{ fontSize: '12px', color: '#4b5563', fontStyle: 'italic', marginBottom: '3px' }}>
                Tools: Python, FastAPI, PostgreSQL, scikit-learn, RazorpayX API, Next.js
              </div>
              <ul style={{ margin: 0, paddingLeft: '18px', lineHeight: '1.45' }}>
                <li>
                  Designed a two-layer risk engine combining deterministic policy enforcement with behavioral anomaly detection (Isolation Forest) and payment-instruction provenance tracking, catching prompt-injection-style attacks invisible to field-level checks.
                </li>
                <li>
                  Enforced spend caps and payout idempotency with PostgreSQL row-level locking, preventing concurrent requests from exceeding limits or double-executing a payment, covered by 44 passing automated tests.
                </li>
                <li>
                  Ran a temporally-split evaluation across 10,000 synthetic transactions and transparently reported that the ML layer underperforms a rules baseline on aggregate cost while independently catching 5/5 adversarial multi-signal attacks; backed by a SHA-256 hash-chained, tamper-evident audit trail.
                </li>
              </ul>
            </div>

            {/* LinkLytics */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <span style={{ fontWeight: 700, fontSize: '13.5px', color: '#111827' }}>
                  LinkLytics — Link Analytics Platform with Payments &amp; Billing
                </span>
                <div style={{ fontSize: '12.5px', display: 'flex', gap: '8px' }}>
                  <a
                    href="https://linklytics-omega.vercel.app"
                    target="_blank"
                    rel="noreferrer"
                    style={{ color: '#2563eb', textDecoration: 'none', fontWeight: 600 }}
                  >
                    Live ↗
                  </a>
                  <span>|</span>
                  <a
                    href="https://github.com/jyotirmya17/linklytics"
                    target="_blank"
                    rel="noreferrer"
                    style={{ color: '#2563eb', textDecoration: 'none', fontWeight: 600 }}
                  >
                    GitHub ↗
                  </a>
                </div>
              </div>
              <div style={{ fontSize: '12px', color: '#4b5563', fontStyle: 'italic', marginBottom: '3px' }}>
                Tools: Next.js 15, TypeScript, Convex, Clerk, Razorpay, Jest
              </div>
              <ul style={{ margin: 0, paddingLeft: '18px', lineHeight: '1.45' }}>
                <li>
                  Built a link analytics platform tracking clicks, referrers, and engagement in real time across 3 subscription tiers (Free, Pro, Creator Plus).
                </li>
                <li>
                  Cut redirect latency to sub-100ms on a serverless Convex backend by decoupling analytics writes from the redirect critical path.
                </li>
                <li>
                  Implemented HMAC-SHA256 webhook signature verification and idempotent event handling for Razorpay billing, covered by Jest unit tests, preventing double-charges on retried webhooks.
                </li>
              </ul>
            </div>
          </section>

          {/* Skills */}
          <section style={{ marginBottom: '16px' }}>
            <h2
              style={{
                fontSize: '14px',
                fontWeight: 700,
                textTransform: 'uppercase',
                borderBottom: '1.5px solid #374151',
                paddingBottom: '3px',
                marginBottom: '6px',
                color: '#111827',
                letterSpacing: '0.03em',
              }}
            >
              Skills
            </h2>
            <ul style={{ margin: 0, paddingLeft: '18px', lineHeight: '1.55' }}>
              <li>
                <strong>Languages:</strong> Python, JavaScript, TypeScript, Go (basic), C/C++, SQL
              </li>
              <li>
                <strong>Backend &amp; Databases:</strong> Node.js, Express.js, FastAPI, REST API design, PostgreSQL, MongoDB Atlas, Redis, Convex
              </li>
              <li>
                <strong>AI/LLM &amp; Tooling:</strong> LangChain, RAG, Gemini API, OpenAI API, Groq, Whisper, sentence-transformers, Claude Code (daily use)
              </li>
              <li>
                <strong>Cloud &amp; DevOps:</strong> Docker, AWS ECS/ECR, Vercel, Railway, Render, Git, JWT, HMAC-SHA256
              </li>
            </ul>
          </section>

          {/* Open Source and Contributions */}
          <section>
            <h2
              style={{
                fontSize: '14px',
                fontWeight: 700,
                textTransform: 'uppercase',
                borderBottom: '1.5px solid #374151',
                paddingBottom: '3px',
                marginBottom: '6px',
                color: '#111827',
                letterSpacing: '0.03em',
              }}
            >
              Open Source and Contributions
            </h2>
            <ul style={{ margin: 0, paddingLeft: '18px', lineHeight: '1.55' }}>
              <li>
                <strong>Open Source Contributor</strong> — <a href="https://github.com/repowise-dev/repowise" target="_blank" rel="noreferrer" style={{ color: '#2563eb', textDecoration: 'underline' }}>repowise-dev/repowise</a> (Python, Node.js): merged <strong>8+ pull requests</strong>, fixing a Python submodule attribute-call bug and a Node.js exports-wildcard resolution bug, both reviewed and merged by the maintainer.
              </li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
};
