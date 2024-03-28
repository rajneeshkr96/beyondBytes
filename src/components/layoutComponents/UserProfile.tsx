import React from "react";
import { MdOutlineCancel } from "react-icons/md";
import { Button } from ".";
import { useAppSelector } from "@/redux/hooks";
import { currentUser } from "@/lib/authDet";
import { FiCreditCard } from "react-icons/fi";
import { BsCurrencyDollar, BsShield } from "react-icons/bs";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { signIn } from "next-auth/react";
import { signOut } from "next-auth/react";
import Image from "next/image";

interface UserProfileProps {
  name: string;
  email: string;
  role: string;
  image: string;
  oAuthSession?: string;
}

const UserProfile: React.FC<UserProfileProps> = ({
  email,
  name,
  oAuthSession,
  role,
  image,
}) => {
  const { currentColor } = useAppSelector((state) => state.theme);
  console.log(email, name, oAuthSession, role, image);

  const userProfileData = [
    {
      icon: <BsCurrencyDollar />,
      title: "My Profile",
      desc: "Account Settings",
      iconColor: "#03C9D7",
      iconBg: "#E5FAFB",
    },
    {
      icon: <BsShield />,
      title: "My Inbox",
      desc: "Messages & Emails",
      iconColor: "rgb(0, 194, 146)",
      iconBg: "rgb(235, 250, 242)",
    },
    {
      icon: <FiCreditCard />,
      title: "My Tasks",
      desc: "To-do and Daily Tasks",
      iconColor: "rgb(255, 244, 229)",
      iconBg: "rgb(254, 201, 15)",
    },
  ];

  return (
    <div className="nav-item absolute right-1 top-16 bg-white dark:bg-[#42464D] p-8 rounded-lg w-96 shadow-md max-md:w-11/12">
          <div className="flex justify-between items-center">
            <Button
              icon={<MdOutlineCancel />}
              color="rgb(153, 171, 180)"
              bgHoverColor="light-gray"
              size="2xl"
              borderRadius="50%"
            />
          </div>
      {oAuthSession == "authenticated" ? (
        <>
          <div className="flex gap-5 items-center mt-6 border-color border-b-1 pb-6">
            <Image
              className="rounded-full h-24 w-24"
              src={
                image
                  ? image
                  : "/user.png"
              }
              alt="user-profile"
              width={200}
              height={300}
            />
            <div>
              <p className="font-semibold text-xl dark:text-gray-200">
                {" "}
                {name}{" "}
              </p>
              <p className="text-gray-500 text-sm dark:text-gray-400">
                {" "}
                {role}{" "}
              </p>
              <p className="text-gray-500 text-sm font-semibold dark:text-gray-400 overflow-hidden">
                {" "}
                {email}{" "}
              </p>
            </div>
          </div>
          <div>
            {userProfileData.map((item, index) => (
              <div
                key={index}
                className="flex gap-5 border-b-1 border-color p-4 hover:bg-light-gray cursor-pointer  dark:hover:bg-[#42464D]"
              >
                <button
                  type="button"
                  style={{
                    color: item.iconColor,
                    backgroundColor: item.iconBg,
                  }}
                  className=" text-xl rounded-lg p-3 hover:bg-light-gray"
                >
                  {item.icon}
                </button>

                <div>
                  <p className="font-semibold dark:text-gray-200 ">
                    {item.title}
                  </p>
                  <p className="text-gray-500 text-sm dark:text-gray-400">
                    {" "}
                    {item.desc}{" "}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-5">
            <button
              color="white"
              style={{ backgroundColor: currentColor }}
              className="text-white p-3 w-full rounded-lg"
              onClick={() => signOut()}
            >
              Sign Out
            </button>
          </div>
        </>
      ) : (
        <>
          <div className="flex flex-col justify-center items-center text-center">
            <p className="font-semibold text-lg dark:text-gray-200">
              Sign Up / Sign In{" "}
            </p>
            <button
              value="Sign Up with Google"
              onClick={() => signIn("google")}
              className="bg-white border py-2 w-3/4  justify-center   gap-4 flex rounded-lg mt-5 text-sm hover:scale-105 duration-300 text-[--first-color]"
            >
              <FcGoogle className=" text-2xl" />
              <p className="text-gray-900  font-semibold ">Google</p>
            </button>
          </div>
          <div className="flex mt-2 items-center justify-center gap-2 text-center ">
            <hr className="w-[30%]  " />
            <p className="p-2">or</p> <hr className="w-[30%]  " />
          </div>
          <div className="flex flex-col justify-center items-center text-center">
            <button
              value="Sign Up with Github"
              onClick={() => signIn("github")}
              className="bg-white border py-2 w-3/4   gap-4 flex justify-center rounded-lg mt-2 text-sm hover:scale-105 duration-300 text-[--first-color]"
            >
              <FaGithub className=" text-2xl" />
              <p className="text-gray-900  font-semibold ">Github</p>
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default UserProfile;
