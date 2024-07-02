"use client";
import React from "react";
import Image from "next/image";
import SubmitButton from "../layoutComponents/Button/SubmitButton";
import { useRouter } from "next/navigation";
import {
  companyProducts,
  companyDetails,
  companyResources,
  companySocials,
  companyUpCases,
  companyLegal,
} from "./data";
import Link from "next/link";
interface FooterProps {
  data: {
    title: string;
    img: string;
    alt: string;
    description: string;
    slug: string;
  }[];
}

const Footer: React.FC<FooterProps> = ({ data }) => {
  console.log(data);
  const sendONPage = () => {
    console.log("send to page");
  };
  return (
    <div className="container !h-min !bg-main-text-color mt-6 dark:!bg-dark-color text-white max-w-[100vw]">
      <div className="px-4 py-8">
        <section className=" grid grid-cols-3  max-sm:grid-cols-1 ">
          <div className="flex w--[1/3] flex-col gap-4 max-md:hidden ">
            <p>Latest</p>
            <h2 className="capitalize text-2xl max-sm:text-lg font-bold max-sm:font-semibold">
              from the blog
            </h2>
            <p> The latest industry news,interviews and resources</p>
            <SubmitButton
              mainClass=" w-36 border-2 px-1 mt-3 py-2 rounded-md text-lg"
            >View all posts</SubmitButton>
          </div>
          <div className=" flex col-span-2 max-md:hidden">
            {data.map((item, index) => (
              <div
                key={index}
                className="flex flex-col items-center text-start cursor-pointer gap-2 w-1/2"
              >
                <Image
                  src={item.img}
                  alt={item.alt}
                  width={200}
                  height={100}
                  className="w-11/12 h-[60%]"
                />
                <div className="text-start w-full px-5">
                  <h3
                    onClick={sendONPage}
                    className="text-lg  hover:underline font-semibold"
                  >
                    {item.title}
                  </h3>
                  <p>{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
        <div className="flex max-md:flex-col justify-between w-full">
          <div className="gap-y-2 flex flex-col">
            <h2 className="text-2xl font-bold max-sm:font-medium max-sm:text-xl">
              Join our newsletter
            </h2>
            <p>we'll send you a nice letter once per week. No spam. </p>
          </div>
          <div className="my-5 lg:w-1/3 mr-6">
            <div className="relative flex h-16 w-full max-md:flex-col max-md:gap-y-4 ">
              <input
                placeholder="Enter your email address"
                className="peer !h-full max-md:h-12 mr-4 w-full border-b border-blue-gray-200  bg-transparent pt-4 max-md:pb-3 max-md:placeholder:text-base pb-1.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-blue-gray-200 focus:border-white focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50 placeholder:text-white focus:placeholder:opacity-100"
              />

              <SubmitButton
                mainClass=" lg:w-32 max-md:w-full border-2 px-1 lg:mt-6 py-1 max-sm:mt-0 font-light rounded-sm lg:h-11  text-lg"
              >Subscribe</SubmitButton>
            </div>
          </div>
        </div>
        <div className="mt-6 grid grid-cols-6 max-md:grid-cols-3 max-md:mt-8 max-md:gap-y-6 max-sm:grid-cols-2 justify-between  ">
          <div className="flex flex-col gap-y-2 ">
            {companyProducts.map((product, index) => (
              <div key={index} className="flex gap-6 justify-between">
                <Link
                  href={product.link}
                  className=" hover:underline  max-md:font-light    "
                >
                  {product.title}
                </Link>
              </div>
            ))}
          </div>
          <div className="flex flex-col gap-y-2 ">
            {companyDetails.map((product, index) => (
              <div key={index} className="flex gap-6 justify-between">
                <Link
                  href={product.link}
                  className=" hover:underline  max-md:font-light   "
                >
                  {product.title}
                </Link>
              </div>
            ))}
          </div>
          <div className="flex flex-col gap-y-2 ">
            {companyResources.map((product, index) => (
              <div key={index} className="flex gap-6 justify-between">
                <Link
                  href={product.link}
                  className=" hover:underline  max-md:font-light   "
                >
                  {product.title}
                </Link>
              </div>
            ))}
          </div>
          <div className="flex flex-col gap-y-2 ">
            {companySocials.map((product, index) => (
              <div key={index} className="flex gap-6 justify-between">
                <Link
                  href={product.link}
                  className=" hover:underline  max-md:font-light   "
                >
                  {product.title}
                </Link>
              </div>
            ))}
          </div>
          <div className="flex flex-col gap-y-2 ">
            {companyUpCases.map((product, index) => (
              <div key={index} className="flex gap-6 justify-between">
                <Link
                  href={product.link}
                  className=" hover:underline  max-md:font-light  "
                >
                  {product.title}
                </Link>
              </div>
            ))}
          </div>
          <div className="flex flex-col gap-y-2  ">
            {companyLegal.map((product, index) => (
              <div key={index} className="flex gap-6 justify-between">
                <Link
                  href={product.link}
                  className=" hover:underline  max-md:font-light   "
                >
                  {product.title}
                </Link>
              </div>
            ))}
          </div>
        </div>
        <div className="flex max-md:flex-col max-md:gap-y-5 justify-between mt-8 ">
          <Link href={"/"} className=" list-disc font-bold text-base" >BiyondBytes</Link >
          <p className="mr-4">&#169; 2024 BiyondBytes. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
