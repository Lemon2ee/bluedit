'use client'

import Image from 'next/image'
import logo from 'app/img/logo.png'
import {useRouter} from "next/navigation";
import React, {useState} from "react";
import { ChevronRightIcon } from '@heroicons/react/20/solid'
import SearchResultList from '@/app/search/resultList'
import SearchHeader from "@/app/search/header";


export default function SearchResult() {
    const router = useRouter();

    return (
        <div className={"flex justify-center flex-col"}>
            <div className="row"><SearchHeader/></div>
            <div className="row"><SearchResultList/></div>
        </div>
    )

}

