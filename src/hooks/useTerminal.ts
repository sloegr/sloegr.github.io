import { useCallback, useState } from 'react';
import type { FormEvent } from 'react';
import { resolveTerminalCommand } from '../lib/terminalCommands';
import type { Profile, Project, TerminalLine } from '../types';

const MAX_TERMINAL_LINES = 100;

export const INITIAL_TERMINAL_LINES: TerminalLine[] = [
  { text: '==================================================', type: 'ascii' },
  { text: '     PORTFOLIO COMMAND TERMINAL', type: 'success' },
  { text: '==================================================', type: 'ascii' },
  {
    text: 'Content is shown only when it has been approved for publication.',
    type: 'info',
  },
  { text: 'Enter "help" to view available commands.', type: 'info' },
];

interface UseTerminalOptions {
  profile: Profile;
  projects: Project[];
  onToggleSound: () => void;
  playBeep: () => void;
}

export function useTerminal({
  profile,
  projects,
  onToggleSound,
  playBeep,
}: UseTerminalOptions) {
  const [input, setInput] = useState('');
  const [lines, setLines] = useState<TerminalLine[]>(INITIAL_TERMINAL_LINES);

  const submit = useCallback(
    (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      const command = input.trim();
      if (!command) return;

      const result = resolveTerminalCommand(command, profile, projects);
      if (result.effect === 'clear') {
        setLines([]);
      } else {
        const promptLine: TerminalLine = { text: `> ${input}`, type: 'input' };
        setLines((currentLines) =>
          [...currentLines, promptLine, ...result.lines].slice(-MAX_TERMINAL_LINES),
        );
      }
      if (result.effect === 'toggleSound') onToggleSound();
      playBeep();
      setInput('');
    },
    [input, onToggleSound, playBeep, profile, projects],
  );

  return { input, lines, setInput, submit };
}
