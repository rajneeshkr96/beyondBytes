import React from 'react'
import { auth } from '@/backend/auth/auth'
import Image from 'next/image';

const page = async () => {
    const session = await auth();
    const data = {
        src : session?.user?.image as string ,
        alt : session?.user?.name as string
    }
    console.log(session)
  return (
    <div className='flex gap-2  items-center'>
        {
            session ? <h1>{session.user.email}   </h1> : <h1>Not logged in</h1>
           
            
        }
        <Image  className='rounded-full'  src={data.src}  alt={data.alt} height={50} width={50} />
    </div>
  )
}

export default page