import React from 'react'
import Header from './Header'
import Content from './Content'


const SearchResultPage = () => {
  return (
    <div className=' w-full px-24 h-screen bg-[#f9f7fb] '>
        <Header counts={10} />
        <hr className="h-px my-8 bg-[#dfdce3] border-0 dark:bg-gray-700"/>
        <Content />
        
    </div>
  )
}

export default SearchResultPage