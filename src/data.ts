import { Project, JourneyItem, ToolkitCategory } from './types';

export const PROJECTS: Project[] = [
  {
    id: 'p-governor',
    tabTitle: 'AI Governance',
    title: 'Agent Spend Governor',
    category: 'AI Infrastructure · Fintech · Security',
    description:
      'A governance layer for autonomous AI-agent payouts that combines deterministic policy enforcement, behavioral anomaly detection, instruction provenance, and tamper-evident auditing.',
    learned:
      'Building systems where authorization isn\'t enough — decisions need to be concurrency-safe, idempotent, auditable, and failure-aware.',
    tools: ['Python', 'FastAPI', 'PostgreSQL', 'Next.js', 'RazorpayX', 'Isolation Forest'],
    themeClass: 't-grape',
    githubUrl: 'https://github.com/jyotirmya17/razorpay-agent-spend-governor',
    index: 0,
  },
  {
    id: 'p-quorum',
    tabTitle: 'Distributed KV',
    title: 'Quorum',
    category: 'Distributed Systems · C++',
    description:
      'A distributed in-memory key-value store built from scratch with consistent hashing, quorum replication, Lamport timestamps, asynchronous read repair, and fault testing.',
    learned:
      'Once you stop assuming every node is healthy, consistency, failure recovery, and concurrency become the real design problem.',
    tools: ['C++20', 'TCP', 'Protobuf', 'Multithreading', 'Consistent Hashing'],
    themeClass: 't-blue',
    githubUrl: 'https://github.com/jyotirmya17/quorum',
    index: 1,
  },
  {
    id: 'p-linklytics',
    tabTitle: 'Link Analytics',
    title: 'LinkLytics',
    category: 'BACKEND · DISTRIBUTED SYSTEMS · PAYMENTS',
    description:
      'High-throughput short-link infrastructure with low-latency redirects, asynchronous analytics, and reliable subscription billing.',
    learned:
      'Keeping the critical path fast meant separating redirects from analytics, while payment systems demanded verification, idempotency, and explicit state transitions.',
    tools: ['Next.js 15', 'TypeScript', 'Convex', 'Redis', 'Razorpay', 'Jest'],
    themeClass: 't-butter',
    githubUrl: 'https://github.com/jyotirmya17/linklytics',
    index: 2,
  },
  {
    id: 'p-collabcode',
    tabTitle: 'Real-time Sync',
    title: 'CollabCode',
    category: 'Real-time Systems · AWS',
    description:
      'A real-time collaborative code editor with Socket.io state synchronization, a Dockerized backend, and AWS ECS deployment with load balancing.',
    learned:
      'Taking something from localhost to production changes the engineering questions completely.',
    tools: ['React', 'Node.js', 'Socket.io', 'Docker', 'AWS ECS'],
    themeClass: 't-mint',
    githubUrl: 'https://github.com/jyotirmya17/collabcode',
    index: 3,
  },
];

export const JOURNEY_ITEMS: JourneyItem[] = [
  {
    year: '2026',
    role: 'Software Engineering Intern',
    org: 'ULTRATEND',
    when: 'Now',
    colorVar: 'var(--mint)',
    isCurrent: true,
    isOpen: true,
    changes: [
      'Building backend and AI infrastructure for a distributed platform — from concurrent data pipelines and PostgreSQL-backed services to a stateless recommendation system combining traditional ML with LLM re-ranking. Working across Node.js, FastAPI, Docker, and async Python while thinking about reliability, scalability, and clean service boundaries.',
    ],
    tools: ['Node.js', 'FastAPI', 'Docker', 'PostgreSQL', 'Async Python', 'Distributed Systems'],
    secondary: 'Stateless Recommendation & LLM Re-ranking',
  },
  {
    year: '2026',
    role: 'Agent Spend Governor',
    org: 'AI · Security · Fintech',
    when: '2026',
    colorVar: 'var(--grape)',
    isOpen: true,
    changes: [
      'Built a governance layer for autonomous AI-agent payments, with concurrency-safe spending controls, anomaly detection, provenance checks, and tamper-evident auditing.',
      'Learned that correctness matters a lot more when money is involved.',
    ],
    tools: ['Python', 'FastAPI', 'PostgreSQL', 'RazorpayX', 'Isolation Forest'],
  },
  {
    year: '2026',
    role: 'Quorum',
    org: 'Distributed Systems',
    when: '2026',
    colorVar: 'var(--blue)',
    isOpen: true,
    changes: [
      'Built a distributed key-value store from scratch in C++20.',
      'Learned that the interesting part of distributed systems is everything that happens when a node disappears.',
    ],
    tools: ['C++20', 'TCP', 'Protobuf', 'Consistent Hashing', 'Quorum Replication'],
  },
  {
    year: '2025',
    role: 'Building in Public',
    org: 'Projects · Open Source · Experiments',
    when: '2025',
    colorVar: 'var(--peri)',
    isOpen: false,
    changes: [
      'Started contributing to open source, building production applications, and going deeper into backend engineering, AI, and systems.',
      'Investigated real-world concurrency issues, fault recovery mechanisms, and observability in production.',
    ],
    tools: ['Go', 'TypeScript', 'Docker', 'Systems', 'Open Source'],
  },
  {
    year: '2023',
    role: 'BIT Mesra',
    org: 'B.Tech CSE',
    when: '2023 – 2027',
    colorVar: 'var(--butter)',
    isOpen: false,
    changes: [
      'Started studying Computer Science and Engineering (B.Tech CSE).',
      'Eventually realized that I enjoyed building things more than just learning about them.',
    ],
    tools: ['Algorithms', 'OS', 'Networks', 'Database Systems', 'C/C++'],
    secondary: 'B.Tech in Computer Science and Engineering (CSE), Birla Institute of Technology, Mesra',
  },
];

export const TOOLKIT_CATEGORIES: ToolkitCategory[] = [
  {
    title: 'Languages',
    keyClass: 'k-lang',
    items: ['Python', 'C++', 'TypeScript', 'JavaScript', 'C', 'SQL'],
  },
  {
    title: 'Backend',
    keyClass: 'k-back',
    items: ['Node.js', 'Express', 'FastAPI', 'REST APIs', 'PostgreSQL', 'Redis'],
  },
  {
    title: 'Systems',
    keyClass: 'k-db',
    items: ['Distributed Systems', 'Concurrency', 'Async Programming', 'TCP', 'Protobuf', 'Consistent Hashing'],
  },
  {
    title: 'AI',
    keyClass: 'k-front',
    items: ['LLMs', 'RAG', 'AI Agents', 'LangChain', 'Gemini', 'OpenAI', 'Groq', 'Whisper'],
  },
  {
    title: 'Infrastructure',
    keyClass: 'k-tools',
    items: ['Docker', 'AWS ECS', 'Git', 'GitHub', 'Vercel', 'Railway'],
  },
];
