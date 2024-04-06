
import React from 'react'
import Header from '@/components/ProfilePage/Details/Header'
import SlidingMenu from '@/components/SlidingMenu/SlidingMenu'
import MyPosts from '@/components/ProfilePage/Details/MyPosts'
import Bookmark from '@/components/ProfilePage/Details/Bookmark'
import Followers from '@/components/ProfilePage/Details/Followers'
import Following from '@/components/ProfilePage/Details/Following'


const page = () => {
  const actions =  [{action:"Posts",page:<MyPosts/>},{action:"Bookmark",page:<Bookmark/>},{action:"Followers",page:<Followers/>},{action:"Following",page:<Following/>}]
  return (
    <div className='relative top-0 z-50'>
      <Header/>

      <section className='max-sm:w-full max-sm:text-xs' >
        <SlidingMenu  className='justify-center max-sm:grid max-sm:grid-cols-4 max-sm:gap-3 max-sm:gap-x-0  ' menuOptions={actions}/>
      </section>
      
    </div>
  )
}

export default page