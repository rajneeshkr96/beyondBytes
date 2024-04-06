"use client";
import React, { useState } from "react";
import { useAppSelector } from "@/redux/hooks";
export default function HeroSlide() {
  const { currentColor } = useAppSelector((state) => state.theme);
  interface SlideOptions {
    id: string;
    url: string;
    title: string;
    description: string;
  }
  type SlideArray = SlideOptions[];
  const slide: SlideArray = [
    {
      id: "c1",
      url: "./img1.jpg",
      title: "Winter",
      description: "Winter has so much to offer - creative activities",
    },
    {
      id: "c2",
      url: "./img2.jpg",
      title: "Digital Technology",
      description: "Gets better every day - stay tuned",
    },
    {
      id: "c3",
      url: "./img3.jpg",
      title: "Globalization",
      description: "Help people all over the world",
    },
    {
      id: "c4",
      url: "./img4.jpg",
      title: "New technologies",
      description: "Space engineering becomes more and more advanced",
    },
  ];
  const [mobileIndex,setMobileIndex] = useState(1);
  const setIndex = () => {
    console.log(mobileIndex);
    setMobileIndex(mobileIndex+1);
  }
  
  return (
    <div className="min-h-screen gap-y-12 max-md:gap-y-4 flex flex-col ">
      <h1
        style={{ color: currentColor }}
        className=" text-5xl uppercase font-bold max-md:text-2xl"
      >
        beyondbytes
      </h1>
      <div  className="min-h-96 h-[60vh] relative flex flex-nowrap justify-start w-11/12 mx-auto">
        {slide.map((val, index) => (
          <>
            <input
              className="sliderLabel"
              key={val.id}
              type="radio"
              name="slide"
              id={val.id}
              defaultChecked={index === mobileIndex ? true : false}
            />
            <label
              key={index}
              htmlFor={val.id}
              onClick={setIndex}
              className="card w-20 mx-3 my-0  bg-cover cursor-pointer overflow-hidden rounded-3xl flex items-end "
              style={{ backgroundImage: `url(${val.url})`,zIndex:index==mobileIndex%4 ?"9":"2"}}
            >
              <div className="row">
                <div className="  bg-[#223] text-white rounded-full w-12 flex justify-center items-center m-4 font-bold">
                  {index + 1}
                </div>
                <div className="description">
                  <h4 className="uppercase">{val.title}</h4>
                  <p className="pt-1 text-[#b0b0ba]">{val.description}</p>
                </div>
              </div>
            </label>
          </>
        ))}
      </div>
    </div>
  );
}
