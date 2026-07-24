# Interface Capabilities

## Optional sound feedback

`playBeep` uses the native Web Audio API at low volume and short duration. It is disabled until the visitor explicitly enables sound.

## Decorative interface signals

The scanline, local pointer readout, and waveform are visual effects. They are labelled as decorative and respect `prefers-reduced-motion`. Pointer and waveform updates are isolated from the main application state.

## Portfolio terminal

The terminal accepts `help`, `about`, `projects`, `workflow`, `contact`, `sound`, and `clear`. Its responses read from approved data and state clearly when no public content is configured.
