import { Request, Response } from "express";
import { Problem } from "../models/problem.model";

interface IFilterProblemQuery {
  page?: number;
  perPage?: number;
  level?: string;
  categories?: string[];
  companies?: string[];
  search?: string;
}

const filterProblems = async (req: Request, res: Response) => {
  const filterParams = req.query as IFilterProblemQuery;
  filterParams.page = Number(filterParams.page || 1);
  filterParams.perPage = Number(filterParams.perPage || 10);

  let query: {
    level?: string;
    categories?: string[];
    name?: { $regex: string; $options: string };
    "companies.alias"?: string[];
  } = {};

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
    const count = await Problem.countDocuments(query);
    const problems = await Problem.find(
      query,
      "name link_name categories companies linkName level",
    )
      .skip((filterParams.page - 1) * filterParams.perPage)
      .limit(filterParams.perPage);

    return res.json({
      problems,
      count,
      page: filterParams.page,
      perPage: filterParams.perPage,
    });
  } catch (err) {
    // @ts-ignore
    return res.status(500).json({ message: err.message });
  }
};

const singleProblem = async (req: Request, res: Response) => {
  const { slug: linkName } = req.params;
  try {
    const problem = await Problem.findOne({ linkName: linkName });
    return res.json(problem);
  } catch (e) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const problemSolutions = async (req: Request, res: Response) => {
  const { slug: linkName } = req.params;

  try {
    const problem = await Problem.findOne({ linkName: linkName }, "code");
    return res.json(problem);
  } catch (e) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const allCompanies = async (req: Request, res: Response) => {
  try {
    const companies = await Problem.aggregate([
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
  } catch (e) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const allCategories = async (req: Request, res: Response) => {
  const getNameAlias = (category: string | undefined) => {
    if (category) {
      return {
        name: category.replace("-", " "),
        alias: category,
      };
    }
  };

  try {
    const categories = await Problem.distinct("categories");
    const categoriesWithNameAlias = categories.map(getNameAlias);

    return res.json({
      count: categoriesWithNameAlias.length,
      data: categoriesWithNameAlias,
    });
  } catch (e) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export {
  filterProblems,
  problemSolutions,
  allCategories,
  allCompanies,
  singleProblem,
};
