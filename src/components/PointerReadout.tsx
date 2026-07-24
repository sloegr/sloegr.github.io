import { useEffect, useRef, useState } from 'react';

export function PointerReadout() {
  const [point, setPoint] = useState({ x: 0, y: 0 });
  const frame = useRef<number | null>(null);
  const pending = useRef(point);

  useEffect(() => {
    const updatePoint = (event: PointerEvent) => {
      pending.current = {
        x: Math.round(event.clientX),
        y: Math.round(event.clientY),
      };

      if (frame.current === null) {
        frame.current = window.requestAnimationFrame(() => {
          setPoint(pending.current);
          frame.current = null;
        });
      }
    };

    window.addEventListener('pointermove', updatePoint, { passive: true });
    return () => {
      window.removeEventListener('pointermove', updatePoint);
      if (frame.current !== null) window.cancelAnimationFrame(frame.current);
    };
  }, []);

  return (
    <div
      className="absolute top-18 right-4 hidden sm:flex flex-col items-end gap-1 pointer-events-none opacity-40 select-none"
      aria-hidden="true"
    >
      <span className="font-mono text-[10px] text-primary">
        LOCAL POINTER SIGNAL
      </span>
      <span className="font-mono text-[10px] text-primary">
        COORD: [{point.x}, {point.y}]
      </span>
    </div>
  );
}
