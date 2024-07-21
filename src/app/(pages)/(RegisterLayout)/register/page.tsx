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
        Register
      </h3>
      <p className='text-gray-600 text-center px-4 w-10/12  text-sm'>Share Your Voice, Connect with the World – Blog with Us!</p>
      <form className='flex flex-col gap-y-2 my-6'>
        <CustomInputBox placeholder='Enter your Name' label='Name*' />
        <CustomInputBox placeholder='Enter your Email' label='Email*' />
        <CustomInputBox placeholder='Enter password' type='password' label='Password*' />
        <p className='text-sm'>Must be at least 8 characters</p>
        <SubmitButton className='w-full '>
          <>
          <IoLogIn className='text-sm' />Get Started
          </>
        </SubmitButton >
      </form>
      <div className='flex justify-center gap-x-2 '>
        <span>already have an account</span>
        <Link href='/byAuthBtn' className='text-main-text-color font-bold'>
          Sign in
        </Link>
      </div>

    </div>
  )
}

export default page
