import Container from "@/components/layout/Container";
import ProjectCard from "@/components/project/ProjectCard";
import { getAllProjects } from "@/lib/projects";

export const metadata = {
  title: "Projects | Maxence Le Gendre",
  description: "End-to-end ML systems and projects I've built and shipped.",
};

export default async function ProjectsPage() {
  const projects = await getAllProjects();

  return (
    <Container>
      <div className="py-16">
        <div>
          <h1 className="text-5xl font-bold mb-4" style={{ color: "var(--text-primary)" }}>
            Projects
          </h1>
          <p className="text-xl mb-12" style={{ color: "var(--text-secondary)" }}>
            End-to-end ML systems I've built and shipped. Causal inference, NLP, MLOps, and production systems.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project) => (
            <div key={project.slug}>
              <ProjectCard project={project} />
            </div>
          ))}
        </div>
      </div>
    </Container>
  );
}
