'use client'


import {signIn, useSession} from "next-auth/react";
import {useRouter} from "next/navigation";


export default function Home() {
    const {data: session} = useSession();
    const router = useRouter();
    console.log(session)

    return (
        <div className='grid grid-cols-2 text-white p-4'>
            <div>
                {
                    session && session.user
                    ? <h1 className='leading-loose text-[15rem] font-extrabold text-accent'>
                        Hi {session?.user.name}!
                    </h1>
                    : <button onClick={async () => {
                        router.push('/login')
                    }}> Sign In</button>
                }
            </div>
        </div>
    )
}
