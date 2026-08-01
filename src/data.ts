import { Profile, Project } from './types';

/**
 * The only source of public portfolio content. Populate these fields with
 * owner-approved evidence before publishing; empty values intentionally render
 * as honest unavailable states in the interface.
 */
export const PROFILE: Profile = {
  // Your public name exactly as you want visitors to see it.
  displayName: 'Jeremiah John',

  // A short, truthful professional title. Avoid titles you cannot support.
  title: 'Software Engineer',

  // One sentence explaining the kind of work you do or want to be hired for.
  summary:
    'I build reliable web applications with a thoughtful, agent-assisted workflow.',

  // A slightly longer introduction. Keep it public-safe; do not include private details.
  // bio: 'Write two or three sentences about your experience, interests, and the work shown here.',

  // Optional city, country, or time zone. Leave this commented out if you do not want it public.
  // location: 'City, Country',

  // Optional public email address. Do not add a personal address unless you want it visible on the site.
  // email: 'you@example.com',

  // Public profiles only. Add one object per approved link.
  links: [
    { label: 'GitHub', url: 'https://github.com/sloegr' },
    {
      label: 'LinkedIn',
      url: 'https://www.linkedin.com/in/jeremiah-joseph-john/',
    },
  ],

  // Optional public PDF or hosted resume link. The site shows “unavailable” until this is set.
  resumeUrl: `${import.meta.env.BASE_URL}resume.pdf`,
};

/**
 * Add a project only when every claim in it is true and approved for public
 * release. Copy the commented structure below, fill it with real information,
 * then remove the leading `//` characters.
 */
