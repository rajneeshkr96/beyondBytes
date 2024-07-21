import SubmitButton from '@/components/layoutComponents/Button/SubmitButton'
import CustomInputBox from '@/components/layoutComponents/InputBox'
import Link from 'next/link'
import React from 'react'
import { IoIosSend } from "react-icons/io";

const page = () => {
  return (
    <div className=' text-dark-color mx-auto my-auto max-md:w-full w-10/12 flex flex-col justify-center items-center'>
      <h3 className='text-3xl font-bold mx-auto w-full text-center'>
        Get in touch
      </h3>
      <p className='text-gray-600 text-center px-4 w-10/12  text-sm'>Our friendly team would love hear from you</p>
      <form className='flex flex-col gap-y-2 my-6'>
        <CustomInputBox placeholder='Enter your Name' label='Name*' />
        <CustomInputBox placeholder='Enter your Email' label='Email*' />
        <CustomInputBox placeholder='Enter Phone Number' type='number' label='Phone Number*' />
        <textarea name="" className='p-4 border border-gray-300 rounded-md outline-none' placeholder='Enter your Message' id=""></textarea>
        <p className='text-sm'>You agree to our friendly <Link href="/privacy-policy" className='underline cursor-pointer'></Link >privacy policy</p>
        <SubmitButton className='w-full '>
          <>
          Send Message
          <IoIosSend className='text-sm' />
          </>
        </SubmitButton >
      </form>
    </div>
  )
}

export default page
