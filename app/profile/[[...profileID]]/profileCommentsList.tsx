import { CommentWithThreadInfo } from "@/app/profile/[[...profileID]]/page";
import { ChatBubbleBottomCenterTextIcon } from "@heroicons/react/24/solid";
import formatDate from "@/app/utils/formatter";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function ProfileCommentsList({
  comments,
}: {
  comments: CommentWithThreadInfo[];
}) {
  return (
    <>
      <div className="mx-auto max-w-7xl px-2 sm:px-4 lg:divide-y lg:divide-gray-200 lg:px-8 py-10 sm:py-8 ">
        <div className="relative flex h-16 justify-center">
          <ul role="list" className="space-y-6">
            {comments.map((comment, commentIdx) => (
              <li key={comment.id} className="relative flex gap-x-4">
                <div
                  className={classNames(
                    commentIdx === comments.length - 1 ? "h-6" : "-bottom-6",
                    "absolute left-0 top-0 flex w-6 justify-center",
                  )}
                ></div>
                <>
                  <div className={"pt-4"}>
                    <ChatBubbleBottomCenterTextIcon
                      className="h-6 w-6 text-indigo-600"
                      aria-hidden="true"
                    />
                  </div>
                  <div className="flex-auto rounded-md p-3 ring-1 ring-inset ring-gray-200">
                    <div className="flex justify-between gap-x-4">
                      <div className="py-0.5 text-xs leading-5 text-gray-500">
                        <span className="font-medium text-gray-900">
                          {`In thread ${comment.thread.title}`}
                        </span>{" "}
                        commented
                      </div>
                      <time
                        dateTime={comment.createdAt.toTimeString()}
                        className="flex-none py-0.5 text-xs leading-5 text-gray-500"
                      >
                        {formatDate(comment.createdAt.toString())}
                      </time>
                    </div>
                    <p className="text-sm leading-6 text-gray-500">
                      {comment.content}
                    </p>
                  </div>
                </>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}
