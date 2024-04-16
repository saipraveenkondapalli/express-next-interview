//@ts-nocheck
import { Router } from "express";
import {
  addProblem,
  checkBulkAreProblemsSolved,
  isProblemSolved,
} from "../controllers/leetcodeProgress.controller";
import { checkJwt } from "../middleware/authMiddleware";

const leetcodeProgressRouter = Router();

leetcodeProgressRouter.get("/is-solved/:slug", checkJwt, isProblemSolved);
leetcodeProgressRouter.put("/add-problem/:slug", checkJwt, addProblem);
leetcodeProgressRouter.get(
  "/bulk-are-solved",
  checkJwt,
  checkBulkAreProblemsSolved,
);

export default leetcodeProgressRouter;
