export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-6xl font-bold mb-4">404</h1>
        <p className="text-xl text-slate-600 mb-8">Page not found</p>
        <a
          href="/"
          className="inline-block px-6 py-3 bg-slate-900 text-white rounded hover:bg-slate-700 transition-colors"
        >
          Back to home
        </a>
      </div>
    </div>
  );
}
