
import { BlogcardProps } from "@/app/page";
import BlogCard from "@/components/BlogCard/BlogCard";
import Header from "@/components/layoutComponents/Header";
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
      tag = res.data.data.map((tag:BlogcardProps) =>{return tag.tags})
      tag = Array.from(new Set([...tag.flat(1)]));
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
      <Header title={keyword == "" ? "Tag" : "Search"} category={keyword == "" ? tags : keyword} />
      <div style={{ gridTemplateColumns: "80% 20%" }} className='grid  max-lg:gap-y-16 max-lg:!grid-cols-[100%] mt-4'>
        <div className='max-lg:row-start-2 max-lg:row-end-3 flex justify-center  flex-wrap' >
          {blog.map((data: BlogcardProps) =>
            <BlogCard
              key={data.id}
              disableBtn={true}
              id={data.id}
              tags={data.tags}
              meLike={data.likes && data?.likes[0]?.like}
              bookmark={data.bookmarks && data?.bookmarks[0]?.bookmark}
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
        </div>

        <div className='relative max-lg:row-start-1 max-lg:row-end-2 max-lg:hidden'>
          <div className='sticky top-8 left-0'>
              <h4>Topics matching Tags</h4>
            <ul className='flex gap-x-3 font-bold flex-wrap px-4 mt-4'>
              {tag.map((val: string, index: string) => <li className="px-4 py-2 bg-[#f2f2f2] rounded-3xl" key={index}><Link href={`/search?tags=${val}`}>{val}</Link></li>)}
            </ul>
          </div>
        </div>

      </div>

      <Pagination className="justify-center mt-4" path="/search" page={currentPage} keyword={keyword} documentCount={documentCount}/>
    </div>
  );
}