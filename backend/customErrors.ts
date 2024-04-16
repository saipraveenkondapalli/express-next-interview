import { NextFunction, Request, Response } from "express";
import { UnauthorizedError } from "express-jwt";

class BadCorsError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "BadCorsError";
  }
}

const errorMiddleware = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (err instanceof BadCorsError) {
    return res.status(403).json({ message: err.message });
  } else if (err instanceof UnauthorizedError) {
    console.log(err);
    return res.status(401).json({ message: err });
  }

  return res.status(500).json({ message: "Internal Server Error" });
};

export { BadCorsError, errorMiddleware };
