'use client';

import { useEffect, useState } from 'react';

const GITHUB_REPO = 'magicmaxmagic/portfolio';
const REPO_URL = `https://github.com/${GITHUB_REPO}`;

interface RepoStats {
  stars: number;
  forks: number;
  language: string | null;
}

export function GitHubRepoStats() {
  const [stats, setStats] = useState<RepoStats>({
    stars: 0,
    forks: 0,
    language: null,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRepoStats = async () => {
      try {
        const response = await fetch(`https://api.github.com/repos/${GITHUB_REPO}`);
        if (response.ok) {
          const data = await response.json();
          setStats({
            stars: data.stargazers_count || 0,
            forks: data.forks_count || 0,
            language: data.language || null,
          });
        }
      } catch (error) {
        console.error('Failed to fetch repo stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRepoStats();
  }, []);

  return (
    <div className="flex items-center gap-3 flex-wrap py-4">
      <a
        href={REPO_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[color:var(--accent-blue)] text-white hover:opacity-90 transition-opacity font-medium text-sm"
      >
        <span>⭐</span>
        <span>Star on GitHub</span>
        {!loading && stats.stars > 0 && (
          <span className="ml-2 px-2 py-0.5 bg-white/20 rounded text-xs">
            {stats.stars}
          </span>
        )}
      </a>

      {!loading && stats.language && (
        <div className="text-xs text-[color:var(--text-secondary)] px-3 py-2 rounded bg-[color:var(--bg-secondary)]">
          <span className="font-medium">{stats.language}</span>
        </div>
      )}

      {!loading && stats.forks > 0 && (
        <div className="text-xs text-[color:var(--text-secondary)] px-3 py-2 rounded bg-[color:var(--bg-secondary)]">
          <span>🍴 {stats.forks} forks</span>
        </div>
      )}

      <a
        href="https://www.linkedin.com/in/maxence-le-gendre"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-[color:var(--accent-blue)] text-[color:var(--accent-blue)] hover:bg-[color:var(--accent-blue)] hover:text-white transition-colors font-medium text-sm"
      >
        <span>💼</span>
        <span>LinkedIn</span>
      </a>
    </div>
  );
}
