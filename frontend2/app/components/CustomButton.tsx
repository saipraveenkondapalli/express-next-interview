import * as React from "react";

import {
  Button as ChakraButton,
  ButtonProps as ChakraButtonProps,
  Link,
} from "@chakra-ui/react";

interface ButtonProps extends ChakraButtonProps {
  link: string;
  target: string;
}

function CustomButton({ link, children, ...props }: ButtonProps) {
  return (
    <ChakraButton
      style={{ textDecoration: "none" }}
      as={Link}
      p={5}
      borderRadius={10}
      href={link}
      {...props}
    >
      {children}
    </ChakraButton>
  );
}

export default CustomButton;
