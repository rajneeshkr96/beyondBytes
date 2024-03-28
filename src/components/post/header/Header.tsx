
import { formatDate } from '@/components/BlogCard/BlogCard';
import Image from 'next/image'
import { title } from 'process';

import React, { FC } from 'react'


interface HeaderProps{
    font: string,
    title:string,
    createdAt:Date,
    readTime:string,
    author: {id:string; name:string, email:string,image:string,role:string}
}
const Header:FC<HeaderProps> = ({font,title,createdAt,readTime,author}) => {

    return (
        <header className=''>
            <div className='min-h-[70vh] grid grid-cols-3 grid-rows-[repeat(2,auto)] '>
                <div className='col-start-1 col-end-4'>
                    <h1 className={`max-xl:text-5xl max-md:line-clamp-3 max-md:text-2xl font-medium ${font} text-7xl  capitalize line-clamp-2`}>{title}</h1>
                    <p className='text-gray-600 capitalize px-6 line-clamp-1 max-md:line-clamp-2'>{title}</p>
                </div>
                <div className='col-start-1 col-end-2 max-md:col-end-4 px-6 py-2 flex  gap-x-2 '>
                    <Image src={author.image} alt={author.name} width={200} height={300} className='w-12 h-12 rounded-full' />
                    <span className='uppercase font-bold mt-3 text-gray-600'>{author.name}</span>
                </div>
                <div className='col-start-2 col-end-3 max-xl:col-end-4 max-md:col-start-1 max-md:justify-center max-md:gap-x-4 flex justify-between px-6 py-2'>
                    <div >
                        <span className='text-gray-600'>Date</span><br />
                        <time className='font-bold' dateTime={createdAt.toString()}>{formatDate(createdAt)}</time>
                    </div>
                    <div >
                        <span className='text-gray-600'>Reading Time</span><br />
                        <time className='font-bold' >{readTime}</time>
                    </div>
                </div>
               
            </div>

        </header>
    )
}

export default Header
