import * as React from "react";
import { Dispatch, SetStateAction } from "react";
import {
  Box,
  Button,
  HStack,
  Input,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Spinner,
  Tag,
  TagCloseButton,
  TagLabel,
} from "@chakra-ui/react";

import { CompanyCategory, useCompaniesCategories } from "../hooks/companies";
import { FaChevronDown } from "react-icons/fa6";
import { FilterProps } from "@/app/page";

interface IFilterProps {
  filter: FilterProps;
  setFilters: Dispatch<SetStateAction<FilterProps>>;
}

function FilterBar({ filter, setFilters }: IFilterProps) {
  const levels = ["Easy", "Medium", "Hard", "Premium"];
  const { data: companies } = useCompaniesCategories(
    "/api/public/problems/companies",
  );

  const { data: categories } = useCompaniesCategories(
    "/api/public/problems/categories",
  );

  const pagesFilter = [10, 20, 30, 40];
  const [perPage, setPerPage] = React.useState(10);
  const [selectedLevel, setSelectedLevel] = React.useState("");
  const [selectedCategory, setSelectedCategory] = React.useState("");
  const [selectedCompany, setSelectedCompany] = React.useState("");
  const [searchCategory, setSearchCategory] = React.useState("");
  const [searchCompany, setSearchCompany] = React.useState("");

  const setPerPageFilter = (perPage: number) => {
    setPerPage(perPage);
    setFilters((prevFilters) => ({ ...prevFilters, perPage: perPage }));
  };

  const setCompanyFilter = (company: string) => {
    if (Array.isArray(filter.companies)) {
      if (filter.companies.includes(company)) {
        setFilters((prevFilters) => ({
          ...prevFilters,
          companies: prevFilters.companies.filter((c) => c !== company),
        }));
      } else {
        setFilters((prevFilters) => ({
          ...prevFilters,
          companies: [...prevFilters.companies, company],
        }));
      }
    }
  };

  const setCategoryFilter = (category: string) => {
    if (Array.isArray(filter.categories)) {
      if (filter.categories.includes(category)) {
        setFilters((prevFilters) => ({
          ...prevFilters,
          categories: prevFilters.categories.filter((c) => c !== category),
          page: 1,
        }));
      } else {
        setFilters((prevFilters) => ({
          ...prevFilters,
          categories: [...prevFilters.categories, category],
          page: 1,
        }));
      }
    }
  };

  const setLevelFilter = (level: string) => {
    if (Array.isArray(filter.level)) {
      // If the level is already in the filter, remove it
      if (filter.level.includes(level)) {
        setFilters((prevFilters) => ({
          ...prevFilters,
          level: prevFilters.level.filter((c) => c !== level),
          page: 1,
        }));
      } else {
        setFilters((prevFilters) => ({
          ...prevFilters,
          level: [...prevFilters.level, level],
          page: 1,
        }));
      }
    }
  };

  return (
    <>
      <HStack spacing={4} mt={5} wrap={"wrap"}>
        <Menu>
          <MenuButton
            as={Button}
            rightIcon={<FaChevronDown />}
            borderRadius={10}
          >
            {selectedLevel || "Select level"}
          </MenuButton>
          <MenuList>
            {levels.map((level, index) => (
              <MenuItem key={index} onClick={() => setLevelFilter(level)}>
                {level}
              </MenuItem>
            ))}
          </MenuList>
        </Menu>
        <FilterMenu
          filter={filter}
          setFilters={setFilters}
          selectedItem={selectedCategory}
          setSelectedItem={setSelectedCategory}
          searchItem={searchCategory}
          setSearchItem={setSearchCategory}
          items={categories}
          filterKey="categories"
        />
        <FilterMenu
          filter={filter}
          setFilters={setFilters}
          selectedItem={selectedCompany}
          setSelectedItem={setSelectedCompany}
          searchItem={searchCompany}
          setSearchItem={setSearchCompany}
          items={companies}
          filterKey="companies"
        />
        <Menu>
          <MenuButton
            as={Button}
            rightIcon={<FaChevronDown />}
            borderRadius={10}
          >
            Per Page: {perPage}
          </MenuButton>
          <MenuList>
            {pagesFilter.map((page, index) => (
              <MenuItem key={index} onClick={() => setPerPageFilter(page)}>
                {page}
              </MenuItem>
            ))}
          </MenuList>
        </Menu>
      </HStack>
      <HStack spacing={4} mt={4}>
        {filter.level &&
          filter.level.map((level, index) => (
            <Tag size="md" borderRadius="full" key={index}>
              <TagLabel>{level}</TagLabel>
              <TagCloseButton onClick={() => setLevelFilter(level)} />
            </Tag>
          ))}
        {filter.categories &&
          filter.categories.map((category, index) => (
            <Tag size="md" borderRadius="full" key={index}>
              <TagLabel>
                {capitalizeSentence(category.replace("-", " "))}
              </TagLabel>
              <TagCloseButton onClick={() => setCategoryFilter(category)} />
            </Tag>
          ))}
        {filter.companies &&
          filter.companies.map((company, index) => (
            <Tag size="md" borderRadius="full" key={index}>
              <TagLabel>
                {capitalizeSentence(company.replace(/-/g, " "))}
              </TagLabel>
              <TagCloseButton onClick={() => setCompanyFilter(company)} />
            </Tag>
          ))}
      </HStack>
    </>
  );
}

