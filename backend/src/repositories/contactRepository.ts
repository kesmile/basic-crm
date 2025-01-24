import pool from '../utils/db';
import { Contact } from '../models/contactModel';

class ContactRepository {
  async create(contact: Contact): Promise<Contact> {
    const result = await pool.query(
      'INSERT INTO contacts (name, email, phone) VALUES ($1, $2, $3) RETURNING *',
      [contact.name, contact.email, contact.phone],
    );
    return result.rows[0];
  }

  async findAll(
    page: number,
    limit: number,
    name?: string,
  ): Promise<{ contacts: Contact[]; total: number }> {
    const offset = (page - 1) * limit;
    let query = `SELECT * FROM contacts`;
    let totalQuery = `SELECT COUNT(*) FROM contacts`;
    const values: unknown[] = [];

    if (name) {
      query += ` WHERE name = $1`;
      totalQuery += ` WHERE name = $1`;
      values.push(name);
    }

    query += ` LIMIT $${values.length + 1} OFFSET $${values.length + 2}`;
    values.push(limit, offset);

    const result = await pool.query(query, values);
    const totalResult = await pool.query(
      totalQuery,
      values.slice(0, values.length - 2),
    );

    return {
      contacts: result.rows,
      total: parseInt(totalResult.rows[0].count, 10),
    };
  }

  async findById(id: number): Promise<Contact | null> {
    const result = await pool.query('SELECT * FROM contacts WHERE id = $1', [
      id,
    ]);
    return result.rows[0] || null;
  }

  async update(id: number, updates: Partial<Contact>): Promise<Contact | null> {
    const fields: string[] = [];
    const values: unknown[] = [];
    let query = 'UPDATE contacts SET ';

    Object.entries(updates).forEach(([key, value], index) => {
      fields.push(`${key} = $${index + 1}`);
      values.push(value);
    });

    query +=
      fields.join(', ') +
      ', updated_at = CURRENT_TIMESTAMP WHERE id = $' +
      (values.length + 1) +
      ' RETURNING *';
    values.push(id);

    const result = await pool.query(query, values);
    return result.rows[0] || null;
  }

  async delete(id: number): Promise<boolean> {
    const result = await pool.query(
      'DELETE FROM contacts WHERE id = $1 RETURNING *',
      [id],
    );
    return result.rowCount !== null && result.rowCount > 0;
  }
}

export default new ContactRepository();
