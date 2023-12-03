"use client";

import React, { Fragment, useState } from "react";
import {
  FaceFrownIcon,
  FaceSmileIcon,
  FireIcon,
  HandThumbUpIcon,
  HeartIcon,
  PaperClipIcon,
  XMarkIcon,
} from "@heroicons/react/20/solid";
import { Listbox, Transition } from "@headlessui/react";
import {Thread} from "@/types/thread";
import {errorToast} from "@/app/login/components";
import Link from "next/link";
import {getServerSession, Session} from "next-auth";
import authOptions from "@/app/api/auth/[...nextauth]/nextAuthOptions";
import {useRouter} from "next/navigation";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

const moods = [
  {
    name: "Excited",
    value: "excited",
    icon: FireIcon,
    iconColor: "text-white",
    bgColor: "bg-red-500",
  },
  {
    name: "Loved",
    value: "loved",
    icon: HeartIcon,
    iconColor: "text-white",
    bgColor: "bg-pink-400",
  },
  {
    name: "Happy",
    value: "happy",
    icon: FaceSmileIcon,
    iconColor: "text-white",
    bgColor: "bg-green-400",
  },
  {
    name: "Sad",
    value: "sad",
    icon: FaceFrownIcon,
    iconColor: "text-white",
    bgColor: "bg-yellow-400",
  },
  {
    name: "Thumbsy",
    value: "thumbsy",
    icon: HandThumbUpIcon,
    iconColor: "text-white",
    bgColor: "bg-blue-500",
  },
  {
    name: "I feel nothing",
    value: null,
    icon: XMarkIcon,
    iconColor: "text-gray-400",
    bgColor: "bg-transparent",
  },
];

export default function NewComment({thread,session}: { thread: Thread;session: Session | null  }) {
  const router = useRouter();
  const [selected, setSelected] = useState(moods[5]);
  const [content, setContent] = useState("");
  const [showErrorToast, setShowErrorToast] = useState(false);
  const [errorMessages, setErrorMessages] = useState<string>("");
  const createComment = async (event: { preventDefault: () => void }) => {
    event.preventDefault();
    try {
      const res = await fetch(`/api/thread/${thread.id}/createComment`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content: content,
        }),
      });
      const json = await res.json();
      if (json.message) {
        setErrorMessages(json.message);
        setShowErrorToast(true);
        return;
      }
      router.refresh();
    } catch (e) {
      if (e instanceof Error) {
        throw Error(e.message);
      }
    }
  };
  return (
      <>
        {/* New comment form */}
        {session && session.user?.image ? (
        <div className="mt-6 flex gap-x-3">

                  <img src={session?.user?.image}
                       alt=""
                       className="h-10 w-10 flex-none rounded-full bg-gray-100"
                  />

          <form action="#" className="relative flex-auto">
            <div
                className="overflow-hidden rounded-lg pb-12 shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-indigo-600">
              <label htmlFor="comment" className="sr-only">
                Add your comment
              </label>
              <textarea
                  rows={2}
                  name="comment"
                  id="comment"
                  className="block w-full resize-none border-0 bg-transparent py-1.5 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                  placeholder="Add your comment..."
                  defaultValue={""}
                  onChange={(e) => setContent(e.target.value)}
              />
            </div>

            <div className="absolute inset-x-0 bottom-0 flex justify-between py-2 pl-3 pr-2">
              <div className="flex items-center space-x-5">
                <div className="flex items-center">
                  <button
                      type="button"
                      className="-m-2.5 flex h-10 w-10 items-center justify-center rounded-full text-gray-400 hover:text-gray-500"
                  >
                    <PaperClipIcon className="h-5 w-5" aria-hidden="true"/>
                    <span className="sr-only">Attach a file</span>
                  </button>
                </div>
                <div className="flex items-center">
                  <Listbox value={selected} onChange={setSelected}>
                    {({open}) => (
                        <>
                          <Listbox.Label className="sr-only">
                            Your mood
                          </Listbox.Label>
                          <div className="relative">
                            <Listbox.Button
                                className="relative -m-2.5 flex h-10 w-10 items-center justify-center rounded-full text-gray-400 hover:text-gray-500">
                          <span className="flex items-center justify-center">
                            {selected.value === null ? (
                                <span>
                                <FaceSmileIcon
                                    className="h-5 w-5 flex-shrink-0"
                                    aria-hidden="true"
                                />
                                <span className="sr-only">Add your mood</span>
                              </span>
                            ) : (
                                <span>
                                <span
                                    className={classNames(
                                        selected.bgColor,
                                        "flex h-8 w-8 items-center justify-center rounded-full",
                                    )}
                                >
                                  <selected.icon
                                      className="h-5 w-5 flex-shrink-0 text-white"
                                      aria-hidden="true"
                                  />
                                </span>
                                <span className="sr-only">{selected.name}</span>
                              </span>
                            )}
                          </span>
                            </Listbox.Button>

                            <Transition
                                show={open}
                                as={Fragment}
                                leave="transition ease-in duration-100"
                                leaveFrom="opacity-100"
                                leaveTo="opacity-0"
                            >
                              <Listbox.Options
                                  className="absolute bottom-10 z-10 -ml-6 w-60 rounded-lg bg-white py-3 text-base shadow ring-1 ring-black ring-opacity-5 focus:outline-none sm:ml-auto sm:w-64 sm:text-sm">
                                {moods.map((mood) => (
                                    <Listbox.Option
                                        key={mood.value}
                                        className={({active}) =>
                                            classNames(
                                                active ? "bg-gray-100" : "bg-white",
                                                "relative cursor-default select-none px-3 py-2",
                                            )
                                        }
                                        value={mood}
                                    >
                                      <div className="flex items-center">
                                        <div
                                            className={classNames(
                                                mood.bgColor,
                                                "flex h-8 w-8 items-center justify-center rounded-full",
                                            )}
                                        >
                                          <mood.icon
                                              className={classNames(
                                                  mood.iconColor,
                                                  "h-5 w-5 flex-shrink-0",
                                              )}
                                              aria-hidden="true"
                                          />
                                        </div>
                                        <span className="ml-3 block truncate font-medium">
                                    {mood.name}
                                  </span>
                                      </div>
                                    </Listbox.Option>
                                ))}
                              </Listbox.Options>
                            </Transition>
                          </div>
                        </>
                    )}
                  </Listbox>
                </div>
              </div>
              <button
                  type="submit"
                  className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                  onClick={createComment}
              >
                Comment
              </button>
              {showErrorToast && errorToast(errorMessages)}

            </div>

          </form>

        </div>
            )
            : (
                <Link
                    href={"/login"}
                    className="ml-6 inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >Login to comment
                </Link>
            )}
      </>
  );
}
