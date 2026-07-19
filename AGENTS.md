# Nicholas Vollmer Portfolio - Agent Configuration

This file serves as a persistent instruction set for AI agents, developers, and tools working with this project. It is tuned for `.codex` extensions and custom development rules.

## Project Vision & Aesthetic Rules
- **Theme**: Blueprint Technical / Cybernetic Slate. Off-black background `#0f1419` paired with high-contrast glowing `#00e5ff` cyan borders, monospace telemetry readouts, and `#39ff14` neon green status accents.
- **Atmospheric Effects**: Keep the dynamic coordinate trackers, simulated scanlines, and audio synth oscillator beep triggers active and responsive.
- **Shared Components**: All sub-screens/tabs (ROOT, TERMINAL, SCHEMATICS, STATUS) must adhere to the modular layout pattern, supporting perfect responsiveness on mobile, tablet, and desktop screens.

## Codification Specs (.codex)
This project utilizes `.codex` extension schemas for tracking system schematics and technical components.
- Schema definitions inside `.codex` or related config paths should map directly to types defined in `/src/types.ts`.
- Keep the system specifications and state models decoupled from the UI layer to allow smooth translation via custom parser utilities.

## Core Directives
1. **Never mock data**: Use the exact real dataset mapped in `/src/data.ts`.
2. **Audio Oscillators**: Keep sound effects subtle (low volume `0.04`, short duration `< 0.25s`) using the native Web Audio API wrapper `playBeep`.
3. **No Infinite Renders**: Ensure dependencies inside custom state trackers are memoized or mapped using primitive value dependencies.
