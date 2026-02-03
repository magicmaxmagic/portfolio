import Link from "next/link";
import type { ProjectMeta } from "@/lib/projects";

interface ProjectNavProps {
  current: number;
  total: number;
  projects: ProjectMeta[];
}

export default function ProjectNav({
  current,
  total,
  projects,
}: ProjectNavProps) {
  const prev = current > 0 ? projects[current - 1] : null;
  const next = current < total - 1 ? projects[current + 1] : null;

  return (
    <div className="flex justify-between items-center gap-4">
      {prev ? (
        <Link href={`/projects/${prev.slug}`} className="group">
          <div className="text-sm text-slate-600 group-hover:text-slate-900 mb-1">
            ← Previous
          </div>
          <div className="font-semibold group-hover:underline">{prev.title}</div>
        </Link>
      ) : (
        <div />
      )}

      {next ? (
        <Link href={`/projects/${next.slug}`} className="group text-right">
          <div className="text-sm text-slate-600 group-hover:text-slate-900 mb-1">
            Next →
          </div>
          <div className="font-semibold group-hover:underline">{next.title}</div>
        </Link>
      ) : (
        <div />
      )}
    </div>
  );
}
