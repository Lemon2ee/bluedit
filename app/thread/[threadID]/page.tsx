import {headers} from "next/headers";
import Navbar from "@/app/home/NavBar/navbar";
import ThreadContent, {Author} from "@/app/thread/[threadID]/threadContent";
import {Thread} from "@/types/thread";
import Comments from "@/app/thread/[threadID]/comments";
import prisma from "@/lib/prisma";
import {Profile} from "@prisma/client";
import {getServerSession} from "next-auth";
import authOptions from "@/app/api/auth/[...nextauth]/nextAuthOptions";

async function getThread(threadID: string): Promise<Thread> {
    const host = headers().get("host");
    const protocol = process?.env.NODE_ENV === "development" ? "http" : "https";
    const res = await fetch(`${protocol}://${host}/api/thread/${threadID}`, {
        cache: "no-store",
    });
    if (!res.ok) {
        // This will activate the closest `error.js` Error Boundary
        throw new Error("Failed to fetch data");
    }
    return res.json();
}

async function constructComments(thread: Thread): Promise<Profile[]> {
    const commentAuthors: string[] = [];

    for (const comment of thread.comments) {
        commentAuthors.push(comment.authorId);
    }

    return prisma.profile.findMany({
        where: {
            userId: {
                in: commentAuthors,
            },
        },
    });
}

async function getAuthorProfile(userID: string): Promise<Author> {
    const res = await prisma.profile.findUnique({
        where: {
            userId: userID,
        },
        select: {
            profilePicture: true,
            displayName: true,
        },
    });
    if (res === null) {
        throw new Error("This should never happen, unable to get author")
    }
    return res;
}

export default async function ThreadPage({
                                             params,
                                         }: {
    params: {
        threadID: string;
    };
}) {
    const thread = await getThread(params.threadID);
    const comments = await constructComments(thread);
    const session = await getServerSession(authOptions);
    const author: Author = await getAuthorProfile(thread.author.id);
    return (
        <>
            <Navbar/>
            <ThreadContent thread={thread} author={author} session={session}/>
            <Comments thread={thread} commentsAuthorInfo={comments} session={session}/>
        </>
    );
}
