"use client"
import SubmitButton from '@/components/layoutComponents/Button/SubmitButton'
import Link from 'next/link'
import React from 'react'
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { signIn } from "next-auth/react";
import { HiOutlineMail } from "react-icons/hi";

const page = () => {

  return (
      <div className=' text-dark-color mx-auto my-auto w-10/12 max-md:w-full flex flex-col justify-center items-center'>
      <h3 className='text-3xl font-bold w-full mx-auto text-center'>
        Welcome back
      </h3>
      <p className='text-gray-600 text-center px-4'>welcome back! please enter your details</p>
        <div className='w-1/2 max-md:w-full my-6'>
          <SubmitButton
            onClick={() => signIn("google")}
            className="bg-white border border-[#D0D5DD] w-full rounded-lg text-sm hover:bg-main-bg"
          ><>
              <FcGoogle className="text-xl" />
              <p className="text-gray-900  font-semibold ">Google</p>
            </>
          </SubmitButton>
          <SubmitButton
            onClick={() => signIn("github")}
            className="bg-white border border-[#D0D5DD] w-full rounded-lg text-sm hover:bg-main-bg my-0"
          >
            <>
              <FaGithub className="text-dark-color text-xl" />
              <p className="text-gray-900  font-semibold ">Github</p>
            </>
          </SubmitButton>
          <SubmitButton className='w-full'>
            <Link href='login' className='flex justify-center gap-x-2 items-center '>
                <HiOutlineMail className='text-sm' /> Continue with mail
            </Link>
          </SubmitButton >
        </div>
        <div className='flex justify-center gap-x-2 flex-wrap'>
            <span>Don`t have an account?</span>
            <Link href='/register' className='text-main-text-color font-bold'>
                Sign up with mail
            </Link>
        </div>
      </div>
  )
}

export default page
