"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//@ts-nocheck
const express_1 = require("express");
const leetcodeProgress_controller_1 = require("../controllers/leetcodeProgress.controller");
const authMiddleware_1 = require("../middleware/authMiddleware");
const leetcodeProgressRouter = (0, express_1.Router)();
leetcodeProgressRouter.get("/is-solved/:slug", authMiddleware_1.checkJwt, leetcodeProgress_controller_1.isProblemSolved);
leetcodeProgressRouter.put("/add-problem/:slug", authMiddleware_1.checkJwt, leetcodeProgress_controller_1.addProblem);
leetcodeProgressRouter.get("/bulk-are-solved", authMiddleware_1.checkJwt, leetcodeProgress_controller_1.checkBulkAreProblemsSolved);
exports.default = leetcodeProgressRouter;
//# sourceMappingURL=leetcodeProgress.router.js.map