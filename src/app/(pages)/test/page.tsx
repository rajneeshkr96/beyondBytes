"use client"
import React from 'react'
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { signIn } from "next-auth/react";
const page = () => {
  return (
    <div className="nav-item absolute right-1 top-16 bg-white dark:bg-[#42464D] p-8 rounded-lg w-96">
        <div className='flex flex-col justify-center items-center text-center'>
            <p className="font-semibold text-lg dark:text-gray-200">Sign Up / Sign In </p>
            <button
            value="Sign Up with Google"
            onClick={()=>signIn("google") } 
            className="bg-white border py-2 w-3/4  justify-center   gap-4 flex rounded-lg mt-5 text-sm hover:scale-105 duration-300 text-[--first-color]"
          >
            <FcGoogle className=" text-2xl" />
            <p className='text-gray-900  font-semibold '>Google</p>
          </button>

        </div>
        <div className='flex mt-2 items-center justify-center gap-2 text-center '><hr className='w-[30%]  '  /><p className='p-2'>or</p>  <hr className='w-[30%]  ' /></div>
        <div className='flex flex-col justify-center items-center text-center'>
            <button
            value="Sign Up with Github"
            onClick={()=>signIn("github") } 
            className="bg-white border py-2 w-3/4   gap-4 flex justify-center rounded-lg mt-2 text-sm hover:scale-105 duration-300 text-[--first-color]"
          >
            <FaGithub  className=" text-2xl" />
            <p className='text-gray-900  font-semibold '>Github</p>
          </button>

        </div>
  
   
  </div>
  )
}

export default page