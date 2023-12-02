'use client'

import {useRouter} from "next/navigation";
import React, {useState} from "react";
import SearchResultList from '@/app/search/resultList'
import Navbar from "@/app/home/navbar";
import PageSelector from "@/app/search/pageSelector";


const SearchResult = (keyword: string) => {
    const [pageNumber, setPageNumber] = useState(0)
    const [pageSize, setPageSize] = useState(10)

    return (
        <div className={"flex justify-center flex-col"}>
            <div className="row"><Navbar/></div>
            <div className="row"><SearchResultList/></div>
            <div className="row">
                <PageSelector
                    pageSize={pageSize}
                    setPageSize={setPageSize}
                    pageNumber={pageNumber}
                    setPageNumber={setPageNumber}
                    keyword={keyword}
                /></div>
        </div>
    )

}

export default SearchResult;
