"use client";
import {ChangeEvent, useState} from "react";
import {Container, Spacer} from "@chakra-ui/react";
import SearchBox from "@/app/components/SearchBox";
import FilterBar from "@/app/components/FilterBar";
import Problems from "@/app/components/Problems";
import Announcements from "@/app/components/Announcements";

export interface FilterProps {
    [key: string]: string[] | number | string;

    page: number;
    perPage: number;
    search: string;
    level: string[];
    categories: string[];
    companies: string[];
}

export default function Home() {
    const [search, setSearch] = useState<string>("");
    const [filter, setFilter] = useState<FilterProps>({
        page: 1,
        perPage: 10,
        search: "",
        level: [],
        categories: [],
        companies: [],
    });

    const updateSearch = (e: ChangeEvent<HTMLInputElement>) => {
        console.log(e.target.value);
        setSearch(e.target.value);
        setFilter((prev) => ({...prev, search: e.target.value}));
    };

    return (
        <>
            <Container maxW="container.lg" mt={5}>
                <Announcements/>
                <SearchBox value={search} onChange={updateSearch}/>
                <Spacer/>
                <FilterBar filter={filter} setFilters={setFilter}/>
                <Problems setFilters={setFilter} filters={filter}/>
            </Container>
        </>
    );
}