interface FilterMenuProps {
  filter: FilterProps;
  setFilters: Dispatch<SetStateAction<FilterProps>>;
  selectedItem: string;
  setSelectedItem: (item: string) => void;
  searchItem: string;
  setSearchItem: (item: string) => void;
  items: CompanyCategory[];
  filterKey: string;
}

const FilterMenu: React.FC<FilterMenuProps> = ({
  filter,
  setFilters,
  selectedItem,
  setSelectedItem,
  searchItem,
  setSearchItem,
  items,
  filterKey,
}) => {
  const setFilter = (item: string) => {
    if (typeof filter === "object" && Array.isArray(filter[filterKey])) {
      if ((filter[filterKey] as string[]).includes(item)) {
        setFilters((prevFilters) => ({
          ...prevFilters,
          [filterKey]: (prevFilters[filterKey] as string[]).filter(
            (filterItem) => filterItem !== item,
          ),
        }));
      } else {
        setFilters((prevFilters) => ({
          ...prevFilters,
          [filterKey]: [...(prevFilters[filterKey] as string[]), item],
        }));
      }
    }
  };

  // @ts-ignore
  return (
    <Menu>
      <MenuButton as={Button} rightIcon={<FaChevronDown />} borderRadius={10}>
        {selectedItem || `Select ${filterKey}`}
      </MenuButton>
      <MenuList
        width={["sm", "md", "xl"]}
        maxW={"100vw"}
        style={{ maxHeight: "250px", overflowY: "auto" }}
      >
        <Input
          placeholder={`Search ${filterKey}`}
          value={searchItem}
          width={["200", "md"]}
          maxW={"100vw"}
          borderRadius={"xl"}
          onChange={(e) => setSearchItem(e.target.value)}
          display={"block"}
          variant={"filled"}
          margin={"auto"}
          _focusVisible={{
            boxShadow: "none",
          }}
          _placeholder={{
            color: "#abbfd4",
          }}
        />
        <Box p={5} display="flex" flexWrap="wrap" gap={2} maxW={"100%"}>
          {items.length === 0 && (
            <Spinner
              thickness="2px"
              speed="0.65s"
              emptyColor="gray.200"
              color="blue.500"
              size="xl"
            />
          )}

          {items
            .filter((item) =>
              item.name.toLowerCase().includes(searchItem.toLowerCase()),
            )
            .map((item, index) => (
              <Tag
                size="md"
                borderRadius="full"
                width={"fit-content"}
                key={index}
                color={
                  (filter[filterKey] as string[]).includes(item.alias)
                    ? "white"
                    : "grey.500"
                }
                backgroundColor={
                  (filter[filterKey] as string[]).includes(item.alias)
                    ? "#0078ff"
                    : "gray.200"
                }
                onClick={() => setFilter(item.alias)}
                cursor={"pointer"}
              >
                <TagLabel isTruncated>{item.name}</TagLabel>{" "}
                {selectedItem.includes(item.alias) && (
                  <TagCloseButton onClick={() => setFilter(item.alias)} />
                )}
              </Tag>
            ))}
        </Box>
      </MenuList>
    </Menu>
  );
};

function capitalizeSentence(sentence: string) {
  return sentence.replace(/\b\w/g, (l) => l.toUpperCase());
}

export default FilterBar;
