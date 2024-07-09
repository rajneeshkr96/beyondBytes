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
                        href="https://wa.me/6285804233884"
                        target="_blank"
                        className="nav-link"
                    >
                        <ImHome className='w-full h-full' />
                    </Link>
                </div>
                <div className="nav-slot bg-main-color">
                    <Link
                        href="#features"
                        target="_blank"
                        className="nav-link"
                    >
                        <IoSearchCircleSharp  className='w-full h-full' />
                        
                    </Link>
                </div>
                <div className="nav-slot relative curve">
                    <Link
                        href="tel:+62858-0423-3884"
                        target="_blank"
                        className="fixed left-[5px] right-0 mx-auto bottom-6 bg-main-bg border  w-14 h-14 rounded-full text-center"
                    >
                        <FiPlusCircle className='bg-main-text-color w-full h-full rounded-full text-white text-2xl' />
                    </Link>
                </div>
                <div className="nav-slot bg-main-color">
                    <Link
                        href="#testimoni"
                        className="nav-link"
                        title="Testimoni"
                    >
                        <AiFillMessage className='w-full h-full' />
                    </Link>
                </div>
                <div className="nav-slot bg-main-color round-top-right">
                    <Link
                        href="https://maps.app.goo.gl/RMJ3kXzhUH6YKXrt7"
                        target="_blank"
                        className="nav-link"
                        title="Lokasi pada peta"
                    >
                        <FaUserSecret className='w-full h-full' />
                    </Link>
                </div>
            </div>
        </div>

    )
}

export default FooterNav
