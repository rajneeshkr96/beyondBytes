import Image from 'next/image'
import React from 'react'

const ViewStorie = () => {
    return (
        <div className='relative rounded-3xl w-36 h-[173px] border  overflow-hidden flex-shrink-0'>
            <Image
                alt='user'
                src={"https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"}
                width={50}
                height={50}
                className='rounded-full w-12 h-12 absolute top-2 left-2 border border-white '
            />
            <Image
                alt='user'
                src={"https://dev-to-uploads.s3.amazonaws.com/uploads/articles/wb7wz5ufmhat3bnu4ikm.jpg"}
                width={300}
                height={300}
                className='w-full  object-cover'
            />

        </div>
    )
}

export default ViewStorie
