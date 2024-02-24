import Image from 'next/image';
import React, { FC } from 'react'
import Tooltip from '../layoutComponents/Tooltip';
import ActionBtn from '../layoutComponents/Button/ActionBtn';
import { IoIosHeart } from "react-icons/io";
import { MdBookmarkAdd,MdOutlineBookmark  } from "react-icons/md";
import Link from 'next/link';
export interface BlogcardProps{
    id: string;
    tag:Array<string>;
    bookmark?:boolean;
    likes?:number;
    meLike?:boolean;
    title: string;
    description: string;
    image: string;
    date: string;
    author: string;
    slug: string;
    readTime: string;
}

const BlogCard:FC<BlogcardProps> = ({id,tag,bookmark=false,likes,meLike,title,description,image,date,author,slug,readTime}) => {
  return (
    <div className='w-1/4 px-4 py-2 shadow mx-4 my-2'>
      {/* card head  */}
      <div style={{gridTemplateColumns:"3rem 1fr 2rem"}} className='grid grid-rows-1 justify-start place-items-center gap-x-2 my-2'>
        <Image
          src={image}
          alt={title}
          width={300}
          height={200}
          className="w-12 h-12 rounded-full justify-self-start"
        />
        <div className="place-self-start">
          <h5 className="uppercase">{author}</h5>
          <p className="text-[#b0b0ba] text-xs">{date}/{tag[0]}</p>
        </div>
        <ActionBtn className='w-8 h-8 justify-self-end'/>
      </div>
      {/* card image  */}
      <Image
        src={image}
        alt={title}
        width={300}
        height={150}
        className="rounded-md mx-auto w-full h-48"
      />
    {/* like and bookmark  */}
      <div className='flex justify-between my-1 text-2xl'>
        <span className='flex justify-end cursor-pointer'>
          <IoIosHeart  style={{color:`${meLike?"#ff5c63":""}`}} />
          <p className='text-[#5f5f5f] text-xs'>{likes}</p>
        </span>
          <span className='text-[#5f5f5f] text-sm'>{readTime} Read</span>
        <span className='cursor-pointer'>
          {bookmark? <MdOutlineBookmark /> : <MdBookmarkAdd />}
        </span>
      </div>
      {/* end post with title description and read more */}
      <div className='flex flex-col gap-y-2'>
      <h4 className="w-full overflow-hidden text-base font-medium line-clamp-2 px-2 capitalize">
        {title}
      </h4>
        <p className='text-[#5f5f5f] w-full overflow-hidden text-sm line-clamp-3 px-4 capitalize'>{description}</p>
        <Link
        href={"#"}
        className='capitalize px-4'
        >read more</Link>
      </div>
    </div>
  )
}

export default BlogCard
