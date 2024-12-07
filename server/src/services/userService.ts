import axios from "axios";
import { prismaClient } from "../client/db";
import JWTservice from "./generateJWT";
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
    const user = await prismaClient.user.findUnique({
      where: {
        id,
      },
    });
    return user;
  }
}

export default UserService;