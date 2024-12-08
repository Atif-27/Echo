import express from "express";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import cors from "cors";
import coookieParser from "cookie-parser";
import User from "./user/index";
import JWTservice from "../services/generateJWT";
import Tweet from "./tweet";
import user from "./user/index";
export async function initServer() {
  const app = express();
  app.use(express.json());
  app.use(coookieParser());
  app.use(
    cors({
      origin: process.env.CLIENT_URL,
      credentials: true,
    })
  );
  const apolloServer = new ApolloServer({
    typeDefs: `
    ${User.types}
    ${Tweet.types}
    type Query{
    ${User.queries}
    ${Tweet.queries}
    }
    type Mutation{
    ${Tweet.mutations}
    ${User.mutations}
    }
    `,
    resolvers: {
      Tweet: { ...Tweet.resolvers.extraResolvers },
      User: { ...User.resolvers.extraResolvers },
      Query: { ...User.resolvers.queries, ...Tweet.resolvers.queries },
      Mutation: { ...Tweet.resolvers.mutations, ...User.resolvers.mutations },
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
            : req.cookies
            ? req.cookies.token
            : null;
          let user = token ? await JWTservice.decodeToken(token) : undefined;
          if (user === null) user = undefined;
          return { user, res };
        } catch (error) {
          console.log(error);
          return {
            user: undefined,
            res,
          };
        }
      },
    })
  );
  return app;
}
