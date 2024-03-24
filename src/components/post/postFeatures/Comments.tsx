import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { IoMdClose, IoMdHeart } from "react-icons/io";
import { toast } from 'react-toastify';
import axios from 'axios';
import { errorToastHandler } from '@/components/errorTostHandler';
import ActionBtn from '@/components/layoutComponents/Button/ActionBtn';


interface CommentData {
  id: string;
  comment: string;
  User: {
    id: string;
    name: string;
    email: string;
    image: string;
    role: string;
  };
}
export function Comment({id, commentCount, visible, close, isAuth, author}:{
  id: string,
  commentCount: number,
  visible: boolean,
  close: (visible: boolean) => void,
  isAuth: string,
  author?: {name: string, image: string}
}) {
  
  const [loading, setLoading] = useState(false);
  const [showFullComment, setShowFullComment] = useState(false);
  const [comment, setComment] = useState("");
  const [useComment, setUseComment] = useState([]);
  const [commentCounts, setCommentCounts] = useState(commentCount);
  const commentLineRef = useRef<HTMLParagraphElement>(null);

  const addComment = async () => {
    try {
      if(!comment){
        toast.error("Please enter a comment");
        return;
      }
      if (isAuth === "authenticated") {
        setLoading(true);
        const res = await axios.post(`/api/user/comment/add/${id}`, { comment });
        if(res.data.success){
          toast.success("comment added successfully");
          setComment("");
          setCommentCounts(commentCounts + 1);
          close(false);
        }
      } else {
        toast.error("Please Login first");
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

  const handleScroll = (e: React.WheelEvent<HTMLDivElement>) => {
    const delta = e.deltaY;
    if (delta !== 0 && commentLineRef.current) {
      const isAtBottom = commentLineRef.current.scrollHeight - commentLineRef.current.scrollTop === commentLineRef.current.clientHeight;
      if ((delta < 0 && commentLineRef.current.scrollTop === 0) || (delta > 0 && isAtBottom)) {
        e.stopPropagation();
      }
    }
  }
  const toggleShowFullComment = () => {
    setShowFullComment((prev) => !prev);
  };

  return (
    <section className={`fixed w-[28vw] h-screen overflow-y-scroll px-4 py-6 z-20 right-0 top-0  ease-in duration-75 bg-white min-h-screen  ${visible?"translate-x-[0] visible":"translate-x-[28vw] min-h-screen"}`} onWheel={handleScroll}>
      <IoMdClose onClick={()=>close(!visible)} className='absolute text-black right-2 top-2 text-2xl cursor-pointer' />

      {/* write comment  */}
      <div className='shadow-lg py-2'>
        <span>
            <Image src={author?.image ?? "/user.png"} alt={author?.name ?? "user"} width={200} height={300} className='w-12 h-12 rounded-full' />
            <span className='uppercase font-bold mt-3 text-gray-600'>{author?.name ?? "user"}</span>
        </span>
        <textarea onChange={(e)=>setComment(e.target.value)} value={comment} name="comment" id="" placeholder='Write Your Comment Here........' className='w-full outline-none px-2 text-black my-2' cols={30} rows={6}></textarea>
        <button onClick={addComment} disabled={loading} className='bg-[#333] text-white px-4 py-2 rounded-lg w-auto mx-auto block' value="comment...">
          {loading ? 'Adding Comment...' : 'Comment'}
        </button>
      </div>
      {/* comments  */}
      <div className=''>
        {commentCounts > 0 ? (
          <>
            {useComment.map((val: CommentData, index) => (
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
                {val.comment.length > 100  && ( // Display "Read More" button if comment length is greater than 100 characters and showFullComment is false
                  <button className="font-bold text-gray-500" onClick={toggleShowFullComment}>
                    {showFullComment ?"show less":"Read More"}
                  </button>
                )}
                {<IoMdHeart className="mt-2 text-xl ml-[92%]" />}
              </div>
            ))}
          </>
        ) : (
          <div className='w-full h-full px-6 py-12 flex justify-center items-center'>
            <h4>No comments found...</h4>
          </div>
        )}
      </div>
    </section>
  );
}
