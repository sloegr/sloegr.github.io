import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import type { Profile } from '../types';
import { PortfolioNavigation } from './PortfolioNavigation';

const profile: Profile = { links: [] };

describe('PortfolioNavigation', () => {
  it('sends the correct tab from desktop and mobile navigation items', async () => {
    const onNavigate = vi.fn();
    const user = userEvent.setup();
    render(
      <PortfolioNavigation
        activeTab="root"
        profile={profile}
        onNavigate={onNavigate}
      />,
    );

    const terminalButtons = screen.getAllByRole('button', { name: 'TERMINAL' });
    await user.click(terminalButtons[0]);
    await user.click(terminalButtons[1]);

    expect(onNavigate).toHaveBeenNthCalledWith(1, 'terminal');
    expect(onNavigate).toHaveBeenNthCalledWith(2, 'terminal');
  });
});
