import type { Metadata } from "next";
import Container from "@/components/layout/Container";
import Link from "next/link";
import { getAllBlogPosts } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Blog | Maxence Le Gendre",
  description: "Articles on ML, data science, and production systems",
};

export default async function BlogPage() {
  const posts = await getAllBlogPosts();
  const featured = posts.filter(p => p.featured);
  const regular = posts.filter(p => !p.featured);

  return (
    <>
      <header className="border-b border-[color:var(--border-color)] py-8">
        <Container>
          <h1 className="text-4xl font-bold mb-2 text-[color:var(--text-primary)]">
            Blog
          </h1>
          <p className="text-[color:var(--text-secondary)]">
            Thoughts on ML, data science, and building production systems
          </p>
        </Container>
      </header>

      <Container className="py-12">
        {/* Featured */}
        {featured.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6 text-[color:var(--text-primary)]">
              Featured
            </h2>
            <div className="grid gap-6">
              {featured.map(post => (
                <BlogCard key={post.slug} post={post} featured />
              ))}
            </div>
          </div>
        )}

        {/* All Posts */}
        <div>
          <h2 className="text-2xl font-bold mb-6 text-[color:var(--text-primary)]">
            Latest Articles
          </h2>
          <div className="space-y-4">
            {regular.map(post => (
              <BlogCard key={post.slug} post={post} />
            ))}
          </div>
        </div>
      </Container>
    </>
  );
}

function BlogCard({ post, featured = false }: { post: any; featured?: boolean }) {
  return (
    <Link href={`/blog/${post.slug}`}>
      <div className={`group border border-[color:var(--border-color)] rounded-lg p-6 hover:border-[color:var(--accent-blue)] transition-colors ${featured ? "bg-[color:var(--bg-secondary)]" : ""}`}>
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-semibold text-[color:var(--text-primary)] group-hover:text-[color:var(--accent-blue)] transition-colors">
            {post.title}
          </h3>
          <span className="text-xs text-[color:var(--text-tertiary)]">
            {post.readingTime}
          </span>
        </div>
        <p className="text-[color:var(--text-secondary)] mb-3 text-sm">
          {post.summary}
        </p>
        <div className="flex gap-2 items-center text-xs text-[color:var(--text-tertiary)]">
          <span>{new Date(post.date).toLocaleDateString()}</span>
          <span>•</span>
          <span className="px-2 py-1 bg-[color:var(--bg-tertiary)] rounded">
            {post.category}
          </span>
        </div>
      </div>
    </Link>
  );
}
