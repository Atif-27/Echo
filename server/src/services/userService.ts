import axios from "axios";
import { prismaClient } from "../client/db";
import JWTservice from "./generateJWT";
import { redisClient } from "../client/redis";
import { GraphqlContext } from "../types/context";
interface GoogleTokenType {
  iss: string; // Issuer
  azp: string; // Authorized Party
  aud: string; // Audience
  sub: string; // Subject
  email: string; // Email
  email_verified: string; // Email Verified
  nbf: string; // Not Before
  name: string; // Full Name
  picture: string; // Profile Picture URL
  given_name: string; // Given Name
  family_name: string; // Family Name
  iat: string; // Issued At
  exp: string; // Expiration Time
  jti: string; // JWT ID
  alg: string; // Algorithm
  kid: string; // Key ID
  typ: string; // Token Type
}
class UserService {
  public static async verifyGoogleToken(token: string): Promise<string> {
    // ! Takes a Token and send it to google oauth api for verification
    const googleToken = token;
    const googleOauthURL = new URL(process.env.GOOGLE_OAUTH_URL + "/tokeninfo");
    googleOauthURL.searchParams.set("id_token", googleToken);
    const { data } = await axios.get<GoogleTokenType>(
      googleOauthURL.toString(),
      {
        responseType: "json",
      }
    );

    let user = await prismaClient.user.findUnique({
      where: {
        email: data.email,
      },
    });

    if (!user) {
      user = await prismaClient.user.create({
        data: {
          email: data.email,
          firstName: data.given_name,
          lastName: data.family_name,
          profileImage: data.picture,
        },
      });
    }
    const userInDb = await prismaClient.user.findUnique({
      where: {
        id: user?.id,
      },
    });
    if (!userInDb) throw new Error("User Not Found");
    const jwt = await JWTservice.generateJWT(userInDb);
    return jwt as string;
  }
  public static async getUserById(id: string) {
    const cache = await redisClient.get(`USER_${id}`);
    if (cache) {
      return JSON.parse(cache);
    }
    const user = await prismaClient.user.findUnique({
      where: {
        id,
      },
    });
    await redisClient.setex(`USER_${id}`, 60 * 60, JSON.stringify(user));
    return user;
  }

  public static async followUser(from: string, to: string) {
    try {
      const existingFollow = await prismaClient.follow.findUnique({
        where: {
          followerId_followingId: {
            followerId: from,
            followingId: to,
          },
        },
      });

      if (existingFollow) {
        throw new Error("You Already Follow the user");
      }

      const res = await prismaClient.follow.create({
        data: {
          followerId: from,
          followingId: to,
        },
      });
      await redisClient.del(`RECOMMEND_USER_${from}`);
      await redisClient.del(`USER_{from}`);
      await redisClient.del(`USER_{to}`);
    } catch (error) {
      return false;
    }
    return true;
  }

  public static async unfollowUser(from: string, to: string) {
    await prismaClient.follow.delete({
      where: {
        followerId_followingId: {
          followerId: from,
          followingId: to,
        },
      },
    });
    await redisClient.del(`RECOMMEND_USER_${from}`);
    await redisClient.del(`USER_{from}`);
    await redisClient.del(`USER_{to}`);
    return true;
  }

  public static async getAllFollowing(userId: string) {
    const res = await prismaClient.follow.findMany({
      where: {
        follower: {
          id: userId,
        },
      },
      include: {
        following: true,
      },
    });
    const finalRes = res.map((el) => el.following);
    return finalRes;
  }
  public static async getAllFollowers(userId: string) {
    const res = await prismaClient.follow.findMany({
      where: {
        following: {
          id: userId,
        },
      },
      include: {
        follower: true,
      },
    });
    const finalRes = res.map((el) => el.follower);
    return finalRes;
  }

  public static async isFollowing(from: string, to: string) {
    const res = await prismaClient.follow.findFirst({
      where: {
        followerId: from,
        followingId: to,
      },
    });
    return res !== null;
  }
}

export default UserService;
