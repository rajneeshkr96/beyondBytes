import React from 'react'
import SideMenu from './SideMenu'
import ResultCard from './ResultCard'

const Content = () => {
  return (
    <div className='flex'>
        <SideMenu  />
        <div className='w-3/4 max-lg:w-full '  >
          <ResultCard />

        </div>

    </div>
  )
}

export default Content