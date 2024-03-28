"use client"
import React, { useState } from 'react'

interface MenuOptions{
    action:string,
    page:JSX.Element
}
interface Head{
    title:string,
    actionBtn:JSX.Element
}
const SlidingMenu = ({className,menuOptions,head}:{className?:string,menuOptions:MenuOptions[],head?:Head}) => {
    const [active,setActive] = useState(0);
    return (
      <div className='min-h-full'>
        <section className='w-10/12 border-b-2 mx-auto'>
         {head?.title && head.actionBtn && <div className='flex justify-between items-center'>
            <span className='text-5xl font-serif capitalize font-semibold'>{head?.title}</span>
            {head?.actionBtn}
          </div>}
          <div className={`flex gap-x-6 px-6 mt-6 flex-wrap ${className}`}>
            {menuOptions.map((action,index) => <button key={index} onClick={()=>setActive(index)} className={`capitalize py-8 px-2 transition-colors duration-200 ease-in ${index === active?" text-[#333] border-b-2 border-black":"text-gray-500"}`}>{action.action}</button>)}
          </div>
        </section>
        <section className='my-5'>
        {menuOptions.map((action,index) =>{return index===active?<div key={index}
        className={` ${index === 0 && "bg-pink-400"}`}
        >
          {action.page}
        </div>:""})}
        </section>
        
      </div>
    )
}

export default SlidingMenu
