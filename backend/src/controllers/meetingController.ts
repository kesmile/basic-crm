import { NextFunction, Request, RequestHandler, Response } from 'express';
import MeetingService from '../services/meetingService';

export const createMeeting = async (req: Request, res: Response) => {
  try {
    const meeting = await MeetingService.createMeeting(req.body);
    res.status(201).json(meeting);
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
};

export const getMeetings = async (req: Request, res: Response) => {
  try {
    const { projectId, title, page = 1, limit = 10 } = req.query;
    const { meetings, total } = await MeetingService.getMeetings(
      projectId ? Number(projectId) : undefined,
      title as string,
      Number(page),
      Number(limit),
    );
    res.status(200).json({ meetings, total });
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
};

export const getMeetingById = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { id } = req.params;
    const meeting = await MeetingService.getMeetingById(Number(id));
    if (!meeting) {
      res.status(404).json({ error: 'Meeting not found' });
      return;
    }
    res.status(200).json(meeting);
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
    next(err);
  }
};

export const updateMeeting = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { id } = req.params;
    const updatedMeeting = await MeetingService.updateMeeting(
      Number(id),
      req.body,
    );
    if (!updatedMeeting) {
      res.status(404).json({ error: 'Meeting not found' });
      return;
    }
    res.status(200).json(updatedMeeting);
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
    next(err);
  }
};

export const deleteMeeting: RequestHandler = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { id } = req.params;
    const deleted = await MeetingService.deleteMeeting(Number(id));
    if (!deleted) {
      res.status(404).json({ error: 'Meeting not found' });
      return;
    }
    res.status(200).json({ message: 'Meeting deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
};
