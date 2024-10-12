import express from "express";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import cors from "cors";
import User from "./user/index";
import JWTservice from "../services/generateJWT";
export async function initServer() {
  const app = express();
  app.use(express.json());
  app.use(cors());
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
  app.use(
    "/graphql",
    expressMiddleware(apolloServer, {
      context: async ({ req, res }) => {
        try {
          const token = req.headers.authorization
            ? req.headers.authorization.split(" ")[1]
            : null;
          console.log(
            "Incoming request with token:",
            req.headers.authorization
          );
          const user = token ? await JWTservice.decodeToken(token) : undefined;
          return { user };
        } catch (error) {
          console.log(error);
          return {
            user: null,
          };
        }
      },
    })
  );
  return app;
}
