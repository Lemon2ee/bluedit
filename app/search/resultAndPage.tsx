"use client";

import {useRouter} from "next/router";
import React, {useEffect, useState} from "react";
import SearchResultList from "@/app/search/resultList";
import PageSelector from "@/app/search/pageSelector";
import {useSearchParams} from "next/navigation";
import {Thread} from "@/app/search/thread"

const PAGE_SIZE = 8;

export default function SearchAndPagination() {
    const [pageNumber, setPageNumber] = useState(0);
    const [pageContent, setPageContent] = useState<Thread[]>([]);
    const searchParams = useSearchParams();
    const keyword = searchParams.get('keyword') as string;

    useEffect(() => {
        if (keyword) { // Check if keyword is available
            fetch(`/api/search/threads/keyword?keyword=${encodeURIComponent(keyword)}&pageSize=${PAGE_SIZE}&pageRequested=${pageNumber}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response failed');
                    }
                    return response.json();
                })
                .then(data => {
                    setPageContent(data);
                })
                .catch(error => {
                    console.error('Fetch error:', error);
                    // Consider adding more robust error handling here
                });
        }
    }, [keyword, pageNumber]);

    // @ts-ignore
    return (
        <>
            <div className="row"><SearchResultList threads={pageContent}/></div>
            <div className="row">
                <PageSelector pageSize={PAGE_SIZE} pageNumber={pageNumber} setPageNumber={setPageNumber} keyword={keyword}/>
            </div>
        </>
    );
}