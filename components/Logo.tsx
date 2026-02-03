export function Logo() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" className="fill-current">
      {/* Geometric logo: ML intersection */}
      <g>
        {/* Left triangle (M) */}
        <path d="M 4 28 L 10 4 L 13 28 Z" className="text-blue-600 dark:text-blue-400" />
        <path d="M 10 4 L 13 28 L 16 16 Z" className="text-blue-500 dark:text-blue-300" />
        
        {/* Right triangle (L) */}
        <path d="M 18 28 L 24 8 L 28 28 Z" className="text-purple-600 dark:text-purple-400" />
        <path d="M 24 8 L 28 28 L 25 20 Z" className="text-purple-500 dark:text-purple-300" />
        
        {/* Center accent */}
        <circle cx="16" cy="16" r="2" className="text-rose-500 dark:text-rose-400" />
      </g>
    </svg>
  );
}
