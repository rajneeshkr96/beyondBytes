
import { formatDate } from '@/tools/FormatDate';
import Image from 'next/image'
import React, { FC } from 'react'


interface HeaderProps {
    title: string,
    createdAt: Date,
    readTime: string,
    author: { id: string; name: string, email: string, image: string, role: string }
    image: { src: string, alt: string, caption?: string },
}
const Header: FC<HeaderProps> = ({title, createdAt, readTime, author, image }) => {

    return (
        <header className='text-gray-700 w-full flex flex-col justify-center items-center pt-4 font-serif'>
            <div className='text-sm text-center py-12 flex flex-col gap-y-2'>
                <h1 className='text-5xl max-md:text-2xl text-dark-color font-bold line-clamp-2'>{title}</h1>
                <div >
                    <time dateTime={createdAt.toString()}>Published {formatDate(createdAt)}</time> 
                    <p>Reading Time: {readTime}</p>
                </div>    
            </div>

            <figure className='w-[65%] max-md:!w-full  '>
                <Image src={image.src} alt={image.alt} width={300} height={200} className='w-full h-full object-cover max-md:!rounded-md rounded-3xl' />
                {image?.caption && <figcaption className='mx-auto inline-block'>{image.caption}</figcaption>}
            </figure>
        </header>
    )
}

export default Header
