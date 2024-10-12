import { Tweet } from "@prisma/client";
import { prismaClient } from "../../client/db";
import { GraphqlContext } from "../../types/context";
interface CreateTweetPayload {
  content: string;
  imageURL?: string;
}

const queries = {
  getAllTweets: async () => {
    const tweets = await prismaClient.tweet.findMany();
    return tweets;
  },
};
const mutations = {
  createTweet: async (
    parent: any,
    { payload }: { payload: CreateTweetPayload },
    context: GraphqlContext
  ) => {
    console.log(context);

    if (!context.user) throw new Error("You are not authenticated");
    const tweet = await prismaClient.tweet.create({
      data: {
        content: payload.content,
        imageURL: payload.imageURL,
        author: {
          connect: {
            id: context.user.id,
          },
        },
      },
    });
    console.log(tweet);

    return tweet;
  },
};
const extraResolvers = {
  author: (parent: Tweet) =>
    prismaClient.user.findUnique({
      where: {
        id: parent.authorId,
      },
    }),
};

export const resolvers = { mutations, extraResolvers, queries };
