# Development Notes

## Architecture

- `src/data.ts` holds all public portfolio content and must remain the only source for identity, project, workflow, and link claims.
- `src/types.ts` defines the data contracts for public profile, case study, evidence, workflow, and tool-practice records.
- `src/App.tsx` renders the responsive portfolio, terminal, case-study dialog, optional sound, and isolated decorative effects.
- `src/index.css` owns the blueprint theme, interaction styles, and reduced-motion behavior.

## Content rules

Never replace an empty state with invented content. Every project should name the problem, role, solution, outcome, and approved evidence. A missing external URL must render as unavailable; it must never become an alert, guessed URL, or placeholder destination.

## Before handoff

Run `npm run lint` and `npm run build`. Check keyboard navigation, the project dialog, mobile navigation, reduced-motion behavior, sound opt-in, and every public link after content is supplied.
