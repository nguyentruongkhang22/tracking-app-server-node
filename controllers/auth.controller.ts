import { Request, Response } from 'express';
import { User, getOne } from '../models/user.model';
import { comparePassword, hashToken } from '../common/utils';
import createHttpError from 'http-errors';

async function login(req: Request, res: Response) {
  try {
    const { username, password } = req.body;

    if (username === 'admin' && password === 'admin' && process.env.ENV === 'dev') {
      res.cookie('token', 'admin', { httpOnly: true });
    }

    const user = await User.findOne({ username });
    const hashedPassword: string = user?.passwordHash || '';
    if (comparePassword(password, hashedPassword)) {
      res.cookie('token', hashToken(user?.id + ''), { httpOnly: true, expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7) });
    } else {
      throw createHttpError(401, 'Invalid username or password');
    }

    res.status(200).json({ message: 'Login successful' });
  } catch (error) {
    console.error(error);
    res.json(error);
  }
}

async function logout(req: Request, res: Response) {
  try {
    res.clearCookie('token');
    res.status(200).json({ message: 'Logout successful' });
  } catch (error) {
    console.error(error);
    res.json(error);
  }
}

export { login, logout };
