"use client";

import { ChakraProvider } from "@chakra-ui/react";
import React from "react";
import UserContextProvider from "@/app/UserContext";
import { ReactQueryClientProvider } from "@/app/ReactQueryProvider";
import theme from "@/app/theme";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ChakraProvider theme={theme}>
      <ReactQueryClientProvider>
        <UserContextProvider>{children}</UserContextProvider>
      </ReactQueryClientProvider>
    </ChakraProvider>
  );
}
