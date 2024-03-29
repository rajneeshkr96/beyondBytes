"use client"
import React from 'react';
import { SiShopware } from 'react-icons/si';
import { MdOutlineCancel } from 'react-icons/md';
import { useAppSelector,useAppDispatch } from '@/redux/hooks';
import {setActiveMenu} from "@/redux/action/themeSlice"
import Link from 'next/link';
import { usePathname } from 'next/navigation'
import {ReactLenis} from  "@studio-freight/react-lenis";
import { GiArtificialIntelligence } from "react-icons/gi";
import { FaHome } from "react-icons/fa";
import { FcAbout } from "react-icons/fc";
import { MdPermContactCalendar,MdPolicy } from "react-icons/md";
import { SiMicrosoftteams } from "react-icons/si";
import { FcDisclaimer } from "react-icons/fc";
const Sidebar = () => {
  const { currentColor, activeMenu, screenSize } = useAppSelector((state) => state.theme);
  const dispatch = useAppDispatch()
  const pathname = usePathname()
  const links = [
    {
      title: 'Home',
      links: [
        {
          name: 'Home',
          link: '/',
          icon: <FaHome />,
        },
      ],
    },
  
    {
      title: 'Pages',
      links: [
        {
          name: 'About Us',
          link: '/about',
          icon: <FcAbout />,
        },
        {
          name: 'contact us',
          link: '/contact',
          icon: <MdPermContactCalendar />,
        },
        {
          name: 'join us',
          link: '/cureer-page',
          icon: <SiMicrosoftteams />,
        },
        {
          name: 'privacy and policy',
          link: 'privacy-policy',
          icon: <MdPolicy />,
        },
        {
          name: 'Disclaimer ',
          link: 'disclaimer-page',
          icon: <FcDisclaimer />,
        },
      ],
    },
    {
      title: 'tags',
      links: [
        {
          name: 'Ai',
          link: 'dashboard/calendar',
          icon: <GiArtificialIntelligence />,
        },
      ],
    },

  ];

  const handleCloseSideBar = () => {
    if (activeMenu !== undefined && screenSize <= 900) {
      dispatch(setActiveMenu(false));
    }
  };

  const activeLink = `flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg  text-white  text-md m-2  `;
  const normalLink = 'flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg text-md text-gray-700 dark:text-gray-200 dark:hover:text-black hover:bg-light-gray m-2';

  return (
    <ReactLenis root options={{ lerp: 0.1, duration: 2, smoothWheel:true }}>
    <div  className="sideBar ml-3 h-screen md:overflow-hidden overflow-auto md:hover:overflow-auto pb-10 ">
      {activeMenu && (
        <>
          <div className="flex justify-between items-center">
            <Link href="/" onClick={handleCloseSideBar} className="items-center gap-3 ml-3 mt-4 flex text-xl font-extrabold tracking-tight dark:text-white text-slate-900">
              <SiShopware /> <span>Beyondbytes</span>
            </Link>
            <div content="Menu" >
              <button
                onClick={() =>{ 
                  console.log(activeMenu)
                  dispatch(setActiveMenu(!activeMenu))}}
                style={{ color: currentColor }}
                className="text-xl rounded-full p-3 hover:bg-light-gray mt-4 block md:hidden"
              >
                <MdOutlineCancel />
              </button>
            </div>
          </div>
          <div className="mt-10 ">
            {links.map((item) => (
              <div key={item.title}>
                <p className="text-gray-400 dark:text-gray-400 m-3 mt-4 uppercase">
                  {item.title}
                </p>
                {item.links.map((link) => (
                  <Link
                    href={`${link.link}`}
                    key={link.name}
                    onClick={handleCloseSideBar}
                    className={`${link.link}`=== pathname ? activeLink : normalLink}
                    style={{"backgroundColor":`${`${link.link}`=== pathname ?  currentColor: ""}`}}
                  >
                    {link?.icon}
                    <span className="capitalize ">{link.name}</span>
                  </Link>
                ))}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
    </ReactLenis>
  );
};

export default Sidebar;
