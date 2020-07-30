import { ApolloServer } from 'apollo-server-express';
import { ApolloServerTestClient, createTestClient as createApolloTestClient } from 'apollo-server-testing';

import { Context } from '../context';
import { rootSchema } from '../graphql/rootSchema';
import { buildUserLoader } from '../loaders';

export const createTestClient = (ctx?: Partial<Context>): ApolloServerTestClient => {
  const server = new ApolloServer({
    schema: rootSchema,
    context: {
      headers: {},
      req: {},
      res: {
        cookie: () => {
          // do nothing
        },
      },
      userLoader: buildUserLoader(),
      isValid: false,
      ...ctx,
    },
  });

  return createApolloTestClient(server);
};
