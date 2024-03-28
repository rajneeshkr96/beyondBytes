
import Image from 'next/image';
import React, { FC } from 'react'
import ActionBtn from '../layoutComponents/Button/ActionBtn';
import { IoIosHeart } from "react-icons/io";
import { MdBookmarkAdd,MdOutlineBookmark  } from "react-icons/md";
import Link from 'next/link';
import ActionOptions from './ActionOptions';


export interface BlogcardProps{
    id: string;
    tags?:Array<string>;
    bookmark?:boolean ;
    likesCount?:number;
    disableBtn?:boolean;
    meLike?:boolean;
    title: string;
    metaDesc: string;
    image: {src: string, alt:string};
    createdAt: Date;
    author: {id:string; name:string, email:string,image:string,role:string};
    slug: string;
    readTime: string;
}

export function formatDate(dateString:Date) {
  const date = new Date(dateString);

  // Format date
  const formattedDate = `${date.getMonth() + 1}-${date.getDate()}-${date.getFullYear()}`;

  // Format time
  let hours = date.getHours();
  const minutes = (date.getMinutes() < 10 ? '0' : '') + date.getMinutes();
  const amPm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12 || 12; // Convert 0 to 12
  const formattedTime = `${hours}:${minutes} ${amPm}`;

  return `${formattedDate} ${formattedTime}`;
}

const BlogCard:FC<BlogcardProps> = ({id,tags=["blog"],bookmark=false,disableBtn=false,likesCount,meLike=false,title,metaDesc,image,createdAt,author,slug,readTime}) => {
  return (
    <div className='w-11/12 min-w-80 max-w-96 sm:w-1/2 md:w-1/4  px-4 py-2 shadow mx-4 my-2'>
      {/* card head  */}
      <div style={{gridTemplateColumns:"3rem 1fr 2rem"}} className='grid grid-rows-1 justify-start items-start gap-x-2 my-2'>
        <Image
          src={author.image?author.image:"/user.png"}
          alt={author.name}
          width={300}
          height={200}
          className="w-12 h-12 rounded-full justify-self-start"
        />
        <div className="place-self-start">
          <h5 className="uppercase">{author.name}</h5>
          <p className="text-[#b0b0ba] text-xs">{formatDate(createdAt)}/{tags[0]}</p>
        </div>
          <ActionBtn className='w-8 h-8 justify-self-end'>
            <ActionOptions disable={disableBtn} id={id} authId={author.id}/>
          </ActionBtn>
      </div>
      {/* card image  */}
      <Link
        href={`/post/${slug}`}
        target='_blank'
       >
        <Image
          src={image.src}
          alt={image.alt}
          width={300}
          height={150}
          className="rounded-md mx-auto w-full h-48"
        />
      </Link>
    {/* like and bookmark  */}
      <div className='flex justify-between my-1 text-2xl'>
        <span className='flex justify-end'>
          <IoIosHeart  style={{color:`${meLike?"#ff5c63":""}`}} />
          <p className='text-[#5f5f5f] text-xs'>{likesCount}</p>
        </span>
          <span className='text-[#5f5f5f] text-sm'>{readTime}</span>
        <span >
          {bookmark? <MdOutlineBookmark /> : <MdBookmarkAdd />}
        </span>
      </div>
      {/* end post with title metaDesc and read more */}
      <div className='flex flex-col gap-y-2'>
      <h4 className="text-[#333] w-full overflow-hidden text-base font-medium line-clamp-2 px-2 capitalize">
        {title}
      </h4>
        <p className='text-[#5f5f5f] w-full overflow-hidden text-sm line-clamp-3 px-2 capitalize'>{metaDesc}</p>
        <Link
        href={`/post/${slug}`}
        target='_blank'
        className='capitalize px-2'
        >read more</Link>
      </div>
    </div>
  )
}

export default BlogCard
