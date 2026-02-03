export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-slate-200 bg-slate-50 mt-24">
      <div className="max-w-6xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-600">
            © {currentYear} Maxence Le Gendre. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a
              href="https://github.com/maxencelegendre"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-600 hover:text-slate-900"
            >
              GitHub
            </a>
            <a
              href="https://linkedin.com/in/maxencelegendre"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-600 hover:text-slate-900"
            >
              LinkedIn
            </a>
            <a
              href="mailto:maxence@example.com"
              className="text-slate-600 hover:text-slate-900"
            >
              Email
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
