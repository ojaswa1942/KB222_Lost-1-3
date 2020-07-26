import { IFieldResolver } from 'apollo-server-express';
import { getRepository } from 'typeorm';
import { User } from '../../../entity/User';
import { Context } from '../../../context';
import errors from '../../../utils/errors';

export const user: IFieldResolver<null, Context> = async (_, __, context) => {
  const { isValid, jwt } = context;

  if (!isValid) throw errors.unauthenticated;
  const { id } = jwt;

  const usr = await getRepository(User).findOne(id);
  if (!usr) throw errors.internalServerError;

  return usr;
};

export default user;
