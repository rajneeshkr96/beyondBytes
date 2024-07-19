"use client";
import Link from "next/link";
import React, { FC, useState, useEffect, useRef } from "react";
import { FaAngleDown } from "react-icons/fa";

interface DropDownProps {
  content: Array<string>;
  className?: string;
}

const DropDown: FC<DropDownProps> = ({ content, className }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        id="dropdownDefaultButton"
        data-dropdown-toggle="dropdown"
        className={`${className} hs-dropdown-toggle py-3 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-800`}
        type="button"
      >
        Languages {" "}
        <FaAngleDown className="ml-1" />
      </button>

      {isOpen && (
        <div
          className="z-10 absolute  lg:top-32 w-[8.2rem] bg-white divide-y divide-gray-100 rounded-lg shadow right-24 dark:bg-gray-700"
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
                className="flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 dark:text-neutral-400 dark:hover:bg-neutral-700 dark:hover:text-neutral-300 dark:focus:bg-neutral-700"
              >
                {item}
              </Link>
            ))}
          </ul>
        </div>
      )}
      
    </div>
  );
};

export default DropDown;
