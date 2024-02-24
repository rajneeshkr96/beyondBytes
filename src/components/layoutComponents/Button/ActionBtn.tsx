import React from 'react'
import { HiOutlineDotsHorizontal } from "react-icons/hi";
const ActionBtn = ({
  className,
}:{
  className?:string
}) => {
  return (
    <div className={`cursor-pointer  rounded-full  flex justify-center items-center ${className}`}>
      <HiOutlineDotsHorizontal className='w-[90%] h-[90%]' />
    </div>
  )
}

export default ActionBtn
