"use client";

import React, {useEffect, useState} from "react";
import PageSelector from "@/app/search/pageSelector";
import {useSearchParams} from "next/navigation";
import {ThreadWithProfile} from "@/types/thread"
import ThreadList from "@/app/common/threadList";
import ExternalThreads from "@/app/search/ExternalThreads";
import {GoogleSearchItem, GoogleSearchResponse} from "@/types/external";

const PAGE_SIZE = 8;

export default function SearchAndPagination() {
    const [pageNumber, setPageNumber] = useState(0);
    const [pageContent, setPageContent] = useState<ThreadWithProfile[]>([]);
    const searchParams = useSearchParams();
    const [externalContent, setExternalContent] = useState<GoogleSearchItem[]>([]);
    const keyword = searchParams.get('keyword') as string;

    useEffect(() => {
        if (keyword) {
            // Internal Search
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
                    data = data.map((thread: ThreadWithProfile) => {
                        return {
                            ...thread,
                            createdAt: new Date(thread.createdAt)
                        };
                    });
                    setPageContent(data);
                })
                .catch(error => {
                    console.error('Search internal error:', error);
                    // Consider adding more robust error handling here
                });

            fetch(`/api/search/threads/external?keyword=${encodeURIComponent(keyword)}`, {
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
                .then((data: GoogleSearchResponse) => setExternalContent(data.items.slice(0, 3)))
                .catch(error => {
                    console.error('Search external error:', error);
                    // Consider adding more robust error handling here
                });
        }
    }, [keyword, pageNumber]);

    return (
        <>
            <div className="row"><ExternalThreads searchResults={externalContent}/></div>
            <div className="row"><ThreadList welcomeMessage={"Search Result"} threads={pageContent} subWelcomeMessage={""}/></div>
            <div className="row">
                <PageSelector pageSize={PAGE_SIZE} pageNumber={pageNumber} setPageNumber={setPageNumber} keyword={keyword}/>
            </div>
        </>
    );
}