import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useState } from 'react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import type { Project } from '../types';
import { ProjectDialog } from './ProjectDialog';

const project: Project = {
  id: 'test-project',
  title: 'Test project',
  status: 'Test',
  summary: 'A test fixture.',
  technologies: [],
  live: { label: 'View' },
};

afterEach(() => vi.restoreAllMocks());

describe('ProjectDialog', () => {
  it('closes with Escape', () => {
    const onClose = vi.fn();
    render(<ProjectDialog project={project} onClose={onClose} />);

    fireEvent.keyDown(document, { key: 'Escape' });

    expect(onClose).toHaveBeenCalledOnce();
  });

  it('closes from its close button and returns focus to the opener', async () => {
    vi.spyOn(window, 'requestAnimationFrame').mockImplementation((callback) => {
      callback(0);
      return 1;
    });
    const user = userEvent.setup();

    function DialogHarness() {
      const [open, setOpen] = useState(false);
      return (
        <>
          <button onClick={() => setOpen(true)}>Open project</button>
          {open && <ProjectDialog project={project} onClose={() => setOpen(false)} />}
        </>
      );
    }

    render(<DialogHarness />);
    const opener = screen.getByRole('button', { name: 'Open project' });
    await user.click(opener);
    await user.click(screen.getByRole('button', { name: 'Close project details' }));

    expect(opener).toHaveFocus();
  });

  it('closes when the backdrop is clicked', () => {
    const onClose = vi.fn();
    render(<ProjectDialog project={project} onClose={onClose} />);

    fireEvent.mouseDown(screen.getByRole('dialog').parentElement!);

    expect(onClose).toHaveBeenCalledOnce();
  });
});
