'use client'

import Navbar from "@/app/home/navbar";
import React from "react";
import {useRouter} from "next/navigation";

export default function Home() {
    const router = useRouter();
    return (
        <>
            <Navbar/>
            <button
                onClick={()=>router.push('/thread/creatThread')}
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
                Create post
            </button>

        </>
    )
}