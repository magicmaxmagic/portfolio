"use client";

interface ProjectImageProps {
  src: string;
  alt: string;
  caption?: string;
}

export function ProjectImage({ src, alt, caption }: ProjectImageProps) {
  return (
    <figure className="my-8">
      <div className="relative w-full glass rounded-lg overflow-hidden" style={{ backgroundColor: "var(--bg-secondary)" }}>
        <img
          src={src}
          alt={alt}
          loading="lazy"
          className="w-full h-auto"
          style={{ minHeight: "300px" }}
        />
      </div>
      {caption && (
        <figcaption className="mt-3 text-sm text-center" style={{ color: "var(--text-secondary)" }}>
          {caption}
        </figcaption>
      )}
    </figure>
  );
}

export function ImageGrid({ images }: { images: ProjectImageProps[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
      {images.map((image, idx) => (
        <ProjectImage key={idx} {...image} />
      ))}
    </div>
  );
}

// Placeholder diagram components for architecture visualization
export function ArchitectureDiagramPlaceholder({ title }: { title: string }) {
  return (
    <div
      className="my-8 p-8 rounded-lg flex items-center justify-center text-center"
      style={{
        backgroundColor: "var(--bg-secondary)",
        borderWidth: "2px",
        borderColor: "var(--border-color)",
        minHeight: "300px",
      }}
    >
      <div>
        <h4 className="text-lg font-semibold mb-2" style={{ color: "var(--accent-blue)" }}>
          {title}
        </h4>
        <p style={{ color: "var(--text-secondary)" }}>
          Architecture diagram - High resolution architecture visualization included in full report
        </p>
      </div>
    </div>
  );
}

export function DataVisualizationPlaceholder({ title, description }: { title: string; description: string }) {
  return (
    <div
      className="my-8 p-8 rounded-lg flex items-center justify-center text-center"
      style={{
        backgroundColor: "var(--bg-secondary)",
        borderWidth: "2px",
        borderColor: "var(--accent-purple)",
        minHeight: "300px",
      }}
    >
      <div>
        <h4 className="text-lg font-semibold mb-2" style={{ color: "var(--accent-purple)" }}>
          {title}
        </h4>
        <p style={{ color: "var(--text-secondary)" }}>{description}</p>
      </div>
    </div>
  );
}
