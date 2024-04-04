import React from 'react';
import { MdOutlineCancel } from 'react-icons/md';

import { Button } from '../layoutComponents/index';
import { useAppSelector } from '@/redux/hooks';
import Searchbar from '../SearchBar/SearchBar';

const SearchBar = () => {
  const { currentColor } = useAppSelector((state) => state.theme);

  return (
    <div className="nav-item absolute right-5 md:right-52 top-16 bg-white dark:bg-[#42464D] p-8 rounded-lg w-96 max-md:w-[92vw]">
      <div className="flex justify-between items-center">
        <div className="flex gap-3">
          <p className="font-semibold text-lg dark:text-gray-200">Search....</p>
        </div>
        <Button icon={<MdOutlineCancel />} color="rgb(153, 171, 180)" bgHoverColor="light-gray" size="2xl" borderRadius="50%" />
      </div>
      <div className='dark:text-gray-200'>
        <Searchbar/>
      </div>
    </div>
  );
};

export default SearchBar;
