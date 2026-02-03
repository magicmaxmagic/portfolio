export function MetricCard({ value, label, trend }: { value: string; label: string; trend?: string }) {
  return (
    <div className="glass rounded-xl p-6 card-hover">
      <div className="text-3xl font-bold gradient-text mb-2">{value}</div>
      <div className="text-sm text-slate-400">{label}</div>
      {trend && <div className="text-xs text-green-400 mt-2">↑ {trend}</div>}
    </div>
  );
}

export function SkillTag({ name, level }: { name: string; level: number }) {
  return (
    <div className="glass rounded-lg p-3">
      <div className="text-sm font-medium text-blue-300 mb-2">{name}</div>
      <div className="w-full bg-slate-800 rounded-full h-2">
        <div
          className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all"
          style={{ width: `${level}%` }}
        />
      </div>
    </div>
  );
}

export function TimelineItem({ year, title, description }: { year: string; title: string; description: string }) {
  return (
    <div className="flex gap-6 pb-12 relative">
      <div className="flex flex-col items-center">
        <div className="w-4 h-4 bg-blue-500 rounded-full ring-4 ring-slate-900" />
        <div className="w-1 h-24 bg-gradient-to-b from-blue-500 to-transparent mt-2" />
      </div>
      <div className="pb-8">
        <div className="text-sm font-semibold text-blue-400">{year}</div>
        <div className="text-lg font-bold text-slate-50 mt-1">{title}</div>
        <div className="text-slate-400 mt-2 max-w-md">{description}</div>
      </div>
    </div>
  );
}

export function DataVisualization({ title, items }: { title: string; items: { label: string; value: number; color: string }[] }) {
  const maxValue = Math.max(...items.map(i => i.value));

  return (
    <div className="glass rounded-xl p-6">
      <h3 className="text-lg font-bold text-slate-50 mb-6">{title}</h3>
      <div className="space-y-4">
        {items.map((item, i) => (
          <div key={i}>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-slate-300">{item.label}</span>
              <span className="text-sm font-bold text-blue-400">{item.value}%</span>
            </div>
            <div className="w-full bg-slate-800 rounded-full h-3 overflow-hidden">
              <div
                className={`h-3 rounded-full transition-all duration-500 ${item.color}`}
                style={{ width: `${(item.value / maxValue) * 100}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function ArchitectureDiagram() {
  return (
    <svg viewBox="0 0 800 400" className="w-full h-auto">
      <defs>
        <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#3b82f6" />
          <stop offset="100%" stopColor="#8b5cf6" />
        </linearGradient>
      </defs>

      {/* Background */}
      <rect width="800" height="400" fill="rgba(15, 23, 42, 0.3)" rx="20" />

      {/* Data Layer */}
      <g>
        <rect x="50" y="50" width="120" height="80" fill="url(#grad1)" rx="8" opacity="0.8" />
        <text x="110" y="100" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">
          Data Sources
        </text>
      </g>

      {/* Arrow 1 */}
      <line x1="170" y1="90" x2="250" y2="90" stroke="#3b82f6" strokeWidth="2" markerEnd="url(#arrowhead)" />

      {/* Processing */}
      <g>
        <rect x="250" y="50" width="120" height="80" fill="url(#grad1)" rx="8" opacity="0.8" />
        <text x="310" y="100" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">
          Processing
        </text>
      </g>

      {/* Arrow 2 */}
      <line x1="370" y1="90" x2="450" y2="90" stroke="#3b82f6" strokeWidth="2" markerEnd="url(#arrowhead)" />

      {/* Models */}
      <g>
        <rect x="450" y="50" width="120" height="80" fill="url(#grad1)" rx="8" opacity="0.8" />
        <text x="510" y="100" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">
          ML Models
        </text>
      </g>

      {/* Arrow 3 */}
      <line x1="570" y1="90" x2="650" y2="90" stroke="#3b82f6" strokeWidth="2" markerEnd="url(#arrowhead)" />

      {/* Output */}
      <g>
        <rect x="650" y="50" width="100" height="80" fill="url(#grad1)" rx="8" opacity="0.8" />
        <text x="700" y="100" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">
          Results
        </text>
      </g>

      {/* Bottom layer */}
      <rect x="50" y="200" width="700" height="150" fill="rgba(59, 130, 246, 0.1)" rx="8" stroke="#3b82f6" strokeWidth="2" />
      <text x="400" y="225" textAnchor="middle" fill="#60a5fa" fontSize="12" fontWeight="bold">
        Infrastructure: Kubernetes, Airflow, Databricks
      </text>
      <text x="400" y="320" textAnchor="middle" fill="#60a5fa" fontSize="12">
        Monitoring, Versioning, Continuous Deployment
      </text>

      <defs>
        <marker id="arrowhead" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
          <polygon points="0 0, 10 3, 0 6" fill="#3b82f6" />
        </marker>
      </defs>
    </svg>
  );
}

export function TechStackGrid({ skills }: { skills: { category: string; items: string[] }[] }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
      {skills.map((skill, i) => (
        <div key={i} className="glass rounded-lg p-4">
          <div className="text-sm font-bold text-blue-400 mb-3">{skill.category}</div>
          <div className="space-y-2">
            {skill.items.map((item, j) => (
              <div key={j} className="text-xs text-slate-300 flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-purple-500 rounded-full" />
                {item}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
