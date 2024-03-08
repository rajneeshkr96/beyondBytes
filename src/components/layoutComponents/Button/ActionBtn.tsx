"use client"
import React, { useEffect, useRef, useState } from 'react';
import { HiOutlineDotsHorizontal } from "react-icons/hi";

interface ActionBtnProps {
  className?: string;
  actionIcon?: string | React.JSX.Element;
  children?:  string | React.JSX.Element;
}

const ActionBtn: React.FC<ActionBtnProps> = ({ className,actionIcon,children }) => {
  const [visible, setVisible] = useState(false);
  const actionBtnRef = useRef<HTMLDivElement | null>(null);

  const handleClickOutside = (event: React.MouseEvent<HTMLDivElement>) => {
    if (actionBtnRef.current && !actionBtnRef.current.contains(event?.target)) {
      setVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [visible]); // Only re-attach listener when `visible` changes

  return (
    <div
      ref={actionBtnRef}
      className={`relative cursor-pointer rounded-full flex justify-center items-center ${className}`}
    >
      <span className='w-[90%] h-[90%] block' onClick={() => setVisible(!visible)}>
        {actionIcon?actionIcon:<HiOutlineDotsHorizontal  className='w-[90%] h-[90%] ' />}
      </span>
      <div
        className={`absolute -bottom-8 right-1 bg-black text-white duration-150  ease-in-out py-2 px-4 rounded-lg ${
          visible ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
      >
        dkljfdkljfdlkjfdkljdfkljfkdljdfkljdfkljfd
        {children}
      </div>
    </div>
  );
};

export default ActionBtn;
