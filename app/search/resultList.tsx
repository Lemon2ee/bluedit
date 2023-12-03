import { ChevronRightIcon } from "@heroicons/react/20/solid";
import {Thread} from "@/types/thread"

interface SearchResultListProps {
    threads: Thread[];
}

export default function SearchResultList({threads}: SearchResultListProps) {
    console.log("Threads")
    console.log(threads)
    return (
        <ul role="list" className="divide-y divide-gray-100">
            {threads.map((thread) => (
                <li key={thread.content.substring(0, 50)} className="relative flex justify-between gap-x-6 py-5">
                    <div className="flex gap-x-4">
                        {/*<img className="h-12 w-12 flex-none rounded-full bg-gray-50 mx-4" src={post.imageUrl} alt="" />*/}
                        <div className="min-w-0 flex-auto">
                            <p className="text-sm font-semibold leading-6 text-gray-900 dark:text-white">
                                <a href={`/thread/${thread.id}`}>
                                    <span className="absolute inset-x-0 -top-px bottom-0" />
                                    {thread.title}
                                </a>
                            </p>
                                <div
                                    className="mt-1 flex text-xs leading-5 text-gray-500"
                                    dangerouslySetInnerHTML={{ __html: thread.content.substring(0, 50).concat('</p>') }}
                                />
                        </div>
                    </div>
                    <div className="flex items-center gap-x-4">
                        <div className="hidden sm:flex sm:flex-col sm:items-end">
                            <div className="mt-1 flex items-center gap-x-1.5">
                                <div className="flex-none rounded-full bg-emerald-500/20 p-1">
                                    <div className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                                </div>
                            </div>
                        </div>
                        <ChevronRightIcon className="h-5 w-5 flex-none text-gray-400" aria-hidden="true" />
                    </div>
                </li>
            ))}
        </ul>
    )
}
