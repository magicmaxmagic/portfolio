import Container from "@/components/layout/Container";
import { ArchitectureDiagram, TimelineItem, DataVisualization } from "@/components/ui/DataViz";

export const metadata = {
  title: "Architecture & Approach",
  description: "How I build production ML systems",
};

export default function ArchitecturePage() {
  return (
    <main>
      {/* Header */}
      <Container className="py-24">
        <div>
          <div className="inline-block glass rounded-full px-4 py-2 mb-6 text-sm text-blue-400">
            🏗 System Architecture
          </div>
          <h1 className="text-6xl font-bold mb-6">How I Build Production ML Systems</h1>
          <p className="text-xl text-slate-300 max-w-3xl leading-relaxed">
            Every project follows a rigorous architectural pattern designed for scale, maintainability, and business impact. Here's how data transforms into deployed models.
          </p>
        </div>
      </Container>

      {/* Main Pipeline */}
      <Container className="py-24 border-t border-slate-800">
        <h2 className="text-4xl font-bold mb-12">End-to-End Data Pipeline</h2>
        <div className="bg-gradient-to-b from-blue-500/10 to-purple-500/10 rounded-2xl p-12 border border-slate-700 mb-12">
          <ArchitectureDiagram />
        </div>
        <p className="text-slate-300 max-w-3xl text-lg leading-relaxed">
          Every ML system follows this architecture: Raw data enters through various sources (databases, APIs, logs). Data flows through transformation layers (cleaning, feature engineering, enrichment). Models are trained in isolated, version-controlled environments. Results are deployed as real-time predictions or batch jobs. The entire pipeline runs on orchestrated infrastructure with automated monitoring and alerts.
        </p>
      </Container>

      {/* Development Timeline */}
      <Container className="py-24 border-t border-slate-800">
        <h2 className="text-4xl font-bold mb-12">Project Lifecycle</h2>
        <div className="max-w-3xl">
          <TimelineItem
            year="Week 1"
            title="Problem Definition & Data Exploration"
            description="Deep dive into business context, data sources, success metrics. Build initial EDA pipelines to understand data quality, distributions, and edge cases. Define success thresholds."
          />
          <TimelineItem
            year="Week 2-3"
            title="Data Engineering & Feature Development"
            description="Build automated data pipelines, implement feature engineering logic, create reproducible datasets with versioning. Document assumptions and data lineage for auditability."
          />
          <TimelineItem
            year="Week 4-5"
            title="Modeling & Experimentation"
            description="Train baseline models, compare approaches, conduct error analysis. Optimize for business metrics, not just accuracy. Test on held-out data with temporal validation."
          />
          <TimelineItem
            year="Week 6-7"
            title="Production Deployment & Monitoring"
            description="Deploy to staging, load test, set up monitoring dashboards. Deploy to production with gradual rollout. Configure alerts for performance degradation and data drift."
          />
          <TimelineItem
            year="Ongoing"
            title="Maintenance & Iteration"
            description="Monitor model performance weekly, retrain on schedule or when drift detected. Iterate on features based on error patterns. Document lessons learned for next iteration."
          />
        </div>
      </Container>

      {/* Tech Stack Distribution */}
      <Container className="py-24 border-t border-slate-800">
        <h2 className="text-4xl font-bold mb-12">Technology Distribution</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <DataVisualization
            title="Time Allocation"
            items={[
              { label: "Data Engineering", value: 40, color: "bg-blue-500" },
              { label: "Modeling", value: 25, color: "bg-purple-500" },
              { label: "Monitoring & Ops", value: 20, color: "bg-pink-500" },
              { label: "Documentation", value: 15, color: "bg-green-500" },
            ]}
          />
          <DataVisualization
            title="Infrastructure"
            items={[
              { label: "Data Warehouse", value: 35, color: "bg-blue-500" },
              { label: "Compute", value: 30, color: "bg-purple-500" },
              { label: "Orchestration", value: 20, color: "bg-pink-500" },
              { label: "Monitoring", value: 15, color: "bg-green-500" },
            ]}
          />
        </div>
      </Container>

      {/* Design Principles */}
      <Container className="py-24 border-t border-slate-800">
        <h2 className="text-4xl font-bold mb-12">Design Principles</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {[
            {
              title: "Reproducibility",
              description: "Every result is reproducible: same data, same code, same result. Use containerization, version control, and artifact tracking.",
              icon: "🔄",
            },
            {
              title: "Observability",
              description: "Instrument everything. Log data distributions, model predictions, latency, error rates. Proactive monitoring prevents production surprises.",
              icon: "👁",
            },
            {
              title: "Automation",
              description: "Humans make mistakes. Automate data pipelines, testing, deployment, retraining. Reduce manual work to near-zero.",
              icon: "⚙️",
            },
            {
              title: "Simplicity",
              description: "Simple models that ship beat perfect models that don't. Optimize for clarity and maintainability over marginal gains.",
              icon: "🎯",
            },
            {
              title: "Versioning",
              description: "Version data, code, models, and parameters. Rollback capability is non-negotiable. Know exactly what changed between versions.",
              icon: "📦",
            },
            {
              title: "Documentation",
              description: "Write for your future self and your teammates. Document assumptions, failure modes, edge cases, and decisions made.",
              icon: "📚",
            },
          ].map((principle, i) => (
            <div key={i} className="glass rounded-xl p-6 border border-slate-700">
              <div className="text-3xl mb-3">{principle.icon}</div>
              <h3 className="text-lg font-bold mb-2 text-slate-50">{principle.title}</h3>
              <p className="text-slate-300 text-sm">{principle.description}</p>
            </div>
          ))}
        </div>
      </Container>

      {/* Common Pitfalls */}
      <Container className="py-24 border-t border-slate-800">
        <h2 className="text-4xl font-bold mb-12">Common Pitfalls (and How I Avoid Them)</h2>
        <div className="space-y-6">
          {[
            {
              pitfall: "Data Leakage",
              solution:
                "Strictly separate train/val/test. Apply transformations within cross-validation folds. Use temporal validation for time-series data. Document data dependencies.",
            },
            {
              pitfall: "Models Degrade in Production",
              solution:
                "Monitor feature distributions for drift. Implement automated retraining pipelines. Set alerts for performance drops. Regularly audit predictions.",
            },
            {
              pitfall: "Nobody Deploys the Model",
              solution:
                "Engage stakeholders early. Build for their use case, not yours. Automate deployment. Make it easy to integrate predictions into workflows.",
            },
            {
              pitfall: "Overfitting to Historical Data",
              solution:
                "Use proper train/test splits with temporal ordering. Test on data the model has never seen. Monitor prediction distribution shifts over time.",
            },
            {
              pitfall: "Slow Inference in Production",
              solution:
                "Profile before deploying. Use model quantization and caching. Pre-compute features where possible. Load test in staging.",
            },
            {
              pitfall: "Unmaintainable Code",
              solution:
                "Write modular, well-tested code. Use type hints and documentation. Implement code review processes. Refactor regularly.",
            },
          ].map((item, i) => (
            <div key={i} className="glass rounded-xl p-6 border border-slate-700">
              <div className="flex gap-4">
                <div className="text-2xl">⚠️</div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-slate-50 mb-2">{item.pitfall}</h3>
                  <p className="text-slate-300">{item.solution}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </main>
  );
}
