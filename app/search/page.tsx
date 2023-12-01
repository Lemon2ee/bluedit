'use client'

import {useRouter} from "next/navigation";
import React from "react";
import SearchResultList from '@/app/search/resultList'
import Navbar from "@/app/home/navbar";


export default function SearchResult() {
    const router = useRouter();

    return (
        <div className={"flex justify-center flex-col"}>
            <div className="row"><Navbar/></div>
            <div className="row"><SearchResultList/></div>
        </div>
    )

}

