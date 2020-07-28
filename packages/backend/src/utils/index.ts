import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import ms from 'ms';
import { Response } from 'express';
import { JWTPayload } from '../interfaces';
import config from '../config';

export const genToken = (payload: JWTPayload): [string, string] => {
  const token = jwt.sign(payload, config.JWTSecret, {
    algorithm: 'HS512',
    subject: 'login',
    expiresIn: config.JWTExpiry,
  });

  return [token, config.JWTExpiry];
};

export const genHash = (password: string): string => {
  return bcrypt.hashSync(password, 8);
};

export const addAuthCookies = (
  res: Response,
  token: string,
  refreshToken: string,
  expiry: string,
  signedIn: string = 'true'
): void => {
  res.cookie('token', token, {
    httpOnly: true,
    sameSite: 'strict',
    maxAge: ms(expiry),
  });

  res.cookie('signedin', signedIn, {
    sameSite: 'strict',
    maxAge: ms(config.refreshTokenExpiry),
  });

  res.cookie('refreshToken', refreshToken, {
    sameSite: 'strict',
    httpOnly: true,
    maxAge: ms(config.refreshTokenExpiry),
  });
};
