import { ChatBubbleBottomCenterTextIcon } from "@heroicons/react/24/solid";
import formatDate from "@/app/utils/formatter";
import prisma from "@/lib/prisma";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

async function getThreadsByAuthor(authorId: string) {
  const threads = await prisma.thread.findMany({
    where: {
      authorId: authorId,
    },
    select: {
      id: true,
      title: true,
      createdAt: true,
    },
  });

  return threads.map((thread) => ({
    id: thread.id,
    title: thread.title,
    publishedAt: thread.createdAt,
  }));
}

export default async function ProfilePostList({
  profileUserID,
}: {
  profileUserID: string;
}) {
  const threads = await getThreadsByAuthor(profileUserID);
  return (
    <>
      <div className="mx-auto max-w-7xl min-w-2xl px-2 sm:px-4 lg:divide-y lg:divide-gray-200 lg:px-8 py-10 sm:py-8 ">
        <div className="relative flex h-16 justify-center">
          <ul role="list" className="space-y-6">
            {threads.map((thread, threadIdx) => (
              <li key={thread.id}>
                <a
                  href={`/thread/${thread.id}`}
                  className="relative flex gap-x-4"
                >
                  <div
                    className={classNames(
                      threadIdx === threads.length - 1 ? "h-6" : "-bottom-6",
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
                            {`Created Thread \n ${thread.title}`}
                          </span>{" "}
                        </div>
                        <time
                          dateTime={thread.publishedAt.toTimeString()}
                          className="flex-none py-0.5 text-xs leading-5 text-gray-500"
                        >
                          {formatDate(thread.publishedAt.toString())}
                        </time>
                      </div>
                      <p className="text-sm leading-6 text-gray-500"></p>
                    </div>
                  </>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}
