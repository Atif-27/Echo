import { Tweet } from "@prisma/client";
import { prismaClient } from "../client/db";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { redisClient } from "../client/redis";

class TweetService {
  public static s3Client = new S3Client({
    region: process.env.AWS_DEFAULT_REGION,
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
    },
  });

  public static async getAllTweets() {
    const cache = await redisClient.get("ALL_TWEETS");
    if (cache) {
      return JSON.parse(cache);
    }
    const tweets = await prismaClient.tweet.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
    await redisClient.setex("ALL_TWEETS", 60 * 60, JSON.stringify(tweets));
    return tweets;
  }

  public static async getTweetsByUserId(userId: string) {
    const cache = await redisClient.get(`TWEETS_${userId}`);
    if (cache) {
      return JSON.parse(cache);
    }
    const tweets = await prismaClient.tweet.findMany({
      where: {
        authorId: userId,
      },
    });
    await redisClient.setex(
      `TWEETS_${userId}`,
      60 * 60,
      JSON.stringify(tweets)
    );
    return tweets;
  }
  public static async createTweet(
    content: string,
    imageURL: string,
    userId: string
  ) {
    const isRateLimited = await redisClient.get(`RATE_LIMIT:TWEET:${userId}`);
    if (isRateLimited) {
      throw new Error("You can only tweet once every 10 seconds");
    }
    const tweet = await prismaClient.tweet.create({
      data: {
        content: content,
        imageURL: imageURL,
        author: {
          connect: {
            id: userId,
          },
        },
      },
    });
    await redisClient.setex(`RATE_LIMIT:TWEET:${userId}`, 10, 1);
    await redisClient.del("ALL_TWEETS");
    await redisClient.del(`TWEETS_${userId}`);
    return tweet;
  }
  public static async getSignedURL(
    imageType: string,
    userId: string
  ): Promise<string> {
    const allowedImageType = [
      "image/jpg",
      "image/png",
      "image/jpeg",
      "image/webp",
    ];
    if (!allowedImageType.includes(imageType))
      throw new Error("Invalid Image type");

    const putObjectCommand = new PutObjectCommand({
      Key: `uploads/${userId}/tweets/${Date.now().toString()}.${imageType}`,
      Bucket: process.env.AWS_S3_BUCKET_NAME,
    });

    const signedURL = await getSignedUrl(
      TweetService.s3Client,
      putObjectCommand
    );
    return signedURL;
  }
}

export default TweetService;
