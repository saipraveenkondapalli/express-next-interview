import { Request as ExpressRequest } from "express";

export default interface Request extends ExpressRequest {
  user: {
    email?: string;
    iss?: string;
    sub?: string;
    aud?: string[];
    iat?: number;
    exp?: number;
    azp?: string;
  };
}
