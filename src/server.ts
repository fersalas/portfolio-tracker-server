import { ApolloServer } from 'apollo-server-express';
import Express from 'express';
import mongoose from 'mongoose';
import 'reflect-metadata';
import { buildSchema } from 'type-graphql';
import dotenv from 'dotenv';
import debug from 'debug';

const log: debug.IDebugger = debug('app');

// resolvers
import { LinksResolver } from './resolvers/Links';
import { UserResolver } from './resolvers/User';

const main = async () => {
  const schema = await buildSchema({
    resolvers: [LinksResolver, UserResolver],
    emitSchemaFile: true,
    validate: false,
  });

  // Mongoose
  log('MongoDB connection');
  mongoose
    .connect('mongodb://localhost:27017/portfolio-db', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000,
      useFindAndModify: false,
    })
    .then(() => {
      log('MongoDB is connected');
    })
    .catch(err => {
      log(`MongoDB connection unsuccessful`, err);
    });
  dotenv.config();
  const server = new ApolloServer({ schema });
  const app = Express();
  server.applyMiddleware({ app });
  app.listen({ port: 3333 }, () =>
    console.log(
      `🚀 Server ready and listening at ==> http://localhost:3333${server.graphqlPath}`,
    ),
  );
};

main().catch(error => {
  console.log(error, 'There was an error starting the server');
});
