import { IFieldResolver } from 'apollo-server-express';
import { getRepository } from 'typeorm';
import bcrypt from 'bcryptjs';
import { v4 as uuid } from 'uuid';

import { User } from '../../../entity/User';
import { genToken, addAuthCookies } from '../../../utils';
import errors from '../../../utils/errors';
import { Context } from '../../../context';
import { JWTPayload } from '../../../interfaces';
import { SignInResponse, SignInInput } from '../../../gqltypes';

export const signin: IFieldResolver<null, Context, { input: SignInInput }> = async (
  _parent,
  { input },
  context
): Promise<SignInResponse> => {
  const { email, password } = input;
  const { res } = context;

  if (!email || !password) throw errors.fieldsRequired;

  const user = await getRepository(User).findOne({ email });
  if (!user) throw errors.invalidCredentials;

  if (!user.isVerified) throw errors.notVerified;

  const match = await bcrypt.compare(password, user.hash);
  if (!match) throw errors.invalidCredentials;

  const payload: JWTPayload = {
    email: user.email,
    id: user.id,
  };

  const [token, expiry] = genToken(payload);

  const refreshToken = uuid();

  addAuthCookies(res, token, refreshToken, expiry);

  return {
    code: '200',
    message: 'Successfully signed in',
    expiry,
  };
};
