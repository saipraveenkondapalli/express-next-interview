import { useEffect, useState } from "react";
import axios from "axios";

export interface CompanyCategory {
  name: string;
  alias: string;
}

interface CompanyCategoryHook {
  count: number;
  data: CompanyCategory[];
}

// create a hook to fetch companies use axios api from src/utils/api.ts
export function useCompaniesCategories(url: string): CompanyCategoryHook {
  const [data, setData] = useState<CompanyCategory[]>([]);
  const [count, setCount] = useState<number>(0);

  useEffect(() => {
    // fetch companies from api
    // set companies and count
    axios
      .get<CompanyCategoryHook>(url)
      .then((res) => {
        setData(res.data.data);
        setCount(res.data.count);
      })
      .catch((err) => {

      });
  }, [url]);

  return { count, data: data };
}
