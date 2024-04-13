import * as React from "react"
import { Box, Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react"

function CompanyTable({ company }) {
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
          {company.map((company, index) => (
            <Tr key={index}>
              <Td>{company.name}</Td>
              <Td>
                {company.percentage
                  ? Math.round(
                      parseFloat(company.percentage.replace("%", "")),
                    ) + "%"
                  : "N/A"}
              </Td>
              <Td>{company.freq ? company.freq : "N/A"}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  )
}

export default CompanyTable
