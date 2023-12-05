"use client";

import { ThreadWithProfile } from "@/types/thread";
import { defaultAvatar } from "@/types/default";

export default function ThreadList({
  welcomeMessage,
  threads,
  subWelcomeMessage,
}: {
  welcomeMessage: string;
  threads: ThreadWithProfile[];
  subWelcomeMessage: string;
}) {
  return (
    <div className="py-14 sm:py-22">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl">
          {subWelcomeMessage && (
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              {subWelcomeMessage}
            </h2>
          )}
          <p className="mt-2 text-lg leading-8 text-gray-600">
            {welcomeMessage}
          </p>
          <div className="mt-3 space-y-3 border-t border-gray-200 pt-10 sm:mt-3 sm:pt-3">
            {threads.map((thread) => (
              <article
                key={thread.id}
                className="flex  flex-col items-start justify-between"
              >
                <div className="flex items-center gap-x-4 text-xs">
                  <time
                    dateTime={thread.createdAt.toTimeString()}
                    className="text-gray-500"
                  >
                    {thread.createdAt.toDateString()}
                  </time>
                </div>
                <div className="group relative">
                  <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
                    <a href={`/thread/${thread.id}`}>
                      <span className="absolute inset-0" />
                      {thread.title}
                    </a>
                  </h3>
                </div>
                <div className="relative mt-8 flex items-center gap-x-4">
                  <img
                    src={thread.author.profile?.profilePicture || defaultAvatar}
                    alt=""
                    className="h-10 w-10 rounded-full bg-gray-50"
                  />
                  <div className="text-sm leading-6">
                    <p className="font-semibold text-gray-900">
                      <a href={`/profile/${thread.author.id}`}>
                        <span className="absolute inset-0" />
                        {thread.author.profile?.displayName}
                      </a>
                    </p>
                    <p className="text-gray-600">
                      {thread.author.profile?.bio}
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
