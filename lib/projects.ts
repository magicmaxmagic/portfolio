import { promises as fs } from "fs";
import path from "path";
import matter from "gray-matter";

export interface ProjectMeta {
  title: string;
  summary: string;
  slug: string;
  date: string;
  role: string;
  tags: string[];
  stack: string[];
  metrics?: string[];
  featured: boolean;
  featuredOrder: number;
}

export interface Project {
  meta: ProjectMeta;
  content: string;
}

const projectsDir = path.join(process.cwd(), "content", "projects");

export async function getAllProjects(): Promise<ProjectMeta[]> {
  const files = await fs.readdir(projectsDir);
  const projects: ProjectMeta[] = [];

  for (const file of files) {
    if (!file.endsWith(".mdx")) continue;

    const filePath = path.join(projectsDir, file);
    const content = await fs.readFile(filePath, "utf-8");
    const { data } = matter(content);

    const slug = file.replace(".mdx", "");

    projects.push({
      title: data.title,
      summary: data.summary,
      slug,
      date: data.date,
      role: data.role,
      tags: data.tags || [],
      stack: data.stack || [],
      metrics: data.metrics || [],
      featured: data.featured || false,
      featuredOrder: data.featuredOrder || 999,
    });
  }

  return projects;
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  const filePath = path.join(projectsDir, `${slug}.mdx`);

  try {
    const content = await fs.readFile(filePath, "utf-8");
    const { data, content: mdxContent } = matter(content);

    return {
      meta: {
        title: data.title,
        summary: data.summary,
        slug,
        date: data.date,
        role: data.role,
        tags: data.tags || [],
        stack: data.stack || [],
        metrics: data.metrics || [],
        featured: data.featured || false,
        featuredOrder: data.featuredOrder || 999,
      },
      content: mdxContent,
    };
  } catch (error) {
    return null;
  }
}
