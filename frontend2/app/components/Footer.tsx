import * as React from "react";
import { Box, Flex, Link, Text } from "@chakra-ui/react";

function Footer() {
  return (
    <Box
      mt={10}
      borderTop="1px solid"
      borderColor="gray.200"
      width="100%"
      bottom="0"
    >
      <Flex
        as="footer"
        justifyContent="center"
        alignItems="center"
        flexDirection="column"
        padding="1rem"
      >
        <Flex marginBottom="1rem">
          <Link href="/privacy" marginRight="1rem">
            Privacy Policy
          </Link>
          {/*<Link href="/terms" marginRight="1rem">*/}
          {/*  Terms*/}
          {/*</Link>*/}
          {/*<Link href="/sitemap">Sitemap</Link>*/}
        </Flex>
        <Text>&copy; {new Date().getFullYear()} Interview Prep Pro</Text>
      </Flex>
    </Box>
  );
}

export default Footer;
