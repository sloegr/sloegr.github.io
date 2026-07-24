import { ExternalLink } from 'lucide-react';
import type { Project } from '../types';
import { EmptyState } from './EmptyState';

interface ProjectArchiveProps {
  projects: Project[];
  onOpenProject: (project: Project) => void;
}

export function ProjectArchive({ projects, onOpenProject }: ProjectArchiveProps) {
  return (
    <section
      className="flex-1 flex flex-col max-w-5xl w-full mx-auto py-6 z-10"
      aria-labelledby="projects-title"
    >
      <header className="mb-6 pb-3 border-b border-[#3b494c]/80">
        <p className="section-label">Public project evidence</p>
        <h1
          id="projects-title"
          className="font-sans text-xl md:text-2xl font-black text-slate-100 uppercase"
        >
          PROJECTS
        </h1>
      </header>
      {projects.length === 0 ? (
        <EmptyState
          title="No projects added yet"
          text="Project records, screenshots, outcomes, and links will be added only when they are verified and approved for publication."
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <article key={project.id} className="case-card">
              <div className="flex justify-between gap-3 border-b border-[#3b494c] pb-2">
                <span className="font-mono text-[10px] text-slate-500">{project.id}</span>
                <span className="font-mono text-[10px] text-primary">{project.status}</span>
              </div>
              {project.image && (
                <img
                  src={project.image.src}
                  alt={project.image.alt}
                  className="w-full h-32 object-cover mt-4 border border-[#3b494c]"
                />
              )}
              <h2 className="font-sans text-md font-bold mt-4 text-primary">{project.title}</h2>
              <p className="text-slate-300 font-mono text-xs leading-relaxed my-3 flex-1">
                {project.summary}
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                {project.technologies.map((technology) => (
                  <span key={technology} className="tag">
                    {technology}
                  </span>
                ))}
              </div>
              <button onClick={() => onOpenProject(project)} className="secondary-button mt-auto">
                VIEW PROJECT <ExternalLink className="w-3 h-3" aria-hidden="true" />
              </button>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
