"use client"
import Loading from "@/app/loading";
import { errorToastHandler } from "@/components/errorTostHandler";
import ActionBtn from "@/components/layoutComponents/Button/ActionBtn";
import axios from "axios";
import Image from "next/image";
import { useRef, useState } from "react";
import {  IoMdHeart } from "react-icons/io";
import { toast } from "react-toastify";

export interface CommentData {
    id: string;
    comment: string;
    User: {
      id: string;
      name: string;
      email: string;
      image: string;
      role: string;
    };
    likesCount: number;
    CommentLikes:{CommentId:string}[];
  }

interface CommentDisplayProps {
    isAuth: string;
    comments: CommentData[];
    setComments: React.Dispatch<React.SetStateAction<CommentData[]>>;
    setFullLoading: React.Dispatch<React.SetStateAction<boolean>>;
    showFullComment: boolean;
    commentLineRef: React.RefObject<HTMLParagraphElement>;
    toggleShowFullComment: () => void;
  }
  
  const CommentDisplay: React.FC<CommentDisplayProps> = ({isAuth,commentLineRef, comments,setComments, setFullLoading,showFullComment, toggleShowFullComment }) => {
    console.log(comments);

    const onLikeComment = async (commentId:string)=>{
      try {
        if(isAuth !== "authenticated"){
          toast.error("Please login to like a comment");
          return;
        }
        setFullLoading(true);
        const res = await axios.post(`/api/user/comment/like/${commentId}`);
        if(res.data.success){
          toast.success(res.data.message)
          if(res.data.data.like){
            setComments(comments.map(comment => comment.id === commentId? {...comment, likesCount: comment.likesCount + 1,CommentLikes:[{CommentId:commentId}] } : comment))
          }else{
            setComments(comments.map(comment => comment.id === commentId? {...comment, likesCount: comment.likesCount - 1,CommentLikes:[] } : comment))
          }
        }
        setFullLoading(false);
      } catch (error:any) {
        setFullLoading(false);
        errorToastHandler(error);
      }
    }
  
    return (
      <div className=''>
        {comments.length > 0 ? (
          <>
            {comments.map((val: CommentData, index) => (
              <div key={index} className="w-full px-6 py-4 shadow-md">
                <span className="flex justify-between items-center">
                  <span>
                    <Image src={val.User.image} alt={val.User.name} width={200} height={300} className="w-12 h-12 rounded-full" />
                    <span className="uppercase font-bold mt-3 text-gray-600">{val.User.name}</span>
                  </span>
                  <ActionBtn className="w-8 h-8 text-black" />
                </span>
                <p ref={commentLineRef} className={`text-black py-2`}>
                  {showFullComment ? val.comment : val.comment.slice(0, 100)} {/* Show full comment if showFullComment is true */}
                </p>
                {val.comment.length > 100 && ( // Display "Read More" button if comment length is greater than 100 characters and showFullComment is false
                  <button className="font-bold text-gray-500" onClick={toggleShowFullComment}>
                    {showFullComment ? "show less" : "Read More"}
                  </button>
                )}
                <div className="relative my-2">
                    <IoMdHeart onClick={()=>onLikeComment(val.id)} className={`mt-2 text-xl absolute -top-4 right-2 cursor-pointer ${val.id === val?.CommentLikes[0]?.CommentId?"text-red-400":""}`} /><span className="absolute -top-1 right-0">{val.likesCount}</span>
                </div>
              </div>
            ))}
          </>
        ) : (
          <div className='w-full h-full px-6 py-12 flex justify-center items-center'>
            <h4>No comments found...</h4>
          </div>
        )}
      </div>

    );
  };

  export default CommentDisplay;