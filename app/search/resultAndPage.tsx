"use client";

import React, {useEffect, useState} from "react";
import PageSelector from "@/app/search/pageSelector";
import {useSearchParams} from "next/navigation";
import {ThreadWithProfile} from "@/types/thread"
import ThreadList from "@/app/common/threadList";

const PAGE_SIZE = 8;

export default function SearchAndPagination() {
    const [pageNumber, setPageNumber] = useState(0);
    const [pageContent, setPageContent] = useState<ThreadWithProfile[]>([]);
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
                .then((data: ThreadWithProfile[]) => {
                    console.log(typeof data)
                    data = data.map((thread: ThreadWithProfile) => {
                        return {
                            ...thread,
                            createdAt: new Date(thread.createdAt)
                        };
                    });
                    setPageContent(data);
                })
                .catch(error => {
                    console.error('Fetch error:', error);
                    // Consider adding more robust error handling here
                });
        }
    }, [keyword, pageNumber]);

    // console.log(typeof pageContent[0].createdAt)

    return (
        <>
            <div className="row"><ThreadList welcomeMessage={"Search Result"} threads={pageContent} subWelcomeMessage={""}/></div>
            <div className="row">
                <PageSelector pageSize={PAGE_SIZE} pageNumber={pageNumber} setPageNumber={setPageNumber} keyword={keyword}/>
            </div>
        </>
    );
}