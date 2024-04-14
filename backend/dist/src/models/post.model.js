"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const PostSchema = new mongoose_1.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    author: { type: String, required: true },
});
const Post = (0, mongoose_1.model)("Post", PostSchema);
exports.default = Post;
//# sourceMappingURL=post.model.js.map