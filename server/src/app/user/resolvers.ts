import { prismaClient } from "../../client/db";
import { GraphqlContext } from "../../types/context";
import { User } from "@prisma/client";
import UserService from "../../services/userService";
import TweetService from "../../services/tweetService";

const queries = {
  verifyGoogleToken: async (parent: any, { token }: { token: string }) => {
    const resToken = await UserService.verifyGoogleToken(token);
    return resToken;
  },

  getCurrentUser: async (parent: any, arg: any, context: GraphqlContext) => {
    const user = await UserService.getUserById(context.user?.id || "");
    return user;
  },
  getUserById: async (parent: any, { id }: { id: string }) =>
    await UserService.getUserById(id),
};

const extraResolvers = {
  tweets: (parent: User) => TweetService.getTweetsByUserId(parent.id),
};

export const resolvers = {
  queries,
  extraResolvers,
};
