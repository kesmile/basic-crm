import pool from '../utils/db';
import { Project } from '../models/projectModel';

class ProjectRepository {
  async create(project: Project): Promise<Project> {
    const result = await pool.query(
      'INSERT INTO projects (client_id, name, description, status) VALUES ($1, $2, $3, $4) RETURNING *',
      [project.client_id, project.name, project.description, project.status],
    );
    return result.rows[0];
  }
  async findAll(
    clientId?: number,
    name?: string,
    page: number = 1,
    limit: number = 10,
  ): Promise<{ projects: Project[]; total: number }> {
    const offset = (page - 1) * limit;
    let query = `
      SELECT projects.*, clients.name as clientName
      FROM projects
      JOIN clients ON projects.client_id = clients.id
    `;
    let totalQuery = `
      SELECT COUNT(*)
      FROM projects
      JOIN clients ON projects.client_id = clients.id
    `;
    const values: unknown[] = [];

    if (clientId) {
      query += ` WHERE projects.client_id = $1`;
      totalQuery += ` WHERE projects.client_id = $1`;
      values.push(clientId);
    }

    if (name) {
      query += clientId ? ` AND` : ` WHERE`;
      query += ` projects.name ILIKE $${values.length + 1}`;
      totalQuery += clientId ? ` AND` : ` WHERE`;
      totalQuery += ` projects.name ILIKE $${values.length + 1}`;
      values.push(`%${name}%`);
    }

    query += ` LIMIT $${values.length + 1} OFFSET $${values.length + 2}`;
    values.push(limit, offset);

    const result = await pool.query(query, values);
    const totalResult = await pool.query(
      totalQuery,
      values.slice(0, values.length - 2),
    );

    return {
      projects: result.rows,
      total: parseInt(totalResult.rows[0].count, 10),
    };
  }

  async findById(id: number): Promise<Project | null> {
    const result = await pool.query('SELECT * FROM projects WHERE id = $1', [
      id,
    ]);
    return result.rows[0] || null;
  }

  async update(id: number, project: Partial<Project>): Promise<Project | null> {
    const fields = Object.keys(project);
    const values = Object.values(project);

    if (fields.length === 0) {
      throw new Error('No fields to update');
    }

    const setClause = fields
      .map((field, index) => `${field} = $${index + 1}`)
      .join(', ');
    const query = `UPDATE projects SET ${setClause}, updated_at = CURRENT_TIMESTAMP WHERE id = $${fields.length + 1} RETURNING *`;

    const result = await pool.query(query, [...values, id]);
    return result.rows[0] || null;
  }

  async delete(id: number): Promise<boolean> {
    const result = await pool.query(
      'DELETE FROM projects WHERE id = $1 RETURNING *',
      [id],
    );
    return (result.rowCount ?? 0) > 0;
  }
}

export default new ProjectRepository();
