'use client'

import Image from "next/image";
import logo from "app/img/logo.png";
import React, {useState} from "react";
import {useRouter} from "next/navigation";
import {signIn} from "next-auth/react";
import Link from 'next/link'
import {errorToast} from "@/app/login/components";


export default function LoginPage() {
    const router = useRouter();
    const [showErrorToast, setShowErrorToast] = useState(false)
    const [data, setData] = React.useState(
        {
            username: '',
            password: ''
        }
    )

    const loginUser = async (e: React.MouseEvent) => {
        e.preventDefault();
        const signinResponse = await signIn('credentials', {
            ...data,
            redirect: false,
        })

        if (!signinResponse || signinResponse.error) {
            setShowErrorToast(true)
            return
        }
        router.push('/')
    }

    return (
        <>
            {showErrorToast && (
                errorToast("Login failed, Please check your credentials and try again.")
            )}
            <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <Image src={logo} alt="me" width="140" height="140" className={'mx-auto'}/>
                    <h2 className="dark:text-white mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                        Sign in to your account
                    </h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form className="space-y-6" action="#" method="POST">
                        <div>
                            <label htmlFor="username"
                                   className="dark:text-white block text-sm font-medium leading-6 text-gray-900">
                                Username
                            </label>
                            <div className="mt-2">
                                <input
                                    id="username"
                                    name="username"
                                    type="username"
                                    autoComplete="username"
                                    required
                                    onChange={(e) => setData({...data, username: e.target.value})}
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>


                        <div>
                            <div className="flex items-center justify-between">
                                <label htmlFor="password"
                                       className="dark:text-white block text-sm font-medium leading-6 text-gray-900">
                                    Password
                                </label>
                                <div className="text-sm">
                                    <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                                        Forgot password?
                                    </a>
                                </div>
                            </div>
                            <div className="mt-2">
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    autoComplete="current-password"
                                    required
                                    onChange={(e) => setData({...data, password: e.target.value})}
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                onClick={loginUser}
                                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                Sign in
                            </button>
                        </div>
                    </form>

                    <p className="mt-10 text-center text-sm text-gray-500">
                        Not a member?{' '}
                        <Link href={"/register"}
                              className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                            Click here to register
                        </Link>
                    </p>
                </div>
            </div>
        </>
    )
}
