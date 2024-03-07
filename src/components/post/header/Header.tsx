
import Image from 'next/image'

import React, { FC } from 'react'


interface HeaderProps{
    font: string
}
const Header:FC<HeaderProps> = ({font}) => {

    return (
        <header className=''>
            <div className='min-h-[70vh] grid grid-cols-3 grid-rows-[repeat(2,auto)] '>
                <div className='col-start-1 col-end-4'>
                    <h1 className={`font-medium ${font} text-7xl capitalize `}>Case Study: Personal Branding</h1>
                    <p className='text-gray-600 capitalize px-6'>Case Study: Personal Branding</p>
                </div>
                <div className='col-start-2 col-end-3 flex justify-between px-6 py-2'>
                    <div >
                        <span className='text-gray-600'>Date</span><br />
                        <time className='font-bold' dateTime=''>2021-10-10</time>
                    </div>
                    <div >
                        <span className='text-gray-600'>Reading Time</span><br />
                        <time className='font-bold' >2021-10-10</time>
                    </div>
                </div>
                <div className='col-start-3 col-end-4 px-6 py-2 flex  gap-x-2'>
                    <Image src={"/img3.jpg"} alt={"kkk"} width={200} height={300} className='w-12 h-12 rounded-full' />
                    <span className='uppercase font-bold mt-3 text-gray-600'>raju bhai....</span>
                </div>
            </div>

        </header>
    )
}

export default Header
