"use client"
import TextEditor from '@/components/TextEditor'
import Image from 'next/image'
import { useParams } from 'next/navigation'
import React, { useState } from 'react'
import Select, { ValueType, OptionTypeBase } from 'react-select';
import makeAnimated from 'react-select/animated';
import { TiImage } from "react-icons/ti";
const animatedComponents = makeAnimated();

const Page = () => {
  const [method, setMethod] = useState("firebase")
  const [preImage, setPreImage] = useState("/img1.jpg")
  const [selectedTags, setSelectedTags] = useState<ValueType<OptionTypeBase>>([])
  const [tags, setTags] = useState([{ value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' }])

  const handleChange = (selectedOptions: ValueType<OptionTypeBase>) => {
    setSelectedTags(selectedOptions);
  };


  const param = useParams();


  return (
    <div className='min-h-screen'>

      {/* image uploading ................ */}
      <div className=" w-full mx-auto sm:max-w-7xl my-2">
        <div className='flex justify-center items-center gap-4 h-24 '>
          {preImage && <Image src={preImage} alt='hero images' width={300} height={400} className='object-fill h-full w-auto' />}
        </div>
        {/* select method  */}
        <div className="flex flex-col items-center justify-center w-full h-auto my-6 bg-white sm:w-full sm:rounded-lg sm:shadow-xl">
          <div className="mt-10 mb-10 text-center">
            <h2 className="text-2xl font-semibold mb-2">Upload your cover Image</h2>
            <p className="text-xs text-gray-500">
              File should be of format .jpg, .jpeg, .png or .svg
            </p>
            <section
              className="relative w-[90%] h-32 mb-10 rounded-lg shadow-inner "
            >
              <div
                className="z-20 flex flex-col-reverse items-center justify-center w-full h-full cursor-pointer"
              >
                <p className="z-10 text-xs font-light text-center text-gray-500">
                  Drag &amp; Drop your files here
                </p>
                <TiImage width={'12px'} />
              </div>
            </section>
          </div>
        </div>
      </div>

      <div className='w-11/12 mx-auto mt-16'>
        {/* title ..................  */}
        <div className="flex gap-x-2  px-2 py-2 my-2 ">
          <input type="text" name="" id="" placeholder='Please Enter Your Title....' className="w-[70%] px-8 py-2 rounded-md font-medium  border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white" />
          <Select
            closeMenuOnSelect={false}
            components={animatedComponents}
            isMulti
            value={selectedTags}
            onChange={handleChange}
            options={tags}
            className='w-[30%]'

          />

        </div>

        <TextEditor setEditor />

      </div>
    </div>
  )
}

export default Page
