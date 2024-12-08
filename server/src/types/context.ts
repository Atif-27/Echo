import { Response } from "express";

export interface JWTuser {
  id: string;
  email: string;
}
export interface GraphqlContext {
  user?: JWTuser;
  res: Response;
}
