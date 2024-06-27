import express from "express";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { prismaClient } from "../client/db/index";
import User from "./user/index";
export async function initServer() {
  const app = express();
  app.use(express.json());
  const apolloServer = new ApolloServer({
    typeDefs: `
    ${User.types}
    type Query{
    ${User.queries}
    }
    `,
    resolvers: {
      Query: { ...User.resolvers },
    },
  });
  await apolloServer.start();
  app.use("/graphql", expressMiddleware(apolloServer));
  return app;
}