//export const PROJECTS: Project[] = [];
export const PROJECTS: Project[] = [
  {
    id: '#1',
    title: 'WebLLM Chat',
    status: 'Shipped',
    summary: 'Talk to AI using WebLLM — a fully client-side LLM chat app that runs in the browser via WebGPU with no server, API, or backend.',
    problem: 'Most AI chat apps require a server for inference, sending user data to third-party APIs. Users who wanted private, offline-capable chat had no simple browser-based option.',
    role: 'I designed and built the full application — WebGPU detection, model loading with progress tracking, streaming chat inference with reasoning display, modular component architecture, and GitHub Pages deployment.',
    constraints: 'No server or backend allowed. Must run entirely in-browser. Limited to WebLLM-compatible models and WebGPU-enabled browsers (Chrome/Edge). Models are small (1–2B params) to fit browser memory.',
    solution: 'Used @mlc-ai/web-llm to compile and run small language models client-side via WebGPU. Lazy-loaded the WebLLM runtime to keep initial page load fast. Built a custom streaming parser that separates model reasoning from the final answer in real time.',
    outcome: 'Fully functional browser-native AI chat with zero server dependency. Deployed as a static site on GitHub Pages. Supports four selectable models with streaming responses and reasoning display.',
    agentWorkflow: 'Used AI agents to scaffold and iterate on the React application, including modular refactoring, the streaming completion parser, and UI behavior. Reviewed each agent output against the project architecture rules and manually verified inference, model loading, and chat context in the browser.',
    technologies: ['React', 'WebGPU', 'WebLLM', 'JavaScript'],
    evidence: [{ label: 'Evidence', value: 'Live deployment on GitHub Pages with open source repository. Manual browser testing across model loading, streaming inference, reasoning display, and sequential chat context.' }],
    image: {
      src: '/assets/webllm-pic.png',
      alt: 'An image of the WebLLM Chat website on page load',
    },
    live: {
      label: 'View live site',
      url: 'https://sloegr.github.io/webllm-chat/',
    },
    repository: {
      label: 'View repository',
      url: 'https://github.com/sloegr/webllm-chat/',
    },
  },
  {
      id: '#2',
      title: 'Accessibility Auditor',
      status: 'Shipped',
      summary: 'Chrome extension that scans pages for accessibility issues using deterministic DOM checks and optional on-device WebLLM quality judgments—no data leaves the browser.',
      problem: 'Accessibility issues in sensitive environments (internal tools, NDA-bound pre-release game builds) can\'t be sent to cloud APIs for analysis, leaving teams without practical scanning tools.',
      role: 'Orchestrated architecture, specified requirements, reviewed agent-generated code, verified runtime behavior against privacy and progress-reporting constraints.',
      constraints: 'Privacy-first design (no cloud APIs), MV3 service worker lifecycle limits, WebGPU hardware requirements, no fabricated progress metrics.',
      solution: 'Chrome extension with content script for DOM scanning, background service worker for coordination, offscreen document for WebGPU/WebLLM inference. Deterministic checks handle missing content; WebLLM judges quality of existing alt text and captions.',
      outcome: 'Functional extension with runtime-verified DOM scanner, messaging flow, popup/dashboard UI, and WebLLM integration. Two refinements (per-item progress, active-scan popup reopen) implemented but awaiting dedicated verification.',
      agentWorkflow: 'Specified architecture and requirements in scaffold document, reviewed agent output for privacy compliance and honest progress reporting, traced anomalies to root causes rather than accepting surface-level claims.',
      technologies: ['JavaScript', 'WebLLM', 'WebGPU', 'Chrome Extension APIs', 'esbuild'],
      evidence: [{ label: 'Evidence', value: 'Runtime-verified scanner, messaging, UI states, and WebLLM integration. Architecture documented in accessibility-auditor-scaffold.md.' }],
      image: {
        src: 'assets/accessibility-pic.png',
        alt: 'Accessibility Auditor extension popup showing scan results with accessibility findings.',
      },
      repository: {
        label: 'View repository',
        url: 'https://github.com/sloegr/accessibility-auditor/',
      },
  },
  {
    id: '#3',
    title: 'Exo Musix Player',
    status: 'Shipped',
    summary:
      'A lightweight, dark-themed desktop music player for scanning and playing local audio files, built with Tauri, Svelte, and Rust.',
    problem:
      'Local music libraries often need a focused desktop player that can scan nested folders, read audio metadata and artwork, and retain listening history without relying on a cloud service.',
    role:
      'I built the full desktop application, including the Svelte frontend, Rust/Tauri IPC layer, local audio scanning and metadata extraction, playback engine, SQLite-backed recents, and custom frameless window controls.',
    constraints:
      'The application must work with local files and native system audio output while keeping play history private on-device. It supports common audio formats and uses a desktop runtime rather than browser-based audio APIs.',
    solution:
      'Built a Tauri v2 application with a Svelte 5 and TypeScript interface backed by Rust. The backend recursively scans folders with walkdir, extracts metadata and embedded artwork with lofty, plays audio through rodio, and stores qualified listening history in a bundled SQLite database. Tauri events keep the playback UI synchronized in real time.',
    outcome:
      'A functional cross-platform desktop music player with local library scanning, metadata-rich track browsing, embedded album artwork, full playback controls, persisted recents, and a polished dark custom-chrome interface.',
    agentWorkflow:
      'Used AI-assisted development to scaffold and refine the Tauri, Svelte, and Rust architecture. Reviewed generated code against project conventions and verified folder scanning, playback state updates, event-driven UI synchronization, and persisted listening history.',
    technologies: [
      'Tauri v2',
      'Svelte 5',
      'TypeScript',
      'Rust',
    ],
    evidence: [
      {
        label: 'Evidence',
        value:
          'Open-source Tauri application with local-library scanning, playback controls, metadata and artwork extraction, real-time playback events, and SQLite-backed recent-play history.',
      },
    ],
    image: {
      src: '/assets/exo-musix.png',
      alt: 'The Exo Musix Player desktop application showing a local music library',
    },
    repository: {
      label: 'View repository',
      url: 'https://github.com/sloegr/exo-musix-player',
    },
  }
];
