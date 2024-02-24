import Link from 'next/link';
import React from 'react'

interface Tag{
  id: string;
  name: string;
}

interface Props extends Tag {
  color: string;
}

const TagSlide = ()=> {
  type TagSlide = Tag[]
  const tags: TagSlide = [
    {
      id: "c1",
      name: "Winter",
    },
    {
      id: "c2",
      name: "Digital Technology",
    },
    {
      id: "c3",
      name: "Web Development",
    },
    {
      id: "c4",
      name: "Web Design",
    },
    {
      id: "c5",
      name: "Web Development",
    },
    {
      id: "c6",
      name: "Web Development",
    }
  ]
    
  return (
    <div className='px-16 py-6 flex justify-center items-center gap-x-6'>
      {tags.map(tag =>
      <Link
      key={tag.id}
      href={"#"}
      className='bg-main-dark-bg text-gray-300 dark:bg-main-bg dark:text-[#333] font-bold px-8 py-2 rounded-xl'
      >
        {tag.name}
      </Link>)}
    </div>
  )
}


export default TagSlide