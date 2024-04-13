"use client";

import * as React from "react";
import { useEffect, useRef, useState } from "react";
import { Box, Button, Code } from "@chakra-ui/react";
import hljs from "highlight.js";
import "highlight.js/styles/a11y-light.css";

import { FaCopy } from "react-icons/fa6";
import { IoCheckmarkDone } from "react-icons/io5";

interface CodeBlockProps {
  language: string;
  children: React.ReactNode;
}

const CodeBlock: React.FC<CodeBlockProps> = ({ language, children }) => {
  const codeRef = useRef<HTMLPreElement>(null);
  const [copied, setCopied] = useState<boolean>(false);

  useEffect(() => {
    if (codeRef.current) {
      hljs.highlightElement(codeRef.current);
    }
  }, []);

  const handleCopy = () => {
    if (codeRef.current) {
      navigator.clipboard.writeText(codeRef.current.innerText);
      setCopied(true);
      setTimeout(() => {
        setCopied(false);
      }, 2000);
    }
  };

  return (
    <>
      <Button p={5} borderRadius={10} mb={5} onClick={handleCopy}>
        {copied ? (
          <>
            {" "}
            {" Copied!"} <IoCheckmarkDone style={{ marginLeft: "5px" }} />{" "}
          </>
        ) : (
          <>
            {" "}
            {"Copy Code"} <FaCopy style={{ marginLeft: "5px" }} />
          </>
        )}
      </Button>
      <Box className={"code-container"}>
        <pre>
          <Code ref={codeRef} className={`language-${language}`} width={"full"}>
            {children}
          </Code>
        </pre>
      </Box>
    </>
  );
};

export default CodeBlock;
