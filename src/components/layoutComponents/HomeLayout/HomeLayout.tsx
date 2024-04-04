"use client"
import React, { useEffect } from 'react';
import { FiSettings } from 'react-icons/fi';
import { setCurrentColor,setCurrentMode,setThemeSettings } from '@/redux/action/themeSlice';
import { useAppSelector,useAppDispatch } from '@/redux/hooks';
import { Navbar,Footer,Sidebar,ThemeSettings } from '@/components/layoutComponents/index';
import { ReactLenis } from "@studio-freight/react-lenis";
import { useSession } from 'next-auth/react';


export default function HomeLayout({
    children,
  }: {
    children: React.ReactNode,name?:string,email?:string,role?:string,image?:string,oAuthSession?:string,userName?:string,id?:string
  }) {
    const { currentMode, activeMenu, currentColor, themeSettings}  = useAppSelector((state) => state.theme)
    const session  = useSession()    
   
    const dispatch = useAppDispatch()
    useEffect(() => {
        const currentThemeColor = localStorage.getItem('colorMode');
        const currentThemeMode = localStorage.getItem('themeMode');
        if (currentThemeColor && currentThemeMode) {
          dispatch(setCurrentColor(currentThemeColor));
          dispatch(setCurrentMode(currentThemeMode));
        }
      }, [dispatch]);
    return (
      <div className={currentMode === 'Dark' ? 'dark' : ''}>
      <div className="flex relative dark:bg-main-dark-bg">
        <div className="fixed right-4 bottom-4" style={{ zIndex: '1000' }}>
          <div
            className='sticky bottom-4 right-4'
          >
            <button
              type="button"
              onClick={() => dispatch(setThemeSettings(true))}
              style={{ background: currentColor, borderRadius: '50%' }}
              className="text-3xl text-white p-3 hover:drop-shadow-xl hover:bg-light-gray"
            >
              <FiSettings />
            </button>

          </div>
        </div>
        {activeMenu ? (
          <div className="w-72 fixed sidebar dark:bg-secondary-dark-bg bg-white ">
            <Sidebar />
          </div>
        ) : (
          <div className="w-0 dark:bg-secondary-dark-bg">
            <Sidebar />
          </div>
        )}
        <div
          className={
            activeMenu
              ? 'dark:bg-main-dark-bg  bg-main-bg min-h-screen md:ml-72 w-full  '
              : 'bg-main-bg dark:bg-main-dark-bg  w-full min-h-screen flex-2 '
          }
        >
          <div className="fixed md:static bg-main-bg dark:bg-main-dark-bg navbar w-full 
          ">
            <Navbar email={session?.data?.user.email as string} role= {session?.data?.user?.role as string } name={session?.data?.user.name as string } oAuthSession={session.status as string} image={session?.data?.user.image as string } userName={session.data?.user?.userName} id={session.data?.user?.userId}  />
          </div>
            {themeSettings && (<ThemeSettings />)}
          <div className="m-2 md:m-10 mt-24 p-2 md:p-10  dark:text-gray-300 ">
            <ReactLenis root options={{ lerp: 0.1, duration: 1.2, smoothWheel:true  }}>
              {children}
            </ReactLenis>
          </div>
          <Footer />
        </div>
      </div>
  </div>
      )
  }