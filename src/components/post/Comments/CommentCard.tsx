import React from 'react'
import Image from "next/image";
import { BsReply } from "react-icons/bs";
import { BiLike } from "react-icons/bi";
import { BiDislike } from "react-icons/bi";
import DropDown from "@/components/layoutComponents/Button/Dropdown";
import { MdDeleteOutline, MdReportProblem } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
import Link from "next/link";
import axios from 'axios';
interface CommentCardProps {
    comment: {
        UserImage: string;
        name: string;
        createdAt: string;
        comment: string;
        UserName: string;
        likesCount: number;
        repliesCount: number;
        id: string;
    }
    
    
}


const CommentCard:React.FC<CommentCardProps & {isReply: boolean, setIsReply: (value: boolean) => void,setReplyUserName:(value:string) =>void,setReplyId:(value:string)=>void }> = ({comment, isReply, setIsReply,setReplyUserName,setReplyId }) => {
    let success = false;
    const addRemoveLike = async (commentsId: string) => {
        try {
          const res = await axios.post(`/api/user/comment/like/${commentsId}`);
          success = true;
          return null;
        } catch (error) {
          console.log(error);
          success = false;
          return null;
        }
      };
      const replyTocomment = (commentsId: string) => {
        setReplyId(commentsId);
        setIsReply(true);
        console.log("reply to comment", isReply

        );
        if(isReply){
          setReplyUserName(comment.UserName);
        }
        return isReply
        
    };


    const commentsElements = [
        {
          name: "Like",
          icon: <BiLike />,
          apiFunction: addRemoveLike,
        },
        {
          name: "Reply",
          icon: <BsReply />,
          apiFunction: replyTocomment,
        },
      ];
      const dropdownElements = [
        {
          name: "Edit",
          icon: <CiEdit className="w-6 max-sm:w-4 h-6 max-sm:h-4 " />,
          className: "text-black",
        },
        {
          name: "Delete",
          icon: <MdDeleteOutline className="w-6 max-sm:w-4 h-6 max-sm:h-4" />,
          className: "text-black",
        },
        {
          name: "Report",
          icon: <MdReportProblem className="w-6 max-sm:w-4 h-6 max-sm:h-4" />,
          className: "text-red-500 ",
        },
      ];


  return (
    <>
    <article className=" text-base bg-white rounded-lg dark:bg-gray-900 px-2 mt-3 border ">
          <footer className="flex justify-between items-start !relative  !px-0 !py-3 mt-5">
            <div className=" items-center">
              <div className="flex w-full ">
                <Image
                  width={24}
                  height={24}
                  className="mr-2 w-6 h-6 relative max-sm:top-2.5 md:top-1 rounded-full"
                  src={
                    comment.UserImage
                      ? comment.UserImage
                      : "https://lh3.googleusercontent.com/a/ACg8ocKGKHmisSQpCqk2ykJStKwGDGu95aV_zi976oOn06DbmV8=s96-c"
                  }
                  alt="Michael Gough"
                />
                <p className="inline-flex items-center !capitalize mr-3 max-sm:w-36 text-sm text-gray-900 dark:text-white font-semibold">
                  {comment.name}
                </p>
              </div>
              <p className="text-sm text-gray-600 md:ml-8 max-sm:ml-8   dark:text-gray-400">
                <time dateTime="2022-02-08" title="February 8th, 2022">
                  {comment.createdAt.split("T")[0]}
                </time>
              </p>
            </div>
            <DropDown
              className="text-black"
              content={dropdownElements}
            ></DropDown>
          </footer>
          <p className="text-gray-500 text-start dark:text-gray-400">
            {comment.comment}
          </p>
          <div className="flex items-center mt-4 space-x-3">
            {commentsElements.map((item, index) => (
              <div
                key={index}
                className="cursor-pointer flex items-center text-center  pb-2 text-black  "
              >
                <Link className="text-xs  mr-1.5" href={`#`}>
                  {item.name==="Like"?comment?.likesCount:""} {item.name}
                </Link>
                <span
                  onClick={async (event) => {
                    event.preventDefault();
                    try {
                      await item.apiFunction(comment.id);
                    } catch (error) {
                      console.error(error);
                    }
                  }}
                >
                  {item.icon}
                </span>
              </div>
            ))}
          </div>
          {/* make view all replies */}
          {comment.repliesCount > 0 && (
            <div className="flex items-center text-xs  mr-1.5 mt-4 space-x-3">
              <p className="">View all {comment.repliesCount} replies</p>
            </div>
          )}
        </article>
    </>
  )
}

export default CommentCard