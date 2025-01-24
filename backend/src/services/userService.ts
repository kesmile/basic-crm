import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import UserRepository from '../repositories/userRepository';
import { User } from '../models/userModel';

class UserService {
  private JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';

  async register(user: User): Promise<User> {
    const hashedPassword = await bcrypt.hash(user.password, 10);
    user.password = hashedPassword;

    const newUser = await UserRepository.create(user);
    return newUser;
  }

  async login(email: string, password: string): Promise<string | null> {
    const user = await UserRepository.findByEmail(email);
    if (!user) throw new Error('Invalid credentials');

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) throw new Error('Invalid credentials');

    const token = jwt.sign({ id: user.id, role: user.role }, this.JWT_SECRET, {
      expiresIn: '1y',
    });
    return token;
  }

  async verifyToken(token: string): Promise<unknown> {
    return jwt.verify(token, this.JWT_SECRET);
  }
}

export default new UserService();
