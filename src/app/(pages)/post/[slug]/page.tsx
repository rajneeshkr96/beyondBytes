import PostBody from '@/components/post/body/PostBody'
import Header from '@/components/post/header/Header'
import React from 'react'
import localFont from 'next/font/local'
import { PostFeatures } from '@/components/post/postFeatures/PostFeatures'
import axios from 'axios'
const ogg = localFont({ src: '../../../../fonts/Ogg-Medium-BF646c18fc4e918.otf' })
const Page = async (context: { params: { slug: string } }) => {
  let blog;
  const slug = context.params.slug
  try {
   const res = await axios.get(`${process.env.BASE_URL}/api/blog/${slug}`);
    
   if(res.data.success){
     blog = {...res.data.data,content:JSON.parse(res.data.data.content)};
   }
  } catch (error) {
   console.log(error);
  }
  return (
    <article>
      <Header title={blog.title} createdAt={blog.createdAt} readTime={blog.readTime} author={blog.author} font={ogg.className}/>
      <PostBody image={blog.image} content={blog.content} font={ogg.className}/>
      <PostFeatures font={ogg.className} likesCount={blog.likesCount} tags={blog.tags} id={blog.id}/>
    </article>
  )
}

export default Page