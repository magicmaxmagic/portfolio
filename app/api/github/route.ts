import { NextResponse } from 'next/server';

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

const GITHUB_USERNAME = process.env.GITHUB_USERNAME || 'magicmaxmagic';
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

async function fetchGitHubData() {
  const headers: HeadersInit = {
    'Accept': 'application/vnd.github.v3+json',
  };

  if (GITHUB_TOKEN) {
    headers['Authorization'] = `token ${GITHUB_TOKEN}`;
  }

  try {
    // Fetch user data
    const userResponse = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}`, {
      headers,
      next: { revalidate: 3600 }, // Cache for 1 hour
    });

    if (!userResponse.ok) {
      throw new Error('Failed to fetch GitHub user');
    }

    const userData = await userResponse.json();

    // Fetch repositories
    const reposResponse = await fetch(
      `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=stars&order=desc&per_page=10`,
      {
        headers,
        next: { revalidate: 3600 },
      }
    );

    if (!reposResponse.ok) {
      throw new Error('Failed to fetch GitHub repos');
    }

    const repos = await reposResponse.json();

    const formattedRepos: GitHubRepo[] = repos
      .filter((repo: any) => !repo.fork) // Exclude forked repos
      .slice(0, 6) // Top 6 repos
      .map((repo: any) => ({
        id: repo.id,
        name: repo.name,
        description: repo.description || 'No description',
        url: repo.html_url,
        stars: repo.stargazers_count,
        language: repo.language || 'Unknown',
        topics: repo.topics || [],
      }));

    const user: GitHubUser = {
      name: userData.name || userData.login,
      bio: userData.bio || '',
      avatar_url: userData.avatar_url,
      public_repos: userData.public_repos,
      followers: userData.followers,
      following: userData.following,
    };

    return { user, repos: formattedRepos };
  } catch (error) {
    console.error('GitHub API error:', error);
    throw error;
  }
}

export async function GET() {
  try {
    const data = await fetchGitHubData();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch GitHub data' },
      { status: 500 }
    );
  }
}
