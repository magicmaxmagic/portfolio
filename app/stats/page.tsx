'use client';

import Container from "@/components/layout/Container";
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

const impactData = [
  { year: "2018", projects: 1, impact: 2 },
  { year: "2019", projects: 3, impact: 5 },
  { year: "2020", projects: 6, impact: 12 },
  { year: "2021", projects: 9, impact: 25 },
  { year: "2022", projects: 12, impact: 40 },
  { year: "2023", projects: 15, impact: 60 },
  { year: "2024", projects: 18, impact: 85 },
  { year: "2025", projects: 22, impact: 120 },
];

const langData = [
  { lang: "Python", usage: 95 },
  { lang: "SQL", usage: 90 },
  { lang: "TypeScript", usage: 75 },
  { lang: "Bash", usage: 80 },
  { lang: "Scala", usage: 45 },
];

const specData = [
  { name: "Attribution", value: 35 },
  { name: "NLP", value: 25 },
  { name: "Clustering", value: 20 },
  { name: "Anomaly", value: 15 },
  { name: "Forecasting", value: 5 },
];

const COLORS = ['#3b82f6', '#a855f7', '#ec4899', '#10b981', '#f59e0b'];

export default function StatsPage() {
  return (
    <>
      <header className="border-b border-[color:var(--border-color)] py-8">
        <Container>
          <h1 className="text-4xl font-bold mb-2 text-[color:var(--text-primary)]">
            By The Numbers
          </h1>
          <p className="text-[color:var(--text-secondary)]">
            Key metrics and impact from production ML systems
          </p>
        </Container>
      </header>

      <Container className="py-12">
        {/* Key Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <StatCard 
            value="8+" 
            label="Years ML Experience"
            detail="Since 2018"
          />
          <StatCard 
            value="$50M+" 
            label="GMV Attribution"
            detail="Using Markov chains"
          />
          <StatCard 
            value="95%" 
            label="Model Precision"
            detail="NLP systems"
          />
          <StatCard 
            value="10x" 
            label="Performance Gain"
            detail="vs baselines"
          />
        </div>

        {/* Impact Over Time */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-[color:var(--text-primary)]">
            Impact Over Time
          </h2>
          <div className="bg-[color:var(--bg-secondary)] rounded-lg p-6 border border-[color:var(--border-color)]">
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={impactData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="year" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="impact" stroke="#3b82f6" strokeWidth={2} />
                <Line type="monotone" dataKey="projects" stroke="#a855f7" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Tech Stack Adoption */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-[color:var(--text-primary)]">
            Tech Stack Adoption
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-[color:var(--bg-secondary)] rounded-lg p-6 border border-[color:var(--border-color)]">
              <h3 className="font-semibold mb-4 text-[color:var(--text-primary)]">
                Languages Used
              </h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={langData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="lang" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="usage" fill="#3b82f6" />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="bg-[color:var(--bg-secondary)] rounded-lg p-6 border border-[color:var(--border-color)]">
              <h3 className="font-semibold mb-4 text-[color:var(--text-primary)]">
                ML Specializations
              </h3>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={specData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, value }) => `${name}: ${value}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {specData.map((_, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Achievements */}
        <div>
          <h2 className="text-2xl font-bold mb-6 text-[color:var(--text-primary)]">
            Key Achievements
          </h2>
          <div className="space-y-4">
            {[
              { title: "Marketing Attribution at Scale", desc: "Built Markov-chain attribution model handling $50M GMV" },
              { title: "Medical NER System", desc: "95% precision medical entity recognition in clinical notes" },
              { title: "Real-time Fraud Detection", desc: "Reduced fraud by 40% with ML models in production" },
              { title: "Text Clustering Pipeline", desc: "Organized 1M+ customer messages into 200+ semantic clusters" },
              { title: "Zero-downtime ML Deployments", desc: "Implemented blue-green deployment strategy for 50+ model updates" },
              { title: "Cross-functional Leadership", desc: "Mentored 5+ junior data scientists and engineers" },
            ].map((achievement, idx) => (
              <div
                key={idx}
                className="border-l-2 border-[color:var(--accent-blue)] pl-4 py-2"
              >
                <h3 className="font-semibold text-[color:var(--text-primary)]">
                  {achievement.title}
                </h3>
                <p className="text-sm text-[color:var(--text-secondary)]">
                  {achievement.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </>
  );
}

function StatCard({ value, label, detail }: { value: string; label: string; detail: string }) {
  return (
    <div className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-[color:var(--border-color)] rounded-lg p-6 text-center">
      <div className="text-3xl font-bold text-[color:var(--accent-blue)] mb-1">
        {value}
      </div>
      <div className="font-semibold text-[color:var(--text-primary)] mb-1">
        {label}
      </div>
      <div className="text-xs text-[color:var(--text-tertiary)]">
        {detail}
      </div>
    </div>
  );
}
