import { IResolvers } from 'apollo-server-express';
import { Context } from '../context';
import * as queryResolvers from './query';
import * as mutationResolvers from './mutation';

const resolvers: IResolvers<null, Context> = {
  Query: {
    ping: (): string => 'pong!',
    ...queryResolvers,
  },
  Mutation: mutationResolvers,
};

export default resolvers;
