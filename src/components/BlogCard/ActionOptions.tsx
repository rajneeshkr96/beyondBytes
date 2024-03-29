"use client"
import axios from "axios";
import { useSession } from "next-auth/react"
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { errorToastHandler } from "../errorTostHandler";
import Loading from "@/app/loading";
const   ActionOptions = ({id,authId,disable}:{id:string,authId:string,disable?:boolean}) => {
  const session = useSession();
  const btnClass = 'w-full px-4 py-2 capitalize'
  const [isFollow,setIsFollow] = useState(false);
  const [fullLoading,setFullLoading] = useState(false);
  const onFollow = async () =>{
    try {
      if(session.status !== "authenticated"){
        toast.error("please login");
        return;
      }
      setFullLoading(true);
      const res = await axios.post(`/api/user/follows/${id}`);
      if(res.data.success){
        setIsFollow(!isFollow);
        toast.success(res.data.message);
      }
      setFullLoading(false);
    } catch (error:any) {
      setFullLoading(false);
      setIsFollow(false);
      errorToastHandler(error);
    }
  }

  useEffect(() => {
    if(session.status === 'authenticated' && !disable){

      const res = axios.get(`/api/user/follows/follower/get/${authId}`);
      res.then(res => {
        setIsFollow(res.data.data.follow);
      })
    }
  }, [session.status,disable,authId]);
  const onMute = () =>{};

    return (
      <>
        {fullLoading && <Loading background='bg-[#33333375]'/>}
        {!disable && <>
          <button className={btnClass} onClick={onFollow}>{isFollow?"unfollow author":"follow author"}</button>
          <button className={btnClass}>mute author</button>
        </>}
        <button className={`${btnClass} text-red-400`}>Report......</button>
      </>
    )
  }

  export default ActionOptions;