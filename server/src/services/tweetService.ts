import { Tweet } from "@prisma/client";
import { prismaClient } from "../client/db";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

class TweetService {
  public static s3Client = new S3Client({
    region: process.env.AWS_DEFAULT_REGION,
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
    },
  });

  public static async getAllTweets(): Promise<Tweet[]> {
    const tweets = await prismaClient.tweet.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
    return tweets;
  }

  public static async getTweetsByUserId(userId: string): Promise<Tweet[]> {
    const tweets = await prismaClient.tweet.findMany({
      where: {
        authorId: userId,
      },
    });
    return tweets;
  }
  public static async createTweet(
    content: string,
    imageURL: string,
    userId: string
  ) {
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
