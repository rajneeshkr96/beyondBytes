"use client";
import React, { useState,useRef, useLayoutEffect } from "react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import SubmitButton from "@/components/layoutComponents/Button/SubmitButton";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useParams } from "next/navigation";
import EditProfileModal from "@/components/Modals/EditProfileModal";
import Modal from "@/components/Modals/Modal";
import Loading from "@/app/loading";

interface HeaderProps {}
const Header: React.FC<HeaderProps> = () => {
  const [checkId , setCheckId] = useState(false);
  const [loading, setLoading] = useState(true);
  const altRef = useRef<HTMLInputElement>(null);
  const [profileEditModal,setProfileEditModal]= useState(false)
  let buttonClass ;
  const [profileData, setProfileData] = useState({
    followers: 0,
    following: 0,
    about: "",
    name: "",
    image: "",
    userId:"",
    userName:"",
  });
  const session = useSession();
  const router = useRouter();
  const writeBlogs = () => {
    router.push(`/write/new`);
  };
  const params = useParams();
  const id = params.id[2];
  const userId = session.data?.user?.userId;
  const onCLose = () => {
    setProfileEditModal(false);
  }
  // const handleEditModal = () => {
  //  setProfileEditModal(true);
  //  return <EditProfileModal setDialogRef={altRef} button={" "} onClose={onCLose} open={profileEditModal}/>
    
     
     
  // }



  useLayoutEffect(() => {
    const getProfileData = async () => {
      try {
        const { data } = await axios.get(
         ` /api/user/follows/follower/allFollower/${id}`
        );
        const allfollwing = await axios.get(
          `/api/user/follows/following/allFollowing/${id}`
        );
        const userData = await axios.get("/api/user/data");
        
        if (
          data.success === true &&
          allfollwing.data.success === true &&
          userData.data.success === true
        ) {
          setProfileData((prevState) => ({
            ...prevState,
            followers: data.followers,
            following: allfollwing.data.following,
            image:userData.data.data.image,
            userName: userData.data.data.username,
            about: userData.data.data.about,
            userId: userData.data.data.id,
            name: userData.data.data.name,


          }));
          setLoading(false);
        }
      
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };
    getProfileData();
    if(id === userId){
      setCheckId(true);
    }
   
  }, [id, userId]);
   
  if(!checkId){
    buttonClass = "hidden";
  }
  if(loading){
    return <Loading/>
  }
  return (
    <div className="flex  w-3/4 mx-auto relative right-20 max-sm:w-11/12 max-sm:flex-col max-sm:right-0 gap-3 ">
      <span className="relative md:w-1/3 md:h-1/3 max-sm:w-3/4  mx-auto border-gray-400 p-2 border-spacing-1 border-4 rounded-full overflow-hidden">
        <Image
          src={session?.data?.user?.image ? profileData?.image: "/user.png"}
          className=" flex-1 mr-4 m-auto rounded-full !w-full !h-full"
          alt={session.data?.user ? session?.data?.user?.userName : "user"}
          width={300}
          height={300}
        />
      </span>
      <div className="w-3/4 ml-8 max-sm:w-11/12 max-sm:ml-0">
        <div className="flex max-sm:flex-col max-sm:justify-center max-sm:text-center max-sm:items-center gap-3 mt-3 p-3   mx-auto">
          <p className="text-2xl font-bold">{session?.data?.user?.name}</p>
          {
            session.data?.user?.role ==="USER" ?"":  <div className="max-sm: flex ">
            
            <span>
              <Modal btnClass={`bg-[#35a8c5] border p-2 w-24  max-sm:text-xs  ml-5  !flex-row-reverse rounded-lg text-white text-sm hover:scale-105 duration-300 text-[--first-color] ${buttonClass} `} button={"edit profile"}>
                <EditProfileModal userId={profileData?.userId} bio={profileData?.about} userName = {profileData?.userName} />
              </Modal>
             
            </span>
            <span>
              <SubmitButton
                value={`Write Blogs`}
                className={`bg-[#35a8c5] border p-2 w-24  max-sm:text-xs  ml-5  !flex-row-reverse rounded-lg text-white text-sm hover:scale-105 duration-300 text-[--first-color] ${buttonClass} `}
                onClick={writeBlogs}
              />
            </span>
            </div>
          }
        </div>

        <div className="flex max-sm:justify-center max-sm:text-center max-sm:ite gap-3 mt-1 px-3  mx-auto">
          <span className="text-lg  cursor-pointer text-gray-900 font-semibold">
            Followers:{profileData.followers}
          </span>
          <span className="text-lg cursor-pointer text-gray-900 font-semibold">
            Following:{profileData.following}
          </span>
        </div>
        <div className=" w-9/12 flex max-sm:justify-center  mt-1 max-sm:ml-7 px-3">
          <p className="text-md font-medium"> BIO:</p>
          <p className="text-sm font-  max-sm:mx-auto  px-3 ">
            {profileData.about ? profileData.about : "Hi , I am a content writer"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Header;
