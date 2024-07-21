import React from 'react'
import { auth } from '@/backend/auth/auth'
import Image from 'next/image';

const Page = async () => {
    const session = await auth();
    const data = {
        src : session?.user?.image as string ,
        alt : session?.user?.name as string,
        id : session?.user?.userId as string
    }

  return (
    <div className='flex gap-2  items-center'>
        {
            session ? <h1>{session.user.email}   </h1> : <h1>Not logged in</h1>
           
            
        }
        <Image  className='rounded-full'  src={data.src}  alt={data.alt} height={50} width={50} />
        <br />
        <h1>{data.id}</h1>
    </div>
  )
}

export default Page