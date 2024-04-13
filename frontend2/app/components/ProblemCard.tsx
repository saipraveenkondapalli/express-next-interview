import * as React from "react";
import {
  Box,
  Heading,
  Link,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Table,
  Tag,
  Tbody,
  Td,
  Text,
  Tr,
  useDisclosure,
} from "@chakra-ui/react";
import { company, ProblemResponseProps } from "@/app/hooks/useProblems";

interface IProblemCardProps {
  data: ProblemResponseProps;
}

function ProblemCard({ data }: IProblemCardProps) {
  const offset = (data.page - 1) * data.perPage;
  const problems = data.problems;
  return (
    problems && (
      <Box mt={2}>
        <Table variant="unstyled">
          <Tbody>
            {problems.map((problem, index) => (
              <Tr key={index}>
                <Td>
                  <Box
                    bg="#E8EDF5"
                    p={4}
                    h={"auto%"}
                    width={"50%"}
                    rounded={7}
                    fontSize={["xl", "2xl"]}
                    color="#4A709C"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                  >
                    {index + 1 + offset}
                  </Box>
                </Td>
                <Td maxW="lg">
                  <Box>
                    <Heading
                      as={Link}
                      fontSize={["sm", "2xl"]}
                      fontWeight="500"
                      href={`/problem/${problem.linkName}`}
                      rel={"noopener noreferrer"}
                      target={"_blank"}
                    >
                      {problem.name}
                    </Heading>
                    <Text color={"#4A709C"} fontSize={["sm", "md"]}>
                      Companies: {problem.companies.length}
                    </Text>
                    <DisplayCompanies companies={problem.companies} />
                  </Box>
                </Td>
                <Td>{problem.level}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
    )
  );
}

interface IDisplayCompaniesProps {
  companies: company[];
}

function DisplayCompanies({ companies }: IDisplayCompaniesProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  if (companies.length > 5) {
    return (
      <>
        <Text color={"#4A709C"} fontSize={["sm", "md"]}>
          {companies.slice(0, 5).map((company) => (
            <>
              <CompanyText company={company} />
            </>
          ))}
          <Link onClick={onOpen} colorScheme={"blue"}>
            ...more
          </Link>
        </Text>
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Companies</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <CompanyModal companies={companies} />
            </ModalBody>
          </ModalContent>
        </Modal>
      </>
    );
  }
  return (
    <Text color={"#4A709C"} fontSize={["sm", "md"]}>
      {companies.map((company) => (
        <>
          <CompanyText company={company} />
        </>
      ))}
    </Text>
  );
}

function CompanyModal({ companies }: IDisplayCompaniesProps) {
  return (
    <Box>
      {companies.map((company, index) => (
        <Tag key={index} size="md" m={1} borderRadius="full">
          <CompanyText company={company} />
        </Tag>
      ))}
    </Box>
  );
}

interface ICompanyTextProps {
  company: company;
}

function CompanyText({ company }: ICompanyTextProps) {
  return (
    <>
      {company.name}
      {company?.freq && `: ${company.freq} `}
      {company?.percentage &&
        ` (${String(company.percentage).substring(0, 3)}%) `}
    </>
  );
}

export default ProblemCard;
