import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/tabs";
import CodeBlock from "@/app/components/CodeBlock";
import CompanyTable from "@/app/components/CompanyTable";
import { Container, Heading, HStack } from "@chakra-ui/react";
import CustomButton from "@/app/components/CustomButton";
import { notFound } from "next/navigation";

import { api } from "@/app/services/api";
import { LeetCode } from "leetcode-query";
import ProblemContent from "@/app/problem/[slug]/problemContent";
import IsSolved from "@/app/problem/[slug]/isSolved";
import youtubeService from "@/app/services/youtube";
import YtVideos from "@/app/problem/[slug]/YtVideos";

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

export const generateMetadata = ({ params }: IProblemParams) => {
  const slug = params.slug;
  const problemName = slug.replace(/-/g, " ");
  return {
    title: `${problemName} - Interview Prep Pro`,
    description: `Solutions, company frequency and more for the problem ${problemName} .`,
  };
};

const problemPage = async ({ params }: IProblemParams) => {
  const slug = params.slug;
  const data = await getProblemData(slug);
  if (!data) {
    return notFound();
  }

  const problem = await new LeetCode().problem(slug);

  const { name, code, companies: company, link, level } = data || {};

  return (
    <>
      {data && (
        <>
          <Container maxW="container.lg" mt={["5", "10"]} mb={["5", "10"]}>
            <HStack>
              <Heading as="h1" size="xl" mb={5} display="inline">
                Leetcode: {name}
              </Heading>
            </HStack>

            <HStack my={5}>
              <CustomButton
                mr={2}
                colorScheme="messenger"
                link={link}
                rel={"noopener noreferrer"}
                target={"_blank"}
              >
                Practice on Leetcode 🚀
              </CustomButton>
              <IsSolved slug={slug} />
            </HStack>

            <Tabs colorScheme="messenger">
              <TabList
                display={"flex"}
                justifyContent={"space-between"}
                flexWrap={["wrap", "nowrap"]}
              >
                {level != "Premium" && (
                  <Tab key={"problem-tab"}> Problem Description </Tab>
                )}
                <Tab key={"yt-solutions"}> Youtube Solutions </Tab>
                {code &&
                  code.map((item, index) => (
                    <Tab key={`tab-${index}`}>
                      {item.language.toString().toUpperCase()}
                    </Tab>
                  ))}
                <Tab key="company-tab">Company Frequency</Tab>
              </TabList>
              <TabPanels>
                {level != "Premium" && (
                  <TabPanel key="problem-panel">
                    <ProblemContent content={problem.content} />
                  </TabPanel>
                )}

                <TabPanel key="yt-panel">
                  <YtVideos name={name} />
                </TabPanel>
                {code &&
                  code.map((item, index) => (
                    <TabPanel key={`panel-${index}`}>
                      <CodeBlock language={item.language}>
                        {item.code}
                      </CodeBlock>
                    </TabPanel>
                  ))}
                <TabPanel key="company-panel">
                  <CompanyTable companies={company} />
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
