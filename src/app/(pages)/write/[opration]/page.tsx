"use client"
import TextEditor from '@/components/TextEditor'
import Image from 'next/image'
import React, { useState } from 'react'

const Page = () => {
  const [method, setMethod] = useState("firebase")
  const [preImage, setPreImage] = useState("/img1.jpg")
  return (
    <div className='min-h-screen'>
      {/* title ..................  */}
      <input type="text" name="" id="" placeholder='Please Enter Your Title....' className='block mx-auto w-[90%] h-24 my-6 bg-white px-6 text-2xl font-semibold outline-none border text-center placeholder:text-2xl placeholder:font-semibold' />

      {/* image uploading ................ */}
      <div className=" w-full mx-auto sm:max-w-7xl my-2">
        <div className='flex justify-center items-center gap-4 h-24 '>
          {preImage && <Image  src={preImage} alt='hero images' width={300} height={400} className='object-fill h-full w-auto' />}
        </div>
        {/* select method  */}
        <div className="flex flex-col items-center justify-center w-full h-auto my-6 bg-white sm:w-full sm:rounded-lg sm:shadow-xl">
          <div className="mt-10 mb-10 text-center">
            <h2 className="text-2xl font-semibold mb-2">Upload your cover Image</h2>
            <p className="text-xs text-gray-500">
              File should be of format .jpg, .jpeg, .png or .svg
            </p>
          </div>
          {method === "firebase" && <div>
            <div
              className=" bg-[#333] text-white px-10 py-2 "
            // endpoint="imageUploader"
            // onClientUploadComplete={res => {
            //   if(preImage.length > 0) {
            //     setPreImage([...preImage,res[0].url])
            //   }else{

            //     setPreImage([res[0].url])
            //   }
            // }}
            // onUploadError={error => {
            //   // Do something with the error.
            //   alert(`ERROR! ${error.message}`)
            // }}
            />
          </div>}


          {/* <SubmitButton onClick={uploadFile} loading={loading} className='w-[90%] h-12 bg-black my-4 text-blue-50'>Upload</SubmitButton> */}
        </div>
      </div>

      <TextEditor />
    </div>
  )
}

export default Page
