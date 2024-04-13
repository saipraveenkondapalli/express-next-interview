import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/tabs";
import CodeBlock from "@/app/components/CodeBlock";
import CompanyTable from "@/app/components/CompanyTable";
import { Box, Container, Heading } from "@chakra-ui/react";
import CustomButton from "@/app/components/CustomButton";
import { notFound } from "next/navigation";

import { api } from "@/app/services/api";

const getProblemData = async (slug: string) => {
  const res = await api.get<ProblemProps>(
    `/api/public/problems/solutions/${slug}`,
  );
  return res.data;
};

interface IProblemParams {
  params: {
    slug: string;
  };
}

const problemPage = async ({ params }: IProblemParams) => {
  const slug = params.slug;
  const data = await getProblemData(slug);
  if (!data) {
    return notFound();
  }

  const { name, code, companies: company, link } = data || {};

  return (
    <>
      {data && (
        <>
          <Container maxW="container.md" mt={["5", "10"]} mb={["5", "10"]}>
            <Heading as="h1" size="xl" mb={5}>
              Leetcode: {name}
            </Heading>
            <Box my={5}>
              <CustomButton
                colorScheme="messenger"
                link={link}
                rel={"noopener noreferrer"}
                target={"_blank"}
              >
                Practice on Leetcode 🚀
              </CustomButton>
            </Box>

            <Tabs colorScheme="messenger">
              <TabList>
                {code &&
                  code.map((item, index) => (
                    <Tab key={`tab-${index}`}>
                      {item.language.toString().toUpperCase()}
                    </Tab>
                  ))}
                <Tab key="company-tab">Company Frequency</Tab>
              </TabList>
              <TabPanels>
                {code &&
                  code.map((item, index) => (
                    <TabPanel key={`panel-${index}`}>
                      <CodeBlock language={item.language}>
                        {item.code}
                      </CodeBlock>
                    </TabPanel>
                  ))}
                <TabPanel key="company-panel">
                  <CompanyTable company={company} />
                </TabPanel>
              </TabPanels>
            </Tabs>
          </Container>
        </>
      )}
    </>
  );
};

export default problemPage;
