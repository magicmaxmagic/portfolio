import Link from "next/link";
import type { ProjectMeta } from "@/lib/projects";
import { ReactionButtons } from "./ReactionButtons";

interface ProjectCardProps {
  project: ProjectMeta;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <div className="group glass rounded-xl overflow-hidden card-hover h-full">
      <Link href={`/projects/${project.slug}`}>
        <div className="cursor-pointer">
          {/* Header with gradient background */}
          <div className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 h-40 flex items-end justify-between p-6 relative overflow-hidden">
            <div className="absolute inset-0 opacity-10 group-hover:opacity-20 transition-opacity" />
            <div className="relative z-10">
              <h3 className="text-2xl font-bold mb-2 text-[color:var(--text-primary)] group-hover:gradient-text transition-all">
                {project.title}
              </h3>
            </div>
          </div>

          {/* Content */}
          <div className="p-6 flex flex-col gap-4">
            {/* Summary */}
            <p className="text-slate-300 text-sm leading-relaxed line-clamp-2">
              {project.summary}
            </p>

            {/* Meta info */}
            <div className="flex items-center gap-4 text-xs text-slate-400 py-3 border-y border-slate-700">
              <div className="flex items-center gap-1">
                <span>👤</span>
                {project.role}
              </div>
              <div className="flex items-center gap-1">
                <span>📅</span>
                {new Date(project.date).toLocaleDateString("en-US", {
                  month: "short",
                  year: "numeric",
                })}
              </div>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              {project.tags.slice(0, 2).map((tag) => (
                <span
                  key={tag}
                  className="text-xs px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full"
                >
                  {tag}
                </span>
              ))}
              {project.tags.length > 2 && (
                <span className="text-xs px-3 py-1 text-slate-400">
                  +{project.tags.length - 2} more
                </span>
              )}
            </div>

            {/* Stack - mini visualization */}
            <div className="space-y-2 mt-2">
              <div className="text-xs font-semibold text-slate-400">Stack</div>
              <div className="flex flex-wrap gap-1">
                {project.stack.slice(0, 4).map((tech) => (
                  <span
                    key={tech}
                    className="text-xs px-2 py-1 bg-purple-500/10 text-purple-300 rounded text-ellipsis overflow-hidden whitespace-nowrap"
                  >
                    {tech}
                  </span>
                ))}
                {project.stack.length > 4 && (
                  <span className="text-xs px-2 py-1 text-slate-500">
                    +{project.stack.length - 4}
                  </span>
                )}
              </div>
            </div>

            {/* Metrics if present */}
            {project.metrics && project.metrics.length > 0 && (
              <div className="mt-4 pt-4 border-t border-slate-700">
                <div className="text-xs font-semibold text-slate-400 mb-2">Impact</div>
                <div className="space-y-1">
                  {project.metrics.slice(0, 2).map((metric, i) => (
                    <div key={i} className="text-xs text-green-400 flex items-center gap-2">
                      <span>✓</span>
                      <span className="line-clamp-1">{metric}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* CTA */}
            <div className="mt-4 pt-4 border-t border-slate-700 flex items-center gap-2 text-sm text-blue-400 group-hover:text-blue-300 transition-colors">
              Read Case Study
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </div>
          </div>
        </div>
      </Link>

      {/* Reactions - Outside link so they're clickable */}
      <div className="p-4 border-t border-slate-700 bg-slate-900/30">
        <ReactionButtons projectSlug={project.slug} size="small" />
      </div>
    </div>
  );
}
