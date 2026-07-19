# Technical Development Instructions

This document outlines the standard operation protocols for building, extending, and maintaining the Nicholas Vollmer Portfolio.

## Architecture Outline
- **State Management**: Standard React hooks (`useState`, `useEffect`, `useCallback`, `useRef`) managing real-time coordinates, system status parameters, simulation updates, and layout navigation.
- **Terminal System**: Command dispatcher inside `/src/App.tsx` parsing custom user strings (`help`, `about`, `projects`, `ledger`, `specs`, `matrix`, `contact`, `beep`, `clear`).
- **Interactive Modals**: Multi-layered blueprints rendering SVG illustrations and technical specs. Supports viewport scanning line animations.

## Key Files
- `src/App.tsx` - Main applet orchestrating visual layers, terminal dispatcher, Web Audio oscillators, and modal frames.
- `src/data.ts` - Central technical schematics directory containing project metrics and technology ledger states.
- `src/types.ts` - Core TypeScript types and contract declarations.

## Development Checklist
- Run `npm run dev` to start the local simulation engine.
- Execute `npm run build` to package files. All static outputs are packed into `dist/` directory.
- Verify styling using standard Tailwind utility classes. Avoid separate stylesheet layers.
