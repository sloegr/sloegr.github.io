import { describe, expect, it } from 'vitest';
import { resolveTerminalCommand } from './terminalCommands';

const profile = {
  bio: 'A public biography.',
  email: 'person@example.test',
  links: [{ label: 'Profile', url: 'https://example.test/profile' }],
};

const projects = [
  {
    id: 'test-project',
    title: 'Test project',
    status: 'Test',
    summary: 'A test fixture.',
    technologies: [],
    live: { label: 'View' },
  },
];

describe('resolveTerminalCommand', () => {
  it('resolves each known command without mutating UI state', () => {
    expect(resolveTerminalCommand('help', profile, projects).lines[0].text).toContain('about');
    expect(resolveTerminalCommand('about', profile, projects).lines[0].text).toBe(profile.bio);
    expect(resolveTerminalCommand('projects', profile, projects).lines[0].text).toBe(
      '1 approved project available.',
    );
    expect(resolveTerminalCommand('contact', profile, projects).lines[0].text).toBe(
      'Email: person@example.test | Profile: https://example.test/profile',
    );
  });

  it('returns explicit effects for sound and clear', () => {
    expect(resolveTerminalCommand('sound', profile, projects).effect).toBe('toggleSound');
    expect(resolveTerminalCommand('clear', profile, projects)).toEqual({
      lines: [],
      effect: 'clear',
    });
  });

  it('reports unknown commands', () => {
    expect(resolveTerminalCommand('unknown', profile, projects).lines[0]).toEqual({
      text: 'COMMAND ERROR: "unknown" is unrecognized. Enter "help" for options.',
      type: 'error',
    });
  });
});
