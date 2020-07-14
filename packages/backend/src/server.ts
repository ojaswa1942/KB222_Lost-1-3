import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { MongoClient } from 'mongodb';

import config from './config';
import typeDefs from './schema';
import resolvers from './resolvers';
import context from './context';

const app = express();
app.use(
  cors({
    origin: config.frontendOrigins,
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());
app.set('trust proxy', true);

const main = async () => {
  const client = new MongoClient(config.mongoURI, {
    useUnifiedTopology: true,
  });

  await client.connect();
  const db = client.db(config.DBName);

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req, res }) => context({ req, res, client, db }),
    mocks: !config.isProd,
    mockEntireSchema: false,
    playground: !config.isProd,
    introspection: !config.isProd,
  });

  server.applyMiddleware({ app, path: '/api/graphql', cors: false });

  app.listen(config.port, config.host, () => {
    console.log(`🚀  Server ready at http://localhost:${config.port}${server.graphqlPath}`);
  });
};

main();
