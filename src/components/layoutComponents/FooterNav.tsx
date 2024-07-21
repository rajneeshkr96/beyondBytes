import Link from 'next/link'
import React from 'react'
import { FiPlusCircle } from "react-icons/fi";
import { ImHome } from "react-icons/im";
import { FaUserSecret } from "react-icons/fa";
import { IoSearchCircleSharp } from "react-icons/io5";
import { AiFillMessage } from "react-icons/ai";
const FooterNav = () => {
    return (
        <div className="main">
            <div className="fixed bottom-0 flex justify-center flex-row w-full h-12 bottom-nav ">
                <div className="nav-slot bg-main-color round-top-left">
                    <Link
                        href="/"
                        className="nav-link"
                    >
                        <ImHome className='w-full h-full' />
                    </Link>
                </div>
                <div className="nav-slot bg-main-color">
                    <Link
                        href="#"
                        className="nav-link"
                    >
                        <IoSearchCircleSharp  className='w-full h-full' />
                        
                    </Link>
                </div>
                <div className="nav-slot relative curve">
                    <Link
                        href="/write/new"
                        className="fixed left-[5px] right-0 mx-auto bottom-6 bg-main-bg border  w-14 h-14 rounded-full text-center"
                    >
                        <FiPlusCircle className='bg-main-text-color w-full h-full rounded-full text-white text-2xl' />
                    </Link>
                </div>
                <div className="nav-slot bg-main-color">
                    <Link
                        href="#"
                        className="nav-link"
                    >
                        <AiFillMessage className='w-full h-full' />
                    </Link>
                </div>
                <div className="nav-slot bg-main-color round-top-right">
                    <Link
                        href="#"
                        className="nav-link"
                    >
                        <FaUserSecret className='w-full h-full' />
                    </Link>
                </div>
            </div>
        </div>

    )
}

export default FooterNav
