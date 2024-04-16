"use client";

import { Box, Flex, IconButton, Text, useDisclosure } from "@chakra-ui/react";
import { Link } from "@chakra-ui/next-js";
import CustomButton from "./CustomButton";

import { BiSolidCircleThreeQuarter } from "react-icons/bi";
import { FiMenu } from "react-icons/fi";
import { useContext } from "react";
import { UserContext } from "@/app/UserContext";

function Navbar() {
  const { isOpen, onToggle } = useDisclosure(); // Using useDisclosure for managing mobile menu state

  const { isUserLoggedIn: isLoggedIn } = useContext(UserContext);

  return (
    <>
      <Flex
        justifyContent="space-between"
        alignItems="center"
        p={2}
        borderBottom="1px solid #E2E8F0"
      >
        <Text
          as={Link}
          href={"/"}
          _hover={{
            textDecoration: "none",
          }}
          fontSize="xl"
          fontWeight="bold"
        >
          <Flex alignItems="center">
            <Box as={BiSolidCircleThreeQuarter} transform="rotate(180deg)" />
            <Text ml={2}>Interview Prep Pro</Text>
          </Flex>
        </Text>
        <Flex alignItems="center">
          {/* Hamburger icon */}
          <IconButton
            aria-label="Toggle mobile menu"
            icon={<FiMenu />}
            display={{ base: "inherit", md: "none" }} // Display icon only on small screens
            onClick={onToggle} // Toggle the mobile menu on click
          />
          {/* Navigation links and buttons */}
          <Flex display={{ base: "none", md: "flex" }} alignItems="center">
            {/*<NavLink href={"/problems"}>Problems</NavLink>*/}
            {/*<NavLink href={"/topics"}>Topics</NavLink>*/}
            {isLoggedIn && (
              <CustomButton
                ml={3}
                colorScheme={"red"}
                link={"/api/auth/logout"}
                target={"_self"}
              >
                Logout
              </CustomButton>
            )}

            {!isLoggedIn && (
              <>
                <CustomButton target={"_self"} mx={2} link={"/api/auth/login"}>
                  Login
                </CustomButton>
                <CustomButton
                  target={"_self"}
                  colorScheme={"messenger"}
                  link={"/api/auth/signup"}
                >
                  Sign up
                </CustomButton>
              </>
            )}
          </Flex>
        </Flex>
      </Flex>

      {/* Mobile menu */}
      {isOpen && (
        <Flex
          flexDirection="column"
          alignItems="flex-start"
          mt={2}
          display={{ base: "flex", md: "none" }}
        >
          {/*<NavLink href={"/problems"}>Problems</NavLink>*/}
          {/*<NavLink href={"/topics"}>Topics</NavLink>*/}
          <Flex flexDirection="row" alignItems="flex-start" mt={2}>
            {isLoggedIn && (
              <CustomButton
                colorScheme={"red"}
                ml={2}
                link={"/api/auth/logout"}
                target={"_self"}
              >
                Logout
              </CustomButton>
            )}
            {!isLoggedIn && (
              <>
                <CustomButton target={"_self"} mx={2} link={"/api/auth/login"}>
                  Login
                </CustomButton>
                <CustomButton
                  target={"_self"}
                  colorScheme={"messenger"}
                  link={"/api/auth/signup"}
                >
                  Sign up
                </CustomButton>
              </>
            )}
          </Flex>
        </Flex>
      )}
    </>
  );
}

// NavLink component remains the same

interface Props {
  children: React.ReactNode;
  href: string;
}

const NavLink = (props: Props) => {
  const { children } = props;
  return (
    <Box
      as="a"
      px={2}
      py={1}
      rounded={"md"}
      _hover={{
        textDecoration: "none",
      }}
      href={props.href}
    >
      {children}
    </Box>
  );
};

export default Navbar;
