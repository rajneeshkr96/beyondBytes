"use client"
import axios from "axios";
import { useSession } from "next-auth/react"
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { errorToastHandler } from "../../errorTostHandler";
import Loading from "@/app/loading";
import Modal from "@/components/Modals/Modal";
import SubmitButton from "../../layoutComponents/Button/SubmitButton";
import { TbPhotoEdit } from "react-icons/tb";
import { MdReportProblem } from "react-icons/md";
import { useRouter } from "next/navigation";
const   ActionOptions = ({id,authId,slug,disable}:{id:string,authId:string,slug:string,disable?:boolean}) => {
  const session = useSession();
  const router = useRouter();
  const btnClass = 'w-full px-4 py-2 capitalize flex justify-center items-center gap-x-2'
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
  const report = ()=>{
    
  }

    return (
      <>
        {fullLoading && <Loading background='bg-[#33333375]'/>}
        {!disable && <>
          <button className={btnClass} onClick={onFollow}>{isFollow?"unfollow author":"follow author"}</button>
          <button className={btnClass}>mute author</button>
        </>}
          {authId === session.data?.user.userId && <button className={btnClass} onClick={()=>router.push(`/write/edit?slug=${slug}&id=${id}`)}><TbPhotoEdit /> edit</button>}
        <Modal className="px-12 py-2 " btnClass={`${btnClass} text-red-400`} button={"report" }>
          <div className="px-4 py-2 ">
            <h4 className="font-semibold text-xl my-4">Report Post</h4>
            <div className="flex flex-col gap-y-2">
              <span>
                <input type="radio" id="Harassment" name="report_post" defaultValue="Harassment" />
                <label className="mx-1" htmlFor="Harassment">Harassment</label>
              </span>
              <span>
                <input type="radio" id="Rules_Violation" name="report_post" defaultValue="Rules_Violation" />
                <label className="mx-1" htmlFor="Rules_Violation">Rules Violation</label>
              </span>
              <span>
                <input type="radio" id="Spam" name="report_post" defaultValue="Spam" />
                <label className="mx-1" htmlFor="Spam">Spam</label>
              </span>

            </div>
            <SubmitButton className="px-4 py-2 bg-red-400 text-white rounded-3xl my-3" value="Report"/>
          </div>
        </Modal>
      </>
    )
  }

  export default ActionOptions;