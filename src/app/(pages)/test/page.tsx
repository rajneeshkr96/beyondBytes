import React from 'react'

const page = () => {
    const data = [
        {
           id: 1,
           title:"top 10 richest people in the world",
           url:"https://www.youtube.com/watch?v=7y9G7tj9j5I",
           image :"https://images.unsplash.com/photo-1617704548623-340376564e68?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8ZWxvbiUyMG11c2t8ZW58MHx8MHx8fDA%3D"
        },
        {
            id:2,
            title:"How to make money online",
            url:"https://mailchimp.com/resources/make-money-online/",
            image:"https://images.unsplash.com/photo-1553729459-efe14ef6055d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bW9uZXl8ZW58MHx8MHx8fDA%3D"

        },
        {
            id:3,
            title:"How to make money online",
            url:"https://mailchimp.com/resources/make-money-online/",
            image:"https://images.unsplash.com/photo-1553729459-efe14ef6055d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bW9uZXl8ZW58MHx8MHx8fDA%3D"
        },
        
    ]
  return (
    <div className='w-11/12'>
        <h1 className="text-3xl font-bold">Top 10 Richest People in the World</h1>
        <div className="flex flex-wrap justify-between">
            {data.map((item) => (
                <div key={item.id} className="w-5/12 mb-4">
                    <div className="relative">
                        <img src={item.image} alt={item.title} className="w-full h-64 object-cover rounded-lg" />
                        <a href={item.url} target="_blank" className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
                            <p className="text-white text-xl font-bold">Watch</p>
                        </a>
                    </div>
                    <h2 className="text-xl font-bold mt-2">{item.title}</h2>
                </div>
            ))}
        </div>
    </div>
  )
}

export default page