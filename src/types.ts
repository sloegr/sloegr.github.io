export interface PublicLink {
  label: string;
  url: string;
}

export interface Profile {
  displayName?: string;
  title?: string;
  summary?: string;
  bio?: string;
  location?: string;
  email?: string;
  links: PublicLink[];
  resumeUrl?: string;
}

export interface ProjectLink {
  label: string;
  url?: string;
  unavailableLabel?: string;
}

export interface ProjectEvidence {
  label: string;
  value: string;
}

export interface Project {
  id: string;
  title: string;
  status: string;
  summary: string;
  problem?: string;
  role?: string;
  constraints?: string;
  solution?: string;
  outcome?: string;
  agentWorkflow?: string;
  technologies: string[];
  evidence?: ProjectEvidence[];
  image?: { src: string; alt: string };
  live?: ProjectLink;
  repository?: ProjectLink;
}

export type Tab = 'root' | 'terminal' | 'archive';

export interface TerminalLine {
  text: string;
  type: 'input' | 'output' | 'error' | 'success' | 'info' | 'ascii';
}
