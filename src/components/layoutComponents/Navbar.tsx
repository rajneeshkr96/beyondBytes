"use client"
import React from 'react'
import { useRouter } from 'next/navigation';
import Link from 'next/link';
const Navbar = () => {
  const router = useRouter()
  return (
    <div>
      <nav className="fixed font-serif top-0 left-0 z-20 bg-white bg-opacity-60 backdrop-blur-sm w-full px-24 py-2 flex justify-between items-center max-md:px-6">
        <h1 onClick={()=>router.push("/")} className={` font-bold text-xl text-[#4f585a] logo cursor-pointer`}>BiyondBytes</h1>
        <Link href="/byAuthBtn">Login</Link>
      </nav>
    </div>
  )
}

export default Navbar
