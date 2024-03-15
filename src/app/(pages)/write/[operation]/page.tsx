"use client"
import TextEditor from '@/components/TextEditor'
import {useEditor} from '@tiptap/react'
import Link from '@tiptap/extension-link'
import StarterKit from '@tiptap/starter-kit'
import Image  from '@tiptap/extension-image'
import Youtube from '@tiptap/extension-youtube'
import Table from '@tiptap/extension-table'
import TableCell from '@tiptap/extension-table-cell'
import TableHeader from '@tiptap/extension-table-header'
import TableRow from '@tiptap/extension-table-row'
import { useParams } from 'next/navigation'
import React, { useEffect, useRef, useState } from 'react'
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import axios from 'axios';
import {  toast } from 'react-toastify';
import SubmitButton from '@/components/layoutComponents/Button/SubmitButton'
import UploadImage from '@/components/uploadImageWithPre/UploadImage';
import Modal from '@/components/Modal/Modal'
import { UploadButton } from '@/utilis'
import { useDebouncedCallback } from 'use-debounce';
import { errorToastHandler } from '@/components/errorTostHandler'
import { useRouter } from 'next/navigation'
const animatedComponents = makeAnimated();
interface Option {
  value: string;
  label: string;
}
export interface PreImageProps {
  src: string ;
  alt: string ;
}

const Page = () => {
  const router = useRouter();
  const heroImageRef = useRef<HTMLInputElement>(null);
  const [title,setTitle] = useState<string >("");
  const [metaTitle,setMetaTitle] = useState<string >("");
  const [metaDes,setMetaDes] = useState<string >("");
  const [method, setMethod] = useState("uploadthing")
  const [dialogRef, setDialogRef] = useState<React.RefObject<HTMLDialogElement> | null>(null);
  const [preImage, setPreImage] = useState<PreImageProps>({src:"",alt:""});
  const [selectedTags, setSelectedTags] = useState<Option[]>([]);
  const [tags, setTags] = useState([]);
  const param = useParams();

  useEffect(() => {
    getData();
    if(param.operation === "new"){
        setTitle(localStorage.getItem("title") ?? "")
        setPreImage({src: localStorage.getItem("heroImage") ?? "",alt: localStorage.getItem("heroImage") ?? ""})
        setMetaTitle(localStorage.getItem("metaTitle") ?? "");
        setMetaDes(localStorage.getItem("metaDes") ?? ""); 
    }
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

  const handleChange = (options: readonly Option[] | null) => {
    setSelectedTags(options ? Array.from(options) : []);
  };

  const onChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setMethod(e.target.value);
  };
  const debounced = useDebouncedCallback(
    (val:{key:string,value:string }) => {
      window.localStorage.setItem(val.key,val.value);
    },
    5000
  );
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
      ${typeof window !== 'undefined' && localStorage?.getItem("content")}
    `,
  })
  
  if (!editor) {
    return null
  }
    

  editor.on('update', ({ editor }) => {
    debounced({key:"content",value:editor.getHTML()});
  });

  const publicBlog = async () => {
    try {

      if(!title || !preImage.src || !preImage.alt || !metaDes || !metaTitle || selectedTags.length > 1){
        toast.error("Please fill all fields....");
      }
      const res = await axios.post("/api/blog/writer/create", {
        title: title,
        image: preImage,
        content: JSON.stringify(editor.getHTML()),
        metaTitle: metaTitle,
        metaDesc: metaDes
      })
      if(res.data.success){
        toast.success("published.....")
        // router.push()
      }
    } catch (error) {
      errorToastHandler(error);
    }
  }
  
  

  return (
    <div className='min-h-screen'>

      {/* image uploading ................ */}
      <Modal setDialog={setDialogRef} btnClass='w-full' className='!px-20 ' button={<UploadImage preImage={preImage} />}>
        {/* alt  */}
        <input onChange={(e)=>{
            setPreImage({src:preImage.src,alt:e.target.value})
            debounced({key:"alt",value:e.target.value});
            }} value={preImage.alt} type="text" name="" id="" placeholder='Meta title....' className="w-full px-8 py-2 rounded-md font-medium  border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white" />
        {/* select method  */}
        <div className='flex justify-center gap-x-4 mx-auto my-6'>
          <label>
            <input
              type="radio"
              name="method"
              id="uploadthing"
              value="uploadthing"
              checked={method === 'uploadthing'}
              onChange={onChange}
              className="mx-2"
            />
            uploadthing
          </label>
          <label>
            <input
              type="radio"
              name="method"
              id="url"
              value="url"
              checked={method === 'url'}
              onChange={onChange}
              className="mx-2"
            />
            url
          </label>
        </div>
        {method === "uploadthing" && <UploadButton
          endpoint="imageUploader"
          onClientUploadComplete={(res) => {
            setPreImage({src:res[0].url,alt:""});
            dialogRef?.current?.close();
            debounced({key:"heroImage",value:res[0].url})
            toast.success("images uploaded successfully");
          }}
          onUploadError={(error: Error) => {
            dialogRef?.current?.close();
            toast.error(error.message);
          }}
        />}
        {method === "url" &&
          <div>
            <input type="url" ref={heroImageRef} placeholder='cover banner URL...' className="w-[70%] px-8 py-2 rounded-md font-medium  border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white" />
            <SubmitButton value="add cover image..." className='py-2 px-4 bg-black text-white rounded-md my-2' onClick={()=>{
              if(heroImageRef.current?.value){
                setPreImage({src:heroImageRef.current.value,alt:""});
                debounced({key:"heroImage",value:heroImageRef.current.value})
              }else{
                toast.error("url not found");
              }
              dialogRef?.current?.close();
            }} />
          </div>
        }
      </Modal>

      <div className='w-11/12 mx-auto mt-16'>
        {/* title ..................  */}
        <div className="flex gap-x-2  px-2 py-2 my-2 flex-wrap justify-between gap-y-4">
          <input onChange={(e)=>{
            setTitle(e.target.value)
            debounced({key:"title",value:e.target.value});
            }} value={title} type="text" name="" id="" placeholder='Please Enter Your Title....' className="w-[60%] px-8 py-2 rounded-md font-medium  border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white" />
          <Select
            closeMenuOnSelect={false}
            components={animatedComponents}
            isMulti
            value={selectedTags}
            onChange={handleChange}
            options={tags}
            className='w-[25%]'

          />
          {/* meta title  */}
          <input onChange={(e)=>{
            setMetaTitle(e.target.value)
            debounced({key:"metaTitle",value:e.target.value});
            }} value={metaTitle} type="text" name="" id="" placeholder='Meta title....' className="w-5/12 px-8 py-2 rounded-md font-medium  border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white" />
            {/* meta desc  */}
            <input onChange={(e)=>{
            setMetaDes(e.target.value)
            debounced({key:"metaDes",value:e.target.value});
            }} value={metaDes} type="text" name="" id="" placeholder='meta description....' className="w-5/12 px-8 py-2 rounded-md font-medium  border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white" />
        </div>

        <TextEditor editor={editor} /> 

      </div>
      <SubmitButton value="Public" className='bg-green-700 text-blue-50 px-4 py-2 rounded-full block mx-auto mt-4 hover:bg-green-600 font-bold ' onClick={()=>publicBlog()} />
    </div>
  )
}

export default Page
