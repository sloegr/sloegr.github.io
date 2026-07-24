import { FolderOpen, Terminal as TerminalIcon } from 'lucide-react';
import type { Profile, Tab } from '../types';

interface HomePanelProps {
  profile: Profile;
  onNavigate: (tab: Tab) => void;
}

export function HomePanel({ profile, onNavigate }: HomePanelProps) {
  return (
    <section
      className="flex-1 flex flex-col items-center justify-center py-10 z-10 text-center max-w-xl mx-auto"
      aria-labelledby="hero-title"
    >
      <div className="relative inline-block px-8 py-6 border border-[#3b494c] bg-[#141c24]/60">
        <h1
          id="hero-title"
          className="font-sans text-4xl md:text-5xl font-black tracking-tighter text-slate-100 uppercase leading-none"
        >
          {profile.displayName ?? 'PORTFOLIO'}
          <br />
          {profile.displayName ? '' : 'IN PREPARATION'}
        </h1>
      </div>
      <div className="mt-8 space-y-3">
        <p className="font-mono text-sm text-primary tracking-widest">
          &gt; {profile.title ?? 'EVIDENCE-LED ENGINEERING PORTFOLIO'}
          <span className="cursor-blink font-bold">_</span>
        </p>
        <p className="font-mono text-xs text-slate-400 leading-relaxed max-w-lg">
          {profile.summary ??
            'Public profile and project details will appear here only after owner approval.'}
        </p>
      </div>
      <div className="mt-8 w-full flex flex-col gap-4">
        <button onClick={() => onNavigate('archive')} className="primary-button">
          <FolderOpen className="w-4 h-4" aria-hidden="true" /> VIEW PROJECTS
        </button>
        <button onClick={() => onNavigate('terminal')} className="secondary-button">
          <TerminalIcon className="w-4 h-4 text-primary" aria-hidden="true" />
          OPEN PORTFOLIO TERMINAL
        </button>
      </div>
    </section>
  );
}
