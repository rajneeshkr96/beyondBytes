
import React from "react";
import { currentUser } from "@/lib/authDet";
import Image from "next/image";
import SubmitButton from "@/components/layoutComponents/Button/SubmitButton";
import Link from "next/link";
import axios from "axios";

interface HeaderProps {}
const Header: React.FC<HeaderProps> = async () => {
  const user = await currentUser();

  

  return (
    <div className="flex min-h-screen w-3/4 mx-auto relative right-20  gap-3 ">
      <div className="relative md:w-1/3 md:h-1/3   mx-auto border-gray-400 p-2 border-spacing-1 border-4 rounded-full overflow-hidden">
        <Image
          src={user?.image ? user.image : "./user.png"}
          className=" flex-1 mr-4 rounded-full"
          alt={user ? user.username : "user"}
          width={600}
          height={600}
        />
      </div>
      <div>
        <div className="flex gap-3 mt-3 p-3  w-3/4 mx-auto">
          <p className="text-2xl font-bold">{user?.name}</p>
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
            />
          </span>
        </div>

        <div className="flex gap-3 mt-1 px-3  w-3/4 mx-auto">
          <Link href={`#`} className="text-lg  text-gray-900 font-semibold">Followers: 100</Link >
          <Link href={`#`} className="text-lg text-gray-900 font-semibold">Following: 100</Link >
        </div>
        <div className="w-3/4 mx-auto mt-1 px-3">
          <p className="text-lg font-mediumt-">BIO : Lorem ipsum dolor, sit amet consectetur adipisicing elit. Harum facilis laboriosam dolor quaerat iste, repellat fuga unde! Iure, sed.</p>
          <p className="text-sm"></p>
        </div>
      </div>
    </div>
  );
};

export default Header;
