import type { Profile, Project, TerminalLine } from '../types';

export type TerminalEffect = 'clear' | 'toggleSound';

export interface TerminalCommandResult {
  lines: TerminalLine[];
  effect?: TerminalEffect;
}

export function resolveTerminalCommand(
  command: string,
  profile: Profile,
  projects: Project[],
): TerminalCommandResult {
  switch (command.trim().toLowerCase()) {
    case 'help':
      return {
        lines: [
          {
            text: 'COMMANDS: about, projects, contact, sound, clear',
            type: 'success',
          },
        ],
      };
    case 'about':
      return {
        lines: [
          {
            text: profile.bio ?? 'No public biography has been configured.',
            type: 'info',
          },
        ],
      };
    case 'projects':
      return {
        lines: [
          {
            text: projects.length
              ? `${projects.length} approved project${projects.length === 1 ? '' : 's'} available.`
              : 'No public projects are configured.',
            type: 'info',
          },
        ],
      };
    case 'contact': {
      const publicContact = [
        profile.email && `Email: ${profile.email}`,
        ...profile.links.map((link) => `${link.label}: ${link.url}`),
      ].filter((value): value is string => Boolean(value));
      return {
        lines: [
          {
            text: publicContact.length
              ? publicContact.join(' | ')
              : 'No public contact method is configured.',
            type: 'info',
          },
        ],
      };
    }
    case 'sound':
      return {
        lines: [{ text: 'Sound preference toggled.', type: 'success' }],
        effect: 'toggleSound',
      };
    case 'clear':
      return { lines: [], effect: 'clear' };
    default:
      return {
        lines: [
          {
            text: `COMMAND ERROR: "${command.trim().toLowerCase()}" is unrecognized. Enter "help" for options.`,
            type: 'error',
          },
        ],
      };
  }
}
