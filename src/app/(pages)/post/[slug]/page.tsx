import Image from 'next/image'
import React from 'react'

const page = () => {
  return (
    <article>
      <header>
        <div>
          <div>
            <h1>Post</h1>
            <p>2021-10-10</p>
          </div>
          <div>

          </div>
        </div>
        <Image src={"/img1.jpg"} alt={"kkk"} width={2000} height={1000} className='w-full h-1/2' />
      </header>
    </article>
  )
}

export default page