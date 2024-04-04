"use client";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import SubmitButton from "@/components/layoutComponents/Button/SubmitButton";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useParams } from "next/navigation";

interface HeaderProps {}
const Header: React.FC<HeaderProps> = () => {
  const [profileData, setProfileData] = useState({
    followers: 0,
    following: 0,
    bio: "",
    name: "",
    image: "",
  });
  const session = useSession();
  const router = useRouter();
  const writeBlogs = () => {
    router.push(`/write/new`);
  };
  const params = useParams();
  const id = params.id[2];
  const getProfileData = async () => {
    try {
      const { data } = await axios.get(
       ` /api/user/follows/follower/allFollower/${id}`
      );
      const allfollwing = await axios.get(
        "/api/user/follows/following/allFollowing"
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
          about: userData.data.data.about,
        }));
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProfileData();
  }, []);
  console.log(profileData.followers);

  return (
    <div className="flex  w-3/4 mx-auto relative right-20  gap-3 ">
      <span className="relative md:w-1/3 md:h-1/3   mx-auto border-gray-400 p-2 border-spacing-1 border-4 rounded-full overflow-hidden">
        <Image
          src={
            session?.data?.user?.image
              ? session?.data?.user?.image
              : "/user.png"
          }
          className=" flex-1 mr-4 m-auto rounded-full !w-full !h-full"
          alt={session.data?.user ? session?.data?.user?.userName : "user"}
          width={300}
          height={300}
        />
      </span>
      <div className="w-3/4 ml-8">
        <div className="flex gap-3 mt-3 p-3   mx-auto">
          <p className="text-2xl font-bold">{session?.data?.user?.name}</p>
          <span>
            <SubmitButton
              value={`Edit Profile`}
              className="bg-[#35a8c5] border p-2 w-24  ml-5  !flex-row-reverse rounded-lg text-white text-sm hover:scale-105 duration-300 text-[--first-color]"
            />
          </span>
          <span>
            <SubmitButton
              value={`Write Blogs`}
              className="bg-[#35a8c5] border p-2 w-24  ml-5  !flex-row-reverse rounded-lg text-white text-sm hover:scale-105 duration-300 text-[--first-color]"
              onClick={writeBlogs}
            />
          </span>
        </div>

        <div className="flex gap-3 mt-1 px-3  mx-auto">
          <span className="text-lg  cursor-pointer text-gray-900 font-semibold">
            Followers: {profileData.followers}
          </span>
          <span className="text-lg cursor-pointer text-gray-900 font-semibold">
            Following: {profileData.following}
          </span>
        </div>
        <div className=" mx-auto mt-1 px-3">
          <p className="text-lg font-mediumt-">
            BIO :
            {profileData.bio ? profileData.bio : "Hi , I am a content writer"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Header;
