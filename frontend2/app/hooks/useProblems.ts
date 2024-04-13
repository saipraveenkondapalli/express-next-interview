import { useEffect, useState } from "react";
import axios from "axios";

import { FilterProps } from "@/app/page";

export type company = {
  name: string;
  alias: string;
  freq?: number;
  percentage?: string | number;
};

export type problem = {
  companies: company[];
  name: string;
  linkName: string;
  level: string;
  categories: string[];
};

export interface ProblemResponseProps {
  count: number;
  page: number;
  perPage: number;
  problems: problem[];
}

export default function useProblems(problemQuery: FilterProps) {
  const [data, setData] = useState<ProblemResponseProps | null>(null);
  const [count, setCount] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    setLoading(true);
    const controller = new AbortController();

    const fetchData = async () => {
      try {
        const res = await axios.get<ProblemResponseProps>(
          `/api/public/problems/search`,
          {
            params: problemQuery,
            signal: controller.signal,
          },
        );
        setData(res.data);
        setCount(res.data.count);
        setLoading(false);
      } catch (err) {
        setLoading(false);
        setError("Error encountered while fetching data from the server");
      }
    };

    fetchData();

    return () => controller.abort();
  }, [problemQuery]);

  return { loading, count, error, data };
}
