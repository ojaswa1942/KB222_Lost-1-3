import { Request, Response } from 'express';
import DataLoader from 'dataloader';
import { IncomingHttpHeaders } from 'http';
import jwt from 'jsonwebtoken';

import config from './config';
import {
  buildUserLoader,
  buildDepartmentLoader,
  buildSchemeLoader,
  buildChannelLoader,
  buildRoomLoader,
  buildMessageLoader,
} from './loaders';
import { User } from './database/entity/User';
import { Department } from './database/entity/Department';
import { Scheme } from './database/entity/Scheme';
import { Channel } from './database/entity/Channel';
import { Room } from './database/entity/Room';
import { Message } from './database/entity/Message';
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
  userLoader: DataLoader<number, User>;
  departmentLoader: DataLoader<number, Department>;
  schemeLoader: DataLoader<number, Scheme>;
  channelLoader: DataLoader<number, Channel>;
  roomLoader: DataLoader<number, Room>;
  messageLoader: DataLoader<number, Message>;
}

const context = ({ req, res }: ContextInput): Context => {
  const payload: Context = {
    headers: req.headers,
    req: req,
    res: res,
    isValid: false,
    userLoader: buildUserLoader(),
    departmentLoader: buildDepartmentLoader(),
    schemeLoader: buildSchemeLoader(),
    channelLoader: buildChannelLoader(),
    roomLoader: buildRoomLoader(),
    messageLoader: buildMessageLoader(),
  };

  const token = req.cookies['token'] || '';

  try {
    const decoded = jwt.verify(token, config.JWTSecret, {
      algorithms: ['HS512'],
      subject: 'login',
    }) as JWTPayload;

    payload.isValid = true;
    payload.jwt = decoded;
  } catch (err) {}

  return payload;
};

export default context;
