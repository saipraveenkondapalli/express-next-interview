"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const problem_controller_1 = require("../controllers/problem.controller");
const problemRouter = (0, express_1.Router)();
problemRouter.get("/search", problem_controller_1.filterProblems);
problemRouter.get("/companies", problem_controller_1.allCompanies);
problemRouter.get("/categories", problem_controller_1.allCategories);
problemRouter.get("/solutions/:slug", problem_controller_1.singleProblem);
exports.default = problemRouter;
//# sourceMappingURL=problem.router.js.map