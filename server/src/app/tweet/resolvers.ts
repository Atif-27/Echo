import { Tweet } from "@prisma/client";
import { prismaClient } from "../../client/db";
import { GraphqlContext } from "../../types/context";
interface CreateTweetPayload {
  content: string;
  imageURL?: string;
}

import UserService from "../../services/userService";
import TweetService from "../../services/tweetService";

const queries = {
  getAllTweets: async () => {
    const tweets = TweetService.getAllTweets();
    return tweets;
  },
  getSignedURL: async (
    parent: any,
    { imageType }: { imageType: string },
    ctx: GraphqlContext
  ) => {
    if (!ctx.user || !ctx.user.id) throw new Error("You are Unauthenticated");
    const signedURL = await TweetService.getSignedURL(imageType, ctx.user.id);
    return signedURL;
  },
};
const mutations = {
  createTweet: async (
    parent: any,
    { payload }: { payload: CreateTweetPayload },
    context: GraphqlContext
  ) => {
    if (!context.user) throw new Error("You are not authenticated");
    const tweet = TweetService.createTweet(
      payload.content,
      payload.imageURL || "",
      context.user.id
    );
    return tweet;
  },
};
const extraResolvers = {
  author: (parent: Tweet) => UserService.getUserById(parent.authorId),
};

export const resolvers = { mutations, extraResolvers, queries };
