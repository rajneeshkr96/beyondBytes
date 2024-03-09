"use client"
import ActionBtn from '@/components/layoutComponents/Button/ActionBtn'
import React, { useState } from 'react'

const Testing = () => {
  return(
    <>
    <div >
      Lorem ipsum dolor, sit amet consectetur adipisicing elit. Esse voluptatibus ratione nulla quidem numquam. Blanditiis assumenda vero fugiat veritatis et quas eius nulla debitis ullam consectetur dolores, excepturi accusantium, quia obcaecati ratione distinctio labore, sint neque facere maiores ad? Dolor magni esse dolores nostrum iusto odit deleniti veniam reiciendis et illo. Aut consectetur ut voluptatem recusandae libero unde, est similique rerum, repellendus laboriosam molestias sapiente, ex animi blanditiis quaerat. Dolorem ducimus provident exercitationem perspiciatis laborum. Ipsa quod quos quaerat id expedita eos, consectetur dolorum recusandae cupiditate, earum asperiores ad exercitationem eaque, dolore nesciunt unde dolor eum nobis facere nam! Neque, nostrum fugit ipsam similique qui veniam quae repellendus ab voluptate nihil saepe possimus nobis tenetur cum fuga quia, quod ullam? Iste unde laudantium temporibus dolorem esse iure ad cum neque asperiores quam ab, magnam adipisci deleniti minima autem consequuntur, dolorum optio suscipit ipsa distinctio nisi perspiciatis. Unde quibusdam, similique sint ipsum quae rerum culpa deserunt earum repellendus minima, quod sit perferendis libero ullam laudantium, quidem assumenda. Sunt officiis dolorem dolore maiores reprehenderit blanditiis natus nam, facilis provident quaerat, aliquid dolor debitis harum, nisi repellendus recusandae qui obcaecati velit iure odio? Saepe, minima! Sequi deleniti labore vitae officiis. Perferendis similique saepe nam quas quibusdam labore repudiandae est delectus. Est omnis tenetur ullam, modi a, voluptates id assumenda nisi harum nam minima quam possimus voluptatem repudiandae, cum expedita officia deleniti qui maxime sapiente provident accusamus incidunt nobis voluptas. Magni dignissimos velit illum laudantium ex earum quia autem quam ipsum, eaque quos! Impedit unde labore sint ab maxime deserunt blanditiis, culpa quo, nihil provident ducimus beatae? Doloribus sapiente at temporibus, labore ipsum voluptates, facere ipsam asperiores quidem est numquam saepe quaerat nemo. Suscipit nemo non maxime explicabo rem tempore, sequi repellat? Esse numquam non totam, fugit alias eaque temporibus laborum cupiditate similique dolorem!
    </div>
    </>
  )
}


const Page = () => {
  const actions =  [{action:"action",page:<Testing/>},{action:"more action",page:<Testing/>},{action:"more and more action",page:<Testing/>},{action:"action",page:<Testing/>}]
  const [active,setActive] = useState(0);
  return (
    <div className='min-h-screen px-12 '>
      <section className='w-10/12 border-b-2 mx-auto'>
        <div className='flex justify-between items-center'>
          <span className='text-5xl font-serif capitalize font-semibold'>page title</span>
          <ActionBtn className='w-16 h-16'/>
        </div>
        <div className='flex gap-x-6 px-6 mt-6'>
          {actions.map((action,index) => <button key={index} onClick={()=>setActive(index)} className={`capitalize py-8 px-2 transition-colors duration-200 ease-in ${index === active?" text-[#333] border-b-2 border-black":"text-gray-500"}`}>{action.action}</button>)}
        </div>
      </section>
      <section className='my-5'>
      {actions.map((action,index) =>{return index===active?<div key={index}
      className={` ${index === 0 && "bg-pink-400"}`}
      >
        {action.page}
      </div>:""})}
      </section>
      
    </div>
  )
}

export default Page
