"use client";
import React, { FC, useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import axios from "axios";
import BlogsCards from "@/components/BlogCard/BlogsCards";
import Pagination from "@/components/Pagination/Pagination";
import path from "path";
import notfound from "@/app/not-found";

export interface MyPostsProps {
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

const MyPosts = ({
  searchParams,
}: {
  searchParams?: {
    keyword?: string;
    tags?: string;
    page?: string;
  };
}) => {
  const session = useSession();
  const id = session.data?.user?.userId;
  const keyword = searchParams?.keyword || "";
  const currentPage = Number(searchParams?.page) || 1;
  let documentCount = 0;

  const [post, setPost] = useState([]);
  const getAllPosts = async () => {
    try {
      const { data } = await axios.get(`/api/blog/writer/${id}`);
      if (data.success === true) {
        documentCount = data.total;
        setPost(data.data);
      }
    } catch (error) {}
  };
  useEffect(() => {
    getAllPosts();
  }, []);

  return (
    <div className="bg-[#e2eafc] w-11/12 mx-auto">
      <section className="grid grid-cols-3 max-sm:grid-cols-1 justify-evenly max-sm:justify-center gap-2 p-2  max-sm:flex-col   ">
  
        {post.length === 0? 
        "notfound": ""}
        {post.map((data: MyPostsProps) => (
          <BlogsCards
            key={data.id}
            id={data.id}
            title={data.title}
            description={data.metaDesc}
            image={data.image}
            slug={data.slug}
            authId={data.author.id}
            likesCount={data?.likesCount ? data.likesCount : 0}
            commentCount={data.commentsCount}
            baseurl={process.env.BASE_URL as string}
            />
          ))}

          <Pagination
            className="justify-center mt-4"
            path="/profile/dashboard/ADMIN"
            page={currentPage}
            keyword={keyword}
            documentCount={documentCount}
          />
      </section>
    </div>
  );
};

export default MyPosts;
