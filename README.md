# Engineering Portfolio

A static React portfolio with a blueprint-inspired interface. It is designed to present only owner-approved identity, project evidence, external links, and agent-assisted engineering practices.

## Local development

Prerequisite: Node.js 20 or newer.

```bash
npm install
npm run dev
```

Use `npm run lint` for TypeScript validation and `npm run build` to create the production bundle in `dist/`.

## Publishing content

`src/data.ts` is the source of public profile and project content. Before publishing, supply and verify:

- public identity, positioning, contact methods, profile links, and résumé URL in `PROFILE`;
- factual project case studies in `PROJECTS`, including approved evidence, optional images, and honest live/repository availability;

Keep unverified fields empty. The interface intentionally renders unavailable states rather than placeholder claims or fake links.

## Assets and privacy

Use owner-supplied, licensed assets. Do not add client details, repository URLs, metrics, contact information, prompts, or screenshots unless they are explicitly approved for public release. This project currently requires no API key or environment variable.

## Accessibility and interaction

The interface supports keyboard navigation, focus-visible styling, modal Escape-to-close and focus restoration, reduced-motion preferences, and an explicit opt-in sound control. Visual scanlines, pointer readouts, and waveform effects are decorative—not operational telemetry.
