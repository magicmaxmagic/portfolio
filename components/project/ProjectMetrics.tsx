"use client";

import { FadeIn, StaggerContainer, StaggerItem } from "@/components/Animations";

interface ProjectMetricsProps {
  metrics: string[];
  title?: string;
}

export function ProjectMetrics({ metrics, title = "Key Results" }: ProjectMetricsProps) {
  return (
    <section className="my-12">
      <FadeIn>
        <h2 className="text-2xl font-bold mb-6" style={{ color: "var(--text-primary)" }}>
          {title}
        </h2>
      </FadeIn>

      <StaggerContainer delay={0.1}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {metrics.map((metric, idx) => (
            <StaggerItem key={idx}>
              <div
                className="glass p-4 rounded-lg border-l-4"
                style={{
                  borderColor: ["var(--accent-blue)", "var(--accent-purple)", "var(--accent-rose)"][
                    idx % 3
                  ],
                }}
              >
                <p style={{ color: "var(--text-secondary)" }}>{metric}</p>
              </div>
            </StaggerItem>
          ))}
        </div>
      </StaggerContainer>
    </section>
  );
}

interface TechStackProps {
  stack: string[];
  title?: string;
}

export function TechStackDisplay({ stack, title = "Tech Stack" }: TechStackProps) {
  return (
    <section className="my-12">
      <FadeIn>
        <h2 className="text-2xl font-bold mb-6" style={{ color: "var(--text-primary)" }}>
          {title}
        </h2>
      </FadeIn>

      <StaggerContainer>
        <div className="flex gap-2 flex-wrap">
          {stack.map((tech, idx) => (
            <StaggerItem key={idx}>
              <div
                className="px-4 py-2 rounded-lg text-sm font-medium"
                style={{
                  backgroundColor: [
                    "rgba(37, 99, 235, 0.1)",
                    "rgba(124, 58, 237, 0.1)",
                    "rgba(225, 29, 72, 0.1)",
                  ][idx % 3],
                  color: [
                    "var(--accent-blue)",
                    "var(--accent-purple)",
                    "var(--accent-rose)",
                  ][idx % 3],
                  border: `1px solid ${
                    [
                      "var(--accent-blue)",
                      "var(--accent-purple)",
                      "var(--accent-rose)",
                    ][idx % 3]
                  }`,
                }}
              >
                {tech}
              </div>
            </StaggerItem>
          ))}
        </div>
      </StaggerContainer>
    </section>
  );
}

interface ProjectHeaderProps {
  title: string;
  role: string;
  date: string;
  summary: string;
}

export function ProjectHeader({ title, role, date, summary }: ProjectHeaderProps) {
  return (
    <section className="mb-12 pb-12" style={{ borderBottom: "1px solid var(--border-color)" }}>
      <FadeIn>
        <p
          className="text-sm font-semibold mb-2 uppercase tracking-wide"
          style={{ color: "var(--accent-blue)" }}
        >
          {role} · {new Date(date).toLocaleDateString("en-US", { year: "numeric", month: "long" })}
        </p>
        <h1 className="text-4xl font-bold mb-4" style={{ color: "var(--text-primary)" }}>
          {title}
        </h1>
        <p className="text-lg" style={{ color: "var(--text-secondary)" }}>
          {summary}
        </p>
      </FadeIn>
    </section>
  );
}

interface LearningProps {
  title: string;
  items: string[];
}

export function Learnings({ title = "Key Learnings", items }: LearningProps) {
  return (
    <section className="my-12 glass p-8 rounded-lg" style={{ backgroundColor: "var(--bg-secondary)" }}>
      <FadeIn>
        <h2 className="text-2xl font-bold mb-6" style={{ color: "var(--text-primary)" }}>
          {title}
        </h2>
      </FadeIn>

      <StaggerContainer>
        <ul className="space-y-4">
          {items.map((item, idx) => (
            <StaggerItem key={idx}>
              <li className="flex gap-4">
                <div
                  className="w-2 h-2 rounded-full mt-2 flex-shrink-0"
                  style={{ backgroundColor: "var(--accent-blue)" }}
                />
                <p style={{ color: "var(--text-secondary)" }}>{item}</p>
              </li>
            </StaggerItem>
          ))}
        </ul>
      </StaggerContainer>
    </section>
  );
}
