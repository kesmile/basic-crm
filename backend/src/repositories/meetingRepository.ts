import pool from '../utils/db';
import { Meeting } from '../models/meetingModel';

class MeetingRepository {
  async create(meeting: Meeting): Promise<Meeting> {
    const result = await pool.query(
      'INSERT INTO meetings (project_id, title, date, time, notes) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [
        meeting.project_id,
        meeting.title,
        meeting.date,
        meeting.time,
        meeting.notes,
      ],
    );
    return result.rows[0];
  }

  async findAll(
    projectId?: number,
    title?: string,
    page: number = 1,
    limit: number = 10,
  ): Promise<{ meetings: Meeting[]; total: number }> {
    const offset = (page - 1) * limit;
    let query = `
      SELECT meetings.*, projects.name as project_name
      FROM meetings
      JOIN projects ON meetings.project_id = projects.id
    `;
    let totalQuery = `
      SELECT COUNT(*)
      FROM meetings
      JOIN projects ON meetings.project_id = projects.id
    `;
    const values: unknown[] = [];

    if (projectId) {
      query += ` WHERE meetings.project_id = $1`;
      totalQuery += ` WHERE meetings.project_id = $1`;
      values.push(projectId);
    }

    if (title) {
      query += projectId ? ` AND` : ` WHERE`;
      query += ` meetings.title ILIKE $${values.length + 1}`;
      totalQuery += projectId ? ` AND` : ` WHERE`;
      totalQuery += ` meetings.title ILIKE $${values.length + 1}`;
      values.push(`%${title}%`);
    }

    query += ` LIMIT $${values.length + 1} OFFSET $${values.length + 2}`;
    values.push(limit, offset);

    const result = await pool.query(query, values);
    const totalResult = await pool.query(
      totalQuery,
      values.slice(0, values.length - 2),
    );

    return {
      meetings: result.rows,
      total: parseInt(totalResult.rows[0].count, 10),
    };
  }

  async findById(id: number): Promise<Meeting | null> {
    const result = await pool.query(
      `
      SELECT meetings.*, projects.name as project_name
      FROM meetings
      JOIN projects ON meetings.project_id = projects.id
      WHERE meetings.id = $1
    `,
      [id],
    );
    return result.rows[0] || null;
  }

  async update(id: number, meeting: Partial<Meeting>): Promise<Meeting | null> {
    const fields = Object.keys(meeting);
    const values = Object.values(meeting);

    if (fields.length === 0) {
      throw new Error('No fields to update');
    }

    const setClause = fields
      .map((field, index) => `${field} = $${index + 1}`)
      .join(', ');
    const query = `UPDATE meetings SET ${setClause}, updated_at = CURRENT_TIMESTAMP WHERE id = $${fields.length + 1} RETURNING *`;

    const result = await pool.query(query, [...values, id]);
    return result.rows[0] || null;
  }

  async delete(id: number): Promise<boolean> {
    const result = await pool.query(
      'DELETE FROM meetings WHERE id = $1 RETURNING *',
      [id],
    );
    return result.rowCount !== null && result.rowCount > 0;
  }
}

export default new MeetingRepository();
