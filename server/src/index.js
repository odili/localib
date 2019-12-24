import { ApolloServer } from 'apollo-server';
import fs from 'fs';
import mongoose from 'mongoose';
import { merge } from 'lodash';
import { loadSchema } from './utils/loadSchema';
import config from './config';
import authorResolver from './types/author/authorResolver';
import bookResolver from './types/book/bookResolver';
import bookInstanceResolver from './types/bookInstance/bookInstanceResolver';
import genreResolver from './types/genre/genreResolver';
import dateResolver from './utils/dateResolver';

const types = fs.readdirSync(`./src/types`);

const start = async () => {
  const schemaTypes = await Promise.all(types.map(loadSchema));
  const server = new ApolloServer({
    typeDefs: schemaTypes,
    resolvers: merge(
      {},
      dateResolver,
      authorResolver,
      bookResolver,
      bookInstanceResolver,
      genreResolver
    ),
  });

  await mongoose.connect(config.dbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  });

  server.listen().then(({ url }) => {
    console.log(`🚀 Server ready at ${url}`);
  });
};

start();
