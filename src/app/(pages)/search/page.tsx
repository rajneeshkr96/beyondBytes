
import { BlogcardProps } from "@/app/page";
import MainCard from "@/components/(cards)/MainCard/MainCard";
import Pagination from "@/components/Pagination/Pagination";
import { currentUserId } from "@/lib/authDet";
import axios from "axios";
import Link from "next/link";
import { notFound } from "next/navigation";
import React from "react";

export default async function Page({
  searchParams,
}: {
  searchParams?: {
    keyword?: string;
    tags?: string;
    page?: string;
  };
}) {
  const keyword = searchParams?.keyword || '';
  const tags = searchParams?.tags || '';
  const currentPage = Number(searchParams?.page) || 1;
  let blog = [];
  let tag = [];
  const id = await currentUserId();
  let success = false;
  let res
  let documentCount = 0;

  try {
    res = await axios.get(`${process.env.BASE_URL}/api/blog/all?id=${id}&sort=createdAt&fields=id,tags,likesCount,author,title,metaDesc,image,createdAt,slug,readTime&page=${currentPage}&search=${keyword}&tags=${tags}`);
    if (res.data.success) {
      blog = res.data.data;
      documentCount = res.data.total
     
      success = true;
    }
  } catch (error) {
    success = false;
    // console.log(error);
  }

  if (!success || res?.data.data.length == 0) {
    return notFound();
  }
  return (
    <div className="w-full min-h-screen">
      <div style={{ gridTemplateColumns: "80% 20%" }} className='grid  max-lg:gap-y-16 max-lg:!grid-cols-[100%] mt-4'>
        <div className='max-lg:row-start-2 max-lg:row-end-3 flex justify-center  flex-wrap' >
          {blog.map((data: BlogcardProps) =>
            <MainCard
              key={data.id}
              id={data.id}
              title={data.title}
              image={data.image}
              createdAt={data.createdAt}
              author={data.author}
              slug={data.slug}
            />
          )}
        </div>


      </div>

      <Pagination className="justify-center mt-4" path="/search" page={currentPage} keyword={keyword} documentCount={documentCount}/>
    </div>
  );
}