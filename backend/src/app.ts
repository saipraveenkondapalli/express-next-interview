import express from "express";
import morgan from "morgan";
import cors, { CorsOptionsDelegate } from "cors";
import "dotenv/config";

import problemRouter from "./routes/problem.router";
import { BadCorsError, errorMiddleware } from "../customErrors";
import leetcodeProgressRouter from "./routes/leetcodeProgress.router";
import announcementRouter from "./routes/announcement.routes";

const app = express();

const debug = process.env.DEBUG || false;

const corsWhiteList = (process.env.CORS_WHITE_LIST || "").split(",");

const corsOptions: CorsOptionsDelegate = (req, callback) => {
  // using origin to check if the request is from the white list

  if(debug){
    return callback(null, { origin:true });
  }

  const origin = (
    req.headers.origin ||
    req.headers["x-forwarded-host"]?.toString() ||
    ""
  )
    .replace(/^https?:\/\//, "") // Remove http:// or https:// prefix
    .replace(/\/$/, ""); // Remove trailing /

  if (!origin || !corsWhiteList.includes(origin)) {
    return callback(new BadCorsError("Bad Cors Request"), { origin: false });
  }
  return callback(null, { origin: true });
};

// settings
app.options("*", cors());

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/public/problems", cors(corsOptions), problemRouter);

app.use("/api/private/progress", cors(corsOptions), leetcodeProgressRouter);

app.use("/api/public/announcements", cors(corsOptions), announcementRouter);

app.get("/", (req, res) => {
  res.send("Welcome to the API!");
});

app.use(errorMiddleware);

export default app;
