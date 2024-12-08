import { User } from "@prisma/client";
import JWT from "jsonwebtoken";
import { JWTuser } from "../types/context";

const JWT_SECRET = "#asasasas";
class JWTservice {
  public static async generateJWT(user: User) {
    const payload: JWTuser = {
      id: user?.id,
      email: user?.email,
    };
    const token = await JWT.sign(payload, JWT_SECRET);
    return token;
  }
  // Updated decodeToken method with detailed logging
  public static async decodeToken(token: string) {
    try {
      const data = JWT.verify(token, JWT_SECRET);
      return data as JWTuser;
    } catch (error) {
      return null;
    }
  }
}

export default JWTservice;
