import { IFieldResolver, UserInputError, ApolloError } from 'apollo-server-express';
import { getRepository } from 'typeorm';
import bcrypt from 'bcryptjs';
import { v4 as uuid } from 'uuid';

import { User } from '../../../entity/User';
import { genToken, addAuthCookies } from '../../../utils';
// import errors from '../../utils/errors';
import { Context } from '../../../context';

import { JWTPayload } from '../../../interfaces';
// import { SigninResponse } from '../../graphql';

interface SigninResponse {
  code: string;
  message: string;
  expiry: string;
}
export const signin: IFieldResolver<null, Context> = async (_parent, { input }, context): Promise<SigninResponse> => {
  const { email, password } = input;
  const { res } = context;

  if (!email || !password) throw new UserInputError('All fields are required');

  const user = await getRepository(User).findOne({ email });
  if (!user) throw new ApolloError('Invalid credentials', 'INVALID_CREDENTIALS');

  if (!user.isVerified) throw new ApolloError('User not verified', 'NOT_VERIFIED');

  const match = await bcrypt.compare(password, user.hash);
  if (!match) throw new ApolloError('Invalid credentials', 'INVALID_CREDENTIALS');

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
