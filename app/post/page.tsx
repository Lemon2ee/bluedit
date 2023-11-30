'use client'

import Navbar from "@/app/home/navbar";
import CreatePost from "@/app/post/[username]/creatPost/page";

export default function Home() {
    return (
        <>
            <Navbar/>
            <CreatePost/>
        </>
    )
}