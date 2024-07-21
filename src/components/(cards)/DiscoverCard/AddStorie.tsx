import Image from 'next/image'
import React from 'react'
import { FiPlusCircle } from "react-icons/fi";
const AddStorie = () => {
    return (
        <div className='flex flex-col justify-center items-center px-6 py-4 gap-y-4 border rounded-3xl flex-shrink-0'>
            <div className='relative mt-5'>
                <Image
                    alt='user'
                    src={"https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"}
                    width={50}
                    height={50}
                    className='rounded-full w-16 h-16'
                     />
                    <FiPlusCircle className='bg-main-text-color rounded-full text-white text-2xl absolute -bottom-3 left-0 right-0 mx-auto' />
            </div>
            <h4 className='text-sm text-gray-500'>Your Stories</h4>

        </div>
    )
}

export default AddStorie
