import { Request, Response } from 'express';
import * as authService from '../services/auth.service';

export async function login(req: Request, res: Response) {
  const { username, password } = req.body;

  if (!username || !password) {
    res.status(400).send({ message: 'Username and password are required' });
    return;
  }

  try {
    const token = await authService.loginUser(username, password);
    res.status(200).send({ token });
  } catch (error: any) {
    res.status(400).send({ message: 'Login failed', error: error.message });
  }
};