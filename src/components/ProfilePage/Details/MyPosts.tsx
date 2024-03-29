"use client"
import React, { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import axios from 'axios';
import BlogCard from '@/components/BlogCard/BlogCard';
export interface MyPostsProps {
    id: string;
  tags?:Array<string>;

  likesCount?:number;
  disableBtn?:boolean;

  title: string;
  metaDesc: string;
  image: {src: string, alt:string};
  createdAt: Date;
  author: {id:string; name:string, email:string,image:string,role:string};
  slug: string;
  readTime: string;
}
    

const MyPosts = async () => {
    const id = "65eabfc18015eaeff8ae6e31"
    
    const [post, setPost] = useState([])
    const getAllPosts = async () => {
        const {data} = await axios.get(`/api/blog/writer/${id}`)
        setPost(data.data)
    }
    useEffect(() => {
        getAllPosts()
    }, [])
    console.log(post)
  return (
    <div className='bg-[#e2eafc]'>
        <section className="flex justify-center  flex-wrap ">
      {post.map((data:MyPostsProps)=>
      <BlogCard 
        key={data.id}
        disableBtn={true}
        id={data.id}
        tags={data.tags}
        likesCount={data.likesCount}
        title={data.title}
        metaDesc={data.metaDesc}
        image={data.image}
        createdAt={data.createdAt}
        author={data.author}
        slug={data.slug}
        readTime={data.readTime}
       />
      )}

      </section>
    </div>
  )
}

export default MyPosts