"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const post_controller_1 = require("../controllers/post.controller");
const authMiddleware_1 = require("../middleware/authMiddleware");
const postsRouter = (0, express_1.Router)();
postsRouter.get("/posts", authMiddleware_1.checkJwt, post_controller_1.samplePosts);
exports.default = postsRouter;
//# sourceMappingURL=posts.router.js.map