"use client"
import React, { useEffect, useRef, useState } from 'react';
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { TbTriangleFilled } from "react-icons/tb";
interface ActionBtnProps {
  className?: string;
  actionIcon?: string | React.JSX.Element;
  children?:  string | React.JSX.Element;
}

const ActionBtn: React.FC<ActionBtnProps> = ({ className, actionIcon, children }) => {
  const [visible, setVisible] = useState(false);
  const actionBtnRef = useRef<HTMLDivElement | null>(null);

  const handleClickOutside = (event: MouseEvent) => {
    // Cast `event.target` appropriately to use it with `contains`
    const target = event.target as Node;
    
    if (actionBtnRef.current && !actionBtnRef.current.contains(target)) {
      setVisible(false);
    }
  };

  useEffect(() => {
    // Convert `handleClickOutside` to the correct event listener format
    const handleDocumentClick = (event: MouseEvent) => handleClickOutside(event);

    // Attach the event listener to `document`
    document.addEventListener('click', handleDocumentClick);

    // Clean up the event listener on component unmount
    return () => document.removeEventListener('click', handleDocumentClick);
  }, []); // It's better to attach and detach only once unless necessary to re-attach

  return (
    <div
      ref={actionBtnRef}
      className={`relative cursor-pointer rounded-full flex justify-center items-center ${className}`}
    >
      <span className='w-[90%] h-[90%] block' onClick={() => setVisible(!visible)}>
        {actionIcon ? actionIcon : <HiOutlineDotsHorizontal className='w-[90%] h-[90%]' />}
      </span>
      <div
        className={`absolute action-btn right-3 bg-black text-white duration-150 ease-in-out   rounded-lg rounded-r-none min-w-36 ${
          visible ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
      >
        {children}
        <TbTriangleFilled className='absolute -top-3 right-[1px] text-black' />
      </div>
    </div>
  );
};

export default ActionBtn;
