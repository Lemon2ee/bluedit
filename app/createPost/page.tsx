'use client'
import React, {useMemo, useState} from "react";
import {Fragment} from 'react'
import {Listbox, Transition} from '@headlessui/react'
import {CalendarIcon, PaperClipIcon, TagIcon, UserCircleIcon} from '@heroicons/react/20/solid'
import dynamic from "next/dynamic";

const state = [
    {name: 'Private', value: false},
    {name: 'Public', value: true},
]

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
}

export default function CreatePost() {
    const [isPublic, setisPublic] = useState(state[0])
    const [content, setContent] = useState<string>('');
    const DynamicTextEditor = useMemo(() => {

        return dynamic(() => import("@/app/createPost/textEditor"), {

            loading: () => <p>loading...</p>,

            ssr: false,

        });
    }, []);
    const handleSubmit = (event: { preventDefault: () => void; }) => {
        event.preventDefault();
        console.log(content); // Process the content here
    };
    return (
        <div className="max-w-2xl mx-auto">
            <form action="#" className="relative">
                <DynamicTextEditor
                content={content}
                setContent={setContent}/>

                <div className="flex items-center justify-end space-x-3 border-t border-gray-200 px-2 py-2 sm:px-3">
                    <Listbox as="div" value={isPublic} onChange={setisPublic} className="flex-shrink-0">
                        {({open}) => (
                            <>
                                <Listbox.Label className="sr-only">Add a label</Listbox.Label>
                                <div className="relative">
                                    <Listbox.Button
                                        className="relative inline-flex items-center whitespace-nowrap rounded-full bg-gray-50 px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 sm:px-3">
                                        <TagIcon
                                            className={classNames(
                                                isPublic.value === null ? 'text-gray-300' : 'text-gray-500',
                                                'h-5 w-5 flex-shrink-0 sm:-ml-1'
                                            )}
                                            aria-hidden="true"
                                        />
                                        <span
                                            className={classNames(
                                                isPublic.value === null ? '' : 'text-gray-900',
                                                'hidden truncate sm:ml-2 sm:block'
                                            )}
                                        >
                      {isPublic.value === null ? 'Label' : isPublic.name}
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
                                            className="absolute right-0 z-10 mt-1 max-h-56 w-52 overflow-auto rounded-lg bg-white py-3 text-base shadow ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                            {state.map((val) => (
                                                <Listbox.Option
                                                    key={val.name}
                                                    className={({active}) =>
                                                        classNames(
                                                            active ? 'bg-gray-100' : 'bg-white',
                                                            'relative cursor-default select-none px-3 py-2'
                                                        )
                                                    }
                                                    value={val}
                                                >
                                                    <div className="flex items-center">
                                                        <span className="block truncate font-medium">{val.name}</span>
                                                    </div>
                                                </Listbox.Option>
                                            ))}
                                        </Listbox.Options>
                                    </Transition>
                                </div>
                            </>
                        )}
                    </Listbox>

                    <div className="flex-shrink-0">
                        <button
                            type="submit"
                            className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            Create
                        </button>
                    </div>
                </div>
            </form>
        </div>
    )
}
