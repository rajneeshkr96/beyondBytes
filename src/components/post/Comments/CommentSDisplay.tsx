"use client";
import React, { useEffect, useState } from "react";
import CommentsInput from "./CommentsInput";
import CommentCard from "./CommentCard";
import axios from "axios";
interface CommentSDisplayProps {
  Blogid: string;
  img?: string;
  name?: string;
  comment?: string;
  time?: string;
  likes?: number;
  dislikes?: number;
  reply?: number;
}

const CommentSDisplay: React.FC<CommentSDisplayProps> = ({ Blogid }) => {
  const [comments, setComments] = useState([]);
  const [isReply, setIsReply] = useState<boolean>(false);
  const [replyUserName, setReplyUserName] = useState("");
  const [replyId, setReplyId] = useState("");

  let success = false;
  const getComments = async () => {
    try {
      const res = await axios.get(`/api/user/comment/get/${Blogid}`);
      if (res.data.success) {
        setComments(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getComments();
  }, [Blogid, success,isReply,replyUserName]);
 


  

  return (
    <div className="w-1/2 max-lg:w-full mx-auto max-sm:w-full">
      <CommentsInput  
      {
        ...isReply ? {id: replyId, isReply: isReply,comments,replyUserName,setIsReply} : {id: Blogid}
      }
       isReply={isReply} />
      {comments.map((comment: any,index) => (
        <CommentCard comment={comment} isReply setIsReply={setIsReply} setReplyUserName={setReplyUserName} setReplyId={setReplyId} key={index} />
        
      ))}
    </div>
  );
};

export default CommentSDisplay;
