"use client";
import React, { FC, useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import axios from "axios";
import Cards from "@/components/BlogCard/Cards";
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
  readTime: string;
}

const MyPosts= async () => {
  const id = "65eabfc18015eaeff8ae6e31";

  const [post, setPost] = useState([]);
  const getAllPosts = async () => {
    const { data } = await axios.get(`/api/blog/writer/${id}`);
    setPost(data.data);
  };
  useEffect(() => {
    getAllPosts();
  }, []);
  console.log(post);
  return (
    <div className="bg-[#e2eafc]">
      <section className="flex justify-center gap-2 flex-wrap ">
        {post.map((data: MyPostsProps) => (
          <Cards
            key={data.id}
            id={data.id}
            title={data.title}
            description={data.metaDesc}
            image={data.image}
            slug={data.slug}
          />
        ))}
      </section>
    </div>
  );
};

export default MyPosts;
