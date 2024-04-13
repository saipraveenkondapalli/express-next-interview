import mongoose, { Document, Schema } from "mongoose";

interface ICompany {
  name: string;
  alias?: string;
  freq?: number;
  percentage?: string;
}

const CompanySchema = new Schema<ICompany>({
  name: { type: String, required: true },
  alias: String,
  freq: Number,
  percentage: String,
});

interface ICode {
  language: string;
  code: string;
}

const CodeSchema = new Schema<ICode>({
  language: { type: String, required: true },
  code: { type: String, required: true },
});

interface IProblems extends Document {
  name: string;
  linkName?: string;
  link: string;
  level?: string;
  categories?: string[];
  totalCompanies?: number;
  companies: ICompany[];
  code: ICode[];
}

const ProblemSchema = new Schema<IProblems>(
  {
    name: { type: String, required: true },
    linkName: String,
    link: { type: String, required: true },
    level: String,
    categories: [String],
    totalCompanies: { type: Number, default: 0 },
    companies: [CompanySchema],
    code: [CodeSchema],
  },
  { collection: "problems" },
);

const Problem = mongoose.model<IProblems>("Problems", ProblemSchema);

export { ICompany, ICode, IProblems, Problem };
