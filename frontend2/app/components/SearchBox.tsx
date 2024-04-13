import * as React from "react";
import { Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import { CiSearch } from "react-icons/ci";

interface SearchProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

function Search(props: SearchProps) {
  return (
    <InputGroup>
      <InputLeftElement pointerEvents="none">
        <CiSearch color="#abbfd4" fontSize={20} style={{ marginTop: 10 }} />
      </InputLeftElement>
      <Input
        borderRadius={"xl"}
        type="text"
        placeholder="Search 1,700+ questions..."
        size="lg"
        onChange={props.onChange}
        variant={"filled"}
        _focusVisible={{
          boxShadow: "none",
        }}
        _placeholder={{
          color: "#abbfd4",
        }}
      />
    </InputGroup>
  );
}

export default Search;
