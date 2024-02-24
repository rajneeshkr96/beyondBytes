import React from "react";
import Image from "next/image";
const FeatureCards = () => {
  const data = [
    {
      id: 1,
      title: "top 10 richest people in the world",
      url: "https://www.youtube.com/watch?v=7y9G7tj9j5I",
      image:
        "https://images.unsplash.com/photo-1617704548623-340376564e68?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8ZWxvbiUyMG11c2t8ZW58MHx8MHx8fDA%3D",
    },
    {
      id: 2,
      title: "How to make money online",
      url: "https://mailchimp.com/resources/make-money-online/",
      image:
        "https://images.unsplash.com/photo-1553729459-efe14ef6055d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bW9uZXl8ZW58MHx8MHx8fDA%3D",
    },
    {
      id: 3,
      title: "How to make money online",
      url: "https://mailchimp.com/resources/make-money-online/",
      image:
        "https://images.unsplash.com/photo-1553729459-efe14ef6055d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bW9uZXl8ZW58MHx8MHx8fDA%3D",
    },
  ];
  return (
    <div className="w-full">
      <h2 className="text-4xl font-bold px-4 max-sm:px-6   ">Feature Blogs</h2>
      <div className="flex flex-wrap gap-2 w-full max-sm:flex-col items-center p-4 mt-4">
        <div className="group relative w-3/5 max-sm:w-11/12">
          <Image
            src={data[0].image}
            alt="Picture of the author"
            width={500}
            height={500}
            className="w-full object-cover"
          />
          <div className="absolute p-6 top-0 left-0 w-full h-0 flex flex-col justify-between text-start  bg-half-transparent opacity-0 group-hover:h-full group-hover:opacity-100 duration-500">
            <h1 className="text-2xl text-white">{data[0].title}</h1>
            <p className=" text-white  duration-300">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit.
              Reprehenderit odio in alias?
            </p>
          </div>
        </div>
        {/* only index 2 and index 3 has to map */}
       <div className="flex gap-2 flex-col w-[30%] max-sm:w-11/12">
       {data.slice(1).map((item,index) => (
          <div key={index} className=" group relative   ">
            <Image
              src={item.image}
              alt="Picture of the author"
              width={500}
              height={500}
              className="w-full object-cover"
            />
            <div className="absolute p-6 top-0 left-0 w-full h-0 flex flex-col justify-between text-start  bg-half-transparent opacity-0 group-hover:h-full group-hover:opacity-100 duration-500">
              <h1 className="text-2xl text-white">{item.title}</h1>
              <p className=" text-white  duration-300">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                Reprehenderit odio in alias?
              </p>
            </div>
          </div>
        ))}
       </div>
      </div>
       
    </div>
  );
};

export default FeatureCards;
