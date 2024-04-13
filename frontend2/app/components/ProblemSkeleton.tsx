import { Box, Skeleton, Table, Tbody, Td, Tr } from "@chakra-ui/react"
import * as React from "react"

function ProblemCardSkeleton() {
  return (
    <Box>
      <Table variant="unstyled">
        <Tbody>
          {Array(10)
            .fill(0)
            .map((_, index) => (
              <Tr key={index}>
                <Td>
                  <Skeleton height="20px" width="50%" />
                </Td>
                <Td>
                  <Skeleton height="20px" width="100%" />
                </Td>
                <Td>
                  <Skeleton height="20px" width="100%" />
                </Td>
              </Tr>
            ))}
        </Tbody>
      </Table>
    </Box>
  )
}

export default ProblemCardSkeleton
