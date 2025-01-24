import { Request, Response } from 'express';
import UserService from '../services/userService';

export const register = async (req: Request, res: Response) => {
  try {
    const user = await UserService.register(req.body);
    const { password, ...userWithoutPassword } = user;
    res.status(201).json({
      message: 'User registered successfully',
      user: userWithoutPassword,
    });
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const token = await UserService.login(email, password);
    res.status(200).json({ message: 'Login successful', token });
  } catch (error) {
    res.status(401).json({ error: (error as Error).message });
  }
};
