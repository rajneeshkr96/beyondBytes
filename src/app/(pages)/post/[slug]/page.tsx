import PostBody from '@/components/post/body/PostBody'
import Header from '@/components/post/header/Header'
import React from 'react'
import localFont from 'next/font/local'
import { PostFeatures } from '@/components/post/postFeatures/PostFeatures'
import { currentUserId } from "@/lib/authDet";
import axios from 'axios'
import { notFound } from 'next/navigation'
const ogg = localFont({ src: '../../../../fonts/Ogg-Medium-BF646c18fc4e918.otf' })
const Page = async (context: { params: { slug: string } }) => {
  let blog;
  let success = false;
  const slug = context.params.slug
  const baseURL = process.env.BASE_URL
  try {
   const userId = await currentUserId();
   const res = await axios.get(`${process.env.BASE_URL}/api/blog/${slug}/${userId}`);
    
   if(res.data.success){
    success = true;
     blog = {...res.data.data,content:JSON.parse(res.data.data.content)};
   }
  } catch (error) {
   console.log(error);
  }
  if (!success) {
    return notFound();
  }
  return (
    <article>
      <Header title={blog.title} createdAt={blog.createdAt} readTime={blog.readTime} author={blog.author} font={ogg.className}/>
      <PostFeatures baseurl={baseURL ?? ""} meLike={blog.likes && blog?.likes[0]?.like} bookmark={blog.bookmarks &&blog?.bookmarks[0]?.bookmark} slug={blog.slug}  commentCount={blog.commentsCount} likesCount={blog.likesCount}  id={blog.id}/>
      <PostBody image={blog.image} content={blog.content} font={ogg.className}/>
      <div className='flex w-9/12 justify-center gap-x-4 my-6 items-center'>
                <span className={`${ogg.className} text-2xl`}>Tags</span>
                <ul className='flex gap-x-2 font-bold'>
                    {blog.tags.map((val:string  ,index:string)=><li key={index}>{val}</li>)}
                </ul>
            </div>
    </article>
  )
}

export default Page