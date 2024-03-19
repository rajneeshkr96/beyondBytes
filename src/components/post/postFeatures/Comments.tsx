"use client"
import ActionBtn from '@/components/layoutComponents/Button/ActionBtn';
import SubmitButton from '@/components/layoutComponents/Button/SubmitButton';
import { IoMdClose } from "react-icons/io";
import Image from 'next/image';
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import axios from 'axios';
import { errorToastHandler } from '@/components/errorTostHandler';


export function Comment({id,commentCount,visible,close,isAuth,author}:{
  id:string
  visible:boolean,
  close:Dispatch<SetStateAction<boolean>>,
  isAuth:string,
  commentCount:number,
  author?:{id:string,name:string,email:string,image:string,role:string}

}) {
  const [loading,setLoading] = useState(false);
  const [comment,setComment] = useState("");
  const [useComment,setUseComment] = useState([]);
  const [commentCounts,setCommentCounts] = useState(commentCount);
  const addComment = async () => {
    try {
      if(!comment){
        toast.error("Please enter a comment");
        return;
      }
      if (isAuth === "authenticated") {
        setLoading(true);
        const res = await axios.post(`/api/user/comment/add/${id}`,{comment})
        if(res.data.success){
          toast.success("comment added successfully");
          setComment("");
          setCommentCounts(commentCounts+1);
          close(false);
        }
      } else {
        toast.error("Please Login first")
      }
      
      setLoading(false);
    } catch (error:any) {
      setLoading(false);
      errorToastHandler(error);
    }
  }
  useEffect(() => {
    getComments();
  }, [commentCounts]);
  const getComments = async () => {
    try {
      const res = await axios.get(`/api/user/comment/get/${id}`);
      if(res.data.success){
        setUseComment(res.data.data);
      }
    } catch (error:any) {
      errorToastHandler(error);
    }
  }

  console.log(useComment,commentCounts);
  return (
    <section className={`fixed w-[25vw] px-4 py-6 z-20 right-0 top-0  ease-in duration-75 bg-white min-h-screen ${visible?"translate-x-[0] visible":"translate-x-[25vw] min-h-screen"}`}>
      <IoMdClose onClick={()=>close(!visible)} className='absolute text-black right-2 top-2 text-2xl cursor-pointer' />

      {/* write comment  */}
      <div className='shadow-lg py-2'>
        <span>
            <Image src={"/img3.jpg"} alt={"kkk"} width={200} height={300} className='w-12 h-12 rounded-full' />
            <span className='uppercase font-bold mt-3 text-gray-600'>raju bhai....</span>
        </span>
        <textarea onChange={(e)=>setComment(e.target.value)} value={comment} name="comment" id="" placeholder='Write Your Comment Here........' className='w-full outline-none px-2 text-black my-2' cols={30}rows={6}></textarea>
        <SubmitButton onClick={addComment} className='bg-[#333] text-white px-4 py-2 rounded-lg w-auto mx-auto block' value="comment..."/>
      </div>
      {/* comments  */}
      <div className=''>
        {commentCounts>0?<>{useComment.map((val:{
          id:string,
          comment:string,
          User:{id:string,name:string,email:string,image:string,role:string}
        },index)=><div key={index}  className='w-full px-6 py-4'>
          <span className='flex justify-between items-center'>
            <span>
              <Image src={val.User.image} alt={val.User.name} width={200} height={300} className='w-12 h-12 rounded-full' />
              <span className='uppercase font-bold mt-3 text-gray-600'>{val.User.name}</span>
            </span>
            <ActionBtn className='w-8 h-8 text-black'/>
          </span>
          <p className='text-black py-2'>
            {val.comment}
          </p>
        </div>)}</>:<div className='w-full h-full px-6 py-12 flex justify-center items-center'>
          <h4>no comment found.........</h4>
          </div>}
      </div>
    </section>
  )
}
