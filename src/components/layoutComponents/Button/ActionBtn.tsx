"use client"
import React, { useEffect, useRef, useState } from 'react';
import { HiOutlineDotsHorizontal } from "react-icons/hi";

interface ActionBtnProps {
  className?: string;
}

const ActionBtn: React.FC<ActionBtnProps> = ({ className }) => {
  const [visible, setVisible] = useState(false);
  const actionBtnRef = useRef<HTMLDivElement | null>(null);

  const handleClickOutside = (event: React.MouseEvent<HTMLDivElement>) => {
    if (actionBtnRef.current && !actionBtnRef.current.contains(event.target)) {
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
      <HiOutlineDotsHorizontal onClick={() => setVisible(!visible)} className='w-[90%] h-[90%] ' />
      <div
        className={`absolute w-30 -bottom-5 right-1 bg-black text-white duration-75 translate-y-8 ease-in-out ${
          visible ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
      >
        Your content goes here
      </div>
    </div>
  );
};

export default ActionBtn;
