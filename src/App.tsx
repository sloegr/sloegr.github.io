import { useCallback, useEffect, useState } from 'react';
import { HomePanel } from './components/HomePanel';
import { PointerReadout } from './components/PointerReadout';
import { PortfolioNavigation } from './components/PortfolioNavigation';
import { ProjectArchive } from './components/ProjectArchive';
import { ProjectDialog } from './components/ProjectDialog';
import { TerminalPanel } from './components/TerminalPanel';
import { PROFILE, PROJECTS } from './data';
import { usePortfolioAudio } from './hooks/usePortfolioAudio';
import { useTerminal } from './hooks/useTerminal';
import type { Project, Tab } from './types';

export default function App() {
  const [isBooting, setIsBooting] = useState(true);
  const [bootText, setBootText] = useState('> INITIALIZING INTERFACE…');
  const [activeTab, setActiveTab] = useState<Tab>('root');
  const [audioEnabled, setAudioEnabled] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const { playBeep } = usePortfolioAudio(audioEnabled);

  const toggleAudio = useCallback(() => {
    setAudioEnabled((enabled) => !enabled);
  }, []);
  const terminal = useTerminal({
    profile: PROFILE,
    projects: PROJECTS,
    onToggleSound: toggleAudio,
    playBeep,
  });

  useEffect(() => {
    const messages = [
      '> INITIALIZING INTERFACE…',
      '> LOADING PORTFOLIO SHELL…',
      '> READY.',
    ];
    let index = 0;
    const interval = window.setInterval(() => {
      index += 1;
      if (index === messages.length) {
        window.clearInterval(interval);
        setIsBooting(false);
      } else {
        setBootText(messages[index]);
      }
    }, 250);
    return () => window.clearInterval(interval);
  }, []);

  const navigate = useCallback(
    (tab: Tab) => {
      setActiveTab(tab);
      playBeep(500, 0.05);
    },
    [playBeep],
  );

  const openProject = useCallback(
    (project: Project) => {
      setSelectedProject(project);
      playBeep(650, 0.08);
    },
    [playBeep],
  );

  return (
    <div className="min-h-screen relative font-sans text-slate-300 selection:bg-primary selection:text-background-dark overflow-x-hidden flex flex-col">
      <div className="scanline z-50" aria-hidden="true" />
      {isBooting && <BootScreen bootText={bootText} onSkip={() => setIsBooting(false)} />}

      <PortfolioNavigation
        activeTab={activeTab}
        audioEnabled={audioEnabled}
        profile={PROFILE}
        onNavigate={navigate}
        onToggleAudio={toggleAudio}
      />

      <main className="flex-1 pt-14 pb-20 md:pb-8 px-4 md:px-10 max-w-7xl w-full mx-auto flex flex-col justify-center relative">
        <LayoutReadouts />
        {activeTab === 'root' && <HomePanel profile={PROFILE} onNavigate={navigate} />}
        {activeTab === 'terminal' && (
          <TerminalPanel
            input={terminal.input}
            lines={terminal.lines}
            onInputChange={terminal.setInput}
            onSubmit={terminal.submit}
          />
        )}
        {activeTab === 'archive' && (
          <ProjectArchive projects={PROJECTS} onOpenProject={openProject} />
        )}
      </main>

      {selectedProject && (
        <ProjectDialog project={selectedProject} onClose={() => setSelectedProject(null)} />
      )}
    </div>
  );
}

function BootScreen({ bootText, onSkip }: { bootText: string; onSkip: () => void }) {
  return (
    <div
      className="fixed inset-0 bg-[#0f1419] z-9999 flex flex-col items-center justify-center p-6"
      role="status"
      aria-live="polite"
    >
      <div className="text-primary font-mono tracking-widest border border-primary/30 p-8 bg-[#0a0f14]/80 flex flex-col items-center max-w-md w-full">
        <div
          className="boot-orb w-12 h-12 mb-6 border-2 border-primary border-t-transparent"
          aria-hidden="true"
        />
        <p className="text-sm text-center">{bootText}</p>
        <button
          onClick={onSkip}
          className="mt-6 text-xs underline underline-offset-4 hover:text-slate-100"
        >
          Skip intro
        </button>
      </div>
    </div>
  );
}

function LayoutReadouts() {
  return (
    <>
      <div
        className="absolute top-18 left-4 hidden sm:flex flex-col gap-1 pointer-events-none opacity-40 select-none"
        aria-hidden="true"
      >
        <span className="font-mono text-[10px] text-primary">INTERFACE LAYER: PORTFOLIO</span>
        <span className="font-mono text-[10px] text-primary">VISUALIZATION MODE</span>
      </div>
      <PointerReadout />
    </>
  );
}
