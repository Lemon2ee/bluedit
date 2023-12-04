"use client";

import { Thread } from "@/types/thread";
import React from "react";
import {useRouter} from "next/navigation";
import {Session} from "next-auth";

function formatDateToYYYYMMDD(date: string) {
  const dateTime = new Date(date);
  const year = dateTime.getFullYear();
  const month = (dateTime.getMonth() + 1).toString().padStart(2, "0"); // getMonth() is zero-based
  const day = dateTime.getDate().toString().padStart(2, "0");

  return `${year}-${month}-${day}`;
}

export default function ThreadContent({ thread, session}: { thread: Thread; session: Session | null }) {
    const router = useRouter();
    const navigateToThread = () => {
        router.push(`/thread/${thread.id}/editThread`);
    };
  return (
    <div className="px-6 py-32 lg:px-8">
      <div className="mx-auto max-w-3xl text-base leading-7 text-gray-700">
        <p className="text-base font-semibold leading-7 text-indigo-600">
          {formatDateToYYYYMMDD(thread.createdAt)}
        </p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          {thread.title}
        </h1>
        {/*There are dangerous if not sanitized, and that needs DOMPurify*/}
        <div
          className="mt-10 max-w-2xl"
          dangerouslySetInnerHTML={{ __html: thread.content }}
        />
      </div>
      {session && session.user.id === thread.author.id ?
      <button
          onClick={navigateToThread}
          className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      >
        Edit post
      </button> :
          <></>
      }

    </div>
  );
}
