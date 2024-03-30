import React, { FC } from 'react'
import Image from 'next/image';
import { useRouter } from 'next/navigation';

interface CardsProps{
  title:string;
  image:{src:string,alt:string};
  description:string;
  slug:string;
  id:string;

}

const Cards:FC<CardsProps> = ({id,image,title,description,slug,...props}) => {
  const router = useRouter()
  return (
    <>
      <div {...props} className=" group relative w-1/4    ">
        <div>
      

            <Image
              src={image.src}
              alt={image.alt}
              width={500}
              height={500}
              className="w-full h-auto object-cover"
              onClick={()=> router.push(`/blog/${slug}`) }
            />
        </ div>
            <div className="absolute p-6 top-0 left-0 w-full h-0 flex flex-col justify-between text-start  bg-half-transparent opacity-0 group-hover:h-full group-hover:opacity-100 duration-500">
              <h1 className="text-2xl text-white">{title}</h1>
              <p className=" text-white  duration-300">
                {description}
              </p>
            </div>
          </div>
        
    </>
  )
}

export default Cards