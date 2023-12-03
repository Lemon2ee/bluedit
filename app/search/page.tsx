"use client";

import React, {useState} from "react";
import SearchResultList from '@/app/search/resultList'
import Navbar from "@/app/home/NavBar/navbar";
import PageSelector from "@/app/search/pageSelector";

const PAGE_SIZE = 8

// const SearchResult = (keyword: string) => {
const SearchResult = () => {
    const [pageNumber, setPageNumber] = useState(0)

    return (
        <div className={"flex justify-center flex-col"}>
            <div className="row"><Navbar/></div>
            <div className="row"><SearchResultList/></div>
            <div className="row">
                <PageSelector
                    pageSize={PAGE_SIZE}
                    pageNumber={pageNumber}
                    setPageNumber={setPageNumber}
                    keyword={"test content"}
                    // keyword={keyword}
                /></div>
        </div>
    )

}

export default SearchResult;
