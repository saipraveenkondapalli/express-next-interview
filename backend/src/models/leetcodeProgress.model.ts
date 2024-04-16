import mongoose, { Schema } from "mongoose";

interface ILeetcodeProblemSolved {
  slug: string;
}

interface ILeetcodeProgress {
  leetcodeUsername: string;
  email: string;
  solvedProblems: ILeetcodeProblemSolved[];
}

const LeetcodeProgressSchema = new Schema<ILeetcodeProgress>({
  email: {
    type: String,
    required: true,
    unique: true,
  },

  leetcodeUsername: {
    type: String,
    unique: true,
  },
  solvedProblems: [
    {
      slug: {
        type: String,
        required: true,
      },
    },
  ],
});

const LeetcodeProgress = mongoose.model<ILeetcodeProgress>(
  "LeetcodeProgress",
  LeetcodeProgressSchema,
);

export default LeetcodeProgress;

export { ILeetcodeProblemSolved, ILeetcodeProgress };
