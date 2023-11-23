import Image from 'next/image'
import {getServerSession} from "next-auth/next";
import {authOptions} from "@/app/api/auth/[...nextauth]/route";


export default async function Home() {
  const session = await getServerSession(authOptions)
  return (
      <div className='grid grid-cols-2 text-white p-4'>
        <div>
          {
            session && session.user
            ? <h1 className='leading-loose text-[15rem] font-extrabold text-accent'>
              Hi {session?.user.name}!
            </h1>
            : <a className='btn btn-primary' href='/api/auth/signin'>Sign in</a>
          }
        </div>
      </div>
  )
}
