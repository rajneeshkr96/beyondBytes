"use client";
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Cards from '@/components/BlogCard/Cards';
import BlogsCards from '@/components/BlogCard/BlogsCards';
import { useParams } from 'next/navigation';

interface BookmarkProps {
    id: string;
    tags?: Array<string>;
  
    likesCount?: number;
    disableBtn?: boolean;
  
    title: string;
    metaDesc: string;
    image: { src: string; alt: string };
    createdAt: Date;
    author: {
      id: string;
      name: string;
      email: string;
      image: string;
      role: string;
    };
    slug: string;
    commentsCount: number;
    baseurl: string;
  
    readTime: string;

        
    }

const Bookmark = () => {
    const params = useParams();
    const id = params.id[2];
    const [bookmark, setBookmark] = useState([]);
    const getAllBookmarks = async () => {
        try {
            const { data } = await axios.get(`/api/user/bookmark/my-bookmark/${id}`);
            
        if (data.data) {
            setBookmark(data.data);
        }
            
        } catch (error) {
            
        }
    };
    useEffect(() => {
        getAllBookmarks();
    }, []);
    console.log("bookmark./...............",bookmark);
    const length = bookmark.length;
    let grid = length > 2 ? "grid-cols-3" : "grid-cols-2";
  return (
    <div className="bg-[#e2eafc] w-11/12 mx-auto">
      <section className={`grid mx-auto ${grid} max-sm:grid-cols-1 justify-evenly max-sm:justify-center gap-2 p-3  max-sm:flex-col`}>
        {bookmark.map((data: BookmarkProps) => (
          <BlogsCards
            key={data.id}
            id={data.id}
            title={data.title}
            description={data.metaDesc}
            image={data.image}
            slug={data.slug}
            authId={data.author?.id?data?.author.id:""}
            likesCount={data?.likesCount?data.likesCount:0}
            commentCount={data.commentsCount}
            baseurl={process.env.BASE_URL as string} 

          />
        ))}
      </section>
    </div>
  )
}

export default Bookmark