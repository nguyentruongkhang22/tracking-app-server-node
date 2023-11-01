import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { parseCookie } from '../common/utils';

const verifyToken = (req: Request, res: Response, next: any) => {
  console.log(' -- req: ', req.headers);
  const token = parseCookie('login-token', req);
  console.log(' -- token: ', token);

  if (!token) {
    return res.status(403).send('A token is required for authentication');
  }
  try {
    const decoded = jwt.verify(token, process.env.TOKEN_SEED || '');

    //@ts-ignore
    req.user = decoded;
  } catch (err) {
    return res.status(401).send('Invalid Token');
  }
  return next();
};

export { verifyToken };
