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
          <div className="flex gap-6">
            <a
              href="https://github.com/magicmaxmagic"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[color:var(--text-secondary)] hover:text-[color:var(--accent-blue)] transition-colors"
            >
              GitHub
            </a>
            <a
              href="https://linkedin.com/in/maxence-le-gendre"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[color:var(--text-secondary)] hover:text-[color:var(--accent-blue)] transition-colors"
            >
              LinkedIn
            </a>
            <a
              href="mailto:maxence@example.com"
              className="text-[color:var(--text-secondary)] hover:text-[color:var(--accent-blue)] transition-colors"
            >
              Email
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
