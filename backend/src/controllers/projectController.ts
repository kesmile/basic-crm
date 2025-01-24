import { NextFunction, Request, RequestHandler, Response } from 'express';
import ProjectService from '../services/projectService';

export const createProject = async (req: Request, res: Response) => {
  try {
    const project = await ProjectService.createProject(req.body);
    res.status(201).json(project);
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
};

export const getProjects = async (req: Request, res: Response) => {
  try {
    const { clientId, name, page = 1, limit = 10 } = req.query;
    const { projects, total } = await ProjectService.getProjects(
      clientId ? Number(clientId) : undefined,
      name as string,
      Number(page),
      Number(limit),
    );
    res.status(200).json({ projects, total });
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
};

export const getProjectById = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { id } = req.params;
    const project = await ProjectService.getProjectById(Number(id));
    if (!project) {
      res.status(404).json({ error: 'Project not found' });
      return;
    }
    res.status(200).json(project);
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
    next(err);
  }
};

export const updateProject = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { id } = req.params;
    const updatedProject = await ProjectService.updateProject(
      Number(id),
      req.body,
    );
    if (!updatedProject) {
      res.status(404).json({ error: 'Project not found' });
      return;
    }
    res.status(200).json(updatedProject);
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
    next(err);
  }
};

export const deleteProject: RequestHandler = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { id } = req.params;
    const deleted = await ProjectService.deleteProject(Number(id));
    if (!deleted) {
      res.status(404).json({ error: 'Project not found' });
      return;
    }

    res.status(200).json({ message: 'Project deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
};
