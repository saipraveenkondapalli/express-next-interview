import { Router } from "express";
import {
  allCategories,
  allCompanies,
  filterProblems,
  singleProblem,
} from "../controllers/problem.controller";

const problemRouter = Router();

problemRouter.get("/search", filterProblems);
problemRouter.get("/companies", allCompanies);
problemRouter.get("/categories", allCategories);
problemRouter.get("/solutions/:slug", singleProblem);

export default problemRouter;
