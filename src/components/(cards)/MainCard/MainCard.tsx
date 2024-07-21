


import localFont from 'next/font/local'
import Image from 'next/image';
import Link from 'next/link';
import React, { FC } from 'react'
import { CiCalendar } from "react-icons/ci";
import { FaBlog } from "react-icons/fa";
import { GoDotFill } from "react-icons/go";
import { monaRegular } from '../FeatureCards/FeatureCards';

import { CiBookmark } from "react-icons/ci";
import { IoBookmark } from "react-icons/io5";
export interface CardsProps {
  title: string;
  image: { src: string; alt: string };
  slug: string;
  id: string;
  author: { id: string; name: string, email: string, image: string, role: string };
  createdAt: Date;
  className?: string;
  bookMarked?: boolean;

}

const MainCard: FC<CardsProps> = ({
  id,
  image,
  title,
  slug,
  author,
  createdAt,
  className,
  ...props
}) => {
  console.log(props.bookMarked)
  return (
    <div {...props} className={`${monaRegular.className} ${className} max-w-80 mx-2 my-4 `}>
      <Link href={`/post/${slug}`}>
        <div  className='w-full rounded-xl h-48 mb-2 cursor-pointer'>
          <Image
            src={image.src}
            alt={image.alt}
            width={300}
            height={200}
            className="w-full h-full object-cover rounded-xl"
          />
        </div>
      </Link>
      <div className='px-2'>
        <h2 className={`${monaRegular.className} font-semibold line-clamp-2`}>
          <Link href={`/post/${slug}`}>{title}</Link>
        </h2>
        <div className='text-[#6a6a6a] text-sm capitalize flex flex-4 gap-x-2 px-2 py-3' >
          <span className='flex justify-center items-center gap-1 ' ><Image
            src={author.image}
            alt={author.name}
            width={20}
            height={20}
            className="w-4 h-4 rounded-full"
          ></Image> {author.name}</span>
          <span className='flex justify-center items-center gap-1'><CiCalendar />
            {new Date(createdAt).toLocaleDateString()}
          </span>
          <span className='flex justify-center items-center gap-1' >
            <GoDotFill /> <FaBlog />
          </span>
          <span className=''>
            {props.bookMarked ? <CiBookmark className='w-4 mt-0.5  h-4 '  /> : ""}
          </span>
          
        </div>

      </div>
    </div>
  )
}

export default MainCard
