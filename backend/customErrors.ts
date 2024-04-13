import { NextFunction, Request, Response } from "express";

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
  }
  return res.status(500).json({ message: "Internal Server Error" });
};

export { BadCorsError, errorMiddleware };
