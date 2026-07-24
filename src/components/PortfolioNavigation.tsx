import {
  FolderOpen,
  Keyboard,
  Terminal as TerminalIcon,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import type { Profile, Tab } from '../types';

export interface NavigationItem {
  tab: Tab;
  label: string;
  Icon: LucideIcon;
}

export const NAVIGATION_ITEMS: NavigationItem[] = [
  { tab: 'root', label: 'ROOT', Icon: FolderOpen },
  { tab: 'terminal', label: 'TERMINAL', Icon: Keyboard },
  { tab: 'archive', label: 'PROJECTS', Icon: FolderOpen },
];

interface PortfolioNavigationProps {
  activeTab: Tab;
  items?: NavigationItem[];
  profile: Profile;
  onNavigate: (tab: Tab) => void;
}

export function PortfolioNavigation({
  activeTab,
  items = NAVIGATION_ITEMS,
  profile,
  onNavigate,
}: PortfolioNavigationProps) {
  const resumeAvailable = Boolean(profile.resumeUrl);

  return (
    <>
      <header className="fixed top-0 left-0 w-full h-14 bg-[#0a0f14] border-b border-[#3b494c]/80 flex items-center justify-between px-4 md:px-10 z-40 backdrop-blur-md">
        <button
          onClick={() => onNavigate('root')}
          className="flex items-center gap-2 text-primary focus-visible:outline-none"
        >
          <TerminalIcon className="w-5 h-5" aria-hidden="true" />
          <span className="font-sans text-md font-bold tracking-widest">
            [ PORTFOLIO ]
          </span>
        </button>
        <nav className="hidden md:flex items-center gap-6" aria-label="Primary navigation">
          {items.map((item) => (
            <button
              key={item.tab}
              onClick={() => onNavigate(item.tab)}
              className={`nav-button ${activeTab === item.tab ? 'nav-button-active' : ''}`}
            >
              {item.label}
            </button>
          ))}
          {resumeAvailable ? (
            <a
              href={profile.resumeUrl}
              className="nav-button"
              target="_blank"
              rel="noreferrer"
            >
              RÉSUMÉ
            </a>
          ) : (
            <span
              className="nav-button opacity-50 cursor-not-allowed"
              title="No public résumé has been configured"
            >
              RÉSUMÉ UNAVAILABLE
            </span>
          )}
        </nav>
      </header>

      <nav
        className="md:hidden fixed bottom-0 left-0 w-full h-16 bg-[#0a0f14] border-t border-[#3b494c] flex items-center justify-around z-40"
        aria-label="Quick navigation"
      >
        {items.map(({ Icon, label, tab }) => (
          <button
            key={tab}
            onClick={() => onNavigate(tab)}
            className={`flex flex-col items-center gap-1 w-1/3 ${activeTab === tab ? 'text-primary border-t-2 border-primary pt-1.5' : 'text-slate-400 pt-2'}`}
            aria-label={label}
          >
            <Icon className="w-5 h-5" aria-hidden="true" />
            <span className="font-mono text-[8px] uppercase">{label}</span>
          </button>
        ))}
      </nav>
      <footer className="w-full flex items-center justify-between px-6 md:px-10 min-h-12 border-t border-[#3b494c]/60 bg-[#0a0f14] text-[10px] text-slate-500 tracking-widest z-10 pb-20 md:pb-2">
        <span>PORTFOLIO INTERFACE</span>
        <span>VISUAL ELEMENTS ARE DECORATIVE</span>
      </footer>
    </>
  );
}
