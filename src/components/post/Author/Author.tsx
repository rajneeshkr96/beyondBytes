import SubmitButton from '@/components/layoutComponents/Button/SubmitButton';
import Image from 'next/image';
import React, { FC } from 'react'

interface AuthorProps {
    author:{ id: string; name: string, image: string, role: string },
    isFollow?: boolean,
}
const Author: FC<AuthorProps> = ({author, isFollow = true}) => {
    return (
            <div className='flex items-center px-12 gap-x-12 justify-center max-md:gap-2 max-w-[799px] mx-auto ' >
                <Image
                src={author.image}
                alt={author.name}
                width={20}
                height={20}
                className="w-8 h-8 border rounded-full "
            ></Image> <span >{author.name}</span><SubmitButton mainClass='bg-main-text-color text-light-color px-3 py-[2px] rounded-3xl'>{isFollow?"follow":"unfollow"}</SubmitButton></div>
    )
}

export default Author
