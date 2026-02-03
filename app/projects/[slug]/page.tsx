import { MDXRemote } from "next-mdx-remote/rsc";
import { getProjectBySlug, getAllProjects } from "@/lib/projects";
import Container from "@/components/layout/Container";
import ProjectMeta from "@/components/project/ProjectMeta";
import ProjectNav from "@/components/project/ProjectNav";
import { GitHubRepoStats } from "@/components/project/GitHubRepoStats";
import { mdxComponents } from "@/components/mdx/components";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  const projects = await getAllProjects();
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}) {
  const project = await getProjectBySlug(params.slug);
  if (!project) return {};

  return {
    title: `${project.meta.title} | Maxence Le Gendre`,
    description: project.meta.summary,
    openGraph: {
      title: project.meta.title,
      description: project.meta.summary,
      type: "article",
      publishedTime: project.meta.date,
    },
  };
}

export default async function ProjectPage({
  params,
}: {
  params: { slug: string };
}) {
  const project = await getProjectBySlug(params.slug);
  if (!project) notFound();

  const allProjects = await getAllProjects();
  const featured = allProjects
    .filter((p) => p.featured)
    .sort((a, b) => a.featuredOrder - b.featuredOrder);
  const other = allProjects
    .filter((p) => !p.featured)
    .sort(
      (a, b) =>
        new Date(b.date).getTime() - new Date(a.date).getTime()
    );
  const sorted = [...featured, ...other];
  const currentIndex = sorted.findIndex((p) => p.slug === params.slug);

  return (
    <Container>
      <article className="py-16">
        <header className="mb-12">
          <h1 className="text-5xl font-bold mb-4">{project.meta.title}</h1>
          <p className="text-xl text-slate-600 mb-8">{project.meta.summary}</p>
          <ProjectMeta meta={project.meta} />
        </header>

        <div className="prose prose-slate max-w-none mb-12">
          <MDXRemote source={project.content} components={mdxComponents} />
        </div>

        <div className="my-12 py-8 bg-slate-50 rounded-lg p-6 border border-slate-200">
          <div className="text-sm text-slate-600 mb-4 font-semibold">Support my work:</div>
          <GitHubRepoStats />
        </div>

        <div className="border-t border-slate-200 pt-12">
          <ProjectNav
            current={currentIndex}
            total={sorted.length}
            projects={sorted}
          />
        </div>
      </article>
    </Container>
  );
}
