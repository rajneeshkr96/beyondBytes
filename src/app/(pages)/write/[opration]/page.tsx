"use client"
import TextEditor from '@/components/TextEditor'
import {

  useEditor,
} from '@tiptap/react'
import Link from '@tiptap/extension-link'
import StarterKit from '@tiptap/starter-kit'
import Image  from '@tiptap/extension-image'
import Youtube from '@tiptap/extension-youtube'
import Table from '@tiptap/extension-table'
import TableCell from '@tiptap/extension-table-cell'
import TableHeader from '@tiptap/extension-table-header'
import TableRow from '@tiptap/extension-table-row'
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import axios from 'axios';
import SubmitButton from '@/components/layoutComponents/Button/SubmitButton'
import UploadImage from '@/components/uploadImageWithPre/UploadImage';
import Modal from '@/components/Modal/Modal'
import { UploadButton } from '@/utilis'

const animatedComponents = makeAnimated();
interface Option {
  value: string;
  label: string;
}
const Page = () => {
  const [method, setMethod] = useState("firebase")
  const [dialog,setDialog] = useState();
  const [preImage, setPreImage] = useState("/img1.jpg")
  const [selectedTags, setSelectedTags] = useState<Option[]>([]);
  const [tags, setTags] = useState([]);

  const param = useParams();

  useEffect(() => {
    getData();

  }, []);
  const getData = async () => {
    const { data } = await axios.get("/api/tags/get");
    let tag = data.data.map((val: {
                    UserId: string
                    createdAt: Date
                    id: string
                    title: string
                    value: string[]
                    }) => {
                      return val.value;
                    })
    tag = tag.flat(1).map((val:string) => {
        return {value:val,label:val};
      })
    setTags(tag);
  };
  const editor = useEditor({
    extensions: [
      StarterKit,
      Image,
      Link.configure({
        openOnClick: false,
        autolink: true,
      }),
      Youtube.configure({
        controls: false,
      }),
      Table.configure({
        resizable: true,
      }),
      TableRow,
      TableHeader,
      TableCell,
    ],
    content: `
      <p>
      Try to select <em>this text</em> to see what we call the bubble menu.
      </p>
      <p>
        Neat, isn’t it? Add an empty paragraph to see the floating menu.
      </p>
    `,
  })
  
  if (!editor) {
    return null
  }

  const handleChange = (options: readonly Option[] | null) => {
    setSelectedTags(options ? Array.from(options) : []);
  };

  return (
    <div className='min-h-screen'>

      {/* image uploading ................ */}
      <Modal setDialog={setDialog} btnClass='w-full' button={ <UploadImage preImage={preImage}/>}>
      <UploadButton
        endpoint="imageUploader"
        onClientUploadComplete={(res) => {
          // Do something with the response
          console.log("Files: ", res);
          alert("Upload Completed");
        }}
        onUploadError={(error: Error) => {
          // Do something with the error.
          alert(`ERROR! ${error.message}`);
        }}
      />
      </Modal>

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

        <TextEditor editor={editor} /> 

      </div>
      <SubmitButton value="test" />
    </div>
  )
}

export default Page
