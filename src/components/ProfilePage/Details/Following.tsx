"use client";
import React from "react";
import Image from "next/image";
import Pagination from "@/components/Pagination/Pagination";
import { useParams } from "next/navigation";
import axios from "axios";
import SubmitButton from "@/components/layoutComponents/Button/SubmitButton";
import { toast } from "react-toastify";
import { errorToastHandler } from "@/components/errorTostHandler";


interface FollowingProps {
  id: string;
  name: string;
  image: string;
  role: string;
  username: string;
}

const Following = () => {
  const params = useParams();
  const [isFollow,setIsFollow] = React.useState(false);
  const [follow , setFollow] = React.useState("");
  const [fullLoading,setFullLoading] = React.useState(false);

  const id = params.id[2];
  const [following, setFollowing] = React.useState([]);


  // const onFollow = async (id:string) =>{
  //   try {
    
  //     setFullLoading(true);
  //     const res = await axios.post(`/api/user/follows/${id}`);
  //     if(res.data.success){
  //       setIsFollow(!isFollow);
  //       toast.success(res.data.message);
  //     }
  //     setFullLoading(false);
  //   } catch (error:any) {
  //     setFullLoading(false);
  //     setIsFollow(false);
  //     errorToastHandler(error);
  //   }
  // }
 
  const getFollowings = async () => {
    try {
      const { data } = await axios.get(
        `/api/user/follows/following/allFollowing/${id}`
      );

 
      if (data.success === true) {
        setFollowing(data.data.allFollowing);
      }
    } catch (error) {
      console.log(error);
    }
  };

  
  const onFollow = async (id:string) =>{
    try {
    
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


  React.useEffect(() => {
    const checkFollow = (id:string) =>{
      if(isFollow){
        setFollow( "unfollow")
      }else{
        setFollow( "follow")
      }
    }
    checkFollow(id);  
    getFollowings();
  }, [id,isFollow]);
    


  return (
      <div className="bg-[#e9effd] rounded-md w-1/3 max-sm:w-11/12 flex flex-col p-2  mx-auto">
        {following?.map((data: FollowingProps) => (
          <div key={data.id} className="flex gap-4 p-1  border-slate-300 border-1">
            <Image
              src={data.image}
              alt="profile"
              width={50}
              height={50}
              className="rounded-full"
            />
            <div>
              <p className="text-xl text-gray-700">{data.name}</p>
              <p className="text-xs text-gray-500 ">{data.username}</p>
            </div>
            <div className="flex-grow flex items-center">
              {data.role ==="USER" ?  "" :<SubmitButton  onClick={()=> onFollow(data.id)} className="border-2 bg-blue-400 rounded-md px-2 ml-auto relative right-1 " value={follow }/>
          }
            </div>
          </div>
        ))}
        {/* <Pagination
            className="justify-center mt-4"
            path="/profile/dashboard/ADMIN"
            page={currentPage}
            keyword={keyword}
            documentCount={documentCount}
          }
          {/* <Pagination
            className="justify-center mt-4"
            path="/profile/dashboard/ADMIN"
            page={currentPage}
            keyword={keyword}
            documentCount={documentCount}
          /> */}
      </div>
  );
};

export default Following;
