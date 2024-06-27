import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import express from "express";

export async function initServer() {
  const app = express();
  app.use(express.json());
  const apolloServer = new ApolloServer({
    typeDefs: `
    type Query{
    sayHello: String
    }
    `,
    resolvers: {
      Query: {
        sayHello: () => "Hello World",
      },
    },
  });
  await apolloServer.start();
  app.use("/graphql", expressMiddleware(apolloServer));
  return app;
}
