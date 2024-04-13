import dotenv from "dotenv";
import "dotenv/config";
import { expressjwt as jwt, GetVerificationKey } from "express-jwt";
import jwksRsa from "jwks-rsa";

const issuerBaseUrl = process.env.AUTH0_ISSUER_BASE_URL || "";
const audience = process.env.AUTH0_AUDIENCE || "http://localhost:4000/api";

export const checkJwt = jwt({
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `${issuerBaseUrl}/.well-known/jwks.json`,
  }) as GetVerificationKey,
  audience: audience,
  issuer: `${issuerBaseUrl}/`,
  algorithms: ["RS256"],
  requestProperty: "user",
});
