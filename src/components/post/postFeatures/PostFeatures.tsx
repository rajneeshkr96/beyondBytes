"use client";
import ActionBtn from '@/components/layoutComponents/Button/ActionBtn';
import React, { useState, FC } from 'react';
import { IoHeartCircleSharp, IoHeartDislikeCircle, IoChatboxEllipses, IoShareSocial } from "react-icons/io5";
import { MdBookmarkAdd, MdOutlineBookmark } from "react-icons/md";
import {  Comment } from './Comments';
import { useSession } from 'next-auth/react';
import { toast } from 'react-toastify';
export interface PostFeaturesProps{
    font: string,
    tags: string[],
    bookmark?: boolean,
    likesCount: number,
    meLike?: boolean,
    author?: {id:string; name:string, email:string,image:string,role:string}
    
}
export const PostFeatures: FC<PostFeaturesProps> = ({ font,tags,bookmark=false,likesCount,meLike=false,author}) => {
    const session  = useSession()
    const [viewCmt, setViewCmt] = useState(false);
    const [likesCounts,setLikeCounts] = useState(likesCount);
    const [meLikes,setMeLikes] = useState(meLike);
    const [meBookmark,setMeBookmark] = useState(bookmark);

    const onLikesClick = () => {
        if(session.status === 'authenticated'){
            if(meLikes){
                setMeLikes(false);
                setLikeCounts(likesCounts-1);
            }else{
                setMeLikes(true);
                setLikeCounts(likesCounts+1);
            }
        }else{
            toast.error("Please login first");
        }
      
    }
    const onBookmarkClick = () => {
        if(session.status === 'authenticated'){
          setMeBookmark(!meBookmark);
        }else{
            toast.error("Please login first");
        }

    };
    return (
        <section className='w-11/12 mx-auto flex flex-col items-center'>
            <div className='flex gap-x-4 my-6 items-center'>
                <span className={`${font} text-2xl`}>Tags</span>
                <ul className='flex gap-x-2 font-bold'>
                    {tags.map((val,index)=><li key={index}>{val}</li>)}
                </ul>
            </div>

            <div className='flex justify-between w-10/12 text-4xl'>
                <span className='flex gap-x-6 items-center '>
                    <span className='flex items-end'>
                        <span className='cursor-pointer' onClick={onLikesClick}>
                            {meLikes ? <IoHeartCircleSharp /> : <IoHeartDislikeCircle />}
                        </span>
                        <p className='text-[#5f5f5f] text-base '>{likesCounts}</p>
                    </span>
                    <IoChatboxEllipses className='cursor-pointer' onClick={() => setViewCmt(!viewCmt)} />
                </span>
                <span className='flex gap-x-2 items-center'>
                    <IoShareSocial className='cursor-pointer' />
                    <span className='cursor-pointer' onClick={onBookmarkClick}>
                        {meBookmark ? <MdOutlineBookmark  /> : <MdBookmarkAdd  />}
                    </span>
                    <ActionBtn  />
                </span>
            </div>

            <Comment visible={viewCmt} close={setViewCmt} />

        </section>
    );
};
