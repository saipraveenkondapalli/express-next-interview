import * as React from "react";
import { Box, Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";

interface CompanyTableProps {
  companies: ICompany[];
}

function CompanyTable({ companies }: CompanyTableProps) {
  return (
    <Box mt={5} overflowX={"auto"}>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Company Name</Th>
            <Th>Percentage</Th>
            <Th>Frequency</Th>
          </Tr>
        </Thead>
        <Tbody>
          {companies.map((company, index) => (
            <Tr key={index}>
              <Td>{company.name}</Td>
              <Td>
                {company.percentage
                  ? Math.round(
                      parseFloat(
                        company.percentage?.toString().replace("%", ""),
                      ),
                    ) + "%"
                  : "N/A"}
              </Td>
              <Td>{company.freq ? company.freq : "N/A"}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
}

export default CompanyTable;
