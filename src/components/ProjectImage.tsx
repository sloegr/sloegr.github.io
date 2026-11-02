import type { Project } from '../types';

type ProjectImageVariant = 'card' | 'dialog';

const VARIANT_CLASSES: Record<ProjectImageVariant, string> = {
  card: 'w-full h-32 object-cover mt-4 border border-[#3b494c]',
  dialog: 'w-full max-h-72 object-contain border border-[#3b494c]',
};

interface ProjectImageProps {
  image: NonNullable<Project['image']>;
  variant?: ProjectImageVariant;
}

export function ProjectImage({ image, variant = 'card' }: ProjectImageProps) {
  return (
    <img
      src={image.src}
      alt={image.alt}
      className={VARIANT_CLASSES[variant]}
    />
  );
}
