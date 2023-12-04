import {GoogleSearchItem, GoogleSearchResponse} from "@/types/external";
import {ThreadWithProfile} from "@/types/thread";


export default function ExternalSearch({searchResults}: { searchResults: GoogleSearchItem[]; }) {

    return (
        <div className="bg-white py-10 sm:py-5">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <p className="mt-2 text-lg leading-8 text-gray-600">
                    Top Google Search
                </p>
                <div className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-8 border-t border-gray-200 pt-5 sm:mt-8 sm:pt-8 lg:mx-0 lg:max-w-none lg:grid-cols-3">
                    {searchResults.map((post) => (
                        <article key={post.title + post.link} className="flex max-w-xl flex-col items-start justify-between">
                            <div className="flex items-center gap-x-4 text-xs">
                                <a
                                    href={post.link}
                                    className="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100"
                                >
                                    {post.title}
                                </a>
                            </div>
                            <div className="group relative">
                                <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
                                    <a href={post.link}>
                                        <span className="absolute inset-0" />
                                        {post.title}
                                    </a>
                                </h3>
                                <p className="mt-5 line-clamp-3 text-sm leading-6 text-gray-600">{post.snippet}</p>
                            </div>
                            <div className="relative mt-8 flex items-center gap-x-4">
                                <div className="text-sm leading-6">
                                    <p className="font-semibold text-gray-900">
                                        <span className="absolute inset-0" />
                                        {"Google Search"}
                                    </p>
                                </div>
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </div>
    );
}