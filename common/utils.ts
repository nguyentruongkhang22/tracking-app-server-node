import crypto from 'crypto';
import { Request } from 'express';

function convertTZ(date: any, tzString: string) {
  return new Date((typeof date === 'string' ? new Date(date) : date).toLocaleString('en-US', { timeZone: tzString }));
}

function hash(str: string) {
  const hasher = crypto.createHash('sha256');

  if (process.env.PASSWORD_SEED) {
    hasher.update(str).update(process.env.PASSWORD_SEED || '');
  } else {
    throw new Error('PASSWORD_SEED not found');
  }

  return hasher.digest('hex');
}

function comparePassword(password: string, hashedPassword: string) {
  return hash(password) === hashedPassword;
}

function hashToken(token: string) {
  const hasher = crypto.createHash('sha256');

  if (process.env.TOKEN_SEED) {
    hasher.update(token).update(process.env.TOKEN_SEED || '');
  } else {
    throw new Error('TOKEN_SEED not found');
  }

  return hasher.digest('hex');
}

function parseCookie(cookieName: string, req: Request) {
  const cookies = req.headers.cookie?.split(';');
  const token = cookies?.find((cookie) => cookie.trim().startsWith(`${cookieName}=`))?.split('=')[1];

  return token;
}

export { convertTZ, hash, comparePassword, hashToken, parseCookie };
