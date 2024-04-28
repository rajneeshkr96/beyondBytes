"use client";
import React, { useState } from "react";
import { useAppSelector } from "@/redux/hooks";

interface MenuOptions{
    action:string,
    page:JSX.Element
}
interface Head{
    title:string,
    actionBtn:Array<JSX.Element>
}
const SlidingMenu = ({className,menuOptions,head}:{className?:string,menuOptions:MenuOptions[],head?:Head}) => {
    const [active,setActive] = useState(0);
    const { currentColor } = useAppSelector((state) => state.theme);
    return (
      <div className='min-h-full'>
        <section className='w-10/12 max-sm:w-full border-b-2 mx-auto'>
         {head?.title && head.actionBtn && <div className='flex justify-between items-center'>
            <span style={{ color: currentColor }} className='text-5xl font-serif uppercase font-bold max-sm:text-2xl'>{head?.title}</span>
            {head?.actionBtn.map((action,index) =>{return index===active?<span key={index}>{action}</span>:""})}
          </div>}
          <div className={`flex gap-x-6 px-6 mt-6 flex-wrap ${className}`}>
            {menuOptions.map((action,index) => <button key={index} onClick={()=>setActive(index)} className={`capitalize pt-8 pb-4 px-2 transition-colors duration-200 ease-in ${index === active?" text-[#333] border-b-2 max-sm:w-11/12 border-black":"text-gray-500"}`}>{action.action}</button>)}
          </div>
        </section>
        <section className='my-5'>
        {menuOptions.map((action,index) =>{return index===active?<div key={index}
        className={` ${index === 0  }`}
        >
          {action.page}
        </div>:""})}
        </section>
        
      </div>
    )
}

export default SlidingMenu
