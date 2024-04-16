"use client";

import { ChakraProvider } from "@chakra-ui/react";
import React from "react";
import UserContextProvider from "@/app/UserContext";
import { ReactQueryClientProvider } from "@/app/ReactQueryProvider";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ChakraProvider>
      <ReactQueryClientProvider>
        <UserContextProvider>{children}</UserContextProvider>
      </ReactQueryClientProvider>
    </ChakraProvider>
  );
}
