/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef, useCallback, FormEvent } from 'react';
import { 
  Terminal as TerminalIcon, 
  Menu, 
  FolderOpen, 
  Keyboard, 
  History, 
  Activity, 
  FileText, 
  Cpu, 
  Laptop, 
  Globe, 
  ExternalLink, 
  Shield, 
  X, 
  ArrowDown, 
  Download,
  AlertCircle,
  CheckCircle2,
  Sliders
} from 'lucide-react';
import { PROJECTS, LEDGER_ITEMS, SYSTEM_ARCH_IMAGE } from './data';
import { Project, LedgerItem, TerminalLine } from './types';

export default function App() {
  // Boot Sequence State
  const [isBooting, setIsBooting] = useState(true);
  const [bootText, setBootText] = useState('> INITIALIZING_KERNEL...');
  
  // Navigation State
  const [activeTab, setActiveTab] = useState<'root' | 'terminal' | 'archive' | 'status'>('root');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // Dynamic Mouse/Touch Coordinates
  const [coordinates, setCoordinates] = useState({ x: 0, y: 0 });
  
  // Simulated Status Updates
  const [systemStatus, setSystemStatus] = useState<'STABLE' | 'SYNCING' | 'ACTIVE'>('STABLE');
  const [latency, setLatency] = useState(12);
  const [resourceLoad, setResourceLoad] = useState(42);
  
  // Terminal Emulator State
  const [terminalInput, setTerminalInput] = useState('');
  const [terminalLines, setTerminalLines] = useState<TerminalLine[]>([
    { text: '==================================================', type: 'ascii' },
    { text: '     SYS.ARCHITECT COMMAND TERMINAL v2.0.4', type: 'success' },
    { text: '==================================================', type: 'ascii' },
    { text: 'System ready. Enter "help" to view list of commands.', type: 'info' },
    { text: ' ', type: 'output' }
  ]);
  
  // Selected Project for Blueprint Detail Modal
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isModalLoading, setIsModalLoading] = useState(false);
  const [showFlash, setShowFlash] = useState(false);
  
  // Waveform heights state (Telemetry visualization)
  const [waveHeights, setWaveHeights] = useState<number[]>([16, 24, 8, 32, 20, 12, 28, 18, 10, 22]);

  // Terminal scroll helper
  const terminalBottomRef = useRef<HTMLDivElement>(null);

  // Sound Synth Generator (Web Audio API)
  const playBeep = useCallback((freq = 600, duration = 0.08, type: OscillatorType = 'sine') => {
    try {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      
      osc.type = type;
      osc.frequency.value = freq;
      
      gain.gain.setValueAtTime(0.04, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.00001, audioCtx.currentTime + duration);
      
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      
      osc.start();
      osc.stop(audioCtx.currentTime + duration);
    } catch (e) {
      // Ignored if browser blocks audio autoplay initially
    }
  }, []);

  // Boot sequence effect
  useEffect(() => {
    const bootMessages = [
      '> INITIALIZING_KERNEL...',
      '> LOADING_GRAPHICS_DRIVER...',
      '> SYNCING_GRID_SYSTEM...',
      '> ACCESS_GRANTED: USER_VOLLMER',
      '> READY.'
    ];
    let msgIndex = 0;
    const interval = setInterval(() => {
      msgIndex++;
      if (msgIndex < bootMessages.length) {
        setBootText(bootMessages[msgIndex]);
        playBeep(450 + msgIndex * 50, 0.06);
      } else {
        clearInterval(interval);
        setTimeout(() => {
          setIsBooting(false);
          playBeep(880, 0.15, 'triangle');
        }, 500);
      }
    }, 400);
    return () => clearInterval(interval);
  }, [playBeep]);

  // Coordinate tracking
  const handleMouseMove = useCallback((e: MouseEvent) => {
    setCoordinates({ x: e.clientX, y: e.clientY });
  }, []);

  const handleTouchMove = useCallback((e: TouchEvent) => {
    if (e.touches && e.touches[0]) {
      setCoordinates({
        x: Math.round(e.touches[0].clientX),
        y: Math.round(e.touches[0].clientY)
      });
    }
  }, []);

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, [handleMouseMove, handleTouchMove]);

  // Status and load dynamics
  useEffect(() => {
    const statusInterval = setInterval(() => {
      const statuses: ('STABLE' | 'SYNCING' | 'ACTIVE')[] = ['STABLE', 'SYNCING', 'ACTIVE'];
      const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];
      setSystemStatus(randomStatus);
      setLatency(Math.floor(Math.random() * 8) + 8); // 8 - 15ms
      setResourceLoad(prev => {
        const offset = Math.floor(Math.random() * 7) - 3; // -3 to +3
        const newVal = prev + offset;
        return Math.max(38, Math.min(48, newVal)); // Clamp between 38% and 48%
      });
    }, 3000);
    return () => clearInterval(statusInterval);
  }, []);

  // Live Telemetry Waveform update loop
  useEffect(() => {
    const waveInterval = setInterval(() => {
      setWaveHeights(prev => prev.map(() => Math.floor(Math.random() * 26) + 6));
    }, 150);
    return () => clearInterval(waveInterval);
  }, []);

  // Scroll to bottom of terminal
  useEffect(() => {
    if (terminalBottomRef.current) {
      terminalBottomRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [terminalLines]);

  // Expand Spec Modal Trigger
  const handleOpenSpec = (project: Project) => {
    playBeep(520, 0.1, 'square');
    setSelectedProject(project);
    setIsModalLoading(true);
    setTimeout(() => {
      setIsModalLoading(false);
      playBeep(720, 0.08);
    }, 1200);
  };

  // Launch live site sequence
  const handleLaunchSite = () => {
    playBeep(950, 0.25, 'triangle');
    setShowFlash(true);
    setTimeout(() => {
      setShowFlash(false);
      alert('LAUNCH SEQUENCE INITIATED: Navigating to external architect node.');
    }, 180);
  };

  // Terminal input parser
  const handleTerminalSubmit = (e: FormEvent) => {
    e.preventDefault();
    const cmd = terminalInput.trim().toLowerCase();
    if (!cmd) return;

    playBeep(650, 0.05);
    const newLines = [...terminalLines, { text: `> ${terminalInput}`, type: 'input' as const }];
    
    switch (cmd) {
      case 'help':
        newLines.push(
          { text: 'AVAILABLE COMMANDS:', type: 'success' },
          { text: '  about      - Display Nicholas Vollmer professional bio', type: 'info' },
          { text: '  projects   - Render technical architect schematics database', type: 'info' },
          { text: '  ledger     - View tools, systems and proficiency matrix', type: 'info' },
          { text: '  specs      - Query real-time core system performance specs', type: 'info' },
          { text: '  matrix     - Activate cybernetic binary waterfall stream', type: 'info' },
          { text: '  contact    - Retrieve verified contact interface points', type: 'info' },
          { text: '  beep       - Verify terminal audio oscillator module', type: 'info' },
          { text: '  clear      - Purge console visual buffer logs', type: 'info' }
        );
        break;
      case 'about':
        newLines.push(
          { text: 'BIOMETRIC DATA SUMMARY:', type: 'success' },
          { text: '  Subject: Nicholas Vollmer', type: 'info' },
          { text: '  Role: Systems Architect // Principal Frontend Engineer', type: 'info' },
          { text: '  Core Thesis: Designing and deploying highly optimized distributed networks and sub-10ms state synchronization systems wrapped in bespoke interfaces.', type: 'info' },
          { text: '  Location: Local Node 127.0.0.1 (Earth Hub)', type: 'info' }
        );
        break;
      case 'projects':
      case 'schematics':
        newLines.push(
          { text: 'SCHEMATICS RETRIEVED (3 ENTRIES):', type: 'success' }
        );
        PROJECTS.forEach(p => {
          newLines.push(
            { text: `[${p.id}] ${p.title} - ${p.status}`, type: 'success' },
            { text: `  Description: ${p.description}`, type: 'info' },
            { text: `  Stack: ${p.tech.join(', ')}`, type: 'info' }
          );
        });
        break;
      case 'ledger':
      case 'skills':
        newLines.push(
          { text: 'TECHNOLOGY LEDGER MATRIX:', type: 'success' }
        );
        LEDGER_ITEMS.forEach(item => {
          newLines.push(
            { text: `  ${item.tool.padEnd(16)} | ${item.type.padEnd(16)} | Prof: ${item.proficiency}% | Status: ${item.status}`, type: 'info' }
          );
        });
        break;
      case 'specs':
        newLines.push(
          { text: 'REAL-TIME CORE SPECS:', type: 'success' },
          { text: `  Uptime: 99.982%`, type: 'info' },
          { text: `  Active Latency: ${latency}ms (STABLE)`, type: 'info' },
          { text: `  System Core Load: ${resourceLoad}%`, type: 'info' },
          { text: `  Engine: React 19 + Tailwind v4 + Vite HMR-Offline`, type: 'info' }
        );
        break;
      case 'matrix':
        playBeep(250, 0.4, 'sawtooth');
        newLines.push(
          { text: '01001001 01001110 01001001 01010100 01001001 01000001 01010100 01000101', type: 'ascii' },
          { text: '10101001 00100011 01000101 11001010 01010101 10101011 01001010 11010100', type: 'ascii' },
          { text: '01100110 01101111 01110010 01100101 01110110 01100101 01110010 00100000', type: 'ascii' },
          { text: 'SYS_STREAM: MATRIX WATERFALL SUCCESSFULLY OVERWRITTEN.', type: 'success' }
        );
        break;
      case 'contact':
        newLines.push(
          { text: 'VERIFIED CONNECTION COORDINATES:', type: 'success' },
          { text: '  Email:  jeremi.cs17@nish.ac.in', type: 'info' },
          { text: '  GitHub: github.com/nvollmer-dev', type: 'info' },
          { text: '  Secure Core: 127.0.0.1 (SYS_PORT_3000)', type: 'info' }
        );
        break;
      case 'beep':
        playBeep(880, 0.2, 'sine');
        newLines.push({ text: 'AUDIO OSCILLATOR MODULE STATUS: OPERATIONAL', type: 'success' });
        break;
      case 'clear':
        setTerminalLines([]);
        setTerminalInput('');
        return;
      default:
        newLines.push({ text: `COMMAND ERROR: "${cmd}" is unrecognized. Access denied. Enter "help" for protocol options.`, type: 'error' });
    }

    setTerminalLines(newLines);
    setTerminalInput('');
  };

  return (
    <div className="min-h-screen relative font-sans text-slate-300 selection:bg-primary selection:text-background-dark overflow-x-hidden flex flex-col">
      {/* Dynamic Scanline Overlay */}
      <div className="scanline z-50"></div>

      {/* Boot Sequencer Screen */}
      {isBooting && (
        <div className="fixed inset-0 bg-[#0f1419] z-9999 flex flex-col items-center justify-center p-6">
          <div className="text-primary font-mono text-base tracking-widest border border-primary/30 p-8 bg-[#0a0f14]/80 shadow-[0_0_30px_rgba(0,229,255,0.15)] flex flex-col items-center max-w-md w-full">
            <div className="relative w-16 h-16 mb-6 flex items-center justify-center">
              <div className="absolute inset-0 border border-primary/20 animate-spin"></div>
              <div className="absolute w-12 h-12 border-2 border-primary border-t-transparent animate-[spin_1.5s_linear_infinite]"></div>
              <div className="w-2 h-2 bg-primary animate-ping"></div>
            </div>
            <p className="font-mono text-primary text-sm text-center" id="boot-text">{bootText}</p>
          </div>
        </div>
      )}

      {/* Desktop Top Nav Bar */}
      <header className="fixed top-0 left-0 w-full h-14 bg-[#0a0f14] border-b border-[#3b494c]/80 flex items-center justify-between px-6 md:px-10 z-40 backdrop-blur-md">
        <div className="flex items-center gap-2">
          <TerminalIcon className="text-primary w-5 h-5 animate-pulse" />
          <h1 className="font-sans text-md md:text-lg font-bold tracking-widest text-primary flex items-center gap-2 cursor-pointer" onClick={() => { setActiveTab('root'); playBeep(440, 0.05); }}>
            [ SYS.ARCHITECT ]
          </h1>
        </div>

        {/* Desktop navigation tabs */}
        <div className="hidden md:flex items-center gap-8">
          <button 
            onClick={() => { setActiveTab('root'); playBeep(500, 0.05); }}
            className={`font-mono text-xs tracking-widest hover:text-primary transition-colors cursor-pointer pb-1 border-b ${activeTab === 'root' ? 'text-primary border-primary' : 'text-slate-400 border-transparent'}`}
          >
            ROOT
          </button>
          <button 
            onClick={() => { setActiveTab('terminal'); playBeep(500, 0.05); }}
            className={`font-mono text-xs tracking-widest hover:text-primary transition-colors cursor-pointer pb-1 border-b ${activeTab === 'terminal' ? 'text-primary border-primary' : 'text-slate-400 border-transparent'}`}
          >
            TERMINAL
          </button>
          <button 
            onClick={() => { setActiveTab('archive'); playBeep(500, 0.05); }}
            className={`font-mono text-xs tracking-widest hover:text-primary transition-colors cursor-pointer pb-1 border-b ${activeTab === 'archive' ? 'text-primary border-primary' : 'text-slate-400 border-transparent'}`}
          >
            SCHEMATICS
          </button>
          <button 
            onClick={() => { setActiveTab('status'); playBeep(500, 0.05); }}
            className={`font-mono text-xs tracking-widest hover:text-primary transition-colors cursor-pointer pb-1 border-b ${activeTab === 'status' ? 'text-primary border-primary' : 'text-slate-400 border-transparent'}`}
          >
            LEDGER
          </button>
          <button 
            onClick={() => {
              playBeep(900, 0.12, 'triangle');
              alert('DOWNLOADING CV: Initializing transfer sequence of Nicholas_Vollmer_CV.pdf');
            }}
            className="flex items-center gap-1 cursor-pointer hover:bg-primary/10 text-[10px] text-primary px-3 py-1.5 border border-primary font-mono tracking-widest font-bold transition-all"
          >
            <Download className="w-3 h-3" />
            DOWNLOAD_CV
          </button>
        </div>

        {/* Mobile menu trigger */}
        <button 
          onClick={() => { setIsMobileMenuOpen(!isMobileMenuOpen); playBeep(500, 0.05); }}
          className="md:hidden text-primary p-1 hover:bg-primary/10 transition-colors"
        >
          <Menu className="w-6 h-6" />
        </button>
      </header>

      {/* Mobile Drawer Overlay Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-[#0f1419]/95 z-45 md:hidden flex flex-col justify-center items-center gap-8">
          <button 
            onClick={() => { setIsMobileMenuOpen(false); playBeep(350, 0.05); }}
            className="absolute top-4 right-4 text-primary p-2 border border-primary/20"
          >
            <X className="w-6 h-6" />
          </button>
          <button 
            onClick={() => { setActiveTab('root'); setIsMobileMenuOpen(false); playBeep(500, 0.05); }}
            className="font-sans text-xl tracking-widest text-primary hover:scale-105 transition-transform"
          >
            [ ROOT ]
          </button>
          <button 
            onClick={() => { setActiveTab('terminal'); setIsMobileMenuOpen(false); playBeep(500, 0.05); }}
            className="font-sans text-xl tracking-widest text-primary hover:scale-105 transition-transform"
          >
            [ TERMINAL ]
          </button>
          <button 
            onClick={() => { setActiveTab('archive'); setIsMobileMenuOpen(false); playBeep(500, 0.05); }}
            className="font-sans text-xl tracking-widest text-primary hover:scale-105 transition-transform"
          >
            [ SCHEMATICS ]
          </button>
          <button 
            onClick={() => { setActiveTab('status'); setIsMobileMenuOpen(false); playBeep(500, 0.05); }}
            className="font-sans text-xl tracking-widest text-primary hover:scale-105 transition-transform"
          >
            [ LEDGER ]
          </button>
          <button 
            onClick={() => {
              setIsMobileMenuOpen(false);
              playBeep(900, 0.12, 'triangle');
              alert('DOWNLOADING CV: Initializing transfer sequence of Nicholas_Vollmer_CV.pdf');
            }}
            className="flex items-center gap-2 cursor-pointer hover:bg-primary/10 text-xs text-primary px-4 py-2 border border-primary font-mono tracking-widest font-bold transition-all mt-4"
          >
            <Download className="w-4 h-4" />
            DOWNLOAD_CV
          </button>
        </div>
      )}

      {/* Main Viewport Content */}
      <main className="flex-1 pt-14 pb-16 md:pb-6 px-4 md:px-10 max-w-7xl w-full mx-auto flex flex-col justify-center relative">
        
        {/* Dynamic Coordinate readouts and Corner grids (Root visual overlays) */}
        <div className="absolute top-18 left-4 flex flex-col gap-1 pointer-events-none opacity-40 select-none">
          <span className="font-mono text-[10px] text-primary">AXIS: X/Y</span>
          <span className="font-mono text-[10px] text-primary">LAYER: 01_HERO</span>
        </div>
        <div className="absolute top-18 right-4 flex flex-col items-end gap-1 pointer-events-none opacity-40 select-none">
          <span className="font-mono text-[10px] text-primary">COORD: [{coordinates.x}, {coordinates.y}]</span>
          <span className="font-mono text-[10px] text-primary">FREQ: 60HZ</span>
        </div>

        {/* Ambient Corner Crosshairs anchors */}
        <div className="absolute top-24 left-4 w-4 h-4 border-l border-t border-primary/30 pointer-events-none"></div>
        <div className="absolute top-24 right-4 w-4 h-4 border-r border-t border-primary/30 pointer-events-none"></div>
        <div className="absolute bottom-24 left-4 w-4 h-4 border-l border-b border-primary/30 pointer-events-none"></div>
        <div className="absolute bottom-24 right-4 w-4 h-4 border-r border-b border-primary/30 pointer-events-none"></div>

        {/* ACTIVE TAB: ROOT (Main Welcome Screen) */}
        {activeTab === 'root' && (
          <div className="flex-1 flex flex-col items-center justify-center py-10 z-10 text-center max-w-lg mx-auto">
            {/* Identity Box */}
            <div className="relative inline-block px-8 py-6 border border-[#3b494c] bg-[#141c24]/60 backdrop-blur-sm shadow-[0_0_20px_rgba(0,229,255,0.05)]">
              <div className="absolute -top-1 -left-1 w-2.5 h-2.5 bg-primary"></div>
              <div className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-primary"></div>
              <div className="absolute -bottom-1 -left-1 w-2.5 h-2.5 bg-primary"></div>
              <div className="absolute -bottom-1 -right-1 w-2.5 h-2.5 bg-primary"></div>
              
              <h2 className="font-sans text-4xl md:text-5xl font-black tracking-tighter text-slate-100 uppercase leading-none select-none">
                NICHOLAS<br />VOLLMER
              </h2>
            </div>

            {/* Tagline / Subtitle */}
            <div className="mt-8 space-y-3">
              <p className="font-mono text-sm text-primary tracking-widest drop-shadow-[0_0_8px_rgba(0,229,255,0.3)]">
                &gt; SYS.ARCHITECT // FRONTEND_ENGINEER<span className="cursor-blink font-bold text-primary">_</span>
              </p>
              
              <div className="flex items-center justify-center gap-4 py-2">
                <div className="h-[1px] w-12 bg-[#3b494c]"></div>
                <span className="font-mono text-[10px] text-slate-500 uppercase tracking-widest">BUILD_V2.0.4</span>
                <div className="h-[1px] w-12 bg-[#3b494c]"></div>
              </div>
            </div>

            {/* Core Action CTA Buttons */}
            <div className="mt-8 w-full flex flex-col gap-4">
              <button 
                onClick={() => { setActiveTab('archive'); playBeep(550, 0.1); }}
                className="w-full h-12 border border-primary text-primary font-mono text-xs tracking-widest hover:bg-glow-cyan hover:shadow-[0_0_15px_rgba(0,229,255,0.25)] transition-all flex items-center justify-center gap-2 cursor-pointer group"
              >
                <FolderOpen className="w-4 h-4 group-hover:rotate-12 transition-transform" />
                INITIALIZE_PORTFOLIO
              </button>
              
              <button 
                onClick={() => { setActiveTab('terminal'); playBeep(550, 0.1); }}
                className="w-full h-12 border border-[#3b494c] text-slate-300 font-mono text-xs tracking-widest hover:bg-[#1b2025] hover:border-slate-400 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <TerminalIcon className="w-4 h-4 text-primary" />
                EXECUTE_COMMANDS
              </button>
            </div>

            {/* Scroll Indicator Bouncing Prompt */}
            <div className="mt-14 flex flex-col items-center gap-2">
              <span className="font-mono text-[9px] text-slate-500 tracking-[0.2em]">DRAG_TO_NAVIGATE</span>
              <div className="w-[1px] h-12 bg-primary/80 animate-bounce"></div>
            </div>
          </div>
        )}

        {/* ACTIVE TAB: TERMINAL (Interactive Console Node) */}
        {activeTab === 'terminal' && (
          <div className="flex-1 flex flex-col max-w-4xl w-full mx-auto py-4 z-10">
            {/* Header description */}
            <div className="relative pl-4 mb-4 border-l-3 border-primary">
              <h3 className="font-sans text-xl md:text-2xl text-slate-100 uppercase tracking-tight">TERMINAL_COMMAND_PORT_v2</h3>
              <p className="font-mono text-xs text-slate-500">SYSTEM_STATUS: ACTIVE // INPUT_REQ: TRUE</p>
            </div>

            {/* Terminal Window container */}
            <div className="flex-1 border border-[#3b494c] bg-[#0a0f14]/90 p-4 md:p-6 shadow-[0_0_30px_rgba(0,229,255,0.05)] rounded-sm flex flex-col font-mono text-xs leading-relaxed min-h-[420px] overflow-hidden">
              <div className="flex items-center justify-between border-b border-[#3b494c]/60 pb-2 mb-4 text-slate-500 text-[10px]">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-500/60"></span>
                  <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/60"></span>
                  <span className="w-2.5 h-2.5 rounded-full bg-green-500/60"></span>
                  <span className="ml-2 font-semibold">sys.architect@nvollmer: ~</span>
                </div>
                <span>latency: {latency}ms</span>
              </div>

              {/* Scrolling Buffer */}
              <div className="flex-1 overflow-y-auto space-y-2 pr-1 select-text">
                {terminalLines.map((line, idx) => {
                  let colorClass = 'text-slate-300';
                  if (line.type === 'input') colorClass = 'text-primary font-bold';
                  if (line.type === 'success') colorClass = 'text-accent-green';
                  if (line.type === 'error') colorClass = 'text-red-400 font-medium';
                  if (line.type === 'info') colorClass = 'text-cyan-300/90';
                  if (line.type === 'ascii') colorClass = 'text-cyan-900/60 select-none font-sans';

                  return (
                    <div key={idx} className={`${colorClass} whitespace-pre-wrap`}>
                      {line.text}
                    </div>
                  );
                })}
                <div ref={terminalBottomRef} />
              </div>

              {/* Input panel */}
              <form onSubmit={handleTerminalSubmit} className="mt-4 flex items-center border-t border-[#3b494c]/40 pt-3">
                <span className="text-primary font-bold mr-2 select-none">&gt;</span>
                <input 
                  type="text"
                  value={terminalInput}
                  onChange={(e) => setTerminalInput(e.target.value)}
                  placeholder="Query system (e.g. about, projects, ledger, matrix, clear)..."
                  className="flex-1 bg-transparent border-none text-primary focus:outline-none placeholder:text-slate-600 font-mono text-xs focus:ring-0"
                  autoFocus
                />
              </form>
            </div>
          </div>
        )}

        {/* ACTIVE TAB: SCHEMATICS / ARCHIVE */}
        {activeTab === 'archive' && (
          <div className="flex-1 flex flex-col max-w-5xl w-full mx-auto py-4 z-10">
            {/* Section heading */}
            <div className="mb-6 relative pb-2 border-b border-[#3b494c]/80 flex items-center justify-between">
              <div>
                <div className="flex items-center gap-1.5 mb-1">
                  <span className="w-2 h-2 rounded-full bg-accent-green pulse-dot"></span>
                  <span className="font-mono text-[9px] text-slate-500 uppercase tracking-widest">Live_Directory</span>
                </div>
                <h2 className="font-sans text-xl md:text-2xl font-black text-slate-100 uppercase tracking-wide">
                  PROJECT.SCHEMATICS_v1.0
                </h2>
              </div>
              <div className="font-mono text-[10px] text-primary opacity-80">
                ARCHIVE_SEQ: 0x992 / TOTAL_ENTRIES: 03
              </div>
            </div>

            {/* Projects Grid of interactive schematics cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {PROJECTS.map((project, idx) => (
                <article 
                  key={idx} 
                  className="bg-[#141c24]/50 border border-[#3b494c] hover:border-primary/80 hover:shadow-[0_0_15px_rgba(0,229,255,0.1)] hover:bg-[#141c24]/70 transition-all duration-300 relative overflow-hidden group flex flex-col rounded-sm"
                >
                  {/* Internal Card Scanline */}
                  <div className="scanline opacity-30"></div>
                  
                  {/* ID Header Bar */}
                  <div className="flex justify-between items-center px-4 py-1.5 border-b border-[#3b494c] bg-[#0a0f14]">
                    <span className="font-mono text-[10px] text-slate-500">ID: {project.id}</span>
                    <span className="font-mono text-[10px] text-primary">{project.status}</span>
                  </div>

                  {/* Blueprint Image Visual Area */}
                  <div className="h-32 w-full relative bg-[#0f1419] overflow-hidden flex items-center justify-center grayscale contrast-125 opacity-40 group-hover:opacity-100 group-hover:grayscale-0 transition-all duration-300 border-b border-[#3b494c]">
                    <img 
                      src={project.imageUrl} 
                      alt={project.title} 
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover pointer-events-none select-none"
                    />
                    <div className="absolute top-2 left-2 text-[8px] text-slate-600 font-mono">RENDER_0x{idx}</div>
                    <div className="absolute bottom-2 right-2 text-[8px] text-primary/60 font-mono">SYS_OK</div>
                  </div>

                  {/* Content Stack */}
                  <div className="p-4 flex-1 flex flex-col">
                    <h3 className="font-sans text-md font-bold mb-2 text-primary tracking-wide">{project.title}</h3>
                    <p className="text-slate-400 font-mono text-[11px] leading-relaxed mb-4 flex-1">{project.description}</p>
                    
                    {/* Tech Tags */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tech.map((t, tIdx) => (
                        <span key={tIdx} className="font-mono text-[9px] text-primary px-1.5 py-0.5 border border-primary/20 bg-primary/5">
                          [ {t} ]
                        </span>
                      ))}
                    </div>

                    {/* Technical Specs parameters */}
                    <div className="grid grid-cols-2 gap-px bg-[#3b494c] border border-[#3b494c]">
                      {project.specs.map((spec, sIdx) => (
                        <div key={sIdx} className="bg-[#1b2025] p-2 flex flex-col justify-center">
                          <span className="font-mono text-[9px] text-slate-500 uppercase">{spec.label}</span>
                          <span className="font-mono text-[10px] text-accent-green font-medium">{spec.value}</span>
                        </div>
                      ))}
                    </div>

                    {/* Expand specification CTA trigger */}
                    <div className="mt-4 pt-3 border-t border-[#3b494c]/60 flex justify-end">
                      <button 
                        onClick={() => handleOpenSpec(project)}
                        className="flex items-center gap-1 cursor-pointer bg-[#0a0f14] border border-primary text-primary px-2.5 py-1 text-[10px] font-mono tracking-wider hover:bg-primary hover:text-[#0a0f14] hover:shadow-[0_0_10px_#00e5ff] transition-all rounded-sm"
                      >
                        [ EXPAND SPEC ]
                        <ExternalLink className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </article>
              ))}

              {/* Empty state card block to match image 5 */}
              <article className="border border-dashed border-slate-700 bg-[#141c24]/20 p-6 flex flex-col justify-center items-center min-h-[350px] opacity-40 select-none">
                <p className="font-mono text-xs text-slate-500 tracking-widest text-center border border-dashed border-slate-700/60 p-4 w-full">
                  [ NO ADDITIONAL SCHEMATICS FOUND ]
                </p>
              </article>
            </div>
          </div>
        )}

        {/* ACTIVE TAB: STATUS & LEDGER */}
        {activeTab === 'status' && (
          <div className="flex-1 flex flex-col max-w-5xl w-full mx-auto py-4 z-10">
            {/* Header section */}
            <div className="relative pl-4 mb-6 border-l-3 border-primary flex flex-wrap justify-between items-end gap-3">
              <div>
                <h1 className="font-sans text-xl md:text-2xl text-slate-100 uppercase tracking-tighter">TECHNOLOGY.LEDGER_V1.0</h1>
                <p className="font-mono text-xs text-slate-500">SYSTEM_STATUS: {systemStatus} // LOG_0842</p>
              </div>
              <span className="font-mono text-xs text-primary bg-primary/5 px-2.5 py-1 border border-primary/20">
                SYS_MONITOR // ACTIVE
              </span>
            </div>

            {/* Table layout of Ledger components */}
            <div className="w-full border border-[#3b494c] bg-[#171c21] overflow-hidden rounded-sm">
              {/* Table Header */}
              <div className="grid grid-cols-12 border-b border-[#3b494c] bg-[#1b2025] py-3 px-4 font-mono text-[10px] text-primary tracking-widest">
                <div className="col-span-5 md:col-span-4 uppercase">TOOL</div>
                <div className="col-span-4 md:col-span-4 uppercase">TYPE</div>
                <div className="col-span-3 md:col-span-4 uppercase text-right">STATUS</div>
              </div>

              {/* Table Rows list */}
              <div className="divide-y divide-[#3b494c]/60">
                {LEDGER_ITEMS.map((item, idx) => (
                  <div 
                    key={idx} 
                    onClick={() => playBeep(580 + idx * 40, 0.05)}
                    className="grid grid-cols-12 items-center py-3.5 px-4 hover:bg-glow-cyan transition-colors group cursor-pointer"
                  >
                    {/* Tool */}
                    <div className="col-span-5 md:col-span-4 flex flex-col">
                      <span className="font-sans text-xs text-slate-100 tracking-wide">{item.tool}</span>
                      <span className="font-mono text-[9px] text-slate-500 opacity-60">v.PRO_ENTERPRISE_0{idx}</span>
                    </div>
                    {/* Type */}
                    <div className="col-span-4 md:col-span-4 font-mono text-[11px] text-slate-400 uppercase">
                      {item.type}
                    </div>
                    {/* Status / Indicator */}
                    <div className="col-span-3 md:col-span-4 flex justify-end items-center gap-2">
                      <span className={`font-mono text-[10px] ${item.status === 'OFFLINE' ? 'text-slate-500' : 'text-accent-green font-medium'}`}>
                        {item.status}
                      </span>
                      <div className={`w-2 h-2 rounded-full ${item.status === 'OFFLINE' ? 'bg-slate-600' : 'bg-accent-green pulse-dot'}`}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Dynamic Telemetry meters and Waveforms */}
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Dynamic resource load monitor */}
              <div className="border border-[#3b494c] p-4 bg-[#141c24]/50 rounded-sm flex flex-col gap-3">
                <div className="flex justify-between items-center border-b border-[#3b494c]/60 pb-2">
                  <span className="font-mono text-[10px] text-primary uppercase tracking-widest flex items-center gap-1.5">
                    <Sliders className="w-3.5 h-3.5 text-primary" />
                    RESOURCE_LOAD
                  </span>
                  <span className="font-mono text-xs text-accent-green font-bold">{resourceLoad}%</span>
                </div>
                <div className="h-1.5 w-full bg-[#1b2025] relative overflow-hidden">
                  <div 
                    className="h-full bg-primary shadow-[0_0_10px_#00e5ff] transition-all duration-300"
                    style={{ width: `${resourceLoad}%` }}
                  />
                </div>
              </div>

              {/* Dynamic Telemetry Waveform visualization */}
              <div className="border border-[#3b494c] p-4 bg-[#141c24]/50 rounded-sm">
                <div className="flex items-center gap-2 mb-3 border-b border-[#3b494c]/60 pb-2">
                  <Activity className="w-3.5 h-3.5 text-primary animate-pulse" />
                  <span className="font-mono text-[10px] text-primary uppercase tracking-widest">LIVE_TELEMETRY</span>
                </div>
                {/* Visualizer output */}
                <div className="h-20 relative bg-[#0a0f14] border border-[#3b494c]/60 flex items-end justify-around px-4 py-2">
                  {waveHeights.map((h, hIdx) => (
                    <div 
                      key={hIdx} 
                      className="w-1.5 bg-primary/85 telemetry-bar"
                      style={{ height: `${h}%` }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* MOBILE Navigation Bottom Bar */}
      <nav className="md:hidden fixed bottom-0 left-0 w-full h-16 bg-[#0a0f14] border-t border-[#3b494c] flex items-center justify-around z-40 shadow-[0_-4px_15px_rgba(0,0,0,0.5)]">
        <button 
          onClick={() => { setActiveTab('root'); playBeep(450, 0.05); }}
          className={`flex flex-col items-center gap-1 cursor-pointer w-1/4 ${activeTab === 'root' ? 'text-primary border-t-2 border-primary pt-1.5' : 'text-slate-500 pt-2'}`}
        >
          <Globe className="w-5 h-5" />
          <span className="font-mono text-[9px] uppercase tracking-wider">ROOT</span>
        </button>
        
        <button 
          onClick={() => { setActiveTab('terminal'); playBeep(450, 0.05); }}
          className={`flex flex-col items-center gap-1 cursor-pointer w-1/4 ${activeTab === 'terminal' ? 'text-primary border-t-2 border-primary pt-1.5' : 'text-slate-500 pt-2'}`}
        >
          <Keyboard className="w-5 h-5" />
          <span className="font-mono text-[9px] uppercase tracking-wider">TERMINAL</span>
        </button>
        
        <button 
          onClick={() => { setActiveTab('archive'); playBeep(450, 0.05); }}
          className={`flex flex-col items-center gap-1 cursor-pointer w-1/4 ${activeTab === 'archive' ? 'text-primary border-t-2 border-primary pt-1.5' : 'text-slate-500 pt-2'}`}
        >
          <History className="w-5 h-5" />
          <span className="font-mono text-[9px] uppercase tracking-wider">ARCHIVE</span>
        </button>
        
        <button 
          onClick={() => { setActiveTab('status'); playBeep(450, 0.05); }}
          className={`flex flex-col items-center gap-1 cursor-pointer w-1/4 ${activeTab === 'status' ? 'text-primary border-t-2 border-primary pt-1.5' : 'text-slate-500 pt-2'}`}
        >
          <Activity className="w-5 h-5" />
          <span className="font-mono text-[9px] uppercase tracking-wider">STATUS</span>
        </button>
      </nav>

      {/* Footer Metadata display */}
      <footer className="w-full flex items-center justify-between px-6 md:px-10 h-12 border-t border-[#3b494c]/60 bg-[#0a0f14] mt-auto text-[10px] text-slate-500 tracking-widest z-10 select-none pb-20 md:pb-2">
        <span>© 2026 SYSTEM_CORE // BUILD_V2.0.4</span>
        <div className="flex gap-6">
          <span className="flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-accent-green pulse-dot"></span>
            STABLE
          </span>
          <span>LATENCY: {latency}MS</span>
        </div>
      </footer>

      {/* INTERACTIVE BLUEPRINT DETAIL MODAL POPOVER */}
      {selectedProject && (
        <div className="fixed inset-0 bg-[#0a0f14]/85 backdrop-blur-sm z-9999 flex items-center justify-center p-4">
          
          {/* Flash visual overlay */}
          {showFlash && (
            <div className="fixed inset-0 bg-white z-99999 pointer-events-none opacity-80 duration-100 ease-out" />
          )}

          {/* Modal content body card */}
          <div className="relative w-full max-w-4xl bg-[#0f1419] border-2 border-primary p-5 md:p-8 flex flex-col shadow-[0_0_50px_rgba(0,229,255,0.25)] rounded-sm overflow-hidden h-[90vh]">
            
            {/* Modal internal grid guides */}
            <div className="absolute inset-0 pointer-events-none opacity-20" style={{ backgroundImage: 'linear-gradient(to right, #475569 1px, transparent 1px), linear-gradient(to bottom, #475569 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
            
            {/* Loading fetches schematics sequence */}
            {isModalLoading && (
              <div className="absolute inset-0 z-50 bg-[#0f1419] flex flex-col items-center justify-center">
                
                {/* CSS rotate cube wireframe wireframe */}
                <div className="w-20 h-20 mb-8 border border-primary/20 flex items-center justify-center relative animate-pulse">
                  <div className="absolute w-12 h-12 border border-primary animate-spin"></div>
                  <div className="absolute w-6 h-6 border border-accent-green animate-[spin_3s_linear_infinite_reverse]"></div>
                  <div className="w-2 h-2 bg-primary"></div>
                </div>

                <p className="font-mono text-primary text-xs uppercase tracking-widest animate-pulse">
                  [ FETCHING_SCHEMATICS... ]
                </p>
              </div>
            )}

            {/* Corner highlights anchors */}
            <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-primary z-20"></div>
            <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-primary z-20"></div>
            <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-primary z-20"></div>
            <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-primary z-20"></div>

            {/* Close / Abort button top-right */}
            <div className="flex justify-between items-start gap-3 border-b border-[#3b494c] pb-4 mb-4 z-10 shrink-0">
              <div className="flex-1">
                <h3 className="font-sans text-lg md:text-xl font-bold tracking-widest text-slate-100 uppercase border-b-2 border-primary inline-block pb-1">
                  PROJECT.SCHEMATICS_v1.0
                </h3>
                <p className="font-mono text-[10px] text-primary mt-1.5 uppercase tracking-wider">&gt; SYSTEM ARCHITECTURE & METRICS</p>
              </div>

              <button 
                onClick={() => { setSelectedProject(null); playBeep(350, 0.08); }}
                className="flex items-center cursor-pointer bg-transparent border border-primary text-primary px-3 py-1.5 text-xs font-mono tracking-widest hover:bg-primary hover:text-background-dark transition-all rounded-sm font-bold shadow-[0_0_10px_rgba(0,229,255,0)] hover:shadow-[0_0_15px_#00e5ff] shrink-0"
              >
                [ X ] ABORT
              </button>
            </div>

            {/* Scrollable blueprint details inside popover */}
            <div className="flex-1 overflow-y-auto pr-1 space-y-6 z-10">
              
              {/* Architecture Blueprint Wireframe block */}
              <div className="border border-[#3b494c] bg-[#0a0f14] p-2 relative h-64 md:h-80 overflow-hidden flex items-center justify-center rounded-sm">
                <img 
                  src={SYSTEM_ARCH_IMAGE} 
                  alt="Architecture Blueprint Wireframe" 
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-contain mix-blend-lighten pointer-events-none select-none"
                />
                
                {/* Horizontal blueprint scrolling laser */}
                <div className="absolute left-0 w-full h-[1.5px] bg-primary animate-[bounce_4s_infinite] shadow-[0_0_8px_#00e5ff]" />
                
                <div className="absolute top-2 left-2 text-[8px] text-slate-500 font-mono select-none">MODEL: ARCHITECTURE_DET_09</div>
                <div className="absolute bottom-2 right-2 text-[8px] text-accent-green font-mono select-none">SYS_OK</div>
              </div>

              {/* Specification data summary table */}
              <div className="space-y-4">
                <h4 className="font-sans text-xs text-primary tracking-widest uppercase">
                  &gt; SCHEMATIC DETAILS: {selectedProject.title}
                </h4>
                <p className="font-mono text-slate-400 text-xs leading-relaxed border-l border-primary/40 pl-3">
                  {selectedProject.description} This dedicated micro-module represents high-fidelity distributed engineering. All system routines execute safely with robust error isolation bounds.
                </p>
              </div>

              {/* Metrics specifications blocks */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {selectedProject.metrics.map((metric, mIdx) => (
                  <div key={mIdx} className="border border-[#3b494c] p-3 bg-[#141c24] flex flex-col justify-center relative overflow-hidden group hover:border-primary transition-all">
                    <span className="text-[9px] text-slate-500 font-mono uppercase mb-1">{metric.label}</span>
                    <span className={`font-sans text-sm md:text-md font-bold ${metric.color === 'accent-green' ? 'text-accent-green' : 'text-slate-100'}`}>
                      {metric.value}
                    </span>
                  </div>
                ))}
              </div>

              {/* Detailed Specs and Repository lists */}
              <div className="border border-[#3b494c] p-4 bg-[#141c24]/30 rounded-sm space-y-2">
                <span className="font-mono text-[9px] text-slate-500 uppercase tracking-widest">SUB_MODULES // DEPENDENCIES</span>
                <div className="flex flex-wrap gap-2 pt-1">
                  {selectedProject.tech.map((t, idx) => (
                    <span key={idx} className="font-mono text-[10px] text-primary px-2 py-0.5 border border-primary/20 bg-primary/5">
                      {t}_ROUTINE
                    </span>
                  ))}
                  <span className="font-mono text-[10px] text-slate-500 px-2 py-0.5 border border-[#3b494c]">
                    DOCKER_CONTAINER
                  </span>
                  <span className="font-mono text-[10px] text-slate-500 px-2 py-0.5 border border-[#3b494c]">
                    CI_CD_ACTIONS
                  </span>
                </div>
              </div>
            </div>

            {/* Launch live site action trigger drawer footer */}
            <div className="border-t border-[#3b494c] pt-4 mt-4 grid grid-cols-1 md:grid-cols-2 gap-3 shrink-0 z-10">
              <button 
                onClick={handleLaunchSite}
                className="w-full h-12 bg-primary/10 border border-primary text-primary font-mono font-bold tracking-[2px] uppercase text-xs hover:bg-primary hover:text-slate-900 hover:shadow-[0_0_15px_#00e5ff] transition-all cursor-pointer rounded-sm"
              >
                [ LAUNCH LIVE SITE ]
              </button>
              
              <button 
                onClick={() => {
                  playBeep(600, 0.1);
                  alert(`REPOSITORY STREAM: Fetching private git ledger repository of ${selectedProject.title}`);
                }}
                className="w-full h-12 bg-transparent border border-[#3b494c] text-slate-400 font-mono text-xs hover:border-slate-300 hover:text-slate-100 transition-all cursor-pointer rounded-sm uppercase"
              >
                [ VIEW REPOSITORY ]
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
