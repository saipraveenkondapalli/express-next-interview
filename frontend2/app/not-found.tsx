import { Box, Heading, Text } from "@chakra-ui/react";
import CustomButton from "@/app/components/CustomButton";

function NotFoundPage() {
  return (
    <Box textAlign="center" my="6">
      <Heading as="h1" size="2xl" mb="2">
        404
      </Heading>
      <Text fontSize="xl" mb="6">
        Page not found
      </Text>
      <CustomButton
        link={"/"}
        colorScheme={"blue"}
        target={"_self"}
        style={{ textDecoration: "none" }}
      >
        Go back to home
      </CustomButton>
    </Box>
  );
}

export default NotFoundPage;
