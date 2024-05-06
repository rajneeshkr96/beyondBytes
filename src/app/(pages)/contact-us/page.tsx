"use client";
import React from "react";

import { CiMail } from "react-icons/ci";
import { IoCallOutline } from "react-icons/io5";
import { RiHomeOfficeLine } from "react-icons/ri";
import { toast } from "react-toastify";

export const metadata = {
  title: {
      absolute: "contact us page",
  },
  description: "contact us page ", 
};

const page = () => {


  return (
    <>
      {/* ====== Contact Section Start */}
      <section className="relative z-10 overflow-hidden bg-white dark:bg-dark px-20 ">
        <div className="container mx-auto">
          <div className="flex flex-wrap -mx-4 lg:justify-between">
            <div className="w-full px-4 lg:w-1/2 xl:w-6/12">
              <div className="mb-12 max-w-[570px] lg:mb-0">
                <h1 className="text-dark text-gray-700 mb-6 text-[32px] font-bold uppercase sm:text-[40px] lg:text-[36px] xl:text-[40px]">
                  CONTACT US
                </h1>
                <p className="text-base leading-relaxed text-body-color dark:text-dark-6 mb-9">
                Experience the comfort of personalized assistance right at your fingertips! Whether you have questions or need support, our dedicated team is here for you. Your happiness and satisfaction drive our dedication. 
                </p>
                <div className="mb-8 flex w-full max-w-[370px]">
                  <div className="bg-primary/5 text-primary mr-6 flex h-[60px] w-full max-w-[60px] items-center justify-center overflow-hidden rounded sm:h-[70px] sm:max-w-[70px]">
                    <RiHomeOfficeLine className="w-1/2 h-1/2" />
                  </div>
                  <div className="w-full">
                    <h4 className="mb-1 text-xl font-bold text-dark text-gray-700">
                      Our Location
                    </h4>
                    <p className="text-base text-body-color text-gray-600">
                       New Delhi, Delhi 110059
                    </p>
                  </div>
                </div>
               
                <div className="mb-8 flex w-full max-w-[370px]">
                  <div className="bg-primary/5 text-primary mr-6 flex h-[60px] w-full max-w-[60px] items-center justify-center overflow-hidden rounded sm:h-[70px] sm:max-w-[70px]">
                    <CiMail className="w-1/2 h-1/2" />
                  </div>
                  <div className="w-full">
                    <h4 className="mb-1 text-xl font-bold text-dark text-gray-700">
                      Email Address
                    </h4>
                    <a href="mailto:beyondbazaarofficial@gmail.com?subject=Subject%20of%20the%20email&body=Body%20of%20the%20email" className="text-base text-body-color text-gray-600">
                      biyondbytes@gmail.com
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full px-4 lg:w-1/2 xl:w-5/12">
              <div className="relative p-8 bg-white rounded-lg shadow-lg dark:bg-dark-2 sm:p-12">
                <form  >
                  <div className="mb-6">
                    <input
                      type="text"
                      placeholder="Your Name"
                      className="border-stroke dark:border-dark-3 text-gray-600 dark:bg-dark text-body-color focus:border-primary w-full rounded border py-3 px-[14px] text-base outline-none"
                    />

                  </div>
                  <div className="mb-6">
                    <input
                      type="email"
                      placeholder="Your Email"
                      className="border-stroke dark:border-dark-3 text-gray-600 dark:bg-dark text-body-color focus:border-primary w-full rounded border py-3 px-[14px] text-base outline-none"
                    />

                  </div>
                  <div className="mb-6">
                    <input
                      type="tel"
                      placeholder="Your Phone"
                      className="border-stroke dark:border-dark-3 text-gray-600 dark:bg-dark text-body-color focus:border-primary w-full rounded border py-3 px-[14px] text-base outline-none"
                    />
                  </div>
                  <div className="mb-6">
                    <textarea
                      rows={6}
                      name="message" 
                      placeholder="Your Message"
                      className="border-stroke dark:border-dark-3 text-gray-600 dark:bg-dark text-body-color focus:border-primary w-full resize-none rounded border py-3 px-[14px] text-base outline-none"
                      defaultValue={""}
                    />
                  </div>
                  <div>
                    <button
                      // loading={loading}
                      type="submit"
                      className="w-full px-4 py-2 font-medium text-center text-white bg-gray-800  hover:bg-black transition-colors duration-200 rounded-md bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-1"
                    >
                      Send Message
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* ====== Contact Section End */}
    </>
  );
};

export default page;
