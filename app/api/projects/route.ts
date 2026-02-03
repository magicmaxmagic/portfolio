import { getAllProjects } from "@/lib/projects";

export async function GET() {
  try {
    const projects = await getAllProjects();
    // Transform ProjectMeta to format expected by ProjectFilter
    const formatted = projects.map(p => ({
      slug: p.slug,
      title: p.title,
      description: p.summary,
      tags: p.tags || [],
      stack: p.stack || [],
      featured: p.featured,
    }));
    return Response.json(formatted);
  } catch (error) {
    return Response.json(
      { error: "Failed to load projects" },
      { status: 500 }
    );
  }
}
