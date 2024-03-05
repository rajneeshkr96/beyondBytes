
import React, { ReactNode, useEffect } from 'react';
import { AiOutlineMenu } from 'react-icons/ai';
import { RiNotification3Line } from 'react-icons/ri';
import { MdKeyboardArrowDown } from 'react-icons/md';
import { RiSearch2Fill } from "react-icons/ri";
import {  Notification, UserProfile } from './index';
import { useAppSelector,useAppDispatch } from '@/redux/hooks';
import {setScreenSize,setActiveMenu,handleClick} from "@/redux/action/themeSlice"
import SearchBar from '../Search/SearchBar';

type Props = {
  customFunc:()=>void, icon:ReactNode, color:string, dotColor?:string
}
const NavButton: React.FC<Props> = ({  customFunc, icon, color, dotColor }) => (
  <div >
    <button
      type="button"
      onClick={() => customFunc()}
      style={{ color }}
      className="relative text-xl rounded-full p-3 hover:bg-light-gray"
    >
      <span
        style={{ background: dotColor }}
        className="absolute inline-flex rounded-full h-2 w-2 right-2 top-2"
      />
      {icon}
    </button>
  </div>
);

const Navbar = () => {
  const dispatch = useAppDispatch()
  const { currentColor, activeMenu, isClicked,  } = useAppSelector((state) => state.theme);

  useEffect(() => {
    const handleResize = () => dispatch(setScreenSize(window.innerWidth));

    window.addEventListener('resize', handleResize);

    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);


  const handleActiveMenu = () => dispatch(setActiveMenu(!activeMenu));

  return (
    <div className="flex justify-between p-2 md:ml-6 md:mr-6 relative">

      <NavButton  customFunc={handleActiveMenu} color={currentColor} icon={<AiOutlineMenu />} />
      <div className="flex gap-x-2">
        <NavButton customFunc={() => dispatch(handleClick('searchBar'))} color={currentColor} icon={<RiSearch2Fill />} />
        <NavButton  dotColor="rgb(254, 201, 15)" customFunc={() => dispatch(handleClick('notification'))} color={currentColor} icon={<RiNotification3Line />} />
        <div >
          <div
            className="flex items-center gap-2 cursor-pointer p-1 hover:bg-light-gray rounded-lg"
            onClick={() => dispatch(handleClick('userProfile'))}
          >
            <img
              className="rounded-full w-8 h-8"
              src={"https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=1961&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"}
              alt="user-profile"
            />
            <p>
              <span className="text-gray-400 text-14">Hi,</span>{' '}
              <span className="text-gray-400 font-bold ml-1 text-14">
                Michael
              </span>
            </p>
            <MdKeyboardArrowDown className="text-gray-400 text-14" />
          </div>
        </div>
        {isClicked.searchBar && (<SearchBar/>)}
        {isClicked.notification && (<Notification />)}
        {isClicked.userProfile && (<UserProfile />)}
      </div>
    </div>
  );
};

export default Navbar;
