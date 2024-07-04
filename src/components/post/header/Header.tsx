
import { formatDate } from '@/tools/FormatDate';
import Image from 'next/image'
import React, { FC } from 'react'


interface HeaderProps {
    title: string,
    createdAt: Date,
    readTime: string,
    metaDesc:string
    tags:string[],
    author: { id: string; name: string, email: string, image: string, role: string }
    image: { src: string, alt: string, caption?: string },
}
const Header: FC<HeaderProps> = ({title, createdAt, readTime,metaDesc,tags, author, image }) => {

    return (
        <header className=' w-full flex flex-col justify-center items-center py-4'>
            <div className='text-main-text-color text-sm text-center py-4 flex flex-col gap-y-2'>
                <div >
                    <time dateTime={createdAt.toString()}>{formatDate(createdAt)}</time> 
                    <p>Reading Time: {readTime}</p>
                </div>
                <h1 className='text-5xl text-dark-color font-bold'>{title}</h1>
                <p className='text-gray-500'>{metaDesc}</p>
                <ul className='flex items-center gap-x-2 justify-center'>
                    {tags.map((tag) => (
                        <li key={tag} className='bg-main-sec-color bg-opacity-60 backdrop-blur-sm  text-dark-color text-xs px-1 py-1 rounded-sm'>{tag}</li>
                    ))}
                </ul>
    
            </div>

            <figure className='w-[65%] '>
                <Image src={image.src} alt={image.alt} width={300} height={200} className='w-full h-full object-cover' />
                {image?.caption && <figcaption className='mx-auto inline-block'>{image.caption}</figcaption>}
            </figure>
        </header>
    )
}

export default Header
