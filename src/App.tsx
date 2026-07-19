import { FormEvent, useCallback, useEffect, useRef, useState } from 'react';
import type { KeyboardEvent as ReactKeyboardEvent } from 'react';
import {
  Activity,
  ExternalLink,
  FolderOpen,
  Keyboard,
  Menu,
  Terminal as TerminalIcon,
  Volume2,
  VolumeX,
  X,
} from 'lucide-react';
import { PROFILE, PROJECTS, TOOL_PRACTICES, WORKFLOW_STAGES } from './data';
import { Project, TerminalLine } from './types';

type Tab = 'root' | 'terminal' | 'archive' | 'status';

const initialTerminalLines: TerminalLine[] = [
  { text: '==================================================', type: 'ascii' },
  { text: '     PORTFOLIO COMMAND TERMINAL', type: 'success' },
  { text: '==================================================', type: 'ascii' },
  { text: 'Content is shown only when it has been approved for publication.', type: 'info' },
  { text: 'Enter "help" to view available commands.', type: 'info' },
];

function PointerReadout() {
  const [point, setPoint] = useState({ x: 0, y: 0 });
  const frame = useRef<number | null>(null);
  const pending = useRef(point);

  useEffect(() => {
    const updatePoint = (event: PointerEvent) => {
      pending.current = { x: Math.round(event.clientX), y: Math.round(event.clientY) };
      if (frame.current === null) {
        frame.current = window.requestAnimationFrame(() => {
          setPoint(pending.current);
          frame.current = null;
        });
      }
    };
    window.addEventListener('pointermove', updatePoint, { passive: true });
    return () => {
      window.removeEventListener('pointermove', updatePoint);
      if (frame.current !== null) window.cancelAnimationFrame(frame.current);
    };
  }, []);

  return (
    <div className="absolute top-18 right-4 hidden sm:flex flex-col items-end gap-1 pointer-events-none opacity-40 select-none" aria-hidden="true">
      <span className="font-mono text-[10px] text-primary">LOCAL POINTER SIGNAL</span>
      <span className="font-mono text-[10px] text-primary">COORD: [{point.x}, {point.y}]</span>
    </div>
  );
}

function SignalVisualizer() {
  const [heights, setHeights] = useState([28, 48, 24, 64, 40, 32, 56, 36]);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setHeights((previous) => previous.map((_, index) => 22 + ((index * 17 + Date.now() / 50) % 52)));
    }, 500);
    return () => window.clearInterval(interval);
  }, []);

  return (
    <div className="border border-[#3b494c] p-4 bg-[#141c24]/50 rounded-sm" aria-label="Decorative interface signal visualization">
      <div className="flex items-center gap-2 mb-3 border-b border-[#3b494c]/60 pb-2">
        <Activity className="w-3.5 h-3.5 text-primary" aria-hidden="true" />
        <span className="font-mono text-[10px] text-primary uppercase tracking-widest">INTERFACE SIGNAL · VISUALIZATION</span>
      </div>
      <div className="h-20 bg-[#0a0f14] border border-[#3b494c]/60 flex items-end justify-around px-4 py-2" aria-hidden="true">
        {heights.map((height, index) => (
          <div key={index} className="w-1.5 bg-primary/85 telemetry-bar" style={{ height: `${height}%` }} />
        ))}
      </div>
    </div>
  );
}

