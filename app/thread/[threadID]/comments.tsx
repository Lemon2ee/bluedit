"use client";

import NewComment from "@/app/thread/[threadID]/newComment";
import UpvoteButton from "@/app/thread/[threadID]/upvote";
import { Thread } from "@/types/thread";
import { Profile } from "@prisma/client";
import {Session} from "next-auth";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function Comments({
  thread,
  commentsAuthorInfo, session,
}: {
  thread: Thread;
  commentsAuthorInfo: Profile[];
  session: Session | null;
}) {
  return (
    <div className="px-6 py-32 lg:px-8">
      <div className="mx-auto max-w-3xl text-base leading-7 text-gray-700">
        <UpvoteButton initialUpvotes={thread.upvote} threadId={thread.id} />

        <NewComment thread={thread} session={session} />

        <div className={"py-10"}>
          <h2 className="sr-only">Customer Reviews</h2>

          <div className="-my-10">
            {thread.comments.map((comment, commentIdx) => (
              <div
                key={comment.id}
                className="flex space-x-4 text-sm text-gray-500"
              >
                <div className="flex-none py-10">
                  <img
                    src={
                      commentsAuthorInfo.find(
                        (authorProfile) =>
                          authorProfile.userId == comment.authorId,
                      )?.profilePicture || ""
                    }
                    alt=""
                    className="h-10 w-10 rounded-full bg-gray-100"
                  />
                </div>
                <div
                  className={classNames(
                    commentIdx === 0 ? "" : "border-t border-gray-200",
                    "flex-1 py-10",
                  )}
                >
                  <h3 className="font-medium text-gray-900">
                    {commentsAuthorInfo.find(
                      (authorProfile) =>
                        authorProfile.userId == comment.authorId,
                    )?.displayName || ""}
                  </h3>

                  <div
                    className="prose prose-sm mt-4 max-w-none text-gray-500"
                    dangerouslySetInnerHTML={{
                      __html: comment.content,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
