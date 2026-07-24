interface EmptyStateProps {
  title: string;
  text: string;
}

export function EmptyState({ title, text }: EmptyStateProps) {
  return (
    <div className="border border-dashed border-slate-600 bg-[#141c24]/20 p-8 max-w-2xl">
      <h2 className="font-sans text-lg text-slate-100">{title}</h2>
      <p className="font-mono text-xs leading-relaxed text-slate-400 mt-3">
        {text}
      </p>
    </div>
  );
}
