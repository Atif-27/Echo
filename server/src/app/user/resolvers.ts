import { prismaClient } from "../../client/db";
import { GraphqlContext } from "../../types/context";
import { User } from "@prisma/client";
import UserService from "../../services/userService";
import TweetService from "../../services/tweetService";
import { redisClient } from "../../client/redis";

const queries = {
  verifyGoogleToken: async (
    parent: any,
    { token }: { token: string },
    ctx: GraphqlContext
  ) => {
    const resToken = await UserService.verifyGoogleToken(token);
    ctx.res.cookie("token", resToken, {
      httpOnly: true,
      secure: true,
      expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
      sameSite: "lax",
    });

    return resToken;
  },

  getCurrentUser: async (parent: any, arg: any, context: GraphqlContext) => {
    const user = await UserService.getUserById(context.user?.id || "");
    return user;
  },
  getUserById: async (parent: any, { id }: { id: string }) =>
    await UserService.getUserById(id),
};

const mutations = {
  followUser: async (
    parent: any,
    { to }: { to: string },
    ctx: GraphqlContext
  ) => {
    if (!ctx.user || !ctx.user?.id) throw new Error("User not Authenticated");
    const res = await UserService.followUser(ctx.user?.id, to);
    return res;
  },
  unFollowUser: async (
    parent: any,
    { to }: { to: string },
    ctx: GraphqlContext
  ) => {
    if (!ctx.user || !ctx.user?.id) throw new Error("User not Authenticated");
    const res = await UserService.unfollowUser(ctx.user?.id, to);
    return true;
  },
};

const extraResolvers = {
  tweets: (parent: User) => TweetService.getTweetsByUserId(parent.id),
  followers: (parent: User) => UserService.getAllFollowers(parent.id),
  following: (parent: User) => {
    UserService.getAllFollowing(parent.id);
  },
  isMyProfile: (parent: User, {}, ctx: GraphqlContext) => {
    if (!ctx.user || !ctx.user.id) return false;
    return parent.id === ctx.user?.id;
  },
  isFollowing: (parent: User, {}, ctx: GraphqlContext) => {
    if (!ctx.user || !ctx.user.id) return false;
    return UserService.isFollowing(ctx.user!.id, parent.id);
  },
  recommendedUser: async (parent: User, {}, ctx: GraphqlContext) => {
    if (!ctx.user || !ctx.user.id) return [];
    const cached = await redisClient.get(`RECOMMEND_USER_${ctx.user.id}`);
    if (cached) {
      return JSON.parse(cached);
    }

    const myFollowings = await prismaClient.follow.findMany({
      where: {
        followerId: ctx.user.id,
      },
      include: {
        following: {
          include: {
            followers: {
              include: {
                following: true,
              },
            },
          },
        },
      },
    });

    const usersToRecommend = [];
    for (const following of myFollowings) {
      for (const followingOfMyFollowing of following.following.followers) {
        if (
          followingOfMyFollowing.following.id !== ctx.user.id &&
          myFollowings.findIndex(
            (e) => e.followingId === followingOfMyFollowing.following.id
          ) < 0
        ) {
          usersToRecommend.push(followingOfMyFollowing.following);
        }
      }
    }
    await redisClient.setex(
      `RECOMMEND_USER_${ctx.user.id}`,
      60 * 60 * 24,
      JSON.stringify(usersToRecommend)
    );
    return usersToRecommend;
  },
};

export const resolvers = {
  queries,
  mutations,
  extraResolvers,
};
