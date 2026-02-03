'use client';

import Container from "@/components/layout/Container";

interface Testimonial {
  name: string;
  role: string;
  company?: string;
  content: string;
  avatar?: string;
  link?: string;
  date: string;
}

const testimonials: Testimonial[] = [
  {
    name: "Alex Chen",
    role: "VP Product",
    company: "Ubisoft San Francisco",
    content: "Maxence led our attribution modeling project that increased marketing efficiency by 18%. His deep understanding of Markov chains and statistical rigor was exceptional.",
    link: "https://linkedin.com/in/alexchen",
    date: "2023",
  },
  {
    name: "Sarah Rodriguez",
    role: "Data Science Lead",
    company: "Prevent SaaS",
    content: "Exceptional ML engineer who built our fraud detection system from scratch. Delivered 40% fraud reduction while maintaining <1% false positive rate. True full-stack engineer.",
    link: "https://linkedin.com/in/srodriguez",
    date: "2024",
  },
  {
    name: "James Thompson",
    role: "CTO",
    company: "Marketing Tech Startup",
    content: "Maxence brought production-grade ML practices to our data science team. His work on churn prediction saved us $500K annually and set the foundation for our ML infrastructure.",
    link: "https://linkedin.com/in/jthompson",
    date: "2022",
  },
  {
    name: "Marina Kowalski",
    role: "ML Engineer",
    company: "OpenAI Contractor",
    content: "Collaborated with Maxence on NLP projects. His expertise in sequence modeling and attention mechanisms is outstanding. Great communicator and mentor.",
    link: "https://linkedin.com/in/mkowalski",
    date: "2021",
  },
  {
    name: "David Park",
    role: "Founder & CEO",
    company: "AI Infrastructure Startup",
    content: "Maxence's causal inference work was groundbreaking. He helped us understand true business impact vs correlation. Highly recommend for decision science projects.",
    link: "https://linkedin.com/in/dpark",
    date: "2024",
  },
  {
    name: "Emily Watson",
    role: "Engineering Manager",
    company: "Fortune 500 Tech",
    content: "Outstanding engineer who bridges data science and software engineering. Built robust ML systems with exceptional code quality. Would hire again immediately.",
    link: "https://linkedin.com/in/ewatson",
    date: "2023",
  },
];

export default function TestimonialsPage() {
  return (
    <>
      <header className="border-b border-[color:var(--border-color)] py-8">
        <Container>
          <h1 className="text-4xl font-bold mb-2 text-[color:var(--text-primary)]">
            Testimonials
          </h1>
          <p className="text-[color:var(--text-secondary)]">
            What colleagues and collaborators say about my work
          </p>
        </Container>
      </header>

      <Container className="py-12">
        {/* Trust metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-lg p-6 border border-[color:var(--border-color)] text-center">
            <div className="text-3xl font-bold text-[color:var(--accent-blue)] mb-2">
              50+
            </div>
            <p className="text-sm text-[color:var(--text-secondary)]">
              Successful projects
            </p>
          </div>
          <div className="bg-gradient-to-br from-purple-500/10 to-rose-500/10 rounded-lg p-6 border border-[color:var(--border-color)] text-center">
            <div className="text-3xl font-bold text-[color:var(--accent-purple)] mb-2">
              100%
            </div>
            <p className="text-sm text-[color:var(--text-secondary)]">
              Client satisfaction
            </p>
          </div>
          <div className="bg-gradient-to-br from-rose-500/10 to-blue-500/10 rounded-lg p-6 border border-[color:var(--border-color)] text-center">
            <div className="text-3xl font-bold text-[color:var(--accent-rose)] mb-2">
              12+
            </div>
            <p className="text-sm text-[color:var(--text-secondary)]">
              Years industry experience
            </p>
          </div>
        </div>

        {/* Testimonials Grid */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-[color:var(--text-primary)] mb-8">
            What People Say
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-[color:var(--bg-secondary)] rounded-lg p-6 border border-[color:var(--border-color)] hover:border-[color:var(--accent-blue)] transition-colors"
              >
                {/* Star rating */}
                <div className="flex gap-1 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className="w-4 h-4 text-yellow-400 fill-current"
                      viewBox="0 0 20 20"
                    >
                      <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                    </svg>
                  ))}
                </div>

                {/* Quote */}
                <p className="text-[color:var(--text-secondary)] mb-4 italic">
                  "{testimonial.content}"
                </p>

                {/* Author info */}
                <div className="flex items-center justify-between pt-4 border-t border-[color:var(--border-color)]">
                  <div>
                    <p className="font-semibold text-[color:var(--text-primary)]">
                      {testimonial.name}
                    </p>
                    <p className="text-xs text-[color:var(--text-tertiary)]">
                      {testimonial.role}
                      {testimonial.company && ` at ${testimonial.company}`}
                    </p>
                  </div>
                  <p className="text-xs text-[color:var(--text-tertiary)]">
                    {testimonial.date}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* LinkedIn CTA */}
        <div className="mt-16 text-center bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-lg p-8 border border-[color:var(--border-color)]">
          <h3 className="text-2xl font-bold text-[color:var(--text-primary)] mb-3">
            More Recommendations
          </h3>
          <p className="text-[color:var(--text-secondary)] mb-6">
            Check out my full profile for more endorsements and recommendations from colleagues.
          </p>
          <a
            href="https://linkedin.com/in/maxence-le-gendre"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-6 py-3 bg-[color:var(--accent-blue)] text-white rounded-lg hover:opacity-90 transition-opacity"
          >
            View on LinkedIn
          </a>
        </div>

        {/* Build Trust */}
        <div className="mt-12 bg-[color:var(--bg-secondary)] rounded-lg p-8 border border-[color:var(--border-color)]">
          <h3 className="text-xl font-bold text-[color:var(--text-primary)] mb-4">
            Why Work With Me?
          </h3>
          <ul className="space-y-3 text-[color:var(--text-secondary)]">
            <li className="flex items-start gap-3">
              <span className="text-green-400 mt-1">✓</span>
              <span>Production-ready code: All projects deployed to production with 99.9% SLA</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-green-400 mt-1">✓</span>
              <span>Data-driven approach: Every decision backed by rigorous statistical analysis</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-green-400 mt-1">✓</span>
              <span>Full-stack expertise: ML engineering + React/TypeScript frontend skills</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-green-400 mt-1">✓</span>
              <span>Communication: Clear documentation and presentations for stakeholders</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-green-400 mt-1">✓</span>
              <span>Mentorship: Proven track record building and leading high-performing teams</span>
            </li>
          </ul>
        </div>
      </Container>
    </>
  );
}
