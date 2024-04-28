
import AddTags from '@/components/AddTags/AddTags'
import AddtagModal from '@/components/AddTags/AddtagModal'
import SlidingMenu from '@/components/SlidingMenu/SlidingMenu'
import React from 'react'

const page = () => {
  const actions =  [{action:"Add Tags",page:<AddTags/>},{action:"Users",page:<div>kkk</div>},{action:"All Posts",page:<div>kkk</div>}]
  // const header = {title:"welcome admin",actionBtn:[<button className='px-4 py-2 text-white bg-black rounded-3xl font-semibold'>ADD ADMIN</button>,<button className='px-4 py-2 text-white bg-black rounded-3xl font-semibold'>ADD ADMIN</button>]}
  // const header = {title:"welcome admin",actionBtn:[<AddtagModal/>,<button className='px-4 py-2 text-white bg-black rounded-3xl font-semibold'>ADD ADMIN</button>]}
  return (
    <div className='min-h-screen'>
      <section className='max-sm:w-full max-sm:text-xs' >
        <SlidingMenu  className='justify-center max-sm:grid max-sm:grid-cols-4 max-sm:gap-3 max-sm:gap-x-0  ' menuOptions={actions} />
      </section>
    </div>
  )
}

export default page
