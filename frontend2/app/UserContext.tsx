"use client";
import { createContext, ReactNode } from "react";
import { UserProfile, useUser } from "@auth0/nextjs-auth0/client";

interface UserContextProps {
  user: UserProfile | undefined;
  isUserLoggedIn: boolean;
}

export const UserContext = createContext<UserContextProps>({
  user: undefined,
  isUserLoggedIn: false,
});

const UserContextProvider = ({ children }: { children: ReactNode }) => {
  const { user } = useUser();
  const isUserLoggedIn = !!user;

  return (
    <UserContext.Provider value={{ user, isUserLoggedIn }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
