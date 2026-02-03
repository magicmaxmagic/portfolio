"use client";

import Container from "@/components/layout/Container";
import { FadeIn, ScaleIn, SlideIn, StaggerContainer, StaggerItem } from "@/components/Animations";
import { MetricCard, TimelineItem, ArchitectureDiagram } from "@/components/DataViz";
import { SkillsSystemGraph } from "@/components/SkillsSystemGraph";
import Link from "next/link";

const experienceData = [
  { year: "2024", title: "Applied ML Engineer", description: "Building production-scale ML systems for e-commerce attribution" },
  { year: "2023", title: "ML Systems", description: "Leading NLP projects and MLOps infrastructure" },
  { year: "2022", title: "Data Scientist", description: "Started ML journey with causal inference and marketing analytics" },
  { year: "2021", title: "Analytics", description: "Foundation in data analysis and business intelligence" },
];

const architectureNodes = [
  { title: "Data Ingestion", items: ["Web Events", "API Feeds", "Data Lake"] },
  { title: "Processing", items: ["Databricks", "Spark", "Python"] },
  { title: "ML Models", items: ["Attribution", "Forecasting", "NER"] },
  { title: "Serving", items: ["APIs", "Real-time", "Batch"] },
];

export default function HomePage() {
  return (
    <div className="w-full">
      {/* SECTION 1: IDENTITY & VALUE */}
      <section className="py-20 sm:py-32">
        <Container>
          <FadeIn>
            <div className="max-w-4xl">
              <div className="mb-8">
                <span className="text-sm font-semibold text-[color:var(--accent-blue)] uppercase tracking-wide">
                  Machine Learning Systems Engineer
                </span>
              </div>
              
              <h1 className="text-5xl sm:text-7xl font-bold mb-6" style={{ color: "var(--text-primary)" }}>
                I build ML systems that drive decisions
              </h1>
              
              <p className="text-xl sm:text-2xl mb-12 max-w-2xl" style={{ color: "var(--text-secondary)" }}>
                Production-grade machine learning from data to decision-making. Three years building systems that impact billions in revenue.
              </p>

              {/* TL;DR Block */}
              <div className="mb-12 p-8 rounded-xl border border-[color:var(--border-color)]" style={{ backgroundColor: "var(--bg-secondary)" }}>
                <p className="font-semibold text-lg mb-6" style={{ color: "var(--accent-blue)" }}>
                  What I do:
                </p>
                <ul className="space-y-4" style={{ color: "var(--text-secondary)" }}>
                  <li className="flex gap-4">
                    <span className="text-2xl flex-shrink-0">🎯</span>
                    <span><strong>Problems I solve:</strong> Attribution modeling, NLP systems, causal inference, forecasting—where ML drives business decisions</span>
                  </li>
                  <li className="flex gap-4">
                    <span className="text-2xl flex-shrink-0">📊</span>
                    <span><strong>At scale:</strong> Billion-row datasets, €50M+ revenue impact, 12+ production models, multi-team infrastructure</span>
                  </li>
                  <li className="flex gap-4">
                    <span className="text-2xl flex-shrink-0">✅</span>
                    <span><strong>Real outcomes:</strong> 15% efficiency gains, 94% accuracy systems, automated decisions replacing manual analysis</span>
                  </li>
                </ul>
              </div>

              <div className="flex gap-4 flex-wrap">
                <a href="mailto:maxence@example.com" className="btn-primary">
                  Discuss Applied ML Systems
                </a>
                <a href="https://www.linkedin.com/in/maxence-le-gendre" target="_blank" rel="noopener noreferrer" className="btn-secondary">
                  Connect on LinkedIn
                </a>
              </div>
            </div>
          </FadeIn>
        </Container>
      </section>

      {/* SECTION 2: HOW I THINK ABOUT PROBLEMS */}
      <section className="py-16 sm:py-20" style={{ backgroundColor: "var(--bg-secondary)" }}>
        <Container>
          <FadeIn>
            <div className="max-w-3xl mb-12">
              <h2 className="text-4xl font-bold mb-6" style={{ color: "var(--text-primary)" }}>
                How I Approach ML Systems
              </h2>
              <p className="text-lg" style={{ color: "var(--text-secondary)" }}>
                Every system starts with a business problem, not a model. I focus on systems that:
              </p>
            </div>
          </FadeIn>

          <StaggerContainer>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl">
              <StaggerItem>
                <div className="glass p-6 rounded-lg h-full">
                  <h3 className="text-lg font-bold mb-3" style={{ color: "var(--accent-blue)" }}>
                    Solve Real Problems
                  </h3>
                  <p style={{ color: "var(--text-secondary)" }}>
                    Start with business outcomes. Attribution answers "which channel drives sales?" not "fit another model."
                  </p>
                </div>
              </StaggerItem>

              <StaggerItem>
                <div className="glass p-6 rounded-lg h-full">
                  <h3 className="text-lg font-bold mb-3" style={{ color: "var(--accent-purple)" }}>
                    Are Production-Ready
                  </h3>
                  <p style={{ color: "var(--text-secondary)" }}>
                    Monitoring, versioning, reliability. If it doesn't work in production, it doesn't count.
                  </p>
                </div>
              </StaggerItem>

              <StaggerItem>
                <div className="glass p-6 rounded-lg h-full">
                  <h3 className="text-lg font-bold mb-3" style={{ color: "var(--accent-rose)" }}>
                    Scale Across Teams
                  </h3>
                  <p style={{ color: "var(--text-secondary)" }}>
                    Clear documentation, stakeholder alignment, and infrastructure that supports others.
                  </p>
                </div>
              </StaggerItem>
            </div>
          </StaggerContainer>
        </Container>
      </section>

      {/* SECTION 3: PROOF THROUGH PROJECTS */}
      <section className="py-16 sm:py-20">
        <Container>
          <FadeIn>
            <div className="mb-12">
              <h2 className="text-4xl font-bold mb-4" style={{ color: "var(--text-primary)" }}>
                Proof: Featured Projects
              </h2>
              <p style={{ color: "var(--text-secondary)" }}>
                Real systems, real scale, real impact. Press <kbd className="px-2 py-1 bg-slate-200 dark:bg-slate-800 rounded text-sm">⌘K</kbd> to search all projects.
              </p>
            </div>
          </FadeIn>

          <StaggerContainer delay={0.1}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Project 1 */}
              <StaggerItem>
                <Link href="/projects/ubisoft-attribution" className="block group h-full">
                  <div 
                    className="glass p-8 rounded-xl h-full border border-[color:var(--border-color)] hover:border-[color:var(--accent-blue)] group-hover:shadow-lg transition-all duration-300 flex flex-col"
                    style={{ backgroundColor: "var(--bg-secondary)" }}
                  >
                    <div className="mb-4">
                      <span className="text-xs font-bold text-[color:var(--accent-blue)] uppercase tracking-wide">
                        Marketing / Attribution
                      </span>
                    </div>
                    
                    <h3 className="text-2xl font-bold mb-3 group-hover:translate-x-1 transition-transform" style={{ color: "var(--accent-blue)" }}>
                      €50M Attribution System
                    </h3>
                    
                    <p className="text-sm mb-6 italic" style={{ color: "var(--text-secondary)" }}>
                      <strong>Problem:</strong> How to allocate €100M marketing budget across 8 channels?
                      <br />
                      <strong>Solution:</strong> Markov chains + Bayesian MMM for causal attribution
                      <br />
                      <strong>Impact:</strong> 15% efficiency gain, weekly automated recommendations
                    </p>
                    
                    <div className="mt-auto flex gap-2 flex-wrap">
                      <span className="badge">Python</span>
                      <span className="badge">Bayesian</span>
                      <span className="badge">Snowflake</span>
                    </div>
                  </div>
                </Link>
              </StaggerItem>

              {/* Project 2 */}
              <StaggerItem>
                <Link href="/projects/medical-ner" className="block group h-full">
                  <div 
                    className="glass p-8 rounded-xl h-full border border-[color:var(--border-color)] hover:border-[color:var(--accent-purple)] group-hover:shadow-lg transition-all duration-300 flex flex-col"
                    style={{ backgroundColor: "var(--bg-secondary)" }}
                  >
                    <div className="mb-4">
                      <span className="text-xs font-bold text-[color:var(--accent-purple)] uppercase tracking-wide">
                        NLP / Production
                      </span>
                    </div>
                    
                    <h3 className="text-2xl font-bold mb-3 group-hover:translate-x-1 transition-transform" style={{ color: "var(--accent-purple)" }}>
                      Medical NER at 94% F1
                    </h3>
                    
                    <p className="text-sm mb-6 italic" style={{ color: "var(--text-secondary)" }}>
                      <strong>Problem:</strong> Extract medical entities from biomedical text at scale?
                      <br />
                      <strong>Solution:</strong> BioBERT + CRF, Optuna hyperparameter tuning
                      <br />
                      <strong>Impact:</strong> 74% macro F1, reproducible pipeline with MLflow
                    </p>
                    
                    <div className="mt-auto flex gap-2 flex-wrap">
                      <span className="badge">NLP</span>
                      <span className="badge">BERT</span>
                      <span className="badge">MLflow</span>
                    </div>
                  </div>
                </Link>
              </StaggerItem>
            </div>
          </StaggerContainer>

          <div className="mt-12 text-center">
            <Link href="/projects" className="btn-primary">
              View All Projects & Case Studies
            </Link>
          </div>
        </Container>
      </section>

      {/* SECTION 4: SKILLS AS A CONNECTED SYSTEM */}
      <section className="py-16 sm:py-20" style={{ backgroundColor: "var(--bg-secondary)" }}>
        <Container>
          <FadeIn>
            <div className="mb-12">
              <h2 className="text-4xl font-bold mb-4" style={{ color: "var(--text-primary)" }}>
                Skills as a Connected System
              </h2>
              <p className="max-w-2xl" style={{ color: "var(--text-secondary)" }}>
                I don't specialize in isolated skills. ML systems require data infrastructure, operations, 
                clear communication, and business thinking. Each layer supports the others.
              </p>
            </div>
          </FadeIn>

          <ScaleIn>
            <SkillsSystemGraph />
          </ScaleIn>
        </Container>
      </section>

      {/* SECTION 5: IMPACT METRICS */}
      <section className="py-16 sm:py-20">
        <Container>
          <FadeIn>
            <h2 className="text-4xl font-bold mb-12" style={{ color: "var(--text-primary)" }}>
              By The Numbers
            </h2>
          </FadeIn>
          <StaggerContainer>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <StaggerItem>
                <MetricCard label="Years in ML" value="3+" unit="yrs" trend="up" />
              </StaggerItem>
              <StaggerItem>
                <MetricCard label="Production Models" value="12+" trend="up" />
              </StaggerItem>
              <StaggerItem>
                <MetricCard label="Revenue Impacted" value="50M+" unit="€" trend="up" />
              </StaggerItem>
              <StaggerItem>
                <MetricCard label="Data Volume" value="1B+" unit="rows" trend="up" />
              </StaggerItem>
            </div>
          </StaggerContainer>
        </Container>
      </section>

      {/* SECTION 6: PROFESSIONAL JOURNEY */}
      <section className="py-16 sm:py-20" style={{ backgroundColor: "var(--bg-secondary)" }}>
        <Container>
          <FadeIn>
            <h2 className="text-4xl font-bold mb-12" style={{ color: "var(--text-primary)" }}>
              Professional Journey
            </h2>
          </FadeIn>
          <div className="max-w-2xl">
            {experienceData.map((item, idx) => (
              <FadeIn key={idx} delay={idx * 0.1}>
                <TimelineItem
                  year={item.year}
                  title={item.title}
                  description={item.description}
                  isLast={idx === experienceData.length - 1}
                />
              </FadeIn>
            ))}
          </div>
        </Container>
      </section>

      {/* SECTION 7: ARCHITECTURE THINKING */}
      <section className="py-16 sm:py-20">
        <Container>
          <FadeIn>
            <h2 className="text-4xl font-bold mb-12" style={{ color: "var(--text-primary)" }}>
              ML Systems Architecture
            </h2>
            <p className="mb-12 max-w-2xl" style={{ color: "var(--text-secondary)" }}>
              How I structure end-to-end ML systems: from raw data to automated decisions.
            </p>
          </FadeIn>
          <SlideIn direction="up">
            <ArchitectureDiagram nodes={architectureNodes} />
          </SlideIn>
        </Container>
      </section>

      {/* SECTION 8: TECH STACK (SECONDARY) */}
      <section className="py-16 sm:py-20" style={{ backgroundColor: "var(--bg-secondary)" }}>
        <Container>
          <FadeIn>
            <div className="mb-12">
              <h2 className="text-3xl font-bold mb-4" style={{ color: "var(--text-primary)" }}>
                Tools & Technologies
              </h2>
              <p style={{ color: "var(--text-secondary)" }}>
                Selected tools that power production systems. Full documentation <Link href="/stack" className="underline hover:opacity-70">on the stack page</Link>.
              </p>
            </div>
          </FadeIn>
          <StaggerContainer>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl">
              <StaggerItem>
                <div className="glass p-6 rounded-lg">
                  <h3 className="text-lg font-bold mb-3" style={{ color: "var(--accent-blue)" }}>
                    Data & Warehousing
                  </h3>
                  <ul className="space-y-2 text-sm" style={{ color: "var(--text-secondary)" }}>
                    <li>• Snowflake</li>
                    <li>• Databricks</li>
                    <li>• PostgreSQL</li>
                  </ul>
                </div>
              </StaggerItem>

              <StaggerItem>
                <div className="glass p-6 rounded-lg">
                  <h3 className="text-lg font-bold mb-3" style={{ color: "var(--accent-purple)" }}>
                    ML & Deep Learning
                  </h3>
                  <ul className="space-y-2 text-sm" style={{ color: "var(--text-secondary)" }}>
                    <li>• PyTorch</li>
                    <li>• HuggingFace</li>
                    <li>• Scikit-learn</li>
                  </ul>
                </div>
              </StaggerItem>

              <StaggerItem>
                <div className="glass p-6 rounded-lg">
                  <h3 className="text-lg font-bold mb-3" style={{ color: "var(--accent-rose)" }}>
                    Production & MLOps
                  </h3>
                  <ul className="space-y-2 text-sm" style={{ color: "var(--text-secondary)" }}>
                    <li>• Metaflow</li>
                    <li>• Docker & K8s</li>
                    <li>• MLflow</li>
                  </ul>
                </div>
              </StaggerItem>
            </div>
          </StaggerContainer>
        </Container>
      </section>

      {/* FINAL CTA SECTION */}
      <section className="py-16 sm:py-20 glass" style={{ backgroundColor: "var(--bg-secondary)" }}>
        <Container>
          <FadeIn>
            <div className="text-center max-w-3xl mx-auto">
              <h2 className="text-4xl sm:text-5xl font-bold mb-6" style={{ color: "var(--text-primary)" }}>
                Ready to discuss applied ML systems?
              </h2>
              <p className="text-lg mb-8" style={{ color: "var(--text-secondary)" }}>
                Whether you're building attribution models, NLP pipelines, or thinking about production ML infrastructure—let's talk.
              </p>
              <div className="flex gap-4 justify-center flex-wrap">
                <a href="mailto:maxence@example.com" className="btn-primary">
                  Email
                </a>
                <a 
                  href="https://www.linkedin.com/in/maxence-le-gendre" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="btn-secondary"
                >
                  LinkedIn
                </a>
                <a 
                  href="https://github.com/magicmaxmagic" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="btn-secondary"
                >
                  GitHub
                </a>
              </div>
            </div>
          </FadeIn>
        </Container>
      </section>
    </div>
  );
}
