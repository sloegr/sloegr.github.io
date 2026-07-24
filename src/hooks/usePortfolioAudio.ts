import { useCallback, useEffect, useRef } from 'react';

type AudioContextConstructor = typeof AudioContext;

export function usePortfolioAudio(enabled: boolean) {
  const contextRef = useRef<AudioContext | null>(null);

  const playBeep = useCallback(
    (frequency = 600, duration = 0.08) => {
      if (!enabled) return;

      try {
        const AudioContextClass =
          window.AudioContext ??
          (window as typeof window & { webkitAudioContext?: AudioContextConstructor })
            .webkitAudioContext;
        if (!AudioContextClass) return;

        const audioContext =
          contextRef.current ?? new AudioContextClass();
        contextRef.current = audioContext;
        if (audioContext.state === 'suspended') void audioContext.resume();

        const oscillator = audioContext.createOscillator();
        const gain = audioContext.createGain();
        oscillator.frequency.value = frequency;
        gain.gain.setValueAtTime(0.04, audioContext.currentTime);
        gain.gain.exponentialRampToValueAtTime(
          0.00001,
          audioContext.currentTime + duration,
        );
        oscillator.connect(gain);
        gain.connect(audioContext.destination);
        oscillator.start();
        oscillator.stop(audioContext.currentTime + duration);
      } catch {
        // Audio is optional and browser policy may block it.
      }
    },
    [enabled],
  );

  useEffect(
    () => () => {
      if (contextRef.current && contextRef.current.state !== 'closed') {
        void contextRef.current.close();
      }
      contextRef.current = null;
    },
    [],
  );

  return { playBeep };
}
