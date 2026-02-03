import type { ProjectMeta } from "@/lib/projects";

interface ProjectMetaProps {
  meta: ProjectMeta;
}

export default function ProjectMeta({ meta }: ProjectMetaProps) {
  return (
    <div className="grid md:grid-cols-2 gap-6 border-t border-slate-200 pt-6">
      <div>
        <h4 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-2">
          Role
        </h4>
        <p className="text-base">{meta.role}</p>
      </div>
      <div>
        <h4 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-2">
          Date
        </h4>
        <p className="text-base">{new Date(meta.date).toLocaleDateString()}</p>
      </div>
      <div>
        <h4 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-2">
          Stack
        </h4>
        <div className="flex flex-wrap gap-2">
          {meta.stack.map((tool) => (
            <span
              key={tool}
              className="text-xs bg-slate-100 text-slate-700 px-2 py-1 rounded"
            >
              {tool}
            </span>
          ))}
        </div>
      </div>
      {meta.metrics && meta.metrics.length > 0 && (
        <div>
          <h4 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-2">
            Impact
          </h4>
          <ul className="space-y-1">
            {meta.metrics.map((metric, idx) => (
              <li key={idx} className="text-sm">
                • {metric}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
