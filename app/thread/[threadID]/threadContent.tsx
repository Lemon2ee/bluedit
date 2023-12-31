"use client";

import {Thread} from "@/types/thread";
import React, {useState} from "react";
import {useRouter} from "next/navigation";
import {Session} from "next-auth";
import formatDate from "@/app/utils/formatter";
import {errorToast} from "@/app/login/components";


export interface Author {
    profilePicture: string,
    displayName: string,
}

export default function ThreadContent({thread, author, session}: {
    thread: Thread;
    author: Author;
    session: Session | null
}) {

    const [showErrorToast, setShowErrorToast] = useState(false);
    const [errorMessages, setErrorMessages] = useState<string>("");
    const router = useRouter();
    const navigateToThread = () => {
        const threadData = {
            title: thread.title,
            content: thread.content,
            isPublic: true,
        };
        sessionStorage.setItem('threadData', JSON.stringify(threadData));
        router.push(`/thread/${thread.id}/editThread`);
    };
    const handleDelete = async (event: {
        preventDefault: () => void
    }) => {
        event.preventDefault();


        try {
            const res = await fetch(`/api/thread/${thread.id}/deleteThread`, {
                method: "Delete",
                headers: {"Content-Type": "application/json"},
            });
            const json = await res.json();
            if (json.message) {
                setErrorMessages(json.message);
                setShowErrorToast(true);
                return;
            }
            router.push(`/home`);
            router.refresh();
        } catch (e) {
            if (e instanceof Error) {
                setErrorMessages("Please log in!");
                setShowErrorToast(true);
            }
        }
    };
    return (
        <div className=" px-6  py-32 lg:px-8">
            <div className="mx-auto max-w-3xl text-base leading-7 text-gray-700">
                <div className="flex-none py-10">
                    <a href={`/profile/${thread.author.id}`}>
                        <div className="justify-items-center">
                            <img
                                src={author.profilePicture}
                                alt=""
                                className="h-10 w-10 rounded-full bg-gray-100 inline-block"
                            />
                            <div className="inline-block ps-4">
                                {author.displayName}
                            </div>
                        </div>
                    </a>
                </div>
                <p className="text-base font-semibold leading-7 text-indigo-600">
                    {formatDate(thread.createdAt)}
                </p>
                <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                    {thread.title}
                </h1>
                {/*There are dangerous if not sanitized, and that needs DOMPurify*/}
                <div
                    className="mt-10 max-w-2xl"
                    dangerouslySetInnerHTML={{__html: thread.content}}
                />
            </div>
            {session && session.user.id === thread.author.id ?
                <div className="flex mx-auto  max-w-3xl  flex-shrink-0 justify-end">
                    <button
                        onClick={navigateToThread}
                        className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >

                        Edit post
                    </button>
                    <button
                        onClick={handleDelete}
                        className="inline-flex items-center rounded-md bg-indigo-600 mx-3 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >

                        Delete post
                    </button>
                    {showErrorToast && errorToast(errorMessages)}
                </div>
                :
                <></>
            }

        </div>
    );
}
