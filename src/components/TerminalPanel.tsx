import { useEffect, useRef } from 'react';
import type { FormEventHandler } from 'react';
import type { TerminalLine } from '../types';

interface TerminalPanelProps {
  input: string;
  lines: TerminalLine[];
  onInputChange: (value: string) => void;
  onSubmit: FormEventHandler<HTMLFormElement>;
}

const terminalLineClass = (type: TerminalLine['type']) =>
  ({
    input: 'text-primary font-bold',
    success: 'text-accent-green',
    error: 'text-red-400',
    info: 'text-cyan-300/90',
    ascii: 'text-cyan-900/60',
    output: 'text-slate-300',
  })[type];

export function TerminalPanel({
  input,
  lines,
  onInputChange,
  onSubmit,
}: TerminalPanelProps) {
  const terminalBottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    terminalBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [lines]);

  return (
    <section
      className="flex-1 flex flex-col max-w-4xl w-full mx-auto py-6 z-10"
      aria-labelledby="terminal-title"
    >
      <div className="relative pl-4 mb-4 border-l-2 border-primary">
        <h1
          id="terminal-title"
          className="font-sans text-xl md:text-2xl text-slate-100 uppercase"
        >
          PORTFOLIO TERMINAL
        </h1>
        <p className="font-mono text-xs text-slate-500">
          CONTENT STATUS: OWNER-APPROVED ONLY
        </p>
      </div>
      <div className="border border-[#3b494c] bg-[#0a0f14]/90 p-4 md:p-6 rounded-sm flex flex-col font-mono text-xs leading-relaxed min-h-[420px]">
        <div className="flex-1 overflow-y-auto space-y-2 pr-1 select-text" aria-live="polite">
          {lines.map((line, index) => (
            <div key={`${line.text}-${index}`} className={`${terminalLineClass(line.type)} whitespace-pre-wrap`}>
              {line.text}
            </div>
          ))}
          <div ref={terminalBottomRef} />
        </div>
        <form onSubmit={onSubmit} className="mt-4 flex items-center border-t border-[#3b494c]/40 pt-3">
          <label htmlFor="terminal-command" className="text-primary font-bold mr-2">
            &gt;
          </label>
          <input
            id="terminal-command"
            value={input}
            onChange={(event) => onInputChange(event.target.value)}
            placeholder="Try: help, about, projects, contact"
            className="terminal-input"
          />
        </form>
      </div>
    </section>
  );
}
