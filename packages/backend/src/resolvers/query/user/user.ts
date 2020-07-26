import { IFieldResolver, ApolloError, AuthenticationError } from 'apollo-server-express';
import { getRepository } from 'typeorm';
import { User } from '../../../entity/User';
import { Context } from '../../../context';

export const user: IFieldResolver<null, Context> = async (_, __, context) => {
  const { isValid, jwt } = context;

  if (!isValid) throw new AuthenticationError('User not authenticated');
  const { id } = jwt;

  const usr = await getRepository(User).findOne(id);
  if (!usr) throw new ApolloError('Internal server error', 'INTERNAL_SERVER_ERROR');

  return usr;
};

export default user;
