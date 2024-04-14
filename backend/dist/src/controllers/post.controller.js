"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.samplePosts = exports.createPost = void 0;
const createPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () { });
exports.createPost = createPost;
const samplePosts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const posts = [
        {
            id: 1,
            title: "Post 1",
            content: "This is the content of post 1",
        },
        {
            id: 2,
            title: "Post 2",
            content: "This is the content of post 2.",
        },
    ];
    return res.json(posts);
});
exports.samplePosts = samplePosts;
//# sourceMappingURL=post.controller.js.map