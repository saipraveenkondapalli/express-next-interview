import { Router } from "express";
import { samplePosts } from "../controllers/post.controller";
import { checkJwt } from "../middleware/authMiddleware";

const postsRouter = Router();

postsRouter.get("/posts", checkJwt, samplePosts);

export default postsRouter;
