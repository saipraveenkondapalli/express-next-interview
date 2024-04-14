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
exports.singleProblem = exports.allCompanies = exports.allCategories = exports.problemSolutions = exports.filterProblems = void 0;
const problem_model_1 = require("../models/problem.model");
const filterProblems = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const filterParams = req.query;
    filterParams.page = Number(filterParams.page || 1);
    filterParams.perPage = Number(filterParams.perPage || 10);
    let query = {};
    if (filterParams.level) {
        query["level"] = filterParams.level;
    }
    if (filterParams.categories) {
        query["categories"] = filterParams.categories;
    }
    if (filterParams.search) {
        query["name"] = { $regex: filterParams.search, $options: "i" };
    }
    if (filterParams.companies) {
        query["companies.alias"] = filterParams.companies;
    }
    try {
        const count = yield problem_model_1.Problem.countDocuments(query);
        const problems = yield problem_model_1.Problem.find(query, "name link_name categories companies linkName level")
            .skip((filterParams.page - 1) * filterParams.perPage)
            .limit(filterParams.perPage);
        return res.json({
            problems,
            count,
            page: filterParams.page,
            perPage: filterParams.perPage,
        });
    }
    catch (err) {
        // @ts-ignore
        return res.status(500).json({ message: err.message });
    }
});
exports.filterProblems = filterProblems;
const singleProblem = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { slug: linkName } = req.params;
    try {
        const problem = yield problem_model_1.Problem.findOne({ linkName: linkName });
        return res.json(problem);
    }
    catch (e) {
        return res.status(500).json({ message: "Internal Server Error" });
    }
});
exports.singleProblem = singleProblem;
const problemSolutions = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { slug: linkName } = req.params;
    try {
        const problem = yield problem_model_1.Problem.findOne({ linkName: linkName }, "code");
        return res.json(problem);
    }
    catch (e) {
        return res.status(500).json({ message: "Internal Server Error" });
    }
});
exports.problemSolutions = problemSolutions;
const allCompanies = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const companies = yield problem_model_1.Problem.aggregate([
            { $unwind: "$companies" },
            {
                $group: {
                    _id: "$companies.name",
                    alias: { $first: "$companies.alias" },
                },
            },
            {
                $project: {
                    _id: 0,
                    name: "$_id",
                    alias: 1,
                },
            },
        ]);
        return res.json({ count: companies.length, data: companies });
    }
    catch (e) {
        return res.status(500).json({ message: "Internal Server Error" });
    }
});
exports.allCompanies = allCompanies;
const allCategories = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const getNameAlias = (category) => {
        if (category) {
            return {
                name: category.replace("-", " "),
                alias: category,
            };
        }
    };
    try {
        const categories = yield problem_model_1.Problem.distinct("categories");
        const categoriesWithNameAlias = categories.map(getNameAlias);
        return res.json({
            count: categoriesWithNameAlias.length,
            data: categoriesWithNameAlias,
        });
    }
    catch (e) {
        return res.status(500).json({ message: "Internal Server Error" });
    }
});
exports.allCategories = allCategories;
//# sourceMappingURL=problem.controller.js.map