function ProjectDialog({ project, onClose }: { project: Project; onClose: () => void }) {
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onEscape);
    dialogRef.current?.querySelector<HTMLElement>('button, a[href]')?.focus();
    return () => document.removeEventListener('keydown', onEscape);
  }, [onClose]);

  const trapFocus = (event: ReactKeyboardEvent<HTMLDivElement>) => {
    if (event.key !== 'Tab') return;
    const focusable: HTMLElement[] = dialogRef.current
      ? Array.from(dialogRef.current.querySelectorAll<HTMLElement>('a[href], button:not([disabled])'))
      : [];
    if (!focusable.length) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  };

  const action = (link: Project['live'] | Project['repository']) => link.url ? (
    <a href={link.url} target="_blank" rel="noreferrer" className="modal-action">
      {link.label} <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
    </a>
  ) : (
    <span className="modal-action modal-action-disabled">{link.unavailableLabel ?? 'Not publicly available'}</span>
  );

  return (
    <div className="fixed inset-0 bg-[#0a0f14]/85 backdrop-blur-sm z-9999 flex items-center justify-center p-4" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}>
      <div ref={dialogRef} role="dialog" aria-modal="true" aria-labelledby="project-dialog-title" onKeyDown={trapFocus} className="relative w-full max-w-3xl bg-[#0f1419] border-2 border-primary p-5 md:p-8 flex flex-col shadow-[0_0_50px_rgba(0,229,255,0.25)] rounded-sm max-h-[90vh]">
        <div className="flex justify-between items-start gap-3 border-b border-[#3b494c] pb-4 mb-4 shrink-0">
          <div>
            <p className="font-mono text-[10px] text-primary uppercase tracking-wider">Project case study</p>
            <h2 id="project-dialog-title" className="font-sans text-xl font-bold text-slate-100 tracking-wide">{project.title}</h2>
          </div>
          <button onClick={onClose} aria-label="Close project details" className="icon-button"><X className="w-5 h-5" aria-hidden="true" /></button>
        </div>

        <div className="overflow-y-auto pr-1 space-y-6 text-sm">
          {project.image && <img src={project.image.src} alt={project.image.alt} className="w-full max-h-72 object-contain border border-[#3b494c]" />}
          <p className="font-mono text-slate-300 leading-relaxed">{project.summary}</p>
          <div className="grid md:grid-cols-2 gap-4">
            <Detail label="Problem" value={project.problem} />
            <Detail label="Role and contribution" value={project.role} />
            {project.constraints && <Detail label="Constraints" value={project.constraints} />}
            {project.solution && <Detail label="Solution" value={project.solution} />}
            {project.outcome && <Detail label="Outcome" value={project.outcome} />}
            {project.agentWorkflow && <Detail label="Agent workflow and review" value={project.agentWorkflow} />}
          </div>
          {project.evidence.length > 0 && <div><h3 className="section-label">Evidence</h3><ul className="space-y-2">{project.evidence.map((item) => <li key={item.label} className="font-mono text-xs text-slate-300"><span className="text-primary">{item.label}:</span> {item.value}</li>)}</ul></div>}
          {project.technologies.length > 0 && <div className="flex flex-wrap gap-2">{project.technologies.map((technology) => <span key={technology} className="tag">{technology}</span>)}</div>}
        </div>
        <div className="border-t border-[#3b494c] pt-4 mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3 shrink-0">{action(project.live)}{action(project.repository)}</div>
      </div>
    </div>
  );
}

function Detail({ label, value }: { label: string; value: string }) {
  return <section className="border border-[#3b494c] p-3 bg-[#141c24]/40"><h3 className="section-label">{label}</h3><p className="font-mono text-xs leading-relaxed text-slate-300">{value}</p></section>;
}

