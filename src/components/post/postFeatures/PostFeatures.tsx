"use client"
import React, { useState } from 'react'
import { IoIosHeart } from "react-icons/io";
import { FaCommentAlt } from "react-icons/fa";



function Comment({visible}:{visible:boolean}) {
     
  return (
    <div className={`fixed w-[25vw] z-20 right-0 top-0  ease-in duration-75 bg-white min-h-screen ${visible?"translate-x-[0] visible":"translate-x-[25vw] "}`}>
      kkkkkkkkkkkkkkkkkkkkkkkkkkkdsfjlksjkfkkkkkkkkkkkkjj
    </div>
  )
}



const PostFeatures = () => {
    const [viewCmt,setViewCmt] = useState(false);
    console.log(viewCmt);
    return (
        <section>
            <div>
                <span>tag</span>
                <ul>
                    <li>kkkk</li>
                </ul>
            </div>

            <div className='flex justify-between'>
                <span className='flex gap-x-8 text-4xl'>
                    <span className='flex items-end cursor-pointer'>
                        <IoIosHeart style={{ color: `${"meLike" ? "#ff5c63" : ""}` }} />
                        <p className='text-[#5f5f5f] text-base '>{"55"}</p>
                    </span>
                    <FaCommentAlt onClick={()=>setViewCmt(!viewCmt)} />
                </span>
                <span></span>
            </div>

            <Comment visible={viewCmt}/>

        </section>
    )
}

export default PostFeatures
