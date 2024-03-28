import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { IoMdClose, IoMdHeart } from "react-icons/io";
import { toast } from 'react-toastify';
import axios from 'axios';
import { errorToastHandler } from '@/components/errorTostHandler';
import ActionBtn from '@/components/layoutComponents/Button/ActionBtn';
import CommentDisplay, { CommentData } from './DisplayComments';
import CommentInput from './CommentInput';
import Loading from '@/app/loading';




interface CommentProps {
  id: string;
  commentCount: number;
  visible: boolean;
  close: (visible: boolean) => void;
  isAuth: string;
  author?: {name: string, image: string};
}
export const Comment: React.FC<CommentProps> = ({ id, commentCount, visible, close, isAuth, author }) => {
  const [loading, setLoading] = useState(false);
  const [fullLoading,setFullLoading] = useState(false);
  const [showFullComment, setShowFullComment] = useState(false);
  const [useComment, setUseComment] = useState<CommentData[]>([]);
  const [commentCounts, setCommentCounts] = useState(commentCount);
  const commentLineRef = useRef<HTMLParagraphElement>(null);
  const addComment = async (comment: string) => {
    try {
      if (isAuth === "authenticated") {
        setLoading(true);
        const res = await axios.post(`/api/user/comment/add/${id}`, { comment });
        if (res.data.success) {
          toast.success("comment added successfully");
          setCommentCounts(commentCounts + 1);
          close(false);
        }
      } else {
        toast.error("Please Login first");
      }
      setLoading(false);
    } catch (error: any) {
      setLoading(false);
      errorToastHandler(error);
    }
  };

  useEffect(() => {
    getComments();
  }, [commentCounts]);

  const getComments = async () => {
    try {
      const res = await axios.get(`/api/user/comment/get/${id}`);
      if (res.data.success) {
        setUseComment(res.data.data);
      }
    } catch (error: any) {
      errorToastHandler(error);
    }
  };

  const handleScroll = (e: React.WheelEvent<HTMLDivElement>) => {
    const delta = e.deltaY;
    if (delta !== 0 && commentLineRef.current) {
      const isAtBottom = commentLineRef.current.scrollHeight - commentLineRef.current.scrollTop === commentLineRef.current.clientHeight;
      if ((delta < 0 && commentLineRef.current.scrollTop === 0) || (delta > 0 && isAtBottom)) {
        e.stopPropagation();
      }
    }
  };

  const toggleShowFullComment = () => {
    setShowFullComment((prev) => !prev);
  };

  return (
    <>
    {fullLoading && <Loading background='bg-[#33333375]'/>}
    <section className={`fixed w-[28vw] max-lg:w-[50vw] max-md:w-[90vw] h-screen overflow-y-scroll px-4 py-6 z-[10000] right-0 top-0  ease-in duration-75 bg-white min-h-screen  ${visible ? "translate-x-[0] visible" : "translate-x-[28vw] max-lg:translate-x-[50vw] max-md:translate-x-[90vw] min-h-screen"}`} onWheel={handleScroll}>
      <IoMdClose onClick={() => close(!visible)} className='absolute text-black right-2 top-2 text-2xl cursor-pointer' />

      {/* Comment input */}
      <CommentInput id={id} addComment={addComment} loading={loading} author={author} />

      {/* Comment display */}
      <CommentDisplay isAuth={isAuth} setFullLoading={setFullLoading} commentLineRef={commentLineRef} comments={useComment} setComments={setUseComment} showFullComment={showFullComment} toggleShowFullComment={toggleShowFullComment} />
    </section>
    </>
  );
};

export default Comment;

