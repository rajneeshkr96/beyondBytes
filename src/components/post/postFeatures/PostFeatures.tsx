"use client";
import ActionBtn from '@/components/layoutComponents/Button/ActionBtn';
import React, { useState, FC } from 'react';
import { IoHeartCircleSharp, IoHeartDislikeCircle, IoChatboxEllipses, IoShareSocial } from "react-icons/io5";
import { MdBookmarkAdd, MdOutlineBookmark } from "react-icons/md";
import {  Comment } from './Comments';
import { useSession } from 'next-auth/react';
import { toast } from 'react-toastify';
import axios from 'axios';
import { errorToastHandler } from '@/components/errorTostHandler';
import ActionOptions from '@/components/BlogCard/ActionOptions';
import Loading from '@/app/loading';
import ShareOptions from './shareOptions';
export interface PostFeaturesProps{
    id: string,
    commentCount: number
    bookmark?: boolean,
    likesCount: number,
    meLike?: boolean,
    slug:string,
    baseurl:string 
}
export const PostFeatures: FC<PostFeaturesProps> = ({ id,slug,baseurl,commentCount,bookmark=false,likesCount,meLike=false}) => {
    const session  = useSession()
    const [viewCmt, setViewCmt] = useState(false);
    const [likesCounts,setLikeCounts] = useState(likesCount);
    const [meLikes,setMeLikes] = useState(meLike);
    const [meBookmark,setMeBookmark] = useState(bookmark);
    const [loading,setLoading] = useState(false);

    const onLikesClick = async () => {
        if(session.status === 'authenticated'){
            try {
                setLoading(true);
                if(meLikes){
                    setMeLikes(false);
                    setLikeCounts(likesCounts-1);
                }else{
                    setMeLikes(true);
                    setLikeCounts(likesCounts+1);
                }
                const res = await axios.post(`/api/user/like/${id}`)
                console.log(res.data);
                setLoading(false);
                if(res.data.success){
                    toast.success(res.data.message)
                }
                
            } catch (error:any) {
                setLoading(false);
                errorToastHandler(error);
            }
        }else{
            toast.error("Please login first");
        }
      
    }
    const onBookmarkClick = async () => {
        if(session.status === 'authenticated'){
          setMeBookmark(!meBookmark);
          try {
            setLoading(true);
              const res = await axios.post(`/api/user/bookmark/add/${id}`)
              console.log(res.data);
              if(res.data.success){
                  toast.success(res.data.message)
              }
              setLoading(false);
            } catch (error:any) {
                setLoading(false);
                errorToastHandler(error);
            }
        }else{
            toast.error("Please login first");
        }

    };
    return (
        <>
        {loading && <Loading background='bg-[#33333375]' />}
        <section className='w-[70%]  flex flex-col justify-between items-center '>
            

            <div className='flex justify-between w-full my-2 text-4xl'>
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
                    
                    <ActionBtn className='text-lg ' width='w-56' actionIcon={<IoShareSocial className='cursor-pointer text-3xl' />}  >
                        <ShareOptions link={baseurl+"/post/"+slug}/>
                    </ActionBtn>
                    <span className='cursor-pointer' onClick={onBookmarkClick}>
                        {meBookmark ? <MdOutlineBookmark  /> : <MdBookmarkAdd  />}
                    </span>
                    <ActionBtn className='text-lg' iconClass="!text-3xl"  >
                        <ActionOptions id={id}/>
                    </ActionBtn>
                </span>
            </div>

            <Comment id={id} commentCount={commentCount} author={{name:session.data?.user.name ?? "user",image:session.data?.user.image ?? "/user.png"}} isAuth={session.status} visible={viewCmt} close={setViewCmt} />

        </section>
        </>
    );
};
