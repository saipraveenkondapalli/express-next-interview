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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addProblem = exports.checkBulkAreProblemsSolved = exports.isProblemSolved = void 0;
const leetcodeProgress_model_1 = __importDefault(require("../models/leetcodeProgress.model"));
const isProblemSolved = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const email = req.user.email;
    const slug = req.params.slug;
    try {
        const isSolved = yield leetcodeProgress_model_1.default.exists({
            email: email,
            "solvedProblems.slug": slug,
        });
        return res.json({ isSolved: isSolved });
    }
    catch (e) {
        return res.status(500).json({ message: e });
    }
});
exports.isProblemSolved = isProblemSolved;
const checkBulkAreProblemsSolved = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const email = req.user.email;
    const slugs = req.query.slugs;
    let checked = {};
    try {
        yield Promise.all(slugs.map((slug) => __awaiter(void 0, void 0, void 0, function* () {
            const isSolved = yield leetcodeProgress_model_1.default.exists({
                email: email,
                "solvedProblems.slug": slug,
            }).lean();
            checked[slug] = !!isSolved;
        })));
        return res.json(Object.assign({}, checked));
    }
    catch (e) {
        return res.status(500).json({ message: e });
    }
});
exports.checkBulkAreProblemsSolved = checkBulkAreProblemsSolved;
const addProblem = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const email = req.user.email;
    const slug = req.params.slug;
    // add slug to the user's solved problems
    try {
        const leetcodeProgress = yield leetcodeProgress_model_1.default.findOneAndUpdate({ email: email }, { $push: { solvedProblems: { slug: slug } } }, { new: true, upsert: true, lean: true });
        return res.json({ message: "Problem added" });
    }
    catch (e) {
        return res.status(500).json({ message: e });
    }
});
exports.addProblem = addProblem;
//# sourceMappingURL=leetcodeProgress.controller.js.map