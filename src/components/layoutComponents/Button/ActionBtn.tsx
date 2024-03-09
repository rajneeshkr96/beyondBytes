"use client"
import React, { useEffect, useRef, useState } from 'react';
import { HiOutlineDotsHorizontal } from "react-icons/hi";

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
        className={`absolute -bottom-8 right-1 bg-black text-white duration-150 ease-in-out py-2 px-4 rounded-lg ${
          visible ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
      >
        {children}
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Tempore accusamus, provident officia sit nisi unde, necessitatibus dolor quis dicta in ad ipsum. Amet, dicta? Possimus in consectetur incidunt nostrum. Cupiditate.
      </div>
    </div>
  );
};

export default ActionBtn;
