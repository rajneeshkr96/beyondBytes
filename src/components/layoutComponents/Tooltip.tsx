import React from 'react'
import { FaCaretDown } from "react-icons/fa";
const Tooltip = ({
    children,
    content
  }: {
    children: React.ReactNode
    content:string
  }) => {
  return (
    <div className="container-tooltip relative">
    {children}
    <p className="absolute -top-8 right-0 bg-[#333] text-white rounded-lg px-4 py-2 capitalize  duration-[20ms]  ease-in  -translate-y-12 invisible">
      {content} 
      <FaCaretDown className='absolute -bottom-1 right-2' />
      </p>
    </div>
  )
}

export default Tooltip
