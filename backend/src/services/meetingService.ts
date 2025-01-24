import MeetingRepository from '../repositories/meetingRepository';
import { Meeting } from '../models/meetingModel';

class MeetingService {
  async createMeeting(meeting: Meeting): Promise<Meeting> {
    return MeetingRepository.create(meeting);
  }

  async getMeetings(
    projectId?: number,
    title?: string,
    page: number = 1,
    limit: number = 10,
  ): Promise<{ meetings: Meeting[]; total: number }> {
    return MeetingRepository.findAll(projectId, title, page, limit);
  }

  async getMeetingById(id: number): Promise<Meeting | null> {
    return MeetingRepository.findById(id);
  }

  async updateMeeting(
    id: number,
    meeting: Partial<Meeting>,
  ): Promise<Meeting | null> {
    return MeetingRepository.update(id, meeting);
  }

  async deleteMeeting(id: number): Promise<boolean> {
    return MeetingRepository.delete(id);
  }
}

export default new MeetingService();
