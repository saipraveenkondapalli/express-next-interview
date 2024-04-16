import {
  Box,
  Heading,
  Link as ChakraLink,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Table,
  TableContainer,
  Tag,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useDisclosure,
} from "@chakra-ui/react";
import { company, ProblemResponseProps } from "@/app/hooks/useProblems";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "@/app/UserContext";
import axios from "axios";
import { IoCheckmarkCircle } from "react-icons/io5";

interface IProblemCardProps {
  data: ProblemResponseProps;
}

function ProblemCard({ data }: IProblemCardProps) {
  const { isUserLoggedIn } = useContext(UserContext);

  const [problemsSolved, setProblemsSolved] = useState();

  useEffect(() => {
    if (isUserLoggedIn) {
      const checkProblemsSolved = async () => {
        const slugs = data.problems.map((problem) => problem.linkName);
        axios
          .get("/backend/bulk-solved", {
            params: { slugs },
          })
          .then((res) => {
            setProblemsSolved(res.data);
          })
          .catch((e) => {
            console.log(e);
          });
      };
      checkProblemsSolved();
    }
  }, [isUserLoggedIn, data.problems]);

  const offset = (data.page - 1) * data.perPage;
  const problems = data.problems;
  return (
    problems && (
      <TableContainer>
        <Table variant="unstyled">
          <Thead>
            <Tr>
              <Th>S.No</Th>
              <Th>Name</Th>
              <Th>{isUserLoggedIn && problemsSolved && "Solved"}</Th>
              <Th>Level</Th>
            </Tr>
          </Thead>
          <Tbody>
            {problems.map((problem, index) => (
              <>
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
                      {index + 1 + offset}{" "}
                    </Box>
                  </Td>
                  <Td maxW="lg">
                    <Box>
                      <Heading
                        as={ChakraLink}
                        fontSize={["sm", "2xl"]}
                        fontWeight="500"
                        href={`/problem/${problem.linkName}`}
                      >
                        {problem.name}
                      </Heading>
                      <Text color={"#4A709C"} fontSize={["sm", "md"]}>
                        Companies: {problem.companies.length}
                      </Text>
                      <DisplayCompanies companies={problem.companies} />
                    </Box>
                  </Td>
                  <Td>
                    {problemsSolved && problemsSolved[problem.linkName] && (
                      <IoCheckmarkCircle fontSize={25} color={"green"} />
                    )}
                  </Td>
                  <Td>{problem.level}</Td>
                </Tr>
              </>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
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
            <CompanyText key={company.name} company={company} />
          ))}
          <ChakraLink onClick={onOpen} colorScheme={"blue"}>
            ...more
          </ChakraLink>
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
      {companies.map((company, index) => (
        <>
          <CompanyText key={index} company={company} />
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
