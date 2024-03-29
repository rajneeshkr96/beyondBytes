
import React from 'react'
import Header from '@/components/ProfilePage/Details/Header'
import ActionBtn from '@/components/layoutComponents/Button/ActionBtn'
import ActionOptions from '@/components/BlogCard/ActionOptions'
import SlidingMenu from '@/components/SlidingMenu/SlidingMenu'
import MyPosts from '@/components/ProfilePage/Details/MyPosts'


const page = () => {
  const actions =  [{action:"My Posts",page:<MyPosts/>}]
  return (
    <div className='relative top-0 z-50'>
      <Header/>
      <section >
        <SlidingMenu  className='justify-center' menuOptions={actions}/>
      </section>
      
    </div>
  )
}

export default page