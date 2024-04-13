import * as React from "react"
import { Code, useColorModeValue } from "@chakra-ui/react"
import Seo from "./Seo"

interface CodeVariableInterface {
  children: React.ReactNode
}

const CodeVariable: React.FC<CodeVariableInterface> = ({ children }) => {
  const colorScheme = useColorModeValue("gray", "orange")

  return (
    <Code colorScheme={colorScheme} rounded={5}>
      {children}
    </Code>
  )
}

export default CodeVariable
