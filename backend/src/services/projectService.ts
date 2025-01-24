import ProjectRepository from '../repositories/projectRepository';
import { Project } from '../models/projectModel';

class ProjectService {
  async createProject(project: Project): Promise<Project> {
    return ProjectRepository.create(project);
  }

  async getProjects(
    clientId?: number,
    name?: string,
    page: number = 1,
    limit: number = 10,
  ): Promise<{ projects: Project[]; total: number }> {
    return ProjectRepository.findAll(clientId, name, page, limit);
  }

  async getProjectById(id: number): Promise<Project | null> {
    return ProjectRepository.findById(id);
  }

  async updateProject(
    id: number,
    project: Partial<Project>,
  ): Promise<Project | null> {
    return ProjectRepository.update(id, project);
  }

  async deleteProject(id: number): Promise<boolean> {
    return ProjectRepository.delete(id);
  }
}

export default new ProjectService();
