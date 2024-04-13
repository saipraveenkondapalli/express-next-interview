import { Request } from "express";

export default interface RequestWithUser extends Request {
  user?: {
    email?: string;
    iss?: string;
    sub?: string;
    aud?: string[];
    iat?: number;
    exp?: number;
    azp?: string;
  };
}
