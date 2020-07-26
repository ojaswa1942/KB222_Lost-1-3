import { IFieldResolver } from 'apollo-server-express';
import { getRepository } from 'typeorm';
import bcrypt from 'bcryptjs';

import { User } from '../../../entity/User';
import errors from '../../../utils/errors';
import { Context } from '../../../context';
import { SignUpInput, SignUpResponse } from '../../../gqltypes';

export const signup: IFieldResolver<null, Context, { input: SignUpInput }> = async (
  _parent,
  { input }
): Promise<SignUpResponse> => {
  const { name, email, password } = input;

  if (!name || !email || !password) throw errors.fieldsRequired;
  const userRepo = getRepository(User);

  const chkUser = await userRepo.findOne({ email });
  if (chkUser) throw errors.emailExists;

  const hash = await bcrypt.hash(password, 8);

  const user = new User();
  user.name = name;
  user.email = email;
  user.hash = hash;
  user.isVerified = true;

  userRepo.save(user);

  return {
    code: '200',
    message: 'Successfully signed up',
    user,
  };
};
