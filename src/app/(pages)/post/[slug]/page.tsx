import PostBody from '@/components/post/body/PostBody'
import Header from '@/components/post/header/Header'
import React from 'react'
import localFont from 'next/font/local'
import { currentUserId } from "@/lib/authDet";
import axios from 'axios'
import { notFound } from 'next/navigation'
import type { Metadata, ResolvingMetadata } from 'next'
import { cache } from 'react'
import CommentSDisplay from '@/components/post/Comments/CommentSDisplay'
const ogg = localFont({ src: '../../../../fonts/Ogg-Medium-BF646c18fc4e918.otf' })


type Props = {
  params: { slug: string }
  searchParams: { [key: string]: string | string[] | undefined }
}
// export const dynamic = "force-dynamic";
// export async function generateStaticParams() {
//   const response = await fetch(`${process.env.BASE_URL}/api/blog/all?fields=slug`);
//   const {data} = await response.json();
//   const val = data.data.map((slug:string) => slug);
//   return val;
// }

 const getData = cache(async (slug:string,userId?:string) => {
  try {
    const res = await axios.get(`${process.env.BASE_URL}/api/blog/${slug}/${userId}`);
    return res;
    
  } catch (error) {
    return null;
  }
 })
export async function generateMetadata(
  { params, searchParams }: Props
): Promise<Metadata> {
  // read route params
  const slug = params.slug
  const product = await getData(slug);
  if(product){
    // optionally access and extend (rather than replace) parent metadata
    return {
      title: product.data.data.metaTitle || "page not found",
      description: product.data.data.metaDesc || "page not found",
      openGraph: {
        images: [{
          url: product.data.data.image.src,
          alt: product.data.data.image.alt,
          width: 1200,
          height: 630,
        }],
  
      },
    }
  }else{
    return {
      title: {
        absolute:"page not found"
      },
      description:"page not found",
    }
  }
}

const Page = async (context: { params: { slug: string } }) => {
  let blog;
  let success = false;
  const slug = context.params.slug
  const baseURL = process.env.BASE_URL
  try {
   const userId = await currentUserId();
   const res = await getData(slug,userId);
    
   if(res && res.data.success){
    success = true;
     blog = {...res.data.data,content:JSON.parse(res.data.data.content)};
   }
  } catch (error) {
    return notFound();
  }
  if (!success) {
    return notFound();
  }

  return (
    <article className='px-12 py-12'>
      <Header title={blog.title} createdAt={blog.createdAt} readTime={blog.readTime} author={blog.author}  image={blog.image} tags={blog.tags} metaDesc={blog.metaDesc}/>
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