interface ICompany {
  name: string;
  alias?: string;
  freq?: number;
  percentage?: string;
}

interface ICode {
  language: string;
  code: string;
}

interface ProblemProps {
  name: string;
  linkName?: string;
  link: string;
  level?: string;
  categories?: string[];
  totalCompanies?: number;
  companies: ICompany[];
  code: ICode[];
}
