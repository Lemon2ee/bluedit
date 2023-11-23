
import {getServerSession} from "next-auth/next"
import type {NextRequest} from "next/server"
import {authOptions} from "@/app/api/auth/[...nextauth]/route"
import {signIn} from "next-auth/react";

export default async function Protected(req: NextRequest): Promise<any> {
    const session = await getServerSession(authOptions)

    return (
        <div className='grid grid-cols-2 text-white p-4'>
            <div>
                {
                    session && session.user
                    ? <h1 className='leading-loose text-[15rem] font-extrabold text-accent'>
                        Hi {session?.user.name}!
                    </h1>
                    : <button onClick={async () => {
                        await signIn("google")
                    }}> Sign In</button>
                }
            </div>
        </div>
    )
}