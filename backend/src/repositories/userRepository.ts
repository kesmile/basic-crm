import pool from '../utils/db';
import { User } from '../models/userModel';

class UserRepository {
  async create(user: User): Promise<User> {
    const result = await pool.query(
      'INSERT INTO users (username, email, password, role) VALUES ($1, $2, $3, $4) RETURNING *',
      [user.username, user.email, user.password, user.role || 'user']
    );
    return result.rows[0];
  }

  async findByEmail(email: string): Promise<User | null> {
    const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    return result.rows[0] || null;
  }

  async findById(id: number): Promise<User | null> {
    const result = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
    return result.rows[0] || null;
  }
}

export default new UserRepository();