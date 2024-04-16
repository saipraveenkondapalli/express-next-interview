"use client";

import { useContext, useEffect, useState } from "react";
import { UserContext } from "@/app/UserContext";
import axios from "axios";
import { IoCheckmarkCircle } from "react-icons/io5";
import { Button } from "@chakra-ui/react";

interface IIsSolvedProps {
  slug: string;
}

interface IIsSolvedResponse {
  isSolved: boolean | null;
}

function IsSolved(props: IIsSolvedProps) {
  const { slug } = props;
  const { isUserLoggedIn } = useContext(UserContext);
  const [problemSolved, setProblemSolved] = useState<boolean>(false);

  useEffect(() => {
    const getIsSolved = async () => {
      if (slug) {
        axios
          .get<IIsSolvedResponse>("/backend/isSolved", {
            params: {
              slug,
            },
          })
          .then((res) => {
            setProblemSolved(!!res.data.isSolved);
          })
          .catch((err) => {
            console.error(err);
          });
      }
    };
    getIsSolved();
  }, [slug]);

  if (!isUserLoggedIn) {
    return null;
  }

  const addToSolvedProblems = async () => {
    axios
      .put("/backend/add-problem/?slug=" + slug)
      .then((res) => {
        console.log(res.data);
        setProblemSolved(true);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return isUserLoggedIn && problemSolved ? (
    <IoCheckmarkCircle fontSize={30} color={"green"} />
  ) : (
    <Button onClick={addToSolvedProblems}>Mark as solved</Button>
  );
}

export default IsSolved;
