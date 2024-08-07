import SubmitButton from '@/components/layoutComponents/Button/SubmitButton';
import Image from 'next/image';
import Link from 'next/link';
import React, { FC } from 'react'
import { FaFacebook } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
interface AuthorProps {
    author:{ id: string; name: string, image: string, role: string },
    isFollow?: boolean,
    url?:string
}
const Author: FC<AuthorProps> = ({author, isFollow = true,url}) => {
    return (
            <div className='flex items-center px-12 gap-x-12 justify-between max-md:justify-center flex-wrap max-md:gap-2 max-w-[799px] mx-auto max-md:gap-y-2 my-12' >
                <div className='flex justify-center items-center gap-1 text-sm '>
                    <Image
                    src={author.image}
                    alt={author.name}
                    width={20}
                    height={20}
                    className="w-10 h-10 border rounded-full "
                ></Image> 
                <div>
                    <p className='font-bold'>{author.name}</p>
                    <p >Creative, Elegant and Visionary</p>
                </div>
                </div>
                <div className='flex justify-center items-center gap-2 text-gray-400 '>
                    <SubmitButton mainClass='border-1 px-2 py-1 border-gray-400 text-main-text-color rounded-lg font-bold'  >{isFollow?"follow":"unfollow"}</SubmitButton>
                    <Link 
                        href={`https://www.facebook.com/share.php?u='+${process.env.BASEURL}${url}+'&title=Title`}
                        className='border-1 px-2 py-1 border-gray-400 rounded-lg text-2xl'
                    >
                        <FaFacebook  />
                    </Link>
                    <Link 
                        href={`https://twitter.com/intent/tweet?url='+ ${process.env.BASEURL}${url} +'&hashtags=`}
                        className='border-1 px-2 py-1 border-gray-400 rounded-lg text-2xl'
                    >
                        <FaSquareXTwitter />
                    </Link>
                    <Link 
                        href={`https://www.linkedin.com/shareArticle?mini=true&url='+${process.env.BASEURL}${url}+'&title=Title&source=`}
                        className='border-1 px-2 py-1 border-gray-400 rounded-lg text-2xl'
                    >
                        <FaLinkedin />
                    </Link>
                    
                </div>
            </div>
    )
}

export default Author
