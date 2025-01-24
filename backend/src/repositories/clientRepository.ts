import pool from '../utils/db';
import { Client } from '../models/clientModel';

class ClientRepository {
  // Create a new client
  async create(client: Client): Promise<Client> {
    const result = await pool.query(
      'INSERT INTO clients (name, email, phone, address) VALUES ($1, $2, $3, $4) RETURNING *',
      [client.name, client.email, client.phone, client.address]
    );
    return result.rows[0];
  }

  // Get clients with optional filtering, pagination
  async findAll(filter: { name?: string }, page: number, limit: number): Promise<{ clients: Client[], total: number }> {
    const offset = (page - 1) * limit;
    let query = `SELECT * FROM clients`;
    let totalQuery = `SELECT COUNT(*) FROM clients`;
    const values: any[] = [];
    
    if (filter.name) {
      query += ` WHERE name ILIKE $1`;
      totalQuery += ` WHERE name ILIKE $1`;
      values.push(`%${filter.name}%`);
    }
    
    query += ` LIMIT $${values.length + 1} OFFSET $${values.length + 2}`;
    values.push(limit, offset);
  
    const result = await pool.query(query, values);
    const totalResult = await pool.query(totalQuery, filter.name ? [`%${filter.name}%`] : []);
  
    return {
      clients: result.rows,
      total: parseInt(totalResult.rows[0].count, 10),
    };
  }

  // Find a client by ID
  async findById(id: number): Promise<Client | null> {
    const result = await pool.query('SELECT * FROM clients WHERE id = $1', [id]);
    return result.rows[0] || null;
  }

  async update(id: number, client: Partial<Client>): Promise<Client | null> {
    const fields = Object.keys(client);
    const values = Object.values(client);

    if (fields.length === 0) {
      throw new Error('No fields to update');
    }

    const setClause = fields.map((field, index) => `${field} = $${index + 1}`).join(', ');
    const query = `UPDATE clients SET ${setClause} WHERE id = $${fields.length + 1} RETURNING *`;

    const result = await pool.query(query, [...values, id]);
    return result.rows[0] || null;
  }

  // Delete a client
  async delete(id: number): Promise<boolean> {
    const result = await pool.query('DELETE FROM clients WHERE id = $1 RETURNING *', [id]);
    return result.rowCount !== null && result.rowCount > 0;
  }
}

export default new ClientRepository();