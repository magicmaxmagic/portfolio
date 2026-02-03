'use client';

import Container from "@/components/layout/Container";
import Image from "next/image";
import { useEffect, useState } from "react";

interface GitHubRepo {
  id: number;
  name: string;
  description: string;
  url: string;
  stars: number;
  language: string;
  topics: string[];
}

interface GitHubUser {
  name: string;
  bio: string;
  avatar_url: string;
  public_repos: number;
  followers: number;
  following: number;
}

const languageColors: Record<string, string> = {
  'Python': '#3776ab',
  'TypeScript': '#3178c6',
  'JavaScript': '#f7df1e',
  'SQL': '#336791',
  'Scala': '#DC322F',
  'Bash': '#4EAA25',
  'Unknown': '#858585',
};

export default function GitHubPage() {
  const [user, setUser] = useState<GitHubUser | null>(null);
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/github');
        if (!response.ok) throw new Error('Failed to fetch');
        const data = await response.json();
        setUser(data.user);
        setRepos(data.repos);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <>
        <header className="border-b border-[color:var(--border-color)] py-8">
          <Container>
            <h1 className="text-4xl font-bold mb-2 text-[color:var(--text-primary)]">
              GitHub Portfolio
            </h1>
            <p className="text-[color:var(--text-secondary)]">
              Loading...
            </p>
          </Container>
        </header>
      </>
    );
  }

  if (error || !user) {
    return (
      <>
        <header className="border-b border-[color:var(--border-color)] py-8">
          <Container>
            <h1 className="text-4xl font-bold mb-2 text-[color:var(--text-primary)]">
              GitHub Portfolio
            </h1>
            <p className="text-[color:var(--text-secondary)]">
              Error loading GitHub data
            </p>
          </Container>
        </header>
      </>
    );
  }

  return (
    <>
      <header className="border-b border-[color:var(--border-color)] py-8">
        <Container>
          <h1 className="text-4xl font-bold mb-2 text-[color:var(--text-primary)]">
            GitHub Portfolio
          </h1>
          <p className="text-[color:var(--text-secondary)]">
            My open-source work and side projects
          </p>
        </Container>
      </header>

      <Container className="py-12">
        {/* User Profile */}
        <div className="mb-12 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-lg p-8 border border-[color:var(--border-color)]">
          <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
            <Image
              src={user.avatar_url}
              alt={user.name}
              width={96}
              height={96}
              className="rounded-full border-4 border-[color:var(--accent-blue)]"
            />
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-[color:var(--text-primary)] mb-2">
                {user.name}
              </h2>
              {user.bio && (
                <p className="text-[color:var(--text-secondary)] mb-4">
                  {user.bio}
                </p>
              )}
              <div className="flex flex-wrap gap-6 text-sm">
                <div>
                  <span className="font-bold text-[color:var(--accent-blue)]">
                    {user.public_repos}
                  </span>
                  <span className="text-[color:var(--text-secondary)] ml-2">
                    Public Repos
                  </span>
                </div>
                <div>
                  <span className="font-bold text-[color:var(--accent-blue)]">
                    {user.followers}
                  </span>
                  <span className="text-[color:var(--text-secondary)] ml-2">
                    Followers
                  </span>
                </div>
                <div>
                  <span className="font-bold text-[color:var(--accent-blue)]">
                    {user.following}
                  </span>
                  <span className="text-[color:var(--text-secondary)] ml-2">
                    Following
                  </span>
                </div>
              </div>
            </div>
            <a
              href={`https://github.com/${user.name}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-2 bg-[color:var(--accent-blue)] text-white rounded-lg hover:opacity-90 transition-opacity"
            >
              View on GitHub
            </a>
          </div>
        </div>

        {/* Top Repositories */}
        <div>
          <h2 className="text-3xl font-bold mb-8 text-[color:var(--text-primary)]">
            Top Repositories
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {repos.map((repo) => (
              <a
                key={repo.id}
                href={repo.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-[color:var(--bg-secondary)] rounded-lg p-6 border border-[color:var(--border-color)] hover:border-[color:var(--accent-blue)] transition-colors"
              >
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-lg font-bold text-[color:var(--accent-blue)] group-hover:underline">
                    {repo.name}
                  </h3>
                  <div className="flex items-center gap-1 text-sm text-[color:var(--text-secondary)]">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    {repo.stars}
                  </div>
                </div>
                <p className="text-[color:var(--text-secondary)] text-sm mb-4 line-clamp-2">
                  {repo.description}
                </p>
                <div className="flex flex-wrap gap-2 items-end">
                  {repo.language && (
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: languageColors[repo.language] || languageColors['Unknown'] }}
                      title={repo.language}
                    />
                  )}
                  <span className="text-xs text-[color:var(--text-secondary)]">
                    {repo.language}
                  </span>
                  {repo.topics.length > 0 && (
                    <div className="flex gap-2 ml-auto">
                      {repo.topics.slice(0, 2).map((topic) => (
                        <span
                          key={topic}
                          className="text-xs px-2 py-1 bg-[color:var(--bg-tertiary)] rounded-full text-[color:var(--accent-blue)]"
                        >
                          {topic}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-16 text-center bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-lg p-8 border border-[color:var(--border-color)]">
          <h3 className="text-2xl font-bold text-[color:var(--text-primary)] mb-2">
            Interested in Open Source?
          </h3>
          <p className="text-[color:var(--text-secondary)] mb-6">
            Check out my full GitHub profile for more projects and contributions.
          </p>
          <a
            href={`https://github.com/magicmaxmagic`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-6 py-3 bg-[color:var(--accent-blue)] text-white rounded-lg hover:opacity-90 transition-opacity"
          >
            Visit GitHub Profile
          </a>
        </div>
      </Container>
    </>
  );
}
