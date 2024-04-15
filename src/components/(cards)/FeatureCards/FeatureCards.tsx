import React from "react";
import Image from "next/image";
import axios from "axios";
import Link from "next/link";
const FeatureCards = async () => {
  let data;
  try {
    const res = await axios.get(`${process.env.BASE_URL}/api/blog/all?sort=likesCount&fields=id,slug,title,image,metaDesc&limit=3`);
  if(res.data.success){
    data = res.data.data;
  }
  } catch (error) {
    
  }
  return (
    <div className="w-full">
      <h2 className="text-4xl font-bold px-4 max-sm:px-6   ">Feature Blogs</h2>
      <div className="flex flex-wrap gap-2 w-full max-sm:flex-col items-center p-4 mt-4">
        <div className="group relative w-3/5 max-sm:w-11/12">
          <Image
            src={data[0].image.src}
            alt="Picture of the author"
            width={500}
            height={500}
            className="w-full object-cover"
          />
          <div className="absolute p-6 top-0 left-0 w-full h-0 flex flex-col justify-between text-start  bg-half-transparent opacity-0 group-hover:h-full group-hover:opacity-100 duration-500">
            <h4 className="text-2xl text-white"><Link href={`/post/${data[0].slug}`}>{data[0].title}</Link></h4>
            <p className=" text-white  duration-300">
              {data[0].metaDesc}
            </p>
          </div>
        </div>
        {/* only index 2 and index 3 has to map */}
       <div className="flex gap-2 flex-col w-[30%] max-sm:w-11/12">
       {data.slice(1).map((item:{title:string,slug:string,image:{src:string,alt:string},metaDesc:string},index:number) => (
          <div key={index} className=" group relative   ">
            <Image
              src={item.image.src}
              alt="Picture of the author"
              width={500}
              height={500}
              className="w-full object-cover"
            />
            <div className="absolute p-6 top-0 left-0 w-full h-0 flex flex-col justify-between text-start  bg-half-transparent opacity-0 group-hover:h-full group-hover:opacity-100 duration-500">
              <h4 className="text-2xl text-white"><Link href={`/post/${item.slug}`}>{item.title}</Link></h4>
              <p className=" text-white  duration-300">
                {item.metaDesc.slice(0,50)}
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
