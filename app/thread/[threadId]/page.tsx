import {DateTime} from "next-auth/providers/kakao";
import {headers} from "next/headers";
import UpvoteButton from "@/app/thread/[threadId]/upvote";
interface Thread {
    id: string;
    title: string;
    content: string;
    // author: User;
    comments: Comment[];
    createdAt: DateTime;
    upvote: number;
}

interface Comment {
    id: string;
    content: string;
    // author: User;
}

async function getThread(threadId: string) {
    const host = headers().get("host");
    const protocol = process?.env.NODE_ENV === "development" ? "http" : "https";
    const res = await fetch(`${protocol}://${host}/api/thread/${threadId}`,{
        cache: "no-store",
    });
    if (!res.ok) {
        // This will activate the closest `error.js` Error Boundary
        throw new Error("Failed to fetch data");
    }
    return res.json();
}

export default async function ThreadPage({params}: {
    params: {
        threadId: string;
    }
}) {
    const thread = await getThread(params.threadId);
    return (
        <div className="bg-white px-6 py-32 lg:px-8">
            <div className="mx-auto max-w-3xl text-base leading-7 text-gray-700">
                <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                    {thread.title}</h1>
                {/*There are dangerous if not sanitized, and that needs DOMPurify*/}
                <div dangerouslySetInnerHTML={{ __html: thread.content }}></div>
            </div>
            <UpvoteButton initialUpvotes={thread.upvote}/>
        </div>
    )
}
