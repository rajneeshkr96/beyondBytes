import React from 'react'
import Link from 'next/link';
import { currentUserProfile } from '@/lib/authDet';
import Image from 'next/image';


const Navbar = async () => {
  const image = await currentUserProfile();
  return (
    
    <div>
      <nav className="fixed font-serif top-0 left-0 z-20 bg-white bg-opacity-60 backdrop-blur-sm w-full px-12 py-2 flex justify-between items-center max-md:px-6">
        <Link href="/">
          <h1 className={` font-bold text-xl text-black logo cursor-pointer`}>BiyondBytes</h1>
        </Link>
        {!!image ?<Link href="/settings">
        <Image
        src={image}
        alt='profile image'
        width={50}
        height={50}
        className='rounded-full w-8 h-8 object-cover border'
        /></Link>:<Link href="/byAuthBtn">Login</Link>}
      </nav>
    </div>
  )
}

export default Navbar
