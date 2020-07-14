import { IResolvers } from 'apollo-server-express';
import { Context } from '../context';

const resolvers: IResolvers<null, Context> = {
  Query: {
    ping: (): string => 'pong!',
  },
};

export default resolvers;
