"use client"
import React from 'react'
import localFont from 'next/font/local'
import { BiSolidLogInCircle } from "react-icons/bi";
import SubmitButton from './Button/SubmitButton'
import { useRouter } from 'next/navigation';
const ogg = localFont({ src: '../../fonts/Ogg-Medium-BF646c18fc4e918.otf' })
const Navbar = () => {
  const router = useRouter()
  return (
    <div>
      <nav className="fixed top-0 left-0 z-20 bg-main-bg bg-opacity-60 backdrop-blur-sm w-full px-6 py-2 flex justify-between items-center">
        <div onClick={()=>router.push("/")} className={`${ogg.className} font-bold text-xl text-[#4f585a] logo`}>BiyondBytes</div>
        <SubmitButton logoGap='gap-2' className='rounded-3xl' onClick={()=>router.push("/byAuthBtn")}>
          <>
            <BiSolidLogInCircle />
            <span className="text-sm">Login</span>
          </>
        </SubmitButton>
      </nav>
    </div>
  )
}

export default Navbar
