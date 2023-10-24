import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { v4 } from 'uuid';

import { User, count, createOne, getOne } from '../models/user.model';
import { comparePassword, hash, hashToken } from '../common/utils';
import createHttpError from 'http-errors';

async function login(req: Request, res: Response) {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });
    const hashedPassword: string = user?.passwordHash || '';

    if (comparePassword(password, hashedPassword)) {
      const loginCookie = jwt.sign({ user }, process.env.TOKEN_SEED || '', { expiresIn: '1h' });
      const uuid: string = v4();
      const wsToken = jwt.sign({ uuid }, process.env.TOKEN_SEED || '', { expiresIn: '1h' });

      res.cookie('ws-token', wsToken, { httpOnly: true, sameSite: 'none', secure: true });
      res.cookie('login-token', loginCookie, { httpOnly: true, sameSite: 'none', secure: true });
      //@ts-ignore
      res.header('Access-Control-Allow-Credentials', true);
    } else {
      throw createHttpError(401, 'Invalid username or password');
    }

    res.status(200).json({ message: 'Login successful' });
  } catch (error) {
    console.error(error);
    res.status(401).json(error);
  }
}

async function logout(req: Request, res: Response) {
  try {
    res.clearCookie('login-token');
    res.clearCookie('ws-token');
    res.status(200).json({ message: 'Logout successful' });
  } catch (error) {
    console.error(error);
    res.json(error);
  }
}

async function register(req: Request, res: Response) {
  try {
    const user = {
      username: req.body.username,
      passwordHash: hash(req.body.password),
      active: true,
      id: (await count()) + 1,
    };

    const result = await createOne(user);

    if (!result) {
      throw createHttpError(403, 'User not created');
    }

    const cookie = jwt.sign({ user }, process.env.TOKEN_SEED || '', { expiresIn: '1h' });
    res.cookie('login-token', cookie);

    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.json(error);
  }
}

export { login, logout, register };
