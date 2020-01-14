const { ApolloServer } = require('apollo-server');
const fs = require('fs');
const mongoose = require('mongoose');
const { merge } = require('lodash');
const { loadSchema } = require('./utils');
const config = require('./config');
const authorResolver = require('./types/author/authorResolver');
const bookResolver = require('./types/book/bookResolver');
const bookInstanceResolver = require('./types/bookInstance/bookInstanceResolver');
const genreResolver = require('./types/genre/genreResolver');
const dateResolver = require('./utils/dateResolver');

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

  mongoose
    .connect(config.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    })
    .then(() => {
      console.log('connected to MongoDB 🗄');
    })
    .catch(error => {
      console.log('🛑 error connection to MongoDB: ' + error.message);
    });

  server.listen().then(({ url }) => {
    console.log(`🚀 Server ready at ${url}`);
  });
};

start();
