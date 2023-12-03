"use client";

import { Thread } from "@/types/thread";

export default function ThreadContent({ thread }: { thread: Thread }) {
  return (
    <div className="px-6 py-32 lg:px-8">
      <div className="mx-auto max-w-3xl text-base leading-7 text-gray-700">
        <p className="text-base font-semibold leading-7 text-indigo-600">
          Introducing
        </p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          JavaScript for Beginners
        </h1>
        {/*There are dangerous if not sanitized, and that needs DOMPurify*/}
        <div
          className="mt-10 max-w-2xl"
          dangerouslySetInnerHTML={{ __html: thread.content }}
        />
      </div>
    </div>
  );
}
