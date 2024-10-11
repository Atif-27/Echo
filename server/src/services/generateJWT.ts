import { User } from "@prisma/client";
import JWT from "jsonwebtoken";

const JWT_SECRET = "#asasasas";
class JWTservice {
  public static async generateJWT(user: User) {
    const payload = {
      id: user?.id,
      email: user?.email,
    };
    const token = await JWT.sign(payload, JWT_SECRET);
    return token;
  }
}

export default JWTservice;
