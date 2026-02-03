'use client';

import { NewsletterSignup } from '@/components/NewsletterSignup';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-[color:var(--border-color)] bg-[color:var(--bg-secondary)] mt-24">
      <div className="max-w-6xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        {/* Newsletter Section */}
        <div className="mb-12">
          <NewsletterSignup />
        </div>

        {/* CTA Links */}
        <div className="mb-8 pb-8 border-b border-[color:var(--border-color)]">
          <p className="text-sm font-semibold text-[color:var(--text-secondary)] mb-4">Get in touch:</p>
          <div className="flex flex-wrap gap-4">
            <a
              href="mailto:maxence@example.com"
              className="px-4 py-2 bg-[color:var(--accent-blue)] text-white rounded-lg hover:opacity-90 transition-opacity text-sm font-medium"
            >
              Email
            </a>
            <a
              href="https://linkedin.com/in/maxence-le-gendre"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 border border-[color:var(--accent-blue)] text-[color:var(--accent-blue)] rounded-lg hover:bg-[color:var(--accent-blue)] hover:text-white transition-colors text-sm font-medium"
            >
              LinkedIn
            </a>
            <a
              href="https://github.com/magicmaxmagic"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 border border-[color:var(--accent-blue)] text-[color:var(--accent-blue)] rounded-lg hover:bg-[color:var(--accent-blue)] hover:text-white transition-colors text-sm font-medium"
            >
              GitHub
            </a>
          </div>
        </div>

        {/* Footer Links */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
          <div>
            <p className="text-[color:var(--text-secondary)]">
              © {currentYear} Maxence Le Gendre. All rights reserved.
            </p>
            <p className="text-xs text-[color:var(--text-tertiary)] mt-2">
              Built with Next.js, TypeScript, and Tailwind CSS
            </p>
          </div>
          <div className="flex gap-6 text-sm">
            <a
              href="/stack"
              className="text-[color:var(--text-secondary)] hover:text-[color:var(--accent-blue)] transition-colors"
            >
              Tech Stack
            </a>
            <a
              href="/timeline"
              className="text-[color:var(--text-secondary)] hover:text-[color:var(--accent-blue)] transition-colors"
            >
              Timeline
            </a>
            <a
              href="/projects"
              className="text-[color:var(--text-secondary)] hover:text-[color:var(--accent-blue)] transition-colors"
            >
              Projects
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
