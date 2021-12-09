const express = require('express');
//apolloserver
const { ApolloServerPluginLandingPageGraphQLPlayground } = require("apollo-server-core");
const { ApolloServer } = require('apollo-server-express');
const { typeDefs, resolvers } = require('./schemas');
const path = require('path');

const db = require('./config/connection');
const { authMiddlewear } = require('./utils/auth');

const PORT = process.env.PORT || 3001;
const app = express();

const startServer = async() => {
  //create a new apollo server and pas in our schmema data
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: authMiddlewear,
    plugins: [
      ApolloServerPluginLandingPageGraphQLPlayground(),
    ]
  });
  //start server
  await server.start();
  //integrate apollo server with express app as middlewear
  server.applyMiddleware({ app });
  //log where we can test our gql api
  console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
};
//initializw the apollo server
startServer();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
  });
});
