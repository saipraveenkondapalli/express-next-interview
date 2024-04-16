"use client";

import React from "react";
import { Box } from "@chakra-ui/react";
import "./style.css";

interface ProblemContentProps {
  content: string;
}

function ProblemContent({ content }: ProblemContentProps) {
  return (
    <Box
      className={"problem-description"}
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
}

export default ProblemContent;
