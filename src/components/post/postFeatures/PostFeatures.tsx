"use client";
import ActionBtn from '@/components/layoutComponents/Button/ActionBtn';
import React, { useState, FC } from 'react';
import { IoHeartCircleSharp, IoHeartDislikeCircle, IoChatboxEllipses, IoShareSocial } from "react-icons/io5";
import { MdBookmarkAdd, MdOutlineBookmark } from "react-icons/md";
import {  Comment } from './Comments';
export interface PostFeaturesProps{
    font: string
}
export const PostFeatures: FC<PostFeaturesProps> = ({ font }) => {
    const [viewCmt, setViewCmt] = useState(false);

    return (
        <section className='w-11/12 mx-auto flex flex-col items-center'>
            <div className='flex gap-x-4 my-6 items-center'>
                <span className={`${font} text-2xl`}>Tags</span>
                <ul className='flex gap-x-2 font-bold'>
                    <li>kkkk</li>
                    <li>kkkk</li>
                    <li>kkkk</li>
                    <li>kkkk</li>
                    <li>kkkk</li>
                </ul>
            </div>

            <div className='flex justify-between w-10/12 text-4xl'>
                <span className='flex gap-x-6 items-center '>
                    <span className='flex items-end cursor-pointer'>
                        {"kk" ? <IoHeartCircleSharp /> : <IoHeartDislikeCircle />}
                        <p className='text-[#5f5f5f] text-base '>{"55"}</p>
                    </span>
                    <IoChatboxEllipses className='cursor-pointer' onClick={() => setViewCmt(!viewCmt)} />
                </span>
                <span className='flex gap-x-2 items-center'>
                    <IoShareSocial className='cursor-pointer' />
                    {'bookmark' ? <MdOutlineBookmark className='cursor-pointer' /> : <MdBookmarkAdd className='cursor-pointer' />}
                    <ActionBtn  />
                </span>
            </div>

            <Comment visible={viewCmt} close={setViewCmt} />

        </section>
    );
};
