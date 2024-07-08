"use client";
import React,{useEffect, useState} from "react";
import CustomInputBox from "@/components/layoutComponents/InputBox";
import { IoIosSend } from "react-icons/io";
import MediaQuery from "@/components/layoutComponents/MediaQuery";
import SubmitButton from "@/components/layoutComponents/Button/SubmitButton";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm,SubmitHandler  } from "react-hook-form";
import * as yup from "yup";
import axios from "axios";

type CommentsInputProps = {
  comment:string;
  
  
};
interface CommentsInputPropsd {
  BlogId:string;
}

const CommentsInput:React.FC<CommentsInputPropsd> = ({BlogId}) => {
  const [comment, setComment] = useState<Boolean>(true);
  useEffect(() => {
    if (comment) {
      setComment(false);
    }
    else {
      setComment(true);
    }
  }, []);
  console.log(comment)
  
  const validateSchema = yup.object().shape({
    comment: yup.string().required()
    .max(500)
    .min(6),
  });
  const forOptions = {resolver:yupResolver(validateSchema)};
  const {register,handleSubmit,formState:{errors}} = useForm<CommentsInputProps>(forOptions);
  const onSubmit: SubmitHandler<CommentsInputProps> = data => {
    try {
      const res = axios.post(`/api/user/comment/add/${BlogId}`,data);
      console.log(res);
    } catch (error) {
      console.log(error);
      
    }
  };

  return (
    <div className="w-[65vw]">
      <form onSubmit={handleSubmit(onSubmit)} className="w-full" action="#">
        <div className="relative w-full  min-w-[200px] h-auto ">
          <MediaQuery maxSize={999}>
            <div className="absolute grid w-5 h-5 place-items-center  text-blue-gray-500 top-2/4 right-3 -translate-y-2/4">
              <button className="!bg-none !border-none p-0 m-0" ><IoIosSend type="submit" className=" cursor-pointer max-sm:w-4 max-sm:h-4 text-2xl" /></button>
            </div>
          </MediaQuery>
          <MediaQuery minSize={1000}>
            <div className="absolute right-0 top-10 flex flex-row-reverse gap-6 my-1  ">
              <SubmitButton type="submit" className="!h-10  !rounded-3xl !my-0" children={"Comment"} />
              <SubmitButton type="reset" className=" !my-0 !rounded-3xl  w-[89px] h-[40px]" children={"cancel"} />
            </div>
          </MediaQuery>
          <input
          {
            ...register("comment",{
              required:"Comment is required",
              maxLength:500
            })
          }
            className="peer w-full h-full  bg-transparent text-blue-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border focus:border-2 border-t-transparent focus:border-t-transparent text-sm px-3 py-2.5 rounded-[7px] !pr-9 border-blue-gray-200 focus:border-gray-900 text-wrap"
            placeholder=" "
          />
          {errors.comment && <p className="text-red-500 text-sm">{errors.comment.message}</p>}
          <label className="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.75] text-gray-500 peer-focus:text-gray-900 before:border-blue-gray-200 peer-focus:before:!border-gray-900 after:border-blue-gray-200 peer-focus:after:!border-gray-900">
            Add a comment...
          </label>
        </div>
      </form>
    </div>
  );
};

export default CommentsInput;
