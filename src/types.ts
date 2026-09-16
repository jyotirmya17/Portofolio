export interface Project {
  id: string;
  tabTitle: string;
  title: string;
  category: string;
  description: string;
  learned: string;
  tools: string[];
  themeClass: 't-grape' | 't-blue' | 't-butter' | 't-peri' | 't-mint';
  githubUrl: string;
  liveUrl?: string;
  index: number;
}

export interface JourneyItem {
  year: string;
  role: string;
  org: string;
  when: string;
  colorVar: string;
  isCurrent?: boolean;
  isOpen?: boolean;
  changes: string[];
  tools?: string[];
  secondary?: string;
}

export interface ToolkitCategory {
  title: string;
  keyClass: string;
  items: string[];
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  publishDate: string;
  year: number;
  readingTime: string;
  category: string;
  tags: string[];
  summary: string;
  intro: string;
  problem: string;
  whyObviousFails: string;
  architectureMentalModel: string;
  technicalImplementation: string;
  mermaidDiagrams: {
    title: string;
    caption: string;
    code: string;
  }[];
  codeSnippet: {
    language: string;
    filename: string;
    description: string;
    code: string;
  };
  tradeOffs: {
    decision: string;
    advantage: string;
    drawback: string;
  }[];
  failureCases: {
    scenario: string;
    impact: string;
    mitigation: string;
  }[];
  whatILearned: string;
  whatIWouldChangeNext: string;
  conclusion: string;
  relatedProjects: {
    name: string;
    repo: string;
    description: string;
  }[];
  references: {
    title: string;
    source: string;
    note: string;
  }[];
}

