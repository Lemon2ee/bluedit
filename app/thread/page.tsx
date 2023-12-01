'use client'

import Navbar from "@/app/home/navbar";
import CreateThread from "@/app/thread/[username]/creatThread/page";

export default function Home() {
    return (
        <>
            <Navbar/>
            <CreateThread/>
        </>
    )
}