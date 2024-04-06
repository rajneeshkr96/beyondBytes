import Link from 'next/link'
import React from 'react'

const TagCard = ({title,value}:{title:string,value:string[]}) => {
  return (
    <div className='w-11/12 min-w-80 max-w-96 sm:w-1/2 md:w-1/3  px-4 py-2 shadow mx-4 my-2'>
        <h2 className='text-3xl font-bold capitalize my-4'>{title}</h2>
      <ul className='text-gray-500 text-xl flex flex-col gap-y-2'>
        {value.map(tag => (
          <li className='capitalize' key={tag}>
            <Link href={`search?tags=${tag}`}>{tag}</Link>
          </li>
        ))}`
      </ul>
    </div>
  )
}

export default TagCard
