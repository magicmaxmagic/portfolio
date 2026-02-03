import { getAllProjects, getProjectBySlug } from '@/lib/projects'

describe('Projects Library', () => {
  it('should get all projects', async () => {
    const projects = await getAllProjects()
    expect(Array.isArray(projects)).toBe(true)
    expect(projects.length).toBeGreaterThan(0)
  })

  it('should have required project fields', async () => {
    const projects = await getAllProjects()
    projects.forEach(project => {
      expect(project).toHaveProperty('slug')
      expect(project).toHaveProperty('title')
      expect(project).toHaveProperty('summary')
      expect(project).toHaveProperty('date')
      expect(project).toHaveProperty('role')
    })
  })

  it('should get project by slug', async () => {
    const projects = await getAllProjects()
    if (projects.length > 0) {
      const firstProject = projects[0]
      const project = await getProjectBySlug(firstProject.slug)
      expect(project).not.toBeNull()
      if (project) {
        expect(project.meta.slug).toBe(firstProject.slug)
      }
    }
  })

  it('should return undefined or null for non-existent slug', async () => {
    const project = await getProjectBySlug('non-existent-project-12345')
    expect(project == null).toBe(true)
  })
})
