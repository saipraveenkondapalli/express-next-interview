import Request from "../types/request";
import { Response } from "express";

import LeetcodeProgress from "../models/leetcodeProgress.model";

export const isProblemSolved = async (req: Request, res: Response) => {
  const email = req.user.email;
  const slug = req.params.slug;
  try {
    const isSolved = await LeetcodeProgress.exists({
      email: email,
      "solvedProblems.slug": slug,
    });

    return res.json({ isSolved: isSolved });
  } catch (e) {
    return res.status(500).json({ message: e });
  }
};
export const checkBulkAreProblemsSolved = async (
  req: Request,
  res: Response,
) => {
  const email = req.user.email;
  const slugs = req.query.slugs as string[];
  let checked = {} as Record<string, boolean>;
  try {
    await Promise.all(
      slugs.map(async (slug) => {
        const isSolved = await LeetcodeProgress.exists({
          email: email,
          "solvedProblems.slug": slug,
        }).lean();
        checked[slug] = !!isSolved;
      }),
    );
    return res.json({ ...checked });
  } catch (e) {
    return res.status(500).json({ message: e });
  }
};

export const addProblem = async (req: Request, res: Response) => {
  const email = req.user.email;
  const slug = req.params.slug;
  // add slug to the user's solved problems
  try {
    const leetcodeProgress = await LeetcodeProgress.findOneAndUpdate(
      { email: email },
      { $push: { solvedProblems: { slug: slug } } },
      { new: true, upsert: true, lean: true },
    );

    return res.json({ message: "Problem added" });
  } catch (e) {
    return res.status(500).json({ message: e });
  }
};
