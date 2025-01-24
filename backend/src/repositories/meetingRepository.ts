import pool from '../utils/db';
import { Meeting } from '../models/meetingModel';

class MeetingRepository {
  // Create a new meeting
  async create(meeting: Meeting): Promise<Meeting> {
    const result = await pool.query(
      'INSERT INTO meetings (project_id, title, date, time, notes) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [meeting.project_id, meeting.title, meeting.date, meeting.time, meeting.notes]
    );
    return result.rows[0];
  }

  // Get all meetings, optionally filtered by project_id
  async findAll(projectId?: number, title?: string, page: number = 1, limit: number = 10): Promise<{ meetings: Meeting[], total: number }> {
    const offset = (page - 1) * limit;
    let query = `SELECT * FROM meetings`;
    let totalQuery = `SELECT COUNT(*) FROM meetings`;
    const values: any[] = [];

    if (projectId) {
      query += ` WHERE project_id = $1`;
      totalQuery += ` WHERE project_id = $1`;
      values.push(projectId);
    }

    if (title) {
      query += projectId ? ` AND` : ` WHERE`;
      query += ` title ILIKE $${values.length + 1}`;
      totalQuery += projectId ? ` AND` : ` WHERE`;
      totalQuery += ` title ILIKE $${values.length + 1}`;
      values.push(`%${title}%`);
    }

    query += ` LIMIT $${values.length + 1} OFFSET $${values.length + 2}`;
    values.push(limit, offset);

    const result = await pool.query(query, values);
    const totalResult = await pool.query(totalQuery, values.slice(0, values.length - 2));

    return {
      meetings: result.rows,
      total: parseInt(totalResult.rows[0].count, 10),
    };
  }

  // Get a meeting by ID
  async findById(id: number): Promise<Meeting | null> {
    const result = await pool.query('SELECT * FROM meetings WHERE id = $1', [id]);
    return result.rows[0] || null;
  }

  // Update a meeting
  async update(id: number, meeting: Partial<Meeting>): Promise<Meeting | null> {
    const result = await pool.query(
      `UPDATE meetings 
       SET title = $1, date = $2, time = $3, notes = $4, updated_at = CURRENT_TIMESTAMP 
       WHERE id = $5 
       RETURNING *`,
      [meeting.title, meeting.date, meeting.time, meeting.notes, id]
    );
    return result.rows[0] || null;
  }

  // Delete a meeting
  async delete(id: number): Promise<boolean> {
    const result = await pool.query('DELETE FROM meetings WHERE id = $1 RETURNING *', [id]);
    return result.rowCount !== null && result.rowCount > 0;
  }
}

export default new MeetingRepository();