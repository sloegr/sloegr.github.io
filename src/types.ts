/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface ProjectSpec {
  label: string;
  value: string;
}

export interface ProjectMetric {
  label: string;
  value: string;
  color?: string;
}

export interface Project {
  id: string;
  title: string;
  status: string;
  description: string;
  tech: string[];
  specs: ProjectSpec[];
  imageUrl: string;
  metrics: ProjectMetric[];
}

export interface LedgerItem {
  tool: string;
  type: string;
  proficiency: number;
  status: 'ONLINE' | 'OFFLINE' | 'ACTIVE' | 'READY' | 'IDLE';
}

export interface TerminalLine {
  text: string;
  type: 'input' | 'output' | 'error' | 'success' | 'info' | 'ascii';
}
