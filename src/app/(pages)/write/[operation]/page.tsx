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
import { redirect, useParams, useSearchParams } from 'next/navigation'
import React, { useEffect, useRef, useState } from 'react'
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import axios from 'axios';
import {  toast } from 'react-toastify';
import SubmitButton from '@/components/layoutComponents/Button/SubmitButton'
import UploadImage from '@/components/uploadImageWithPre/UploadImage';
import { useDebouncedCallback } from 'use-debounce';
import { ErrorResponse, errorToastHandler } from '@/components/errorTostHandler'
import { useRouter } from 'next/navigation'
import ImageUploadModal from '@/components/UploadImage/UploadImage'
import { useSession } from 'next-auth/react'
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
  const [loading,setLoading] = useState(false);
  const heroImageRef = useRef<HTMLInputElement>(null);
  const altRef = useRef<HTMLInputElement>(null);
  const [title,setTitle] = useState<string >("");
  const [metaTitle,setMetaTitle] = useState<string >("");
  const [metaDes,setMetaDes] = useState<string >("");
  const [preImage, setPreImage] = useState<PreImageProps>({src:"",alt:""});
  const [selectedTags, setSelectedTags] = useState<Option[]>([]);
  const session = useSession();
  const [tags, setTags] = useState([]);
  const param = useParams();
  const searchParams = useSearchParams();

  useEffect(() => {

    if(session.data?.user.role === "USER"){
      redirect("/");
    }
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
    getData();
    if(param.operation === "new"){
        setTitle(localStorage.getItem("title") ?? "")
        setPreImage({src: localStorage.getItem("heroImage") ?? "",alt: localStorage.getItem("alt") ?? ""})
        setMetaTitle(localStorage.getItem("metaTitle") ?? "");
        setMetaDes(localStorage.getItem("metaDes") ?? ""); 
    }
    if(param.operation === "edit"){
      const id = searchParams.get("id");
      // const { data } = await axios.get(`/api/blog/writer/get/${id}`);

    }
  }, [param.operation]);


  const handleChange = (options: readonly Option[] | null) => {
    setSelectedTags(options ? Array.from(options) : []);
  };


  const debounced = useDebouncedCallback(
    (val:{key:string,value:string }) => {
      window.localStorage.setItem(val.key,val.value);
    },
    10000
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
  
  useEffect(() => {
    const saveToLocalStorage = () => {
      if (editor) {
        localStorage.setItem('content', editor.getHTML());
      }
    };

    const intervalId = setInterval(saveToLocalStorage, 5000); // Save every 5 seconds

    return () => clearInterval(intervalId);
  }, [editor]);

  
  if (!editor) {
    return null
  }
    


  const publicBlog = async () => {
    try {
      setLoading(true);
      if(!title || !preImage.src || !preImage.alt || !metaDes || !metaTitle || selectedTags.length < 1){
        toast.error("Please fill all fields....");
        setLoading(false);
        return;
      }
      const tags = selectedTags.map(tag =>tag.value);
      const res = await axios.post("/api/blog/writer/create", {
        title: title,
        image: preImage,
        content: JSON.stringify(editor.getHTML()),
        metaTitle: metaTitle,
        metaDesc: metaDes,
        tags: tags
      })
      if(res.data.success){
        toast.success("published.....")
        localStorage.setItem("title","")
        localStorage.setItem("heroImage","")
        localStorage.setItem("alt","")
        localStorage.setItem("content","")
        localStorage.setItem("metaTitle","")
        localStorage.setItem("metaDes","")
        router.push(`/post/${res.data.data.slug}`);
      }

      setLoading(false);
    } catch (error:ErrorResponse | any) {
      setLoading(false);
      errorToastHandler(error);
    }
  }
  
  

  return (
    <div className='min-h-screen'>

      {/* image uploading ................ */}
      
      <ImageUploadModal
        preImage={preImage}
        setPreImage={setPreImage}
        button={<UploadImage preImage={preImage} />}
        debounced={debounced}
        heroImageRef={heroImageRef}
        altRef={altRef}
      />

      <div className='w-11/12 mx-auto mt-16'>
        {/* title ..................  */}
        <div className="flex gap-x-2  px-2 py-2 my-2 flex-wrap justify-between gap-y-4">
          <input onChange={(e)=>{
            setTitle(e.target.value)
            debounced({key:"title",value:e.target.value});
            }} value={title} type="text" name="" id="" placeholder='Please Enter Your Title....' className="w-[60%] px-8 py-2 rounded-md font-medium  border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white max-md:w-full" />
          <Select
            closeMenuOnSelect={false}
            components={animatedComponents}
            isMulti
            value={selectedTags}
            onChange={handleChange}
            options={tags}
            className='w-[25%] max-md:w-full'

          />
          {/* meta title  */}
          <input onChange={(e)=>{
            setMetaTitle(e.target.value)
            debounced({key:"metaTitle",value:e.target.value});
            }} value={metaTitle} type="text" name="" id="" placeholder='Meta title....' className="w-5/12 px-8 py-2 rounded-md font-medium  border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white max-md:w-full" />
            {/* meta desc  */}
            <input onChange={(e)=>{
            setMetaDes(e.target.value)
            debounced({key:"metaDes",value:e.target.value});
            }} value={metaDes} type="text" name="" id="" placeholder='meta description....' className="w-5/12 px-8 py-2 rounded-md font-medium  border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white max-md:w-full" />
        </div>

        <TextEditor editor={editor} /> 

      </div>
      <SubmitButton loading={loading} value="Publish" className='bg-green-700 text-blue-50 px-4 py-2 rounded-full block mx-auto mt-4 hover:bg-green-600 font-bold ' onClick={publicBlog} />
    </div>
  )
}

export default Page
