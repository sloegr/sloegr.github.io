# Interactive System Skills & Capabilities

This file details the custom skill modules and interactive systems integrated into this blueprint-themed development engine.

## 1. Web Audio Synthesizer (`playBeep`)
- Uses browser native `AudioContext` and `OscillatorNode` to generate real-time feedback tones.
- Automatically handles block exclusions if autoplay policies restrict immediate instantiation.
- Custom parameter ranges:
  - Frequencies: `250Hz` (low alert) to `950Hz` (system launch).
  - Waveforms: `sine` (default hover feedback), `triangle` (high-fidelity prompts), `square` / `sawtooth` (hardware telemetry alerts).

## 2. Interactive Coordinate Tracker
- Tracks local client-side viewport mouse motions and tactile touch movements seamlessly.
- Automatically updates state headers with instant layout positions (`COORD: [X,Y]`), mirroring physical telemetry logs.

## 3. Dynamic Waveform Visualizer
- Uses secondary state intervals to alter high-speed heights (`telemetry-bar`), simulating server activity without bloated heavy canvas frames.

## 4. Custom CLI Terminal Emulator
- Recreates a retro command line console with responsive output logs, command histories, and feedback messages.
