"use client"
import SubmitButton from '@/components/layoutComponents/Button/SubmitButton'
import CustomInputBox from '@/components/layoutComponents/InputBox'
import Link from 'next/link'
import React from 'react'
import { IoLogIn } from "react-icons/io5";
const page = () => {

  return (
    <div className=' text-dark-color mx-auto my-auto max-md:w-full w-10/12 flex flex-col justify-center items-center'>
      <h3 className='text-3xl font-bold mx-auto w-full max-md:text-center'>
        Welcome back
      </h3>
      <p className='text-gray-600 text-center px-4 text-sm'>welcome back! please enter your details</p>
      <form className='flex flex-col gap-y-2 my-6'>
        <CustomInputBox placeholder='Enter your Email' label='email' />
        <CustomInputBox placeholder='Enter password' type='password' label='Password' />
        <Link className='text-main-text-color text-sm self-end text-end px-2' href={'#'}>Forget Password</Link>
        <SubmitButton className='w-full '>
          <>
          <IoLogIn className='text-sm' />login in
          </>
        </SubmitButton >
      </form>
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
