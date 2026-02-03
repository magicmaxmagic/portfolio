import { promises as fs } from "fs";
import path from "path";
import matter from "gray-matter";

export interface BlogPost {
  title: string;
  summary: string;
  slug: string;
  date: string;
  category: string;
  tags: string[];
  readingTime: string;
  featured: boolean;
}

export interface BlogArticle {
  meta: BlogPost;
  content: string;
}

const blogDir = path.join(process.cwd(), "content", "blog");

export async function getAllBlogPosts(): Promise<BlogPost[]> {
  const files = await fs.readdir(blogDir);
  const posts: BlogPost[] = [];

  for (const file of files) {
    if (!file.endsWith(".mdx")) continue;

    const filePath = path.join(blogDir, file);
    const content = await fs.readFile(filePath, "utf-8");
    const { data } = matter(content);

    const slug = file.replace(".mdx", "");

    posts.push({
      title: data.title,
      summary: data.summary,
      slug,
      date: data.date,
      category: data.category || "general",
      tags: data.tags || [],
      readingTime: data.readingTime || "5 min",
      featured: data.featured || false,
    });
  }

  // Sort by date, newest first
  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export async function getBlogBySlug(slug: string): Promise<BlogArticle | null> {
  const filePath = path.join(blogDir, `${slug}.mdx`);

  try {
    const content = await fs.readFile(filePath, "utf-8");
    const { data, content: mdxContent } = matter(content);

    return {
      meta: {
        title: data.title,
        summary: data.summary,
        slug,
        date: data.date,
        category: data.category || "general",
        tags: data.tags || [],
        readingTime: data.readingTime || "5 min",
        featured: data.featured || false,
      },
      content: mdxContent,
    };
  } catch {
    return null;
  }
}

export async function getBlogByCategory(category: string): Promise<BlogPost[]> {
  const posts = await getAllBlogPosts();
  return posts.filter(p => p.category === category);
}

export async function getBlogByTag(tag: string): Promise<BlogPost[]> {
  const posts = await getAllBlogPosts();
  return posts.filter(p => p.tags.includes(tag));
}
