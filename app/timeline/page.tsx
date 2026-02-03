'use client';

import Container from "@/components/layout/Container";
import { useEffect, useState } from "react";

interface TimelineEvent {
  year: string;
  title: string;
  company?: string;
  description: string;
  role?: string;
  achievements?: string[];
  type: "milestone" | "role" | "achievement";
}

const timeline: TimelineEvent[] = [
  {
    year: "2018",
    title: "ML Journey Begins",
    description: "Started learning machine learning with Python and TensorFlow. First kaggle competition.",
    type: "milestone",
    achievements: ["Completed Andrew Ng's ML course", "First kaggle submission", "Built recommendation system"]
  },
  {
    year: "2019",
    title: "Data Science Role",
    company: "Marketing Tech Startup",
    role: "Junior Data Scientist",
    description: "Led first production ML project - customer churn prediction model.",
    type: "role",
    achievements: ["Deployed churn model (92% accuracy)", "Saved company $500K annually", "Built data pipeline with Python/SQL"]
  },
  {
    year: "2020",
    title: "NLP Specialization",
    description: "Deep dive into Natural Language Processing. Built medical entity recognition systems.",
    type: "achievement",
    achievements: ["Medical NER: 95% precision", "Published 2 NLP papers", "Built text clustering pipeline for 1M+ documents"]
  },
  {
    year: "2021",
    title: "Senior ML Engineer",
    company: "Ubisoft/Gameloft",
    role: "Senior ML Engineer",
    description: "Led marketing attribution project handling $50M GMV using Markov chain models.",
    type: "role",
    achievements: ["Markov attribution model", "Led team of 2 junior engineers", "Mentored 5+ data scientists"]
  },
  {
    year: "2022",
    title: "Production ML Systems",
    description: "Mastered MLOps - deployed 12+ models to production with 99.9% SLA.",
    type: "achievement",
    achievements: ["Blue-green deployments", "ML monitoring with Sentry", "Real-time inference systems"]
  },
  {
    year: "2023",
    title: "Fraud Prevention Lead",
    company: "Prevent SaaS",
    role: "ML Engineering Lead",
    description: "Built AI-powered fraud detection reducing fraud by 40% while maintaining <1% false positives.",
    type: "role",
    achievements: ["Fraud detection: 40% reduction", "Real-time API (< 50ms)", "Prevented $5M+ fraud"]
  },
  {
    year: "2024",
    title: "ML Systems & Architecture",
    description: "Architected end-to-end ML systems, focus on causal inference and decision science.",
    type: "achievement",
    achievements: ["Causal inference framework", "Decision science applications", "Full-stack ML + React/TypeScript"]
  },
  {
    year: "2025",
    title: "Current: Applied ML Engineer",
    description: "Building production ML systems that drive business impact. Open to consulting & collaborations.",
    type: "milestone",
    achievements: ["8+ years ML experience", "50+ successful projects", "Leading edge ML + SWE skills"]
  }
];

export default function TimelinePage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <>
      <header className="border-b border-[color:var(--border-color)] py-8">
        <Container>
          <h1 className="text-4xl font-bold mb-2 text-[color:var(--text-primary)]">
            My Journey
          </h1>
          <p className="text-[color:var(--text-secondary)]">
            From learning ML to building production systems at scale
          </p>
        </Container>
      </header>

      <Container className="py-12">
        <div className="max-w-3xl mx-auto">
          {/* Timeline */}
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-[color:var(--accent-blue)] to-[color:var(--accent-purple)] transform md:-translate-x-1/2" />

            {/* Timeline items */}
            <div className="space-y-12 md:space-y-16">
              {timeline.map((event, index) => (
                <div key={index} className={`md:flex gap-8 ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                  {/* Year circle */}
                  <div className="md:w-1/2 flex gap-4 md:gap-0">
                    <div className="flex-shrink-0">
                      <div className="flex items-center justify-center w-10 h-10 rounded-full bg-[color:var(--bg-secondary)] border-4 border-[color:var(--accent-blue)] ring-4 ring-[color:var(--bg-primary)] relative z-10">
                        <div className="w-2 h-2 bg-[color:var(--accent-blue)] rounded-full" />
                      </div>
                    </div>
                    <div className="md:hidden flex-1">
                      <div className="font-bold text-xl text-[color:var(--accent-blue)] mb-1">
                        {event.year}
                      </div>
                      <h3 className="text-xl font-bold text-[color:var(--text-primary)] mb-1">
                        {event.title}
                      </h3>
                      {event.company && (
                        <p className="text-sm text-[color:var(--accent-blue)] mb-2">
                          {event.role} @ {event.company}
                        </p>
                      )}
                      <p className="text-[color:var(--text-secondary)] mb-3">
                        {event.description}
                      </p>
                      {event.achievements && (
                        <ul className="space-y-2">
                          {event.achievements.map((achievement, i) => (
                            <li key={i} className="flex items-start gap-2">
                              <span className="text-green-400 mt-0.5">✓</span>
                              <span className="text-sm text-[color:var(--text-secondary)]">
                                {achievement}
                              </span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>

                  {/* Content (desktop only) */}
                  <div className="md:w-1/2 hidden md:block">
                    <div className="bg-[color:var(--bg-secondary)] rounded-lg p-6 border border-[color:var(--border-color)] hover:border-[color:var(--accent-blue)] transition-colors">
                      <div className="font-bold text-lg text-[color:var(--accent-blue)] mb-2">
                        {event.year}
                      </div>
                      <h3 className="text-xl font-bold text-[color:var(--text-primary)] mb-1">
                        {event.title}
                      </h3>
                      {event.company && (
                        <p className="text-sm text-[color:var(--accent-blue)] mb-3">
                          {event.role} @ {event.company}
                        </p>
                      )}
                      <p className="text-[color:var(--text-secondary)] mb-4">
                        {event.description}
                      </p>
                      {event.achievements && (
                        <ul className="space-y-2">
                          {event.achievements.map((achievement, i) => (
                            <li key={i} className="flex items-start gap-2">
                              <span className="text-green-400 mt-0.5 flex-shrink-0">✓</span>
                              <span className="text-sm text-[color:var(--text-secondary)]">
                                {achievement}
                              </span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="mt-16 text-center bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-lg p-8 border border-[color:var(--border-color)]">
            <h2 className="text-2xl font-bold text-[color:var(--text-primary)] mb-3">
              Interested in Collaborating?
            </h2>
            <p className="text-[color:var(--text-secondary)] mb-6">
              I'm open to consulting, freelance projects, and full-time opportunities in ML/AI.
            </p>
            <a
              href="/contact"
              className="inline-block px-6 py-3 bg-[color:var(--accent-blue)] text-white rounded-lg hover:opacity-90 transition-opacity"
            >
              Get in Touch
            </a>
          </div>
        </div>
      </Container>
    </>
  );
}
