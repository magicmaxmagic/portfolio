"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { FadeIn, HoverScale } from "@/components/Animations";

interface Project {
  slug: string;
  title: string;
  description: string;
  tags: string[];
  stack: string[];
  featured?: boolean;
}

interface ProjectFilterProps {
  projects: Project[];
}

export function ProjectFilter({ projects }: ProjectFilterProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedStack, setSelectedStack] = useState<string[]>([]);

  // Get all unique tags and stack items
  const allTags = useMemo(() => {
    const tags = new Set<string>();
    projects.forEach((p) => p.tags?.forEach((t) => tags.add(t)));
    return Array.from(tags).sort();
  }, [projects]);

  const allStack = useMemo(() => {
    const stack = new Set<string>();
    projects.forEach((p) => p.stack?.forEach((s) => stack.add(s)));
    return Array.from(stack).sort();
  }, [projects]);

  // Filter projects
  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const matchesSearch =
        project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.description.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesTags =
        selectedTags.length === 0 ||
        selectedTags.some((tag) => project.tags?.includes(tag));

      const matchesStack =
        selectedStack.length === 0 ||
        selectedStack.some((item) => project.stack?.includes(item));

      return matchesSearch && matchesTags && matchesStack;
    });
  }, [projects, searchTerm, selectedTags, selectedStack]);

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const toggleStack = (item: string) => {
    setSelectedStack((prev) =>
      prev.includes(item) ? prev.filter((s) => s !== item) : [...prev, item]
    );
  };

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedTags([]);
    setSelectedStack([]);
  };

  return (
    <div>
      {/* Search Input */}
      <div className="mb-8">
        <input
          type="text"
          placeholder="Search projects..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-3 rounded-lg border"
          style={{
            backgroundColor: "var(--bg-secondary)",
            borderColor: "var(--border-color)",
            color: "var(--text-primary)",
          }}
        />
      </div>

      {/* Filters */}
      {(selectedTags.length > 0 || selectedStack.length > 0 || searchTerm) && (
        <div className="mb-8 flex items-center justify-between">
          <div className="flex gap-2 flex-wrap">
            {selectedTags.map((tag) => (
              <button
                key={tag}
                onClick={() => toggleTag(tag)}
                className="px-3 py-1 rounded-full text-sm"
                style={{
                  backgroundColor: "var(--accent-blue)",
                  color: "white",
                }}
              >
                {tag} ×
              </button>
            ))}
            {selectedStack.map((item) => (
              <button
                key={item}
                onClick={() => toggleStack(item)}
                className="px-3 py-1 rounded-full text-sm"
                style={{
                  backgroundColor: "var(--accent-purple)",
                  color: "white",
                }}
              >
                {item} ×
              </button>
            ))}
          </div>
          {(selectedTags.length > 0 || selectedStack.length > 0 || searchTerm) && (
            <button
              onClick={clearFilters}
              className="text-sm"
              style={{ color: "var(--accent-blue)" }}
            >
              Clear all
            </button>
          )}
        </div>
      )}

      {/* Tag Filters */}
      <div className="mb-8">
        <p className="text-sm font-semibold mb-3" style={{ color: "var(--text-secondary)" }}>
          Category
        </p>
        <div className="flex gap-2 flex-wrap">
          {allTags.map((tag) => (
            <button
              key={tag}
              onClick={() => toggleTag(tag)}
              className="px-3 py-1 rounded-lg text-sm transition-all"
              style={{
                backgroundColor: selectedTags.includes(tag)
                  ? "var(--accent-blue)"
                  : "var(--bg-tertiary)",
                color: selectedTags.includes(tag)
                  ? "white"
                  : "var(--text-secondary)",
              }}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      {/* Stack Filters */}
      <div className="mb-8">
        <p className="text-sm font-semibold mb-3" style={{ color: "var(--text-secondary)" }}>
          Technology
        </p>
        <div className="flex gap-2 flex-wrap">
          {allStack.map((item) => (
            <button
              key={item}
              onClick={() => toggleStack(item)}
              className="px-3 py-1 rounded-lg text-sm transition-all"
              style={{
                backgroundColor: selectedStack.includes(item)
                  ? "var(--accent-purple)"
                  : "var(--bg-tertiary)",
                color: selectedStack.includes(item)
                  ? "white"
                  : "var(--text-secondary)",
              }}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      {/* Results */}
      <div className="mt-12">
        <p className="text-sm mb-6" style={{ color: "var(--text-secondary)" }}>
          Showing {filteredProjects.length} of {projects.length} projects
        </p>

        {filteredProjects.length === 0 ? (
          <div className="text-center py-12">
            <p style={{ color: "var(--text-secondary)" }}>
              No projects match your filters. Try adjusting your search.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredProjects.map((project) => (
              <FadeIn key={project.slug}>
                <HoverScale>
                  <Link href={`/projects/${project.slug}`}>
                    <div
                      className="glass p-6 rounded-lg h-full cursor-pointer transition-all hover:border-[color:var(--accent-blue)]"
                      style={{
                        borderWidth: "1px",
                        borderColor: "var(--border-color)",
                      }}
                    >
                      <h3
                        className="text-xl font-bold mb-2"
                        style={{ color: "var(--accent-blue)" }}
                      >
                        {project.title}
                      </h3>
                      <p className="mb-4" style={{ color: "var(--text-secondary)" }}>
                        {project.description}
                      </p>
                      <div className="flex gap-2 flex-wrap mb-4">
                        {project.tags?.map((tag) => (
                          <span
                            key={tag}
                            className="badge"
                            style={{
                              backgroundColor: "var(--bg-tertiary)",
                              color: "var(--text-secondary)",
                            }}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      <div className="flex gap-2 flex-wrap">
                        {project.stack?.slice(0, 3).map((item) => (
                          <span
                            key={item}
                            className="text-xs px-2 py-1 rounded"
                            style={{
                              backgroundColor: "var(--border-color)",
                              color: "var(--text-secondary)",
                            }}
                          >
                            {item}
                          </span>
                        ))}
                        {project.stack && project.stack.length > 3 && (
                          <span
                            className="text-xs px-2 py-1 rounded"
                            style={{
                              backgroundColor: "var(--border-color)",
                              color: "var(--text-secondary)",
                            }}
                          >
                            +{project.stack.length - 3}
                          </span>
                        )}
                      </div>
                    </div>
                  </Link>
                </HoverScale>
              </FadeIn>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
