import {PencilSquareIcon} from "@heroicons/react/20/solid";

export default function Header({
                                   profilePicture,
                                   bannerPicture,
                                   name,
                                   edit,
                               }: {
    profilePicture: string;
    bannerPicture: string;
    name: string;
    edit: boolean;
}) {
    return (
        <div>
            <div>
                <img
                    className="h-40 w-full object-cover lg:h-64"
                    src={bannerPicture}
                    alt=""
                />
            </div>
            <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
                <div className="-mt-12 sm:-mt-16 sm:flex sm:items-end sm:space-x-5">
                    <div className="flex">
                        <img
                            className="h-24 w-24 rounded-full ring-4 ring-white sm:h-32 sm:w-32"
                            src={profilePicture}
                            alt=""
                        />
                    </div>
                    <div
                        className="mt-6 sm:flex sm:min-w-0 sm:flex-1 sm:items-center sm:justify-end sm:space-x-6 sm:pb-1">
                        <div className="mt-6 min-w-0 flex-1 sm:hidden md:block">
                            <h1 className="truncate text-2xl font-bold text-gray-900">
                                {name}
                            </h1>
                        </div>
                        {edit && (
                            <div
                                className="mt-6 flex flex-col justify-stretch space-y-3 sm:flex-row sm:space-x-4 sm:space-y-0">
                                <a
                                    href="/profile/edit"
                                    className="inline-flex justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                                >
                                    <PencilSquareIcon
                                        className="-ml-0.5 mr-1.5 h-5 w-5 text-gray-400"
                                        aria-hidden="true"
                                    />
                                    <span>Edit</span>
                                </a>
                            </div>
                        )}
                    </div>
                </div>
                <div className="mt-6 hidden min-w-0 flex-1 sm:block md:hidden">
                    <h1 className="truncate text-2xl font-bold text-gray-900">{name}</h1>
                </div>
            </div>
        </div>
    );
}