export default function App() {
  const [isBooting, setIsBooting] = useState(true);
  const [bootText, setBootText] = useState('> INITIALIZING INTERFACE…');
  const [activeTab, setActiveTab] = useState<Tab>('root');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [audioEnabled, setAudioEnabled] = useState(false);
  const [terminalInput, setTerminalInput] = useState('');
  const [terminalLines, setTerminalLines] = useState<TerminalLine[]>(initialTerminalLines);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const terminalBottomRef = useRef<HTMLDivElement>(null);
  const returnFocusRef = useRef<HTMLElement | null>(null);

  const playBeep = useCallback((frequency = 600, duration = 0.08) => {
    if (!audioEnabled) return;
    try {
      const audioContext = new (window.AudioContext || (window as typeof window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext!)();
      const oscillator = audioContext.createOscillator();
      const gain = audioContext.createGain();
      oscillator.frequency.value = frequency;
      gain.gain.setValueAtTime(0.04, audioContext.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.00001, audioContext.currentTime + duration);
      oscillator.connect(gain);
      gain.connect(audioContext.destination);
      oscillator.start();
      oscillator.stop(audioContext.currentTime + duration);
    } catch { /* Audio is optional and browser policy may block it. */ }
  }, [audioEnabled]);

  useEffect(() => {
    const messages = ['> INITIALIZING INTERFACE…', '> LOADING PORTFOLIO SHELL…', '> READY.'];
    let index = 0;
    const interval = window.setInterval(() => {
      index += 1;
      if (index === messages.length) {
        window.clearInterval(interval);
        setIsBooting(false);
      } else setBootText(messages[index]);
    }, 250);
    return () => window.clearInterval(interval);
  }, []);

  useEffect(() => terminalBottomRef.current?.scrollIntoView({ behavior: 'smooth' }), [terminalLines]);

  const navigate = (tab: Tab) => {
    setActiveTab(tab);
    setIsMobileMenuOpen(false);
    playBeep(500, 0.05);
  };
  const closeDialog = useCallback(() => {
    setSelectedProject(null);
    window.requestAnimationFrame(() => returnFocusRef.current?.focus());
  }, []);
  const openProject = (project: Project) => {
    returnFocusRef.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    setSelectedProject(project);
    playBeep(650, 0.08);
  };

  const handleTerminalSubmit = (event: FormEvent) => {
    event.preventDefault();
    const command = terminalInput.trim().toLowerCase();
    if (!command) return;
    const next: TerminalLine[] = [...terminalLines, { text: `> ${terminalInput}`, type: 'input' }];
    const publicContact = [PROFILE.email && `Email: ${PROFILE.email}`, ...PROFILE.links.map((link) => `${link.label}: ${link.url}`)].filter(Boolean);
    switch (command) {
      case 'help': next.push({ text: 'COMMANDS: about, projects, workflow, contact, sound, clear', type: 'success' }); break;
      case 'about': next.push({ text: PROFILE.bio ?? 'No public biography has been configured.', type: 'info' }); break;
      case 'projects': next.push({ text: PROJECTS.length ? `${PROJECTS.length} approved project case study/case studies available in the archive.` : 'No public project case studies are configured.', type: 'info' }); break;
      case 'workflow': next.push({ text: WORKFLOW_STAGES.length ? `${WORKFLOW_STAGES.length} approved workflow stages are available in the workflow view.` : 'No public agent-workflow evidence is configured.', type: 'info' }); break;
      case 'contact': next.push({ text: publicContact.length ? publicContact.join(' | ') : 'No public contact method is configured.', type: 'info' }); break;
      case 'sound': setAudioEnabled((enabled) => !enabled); next.push({ text: `Sound preference toggled.`, type: 'success' }); break;
      case 'clear': setTerminalLines([]); setTerminalInput(''); return;
      default: next.push({ text: `COMMAND ERROR: "${command}" is unrecognized. Enter "help" for options.`, type: 'error' });
    }
    playBeep();
    setTerminalLines(next);
    setTerminalInput('');
  };

  const navItems: { tab: Tab; label: string }[] = [
    { tab: 'root', label: 'ROOT' }, { tab: 'terminal', label: 'TERMINAL' }, { tab: 'archive', label: 'CASE STUDIES' }, { tab: 'status', label: 'WORKFLOW' },
  ];
  const resumeAvailable = Boolean(PROFILE.resumeUrl);

  return <div className="min-h-screen relative font-sans text-slate-300 selection:bg-primary selection:text-background-dark overflow-x-hidden flex flex-col">
    <div className="scanline z-50" aria-hidden="true" />
    {isBooting && <div className="fixed inset-0 bg-[#0f1419] z-9999 flex flex-col items-center justify-center p-6" role="status" aria-live="polite"><div className="text-primary font-mono tracking-widest border border-primary/30 p-8 bg-[#0a0f14]/80 flex flex-col items-center max-w-md w-full"><div className="boot-orb w-12 h-12 mb-6 border-2 border-primary border-t-transparent" aria-hidden="true" /><p className="text-sm text-center">{bootText}</p><button onClick={() => setIsBooting(false)} className="mt-6 text-xs underline underline-offset-4 hover:text-slate-100">Skip intro</button></div></div>}

    <header className="fixed top-0 left-0 w-full h-14 bg-[#0a0f14] border-b border-[#3b494c]/80 flex items-center justify-between px-4 md:px-10 z-40 backdrop-blur-md">
      <button onClick={() => navigate('root')} className="flex items-center gap-2 text-primary focus-visible:outline-none"><TerminalIcon className="w-5 h-5" aria-hidden="true" /><span className="font-sans text-md font-bold tracking-widest">[ PORTFOLIO ]</span></button>
      <nav className="hidden md:flex items-center gap-6" aria-label="Primary navigation">{navItems.map((item) => <button key={item.tab} onClick={() => navigate(item.tab)} className={`nav-button ${activeTab === item.tab ? 'nav-button-active' : ''}`}>{item.label}</button>)}{resumeAvailable ? <a href={PROFILE.resumeUrl} className="nav-button nav-button-active" target="_blank" rel="noreferrer">RÉSUMÉ</a> : <span className="nav-button opacity-50 cursor-not-allowed" title="No public résumé has been configured">RÉSUMÉ UNAVAILABLE</span>}</nav>
      <button onClick={() => { setAudioEnabled((enabled) => !enabled); }} className="icon-button mr-2" aria-label={audioEnabled ? 'Disable interface sound' : 'Enable interface sound'}>{audioEnabled ? <Volume2 className="w-4 h-4" aria-hidden="true" /> : <VolumeX className="w-4 h-4" aria-hidden="true" />}</button>
      <button onClick={() => setIsMobileMenuOpen((open) => !open)} className="icon-button md:hidden" aria-label={isMobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'} aria-expanded={isMobileMenuOpen}>{isMobileMenuOpen ? <X className="w-5 h-5" aria-hidden="true" /> : <Menu className="w-5 h-5" aria-hidden="true" />}</button>
    </header>

    {isMobileMenuOpen && <nav className="fixed inset-0 bg-[#0f1419]/95 z-45 md:hidden flex flex-col justify-center items-center gap-7" aria-label="Mobile navigation">{navItems.map((item) => <button key={item.tab} onClick={() => navigate(item.tab)} className="font-mono text-lg tracking-widest text-primary hover:text-slate-100">[ {item.label} ]</button>)}{resumeAvailable ? <a href={PROFILE.resumeUrl} target="_blank" rel="noreferrer" className="font-mono text-lg tracking-widest text-primary">[ RÉSUMÉ ]</a> : <span className="font-mono text-sm text-slate-500">RÉSUMÉ NOT PUBLISHED</span>}</nav>}

    <main className="flex-1 pt-14 pb-20 md:pb-8 px-4 md:px-10 max-w-7xl w-full mx-auto flex flex-col justify-center relative">
      <div className="absolute top-18 left-4 hidden sm:flex flex-col gap-1 pointer-events-none opacity-40 select-none" aria-hidden="true"><span className="font-mono text-[10px] text-primary">INTERFACE LAYER: PORTFOLIO</span><span className="font-mono text-[10px] text-primary">VISUALIZATION MODE</span></div>
      <PointerReadout />

      {activeTab === 'root' && <section className="flex-1 flex flex-col items-center justify-center py-10 z-10 text-center max-w-xl mx-auto" aria-labelledby="hero-title"><div className="relative inline-block px-8 py-6 border border-[#3b494c] bg-[#141c24]/60"><h1 id="hero-title" className="font-sans text-4xl md:text-5xl font-black tracking-tighter text-slate-100 uppercase leading-none">{PROFILE.displayName ?? 'PORTFOLIO'}<br />{PROFILE.displayName ? '' : 'IN PREPARATION'}</h1></div><div className="mt-8 space-y-3"><p className="font-mono text-sm text-primary tracking-widest">&gt; {PROFILE.title ?? 'EVIDENCE-LED ENGINEERING PORTFOLIO'}<span className="cursor-blink font-bold">_</span></p><p className="font-mono text-xs text-slate-400 leading-relaxed max-w-lg">{PROFILE.summary ?? 'Public identity, project evidence, and workflow details will appear here only after owner approval.'}</p></div><div className="mt-8 w-full flex flex-col gap-4"><button onClick={() => navigate('archive')} className="primary-button"><FolderOpen className="w-4 h-4" aria-hidden="true" /> VIEW CASE STUDIES</button><button onClick={() => navigate('terminal')} className="secondary-button"><TerminalIcon className="w-4 h-4 text-primary" aria-hidden="true" /> OPEN PORTFOLIO TERMINAL</button></div></section>}

      {activeTab === 'terminal' && <section className="flex-1 flex flex-col max-w-4xl w-full mx-auto py-6 z-10" aria-labelledby="terminal-title"><div className="relative pl-4 mb-4 border-l-2 border-primary"><h1 id="terminal-title" className="font-sans text-xl md:text-2xl text-slate-100 uppercase">PORTFOLIO TERMINAL</h1><p className="font-mono text-xs text-slate-500">CONTENT STATUS: OWNER-APPROVED ONLY</p></div><div className="border border-[#3b494c] bg-[#0a0f14]/90 p-4 md:p-6 rounded-sm flex flex-col font-mono text-xs leading-relaxed min-h-[420px]"><div className="flex-1 overflow-y-auto space-y-2 pr-1 select-text" aria-live="polite">{terminalLines.map((line, index) => <div key={index} className={`${line.type === 'input' ? 'text-primary font-bold' : line.type === 'success' ? 'text-accent-green' : line.type === 'error' ? 'text-red-400' : line.type === 'info' ? 'text-cyan-300/90' : line.type === 'ascii' ? 'text-cyan-900/60' : 'text-slate-300'} whitespace-pre-wrap`}>{line.text}</div>)}<div ref={terminalBottomRef} /></div><form onSubmit={handleTerminalSubmit} className="mt-4 flex items-center border-t border-[#3b494c]/40 pt-3"><label htmlFor="terminal-command" className="text-primary font-bold mr-2">&gt;</label><input id="terminal-command" value={terminalInput} onChange={(event) => setTerminalInput(event.target.value)} placeholder="Try: help, about, projects, workflow, contact" className="terminal-input" /></form></div></section>}

      {activeTab === 'archive' && <section className="flex-1 flex flex-col max-w-5xl w-full mx-auto py-6 z-10" aria-labelledby="projects-title"><header className="mb-6 pb-3 border-b border-[#3b494c]/80"><p className="section-label">Public project evidence</p><h1 id="projects-title" className="font-sans text-xl md:text-2xl font-black text-slate-100 uppercase">PROJECT CASE STUDIES</h1></header>{PROJECTS.length === 0 ? <EmptyState title="No public case studies yet" text="Project records, screenshots, outcomes, and links will be added only when they are verified and approved for publication." /> : <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">{PROJECTS.map((project) => <article key={project.id} className="case-card"><div className="flex justify-between gap-3 border-b border-[#3b494c] pb-2"><span className="font-mono text-[10px] text-slate-500">{project.id}</span><span className="font-mono text-[10px] text-primary">{project.status}</span></div>{project.image && <img src={project.image.src} alt={project.image.alt} className="w-full h-32 object-cover mt-4 border border-[#3b494c]" />}<h2 className="font-sans text-md font-bold mt-4 text-primary">{project.title}</h2><p className="text-slate-300 font-mono text-xs leading-relaxed my-3 flex-1">{project.summary}</p><div className="flex flex-wrap gap-2 mb-4">{project.technologies.map((technology) => <span key={technology} className="tag">{technology}</span>)}</div><button onClick={() => openProject(project)} className="secondary-button mt-auto">VIEW CASE STUDY <ExternalLink className="w-3 h-3" aria-hidden="true" /></button></article>)}</div>}</section>}

      {activeTab === 'status' && <section className="flex-1 flex flex-col max-w-5xl w-full mx-auto py-6 z-10" aria-labelledby="workflow-title"><header className="mb-6 pb-3 border-b border-[#3b494c]/80"><p className="section-label">Human-owned delivery practice</p><h1 id="workflow-title" className="font-sans text-xl md:text-2xl font-black text-slate-100 uppercase">AGENT WORKFLOW</h1></header>{WORKFLOW_STAGES.length === 0 ? <EmptyState title="No public workflow record yet" text="This section is reserved for owner-approved workflow stages, review practices, and public evidence of agent-assisted engineering." /> : <ol className="grid md:grid-cols-2 gap-4">{WORKFLOW_STAGES.map((stage, index) => <li key={stage.name} className="case-card"><p className="section-label">Stage {String(index + 1).padStart(2, '0')}</p><h2 className="font-sans font-bold text-primary">{stage.name}</h2><p className="font-mono text-xs text-slate-300 mt-2">{stage.description}</p><p className="font-mono text-xs text-slate-400 mt-3"><span className="text-accent-green">Accountability:</span> {stage.accountability}</p></li>)}</ol>} {TOOL_PRACTICES.length > 0 && <div className="mt-6 border border-[#3b494c] divide-y divide-[#3b494c]"><h2 className="p-4 section-label">Approved tool contexts</h2>{TOOL_PRACTICES.map((practice) => <div key={practice.tool} className="p-4 flex justify-between gap-4"><div><p className="font-mono text-sm text-slate-100">{practice.tool}</p><p className="font-mono text-xs text-slate-400">{practice.context}</p></div><span className="font-mono text-xs text-primary">{practice.status}</span></div>)}</div>}<div className="mt-6"><SignalVisualizer /></div></section>}
    </main>

    <nav className="md:hidden fixed bottom-0 left-0 w-full h-16 bg-[#0a0f14] border-t border-[#3b494c] flex items-center justify-around z-40" aria-label="Quick navigation">{navItems.map((item, index) => <button key={item.tab} onClick={() => navigate(item.tab)} className={`flex flex-col items-center gap-1 w-1/4 ${activeTab === item.tab ? 'text-primary border-t-2 border-primary pt-1.5' : 'text-slate-400 pt-2'}`} aria-label={item.label}>{index === 0 ? <FolderOpen className="w-5 h-5" aria-hidden="true" /> : index === 1 ? <Keyboard className="w-5 h-5" aria-hidden="true" /> : <Activity className="w-5 h-5" aria-hidden="true" />}<span className="font-mono text-[8px] uppercase">{item.label}</span></button>)}</nav>
    <footer className="w-full flex items-center justify-between px-6 md:px-10 min-h-12 border-t border-[#3b494c]/60 bg-[#0a0f14] text-[10px] text-slate-500 tracking-widest z-10 pb-20 md:pb-2"><span>PORTFOLIO INTERFACE</span><span>VISUAL ELEMENTS ARE DECORATIVE</span></footer>
    {selectedProject && <ProjectDialog project={selectedProject} onClose={closeDialog} />}
  </div>;
}

function EmptyState({ title, text }: { title: string; text: string }) {
  return <div className="border border-dashed border-slate-600 bg-[#141c24]/20 p-8 max-w-2xl"><h2 className="font-sans text-lg text-slate-100">{title}</h2><p className="font-mono text-xs leading-relaxed text-slate-400 mt-3">{text}</p></div>;
}
