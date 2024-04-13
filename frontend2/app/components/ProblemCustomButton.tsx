"use client";

import * as React from "react";

import {
  Button as ChakraButton,
  ButtonProps as ChakraButtonProps,
} from "@chakra-ui/react";

interface ButtonProps extends ChakraButtonProps {
  link: string;
}

function CustomButton({ link, children, ...props }: ButtonProps) {
  return (
    <ChakraButton as="a" p={5} borderRadius={10} href={link} {...props}>
      {children}
    </ChakraButton>
  );
}

export default CustomButton;
