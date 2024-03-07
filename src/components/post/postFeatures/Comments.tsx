"use client"
import ActionBtn from '@/components/layoutComponents/Button/ActionBtn';
import SubmitButton from '@/components/layoutComponents/Button/SubmitButton';
import { IoMdClose } from "react-icons/io";
import Image from 'next/image';
import React, { Dispatch, SetStateAction } from 'react'


export function Comment({visible,close}:{visible:boolean,close:Dispatch<SetStateAction<boolean>>}) {

  return (
    <section className={`fixed w-[25vw] px-4 py-6 z-20 right-0 top-0  ease-in duration-75 bg-white min-h-screen ${visible?"translate-x-[0] visible":"translate-x-[25vw] "}`}>
      <IoMdClose onClick={()=>close(!visible)} className='absolute text-black right-2 top-2 text-2xl cursor-pointer' />

      {/* write comment  */}
      <div className='shadow-lg py-2'>
        <span>
            <Image src={"/img3.jpg"} alt={"kkk"} width={200} height={300} className='w-12 h-12 rounded-full' />
            <span className='uppercase font-bold mt-3 text-gray-600'>raju bhai....</span>
        </span>
        <textarea name="comment" id="" placeholder='Write Your Comment Here........' className='w-full outline-none px-2 text-black my-2' cols={30}rows={6}></textarea>
        <SubmitButton className='bg-[#333] text-white px-4 py-2 rounded-lg w-auto mx-auto block' value="comment..."/>
      </div>
      {/* comments  */}
      <div>
        <div className='w-full px-6 py-4'>
          <span className='flex justify-between items-center'>
            <span>
              <Image src={"/img3.jpg"} alt={"kkk"} width={200} height={300} className='w-12 h-12 rounded-full' />
              <span className='uppercase font-bold mt-3 text-gray-600'>raju bhai....</span>
            </span>
            <ActionBtn className='w-8 h-8 text-black'/>
          </span>
          <p className='text-black py-2'>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit natus sunt neque iure. Atque, nesciunt magnam expedita facere quo voluptatibus, illo cumque a necessitatibus blanditiis sed omnis dolores nihil culpa.
          </p>
        </div>
      </div>
    </section>
  )
}
