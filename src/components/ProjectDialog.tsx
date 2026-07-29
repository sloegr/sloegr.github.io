import { ExternalLink, X } from 'lucide-react';
import { useCallback, useEffect, useRef } from 'react';
import type { KeyboardEvent as ReactKeyboardEvent } from 'react';
import type { Project } from '../types';

interface ProjectDialogProps {
  project: Project;
  onClose: () => void;
}

export function ProjectDialog({ project, onClose }: ProjectDialogProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const returnFocusRef = useRef<HTMLElement | null>(null);

  const close = useCallback(() => {
    onClose();
    window.requestAnimationFrame(() => returnFocusRef.current?.focus());
  }, [onClose]);

  useEffect(() => {
    returnFocusRef.current =
      document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const onEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') close();
    };

    document.addEventListener('keydown', onEscape);
    dialogRef.current?.querySelector<HTMLElement>('button, a[href]')?.focus();
    return () => document.removeEventListener('keydown', onEscape);
  }, [close]);

  const trapFocus = (event: ReactKeyboardEvent<HTMLDivElement>) => {
    if (event.key !== 'Tab') return;
    const focusable = dialogRef.current
      ? Array.from(
          dialogRef.current.querySelectorAll<HTMLElement>(
            'a[href], button:not([disabled])',
          ),
        )
      : [];
    if (!focusable.length) return;

    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  };

  const action = (link: Project['live']) =>
    link.url ? (
      <a href={link.url} target="_blank" rel="noreferrer" className="modal-action">
        {link.label} <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
      </a>
    ) : (
      <span className="modal-action modal-action-disabled">
        {link.unavailableLabel ?? 'Not publicly available'}
      </span>
    );

  return (
    <div
      className="fixed inset-0 bg-[#0a0f14]/85 backdrop-blur-sm z-9999 flex items-center justify-center p-4"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) close();
      }}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="project-dialog-title"
        onKeyDown={trapFocus}
        className="relative w-full max-w-3xl bg-[#0f1419] border-2 border-primary p-5 md:p-8 flex flex-col shadow-[0_0_50px_rgba(0,229,255,0.25)] rounded-sm max-h-[90vh]"
      >
        <div className="flex justify-between items-start gap-3 border-b border-[#3b494c] pb-4 mb-4 shrink-0">
          <div>
            <p className="font-mono text-[10px] text-primary uppercase tracking-wider">
              Project details
            </p>
            <h2
              id="project-dialog-title"
              className="font-sans text-xl font-bold text-slate-100 tracking-wide"
            >
              {project.title}
            </h2>
          </div>
          <button onClick={close} aria-label="Close project details" className="icon-button">
            <X className="w-5 h-5" aria-hidden="true" />
          </button>
        </div>

        <div className="overflow-y-auto pr-1 space-y-6 text-sm">
          {project.image && (
            <img
              src={project.image.src}
              alt={project.image.alt}
              className="w-full max-h-72 object-contain border border-[#3b494c]"
            />
          )}
          <p className="font-mono text-slate-300 leading-relaxed">{project.summary}</p>
          {(project.problem ||
            project.role ||
            project.constraints ||
            project.solution ||
            project.outcome ||
            project.agentWorkflow) && (
            <div className="grid md:grid-cols-2 gap-4">
              {project.problem && <Detail label="Problem" value={project.problem} />}
              {project.role && <Detail label="Role and contribution" value={project.role} />}
              {project.constraints && <Detail label="Constraints" value={project.constraints} />}
              {project.solution && <Detail label="Solution" value={project.solution} />}
              {project.outcome && <Detail label="Outcome" value={project.outcome} />}
              {project.agentWorkflow && (
                <Detail label="Process and review" value={project.agentWorkflow} />
              )}
            </div>
          )}
          {project.evidence?.length ? (
            <div>
              <h3 className="section-label">Evidence</h3>
              <ul className="space-y-2">
                {project.evidence.map((item) => (
                  <li key={item.label} className="font-mono text-xs text-slate-300">
                    <span className="text-primary">{item.label}:</span> {item.value}
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
          {project.technologies.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((technology) => (
                <span key={technology} className="tag">
                  {technology}
                </span>
              ))}
            </div>
          )}
        </div>
        <div className="border-t border-[#3b494c] pt-4 mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3 shrink-0">
          {project.live && action(project.live)}
          {project.repository && action(project.repository)}
        </div>
      </div>
    </div>
  );
}

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <section className="border border-[#3b494c] p-3 bg-[#141c24]/40">
      <h3 className="section-label">{label}</h3>
      <p className="font-mono text-xs leading-relaxed text-slate-300">{value}</p>
    </section>
  );
}
