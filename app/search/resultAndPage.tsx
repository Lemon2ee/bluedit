"use client";

import {useRouter} from "next/router";
import React, {useState} from "react";
import SearchResultList from "@/app/search/resultList";
import PageSelector from "@/app/search/pageSelector";
import {useSearchParams} from "next/navigation";

const PAGE_SIZE = 8;

export default function SearchAndPagination() {
    const [pageNumber, setPageNumber] = useState(0);
    const searchParams = useSearchParams();
    const keyword = searchParams.get('keyword') as string;

    return (
        <>
            <div className="row"><SearchResultList/></div>
            <div className="row">
                <PageSelector pageSize={PAGE_SIZE} pageNumber={pageNumber} setPageNumber={setPageNumber}
                              keyword={keyword as string}/>
            </div>
        </>
    );
}
