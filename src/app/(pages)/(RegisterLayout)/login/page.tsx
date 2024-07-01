"use client"
import SubmitButton from '@/components/layoutComponents/Button/SubmitButton'
import CustomInputBox from '@/components/layoutComponents/InputBox'
import Link from 'next/link'
import React from 'react'
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { signIn } from "next-auth/react";

const page = () => {

  return (
      <div className=' text-dark-color mx-auto my-auto w-10/12 flex flex-col justify-center items-center'>
      <h3 className='text-3xl font-bold mx-auto'>
        Welcome back
      </h3>
      <p className='text-gray-600 text-center px-4'>welcome back! please enter your details</p>
        <form className='flex flex-col gap-y-2 mt-4'>
          <CustomInputBox placeholder='Enter your Email' label='email' />
          <CustomInputBox placeholder='Enter password' type='password' label='Password' />
          <Link className='text-main-text-color text-sm self-end text-end px-2' href={'#'}>Forget Password</Link>
          <SubmitButton className='w-full '>
            login in
          </SubmitButton >
        </form>
        <p className='text-gray-600 text-center px-4'>or</p>
        <div className='w-auto'>
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
        </div>
      </div>
  )
}

export default page
