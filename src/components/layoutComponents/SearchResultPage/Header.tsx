import React from 'react'
import { HeaderProps } from './interfaces'
import DropDown from './DropDown'

const Header:React.FC<HeaderProps> = ({counts}) => {
  return (
    <div className='pt-20 flex items-center justify-between'>
        <p className='text-2xl font-medium text-[#2d1c39] '>Results ({String(counts)}) </p>
        <div className="flex gap-x-2 items-center">
            <p className='text-[#aea0b9] uppercase text-sm'>Sort by </p>
            <DropDown content={["English","Hindi","Chinese","Spanish"]} />
        </div>
        
    </div>
  )
}

export default Header