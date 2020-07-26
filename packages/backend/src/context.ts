import { Request, Response } from 'express';
import { IncomingHttpHeaders } from 'http';
import jwt from 'jsonwebtoken';

import config from './config';
import { JWTPayload } from './interfaces';

export interface ContextInput {
  res: Response;
  req: Request;
}

export interface Context {
  headers: IncomingHttpHeaders;
  req: Request;
  res: Response;
  isValid: boolean;
  jwt?: JWTPayload;
}

const context = ({ req, res }: ContextInput): Context => {
  const payload: Context = {
    headers: req.headers,
    req: req,
    res: res,
    isValid: false,
  };

  const token = req.cookies['token'] || '';

  try {
    const decoded = jwt.verify(token, config.JWTSecret, {
      algorithms: ['HS512'],
      subject: 'login',
    });

    payload.isValid = true;
    payload.jwt = {
      email: (decoded as JWTPayload).email,
      id: (decoded as JWTPayload).id,
    };
  } catch (err) {}

  return payload;
};

export default context;
