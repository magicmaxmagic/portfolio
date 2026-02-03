"use client";

import Container from "@/components/layout/Container";
import { FadeIn, ScaleIn, SlideIn, StaggerContainer, StaggerItem, HoverScale } from "@/components/Animations";
import { MetricCard, BarChartCard, TimelineItem, ArchitectureDiagram } from "@/components/DataViz";
import Link from "next/link";

const skillsData = [
  { name: "Machine Learning", value: 95 },
  { name: "MLOps", value: 90 },
  { name: "Data Pipeline", value: 92 },
  { name: "Production Systems", value: 88 },
  { name: "Causal Inference", value: 85 },
];

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
      {/* Hero Section */}
      <section className="py-20 sm:py-32">
        <Container>
          <FadeIn>
            <div className="max-w-3xl">
              <h1 className="text-5xl sm:text-6xl font-bold mb-6" style={{ color: "var(--text-primary)" }}>
                Applied ML Systems
              </h1>
              <p className="text-xl sm:text-2xl mb-8" style={{ color: "var(--text-secondary)" }}>
                Building production-scale machine learning systems for decision-oriented problems. Specializing in attribution modeling, NLP, and causal inference.
              </p>
              <div className="flex gap-4 flex-wrap">
                <Link href="/projects" className="btn-primary">
                  Explore Projects
                </Link>
                <Link href="/contact" className="btn-secondary">
                  Get in Touch
                </Link>
              </div>
            </div>
          </FadeIn>
        </Container>
      </section>

      {/* Key Metrics */}
      <section className="py-16 sm:py-20" style={{ backgroundColor: "var(--bg-secondary)" }}>
        <Container>
          <FadeIn>
            <h2 className="text-4xl font-bold mb-12" style={{ color: "var(--text-primary)" }}>
              Impact & Experience
            </h2>
          </FadeIn>
          <StaggerContainer>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <StaggerItem>
                <MetricCard label="Years Experience" value="3+" unit="yrs" trend="up" />
              </StaggerItem>
              <StaggerItem>
                <MetricCard label="ML Models in Production" value="12+" trend="up" />
              </StaggerItem>
              <StaggerItem>
                <MetricCard label="Revenue Impacted" value="50M+" unit="€" trend="up" />
              </StaggerItem>
              <StaggerItem>
                <MetricCard label="Data Volume Processed" value="1B+" unit="rows" trend="up" />
              </StaggerItem>
            </div>
          </StaggerContainer>
        </Container>
      </section>

      {/* Skills & Technical Expertise */}
      <section className="py-16 sm:py-20">
        <Container>
          <FadeIn>
            <h2 className="text-4xl font-bold mb-12" style={{ color: "var(--text-primary)" }}>
              Technical Expertise
            </h2>
          </FadeIn>
          <ScaleIn>
            <BarChartCard
              title="Proficiency Levels"
              data={skillsData}
              dataKey="value"
              xAxisKey="name"
            />
          </ScaleIn>
        </Container>
      </section>

      {/* Featured Projects */}
      <section className="py-16 sm:py-20" style={{ backgroundColor: "var(--bg-secondary)" }}>
        <Container>
          <FadeIn>
            <div className="mb-12">
              <h2 className="text-4xl font-bold mb-4" style={{ color: "var(--text-primary)" }}>
                Featured Projects
              </h2>
              <p style={{ color: "var(--text-secondary)" }}>
                Selected case studies showcasing production ML systems and business impact
              </p>
            </div>
          </FadeIn>

          <StaggerContainer delay={0.1}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <StaggerItem>
                <HoverScale>
                  <Link href="/projects/ubisoft-attribution" className="block h-full">
                    <div className="glass p-8 rounded-lg h-full hover:border-[color:var(--accent-blue)] transition-colors" style={{ borderWidth: "1px", borderColor: "var(--border-color)" }}>
                      <h3 className="text-2xl font-bold mb-2" style={{ color: "var(--accent-blue)" }}>
                        Marketing Attribution MMM
                      </h3>
                      <p className="mb-4" style={{ color: "var(--text-secondary)" }}>
                        Markov chains + Bayesian modeling for €50M revenue attribution at Ubisoft
                      </p>
                      <div className="flex gap-2 flex-wrap">
                        <span className="badge">Python</span>
                        <span className="badge">Bayesian</span>
                        <span className="badge">Snowflake</span>
                      </div>
                    </div>
                  </Link>
                </HoverScale>
              </StaggerItem>

              <StaggerItem>
                <HoverScale>
                  <Link href="/projects/medical-ner" className="block h-full">
                    <div className="glass p-8 rounded-lg h-full hover:border-[color:var(--accent-purple)] transition-colors" style={{ borderWidth: "1px", borderColor: "var(--border-color)" }}>
                      <h3 className="text-2xl font-bold mb-2" style={{ color: "var(--accent-purple)" }}>
                        Medical NER System
                      </h3>
                      <p className="mb-4" style={{ color: "var(--text-secondary)" }}>
                        BERT-based entity recognition with 94% F1 on medical mentions
                      </p>
                      <div className="flex gap-2 flex-wrap">
                        <span className="badge">NLP</span>
                        <span className="badge">BERT</span>
                        <span className="badge">Databricks</span>
                      </div>
                    </div>
                  </Link>
                </HoverScale>
              </StaggerItem>
            </div>
          </StaggerContainer>

          <div className="mt-8 text-center">
            <Link href="/projects" className="btn-primary">
              View All Projects
            </Link>
          </div>
        </Container>
      </section>

      {/* Architecture Overview */}
      <section className="py-16 sm:py-20">
        <Container>
          <FadeIn>
            <h2 className="text-4xl font-bold mb-12" style={{ color: "var(--text-primary)" }}>
              ML Systems Architecture
            </h2>
          </FadeIn>
          <SlideIn direction="up">
            <ArchitectureDiagram nodes={architectureNodes} />
          </SlideIn>
        </Container>
      </section>

      {/* Journey Timeline */}
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

      {/* Tech Stack Preview */}
      <section className="py-16 sm:py-20">
        <Container>
          <FadeIn>
            <h2 className="text-4xl font-bold mb-12" style={{ color: "var(--text-primary)" }}>
              Tech Stack
            </h2>
          </FadeIn>
          <StaggerContainer>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <StaggerItem>
                <div className="glass p-6 rounded-lg">
                  <h3 className="text-xl font-bold mb-3" style={{ color: "var(--accent-blue)" }}>
                    Data & Analytics
                  </h3>
                  <ul className="space-y-2" style={{ color: "var(--text-secondary)" }}>
                    <li>• Snowflake, BigQuery</li>
                    <li>• Databricks, Spark</li>
                    <li>• dbt, Airflow</li>
                  </ul>
                </div>
              </StaggerItem>

              <StaggerItem>
                <div className="glass p-6 rounded-lg">
                  <h3 className="text-xl font-bold mb-3" style={{ color: "var(--accent-purple)" }}>
                    ML & Deep Learning
                  </h3>
                  <ul className="space-y-2" style={{ color: "var(--text-secondary)" }}>
                    <li>• PyTorch, JAX</li>
                    <li>• Scikit-learn, XGBoost</li>
                    <li>• TensorFlow, Hugging Face</li>
                  </ul>
                </div>
              </StaggerItem>

              <StaggerItem>
                <div className="glass p-6 rounded-lg">
                  <h3 className="text-xl font-bold mb-3" style={{ color: "var(--accent-rose)" }}>
                    Production & DevOps
                  </h3>
                  <ul className="space-y-2" style={{ color: "var(--text-secondary)" }}>
                    <li>• Docker, Kubernetes</li>
                    <li>• MLflow, Metaflow</li>
                    <li>• FastAPI, gRPC</li>
                  </ul>
                </div>
              </StaggerItem>
            </div>
          </StaggerContainer>

          <div className="mt-8 text-center">
            <Link href="/stack" className="btn-secondary">
              Full Tech Stack →
            </Link>
          </div>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-20 glass" style={{ backgroundColor: "var(--bg-secondary)" }}>
        <Container>
          <FadeIn>
            <div className="text-center max-w-2xl mx-auto">
              <h2 className="text-3xl sm:text-4xl font-bold mb-6" style={{ color: "var(--text-primary)" }}>
                Ready to build something great?
              </h2>
              <p className="text-lg mb-8" style={{ color: "var(--text-secondary)" }}>
                I'm always interested in discussing challenging ML problems, production systems, and companies building at scale.
              </p>
              <Link href="/contact" className="btn-primary">
                Start a Conversation
              </Link>
            </div>
          </FadeIn>
        </Container>
      </section>
    </div>
  );
}
