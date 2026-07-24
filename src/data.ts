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
    //     // A short unique ID used internally by the UI.
    id: '#1',
    //     // The real project name. Do not use a client name without permission.
    title: 'WebLLM Chat',
    //     // An honest status such as “Shipped”, “In progress”, or “Private”.
    status: 'Shipped',
    //     // One or two sentences describing what the project is.
    summary: 'Talk to AI using WebLLM',
    //     // What problem existed and who it helped. Keep confidential details out.
    //   problem: 'The user or business problem this project addressed.',
    //     // Your specific contribution—not a team-wide or agent-generated claim.
    //    role: 'What I designed, built, reviewed, or owned.',
    //     // Optional: important limits such as timeline, integrations, privacy, or cost.
    //     constraints: 'Optional constraints and trade-offs.',
    //     // Optional: the approach and key technical decisions you made.
    //     solution: 'Optional explanation of the solution.',
    //     // Optional: a measured outcome or honest qualitative result.
    //     outcome: 'Optional outcome, with only defensible metrics.',
    //     // Optional: how agents helped and how you reviewed or verified their work.
    //     agentWorkflow: 'Optional public description of the agent-assisted workflow.',
    //     // Technologies you genuinely used on this project.
    technologies: ['React', 'TypeScript'],
    //     // Evidence readers can understand: verified metrics, a published write-up, etc.
    //     evidence: [{ label: 'Evidence', value: 'Describe the approved evidence.' }],
    //     // Optional local or approved remote image. Always write meaningful alt text.
    image: {
      src: '/assets/webllm-pic.png',
      alt: 'Describe what the image shows.',
    },
    //     // A real public deployment, or an honest unavailable state.
    live: {
      label: 'View live site',
      url: 'https://sloegr.github.io/webllm-chat/',
    },
    //     // A real public repository, or an honest unavailable state.
    repository: {
      label: 'View repository',
      url: 'https://github.com/sloegr/webllm-chat/',
    },
  },
];
