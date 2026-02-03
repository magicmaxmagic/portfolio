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
    year: "2020-2022",
    title: "Preparatory & Advanced Math",
    company: "Chevrolier High School",
    role: "PTSI-PT Program",
    description: "Intensive French preparatory school program in mathematics and physics. Foundation in rigorous problem-solving and systems thinking.",
    type: "milestone",
    achievements: ["Advanced mathematics", "Physics and signal processing", "Competitive exam preparation"]
  },
  {
    year: "2022-2026",
    title: "Telecom Engineering & Cybersecurity",
    company: "INP Bordeaux (Enseirb-Matmeca)",
    role: "Telecoms Engineering Degree",
    description: "Dual degree program in telecommunications engineering and cybersecurity. Focus on distributed systems, signal processing, and security.",
    type: "role",
    achievements: ["GPA: 3.85", "Cybersecurity specialization", "Distributed systems & networking"]
  },
  {
    year: "Jun-Sep 2023",
    title: "Data Analyst Intern - Industrial Anomaly Detection",
    company: "Manitou USA",
    role: "Intern",
    description: "Developed anomaly detection models for industrial equipment monitoring. Applied statistical analysis and time-series forecasting.",
    type: "role",
    achievements: ["Anomaly detection implementation", "Industrial ML pipeline", "Data analysis at scale"]
  },
  {
    year: "2023-2024",
    title: "Engineering Leadership",
    company: "INP Bordeaux Sports Office",
    role: "Vice President",
    description: "Led sports and recreational programs for engineering school. Managed team of 30+ people and organized events for 1200+ participants.",
    type: "achievement",
    achievements: ["30-person team management", "1200+ event participants organized", "Strategic program planning"]
  },
  {
    year: "Jan-May 2024",
    title: "Software Engineer - Web Scraping & Data Pipelines",
    role: "Self-employed",
    description: "Built scalable web scraping pipelines and data collection infrastructure. Python-based automation for market data aggregation.",
    type: "role",
    achievements: ["Web scraping infrastructure", "ETL pipeline development", "Data automation at scale"]
  },
  {
    year: "Jun-Aug 2024",
    title: "Security Engineer Intern - Access Control & SIEM",
    company: "Dedomainia",
    role: "Intern",
    description: "Implemented access control systems and security information event management. Focus on infrastructure security and threat detection.",
    type: "role",
    achievements: ["SIEM implementation", "Access control systems", "Security infrastructure"]
  },
  {
    year: "2024-2026",
    title: "IT Engineering & AI/Cloud Specialization",
    company: "ETS Montréal",
    role: "Dual Degree - IT Engineering",
    description: "Exchange program in information technology with focus on artificial intelligence and cloud computing. Concurrent with INP Bordeaux degree.",
    type: "achievement",
    achievements: ["GPA: 3.85", "AI & Machine Learning focus", "Cloud infrastructure systems"]
  },
  {
    year: "Jan-Aug 2025",
    title: "Software Engineer - Analytics Platform",
    company: "IVÉO",
    role: "Full-time Engineer",
    description: "Built analytics platform using PostgreSQL, FastAPI, and Streamlit. Full-stack development of data visualization and query systems.",
    type: "role",
    achievements: ["PostgreSQL database design", "FastAPI backend development", "Streamlit analytics frontend"]
  },
  {
    year: "Sep 2025-Apr 2026",
    title: "Data Scientist / ML Systems Engineer",
    company: "Ubisoft Montréal",
    role: "Intern",
    description: "Advanced ML systems work using Databricks and MLOps best practices. Building production machine learning infrastructure and models.",
    type: "role",
    achievements: ["Databricks MLOps", "Production ML systems", "Distributed ML engineering"]
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
            Professional Journey
          </h1>
          <p className="text-[color:var(--text-secondary)]">
            From foundational mathematics to applied ML systems engineering (2020-2026)
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
