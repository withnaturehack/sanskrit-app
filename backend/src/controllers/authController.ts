import { Request, Response } from 'express';
import { loginUser, registerUser } from '../services/authService';

export const register = async (req: Request, res: Response): Promise<void> => {
  const { name, email, password } = req.body as { name: string; email: string; password: string };
  const { user, token } = await registerUser(name, email, password);
  res.status(201).json({ user, token });
};

export const login = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body as { email: string; password: string };
  const { user, token } = await loginUser(email, password);
  res.status(200).json({ user, token });
};
