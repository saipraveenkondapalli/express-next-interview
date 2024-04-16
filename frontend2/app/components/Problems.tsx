"use client";

import { Dispatch, SetStateAction, useEffect, useState } from "react";
import useProblems from "../hooks/useProblems";
import ProblemCard from "./ProblemCard";
import ProblemSkeleton from "./ProblemSkeleton";
import { Box, Button } from "@chakra-ui/react";
import { FilterProps } from "@/app/page";

interface problemProps {
  filters: FilterProps;
  setFilters: Dispatch<SetStateAction<FilterProps>>;
}

function Problems({ filters, setFilters }: problemProps) {
  const { data, loading, count } = useProblems(filters);
  const [totalPages, setTotalPages] = useState<number>(0);

  useEffect(() => {
    setTotalPages(Math.ceil(count / filters.perPage));
  }, [count, filters.perPage]);

  const setPageFunction = (page: number) => {
    setFilters({ ...filters, page });
  };

  return (
    <>
      {loading && <ProblemSkeleton />}
      {data && <ProblemCard data={data} />}
      <Paginate
        count={count}
        page={filters.page}
        setPage={setPageFunction}
        perPage={filters.perPage}
      />
    </>
  );
}

interface IPaginateProps {
  count: number;
  page: number;
  setPage: (page: number) => void;
  perPage: number;
}

function Paginate({ count, page, setPage, perPage }: IPaginateProps) {
  return (
    <Box display="flex" justifyContent="space-between" mt={4}>
      <Button onClick={() => setPage(page - 1)} isDisabled={page === 1}>
        Previous
      </Button>
      <Box>
        {page} of {Math.ceil(count / perPage)}
      </Box>
      <Button
        onClick={() => setPage(page + 1)}
        isDisabled={page * perPage >= count}
      >
        Next
      </Button>
    </Box>
  );
}

export default Problems;
