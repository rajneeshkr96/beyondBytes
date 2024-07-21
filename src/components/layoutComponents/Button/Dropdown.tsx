"use client";
import Link from "next/link";
import React, { FC, useState } from "react";
import { CiMenuKebab } from "react-icons/ci";
interface DropDownProps {
  // in array have one string and one react element
  content: { name: string; icon: JSX.Element;className?: string; }[]; 
  className?: string;
  
}

const DropDown: FC<DropDownProps> = ({ content, className }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
    <div className="flex flex-row-reverse min-w-min   gap-x-6">

    
      <span
        
        id="dropdownDefaultButton"
        data-dropdown-toggle="dropdown"
        className={`${className} border-2  max-lg:text-2xl border-gray-50 text-white hover:bg-transparent focus:ring-4 focus:outline-none focus:ring-transparent bg-transparent font-medium mb-1  rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center justify-between dark:bg-transparent dark:hover:bg-transparent dark:focus:ring-transparent`}
       
      >
         {" "}
        <CiMenuKebab type="Button" onClick={() => setIsOpen(!isOpen)} className="ml-1 cursor-pointer absolute right-1 text-black"/>
      </span>

      {isOpen && (
        <div
          className={`z-20 absolute ${isOpen?"w-36":"w-0"} mr-6 bg-white divide-y divide-gray-100 rounded-lg shadow  dark:bg-gray-700`}
          data-dropdown-content
        >
          <ul
            className="py-2 text-sm text-gray-600 dark:text-gray-200"
            aria-labelledby="dropdownDefaultButton"
          >
            {content.map((item, index) => (
              <Link
                key={index}
                href="#"
                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
              >
                <span className={item.className}>{item.name}</span>
                <span className="float-right">{item.icon}</span>
              </Link>
            ))}
          </ul>
        </div>
      )}
      </div>
    </>
  );
};

export default DropDown;
