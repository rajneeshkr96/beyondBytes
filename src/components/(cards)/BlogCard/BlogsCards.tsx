import Image from "next/image";
import React, { FC } from "react";
// import styles from  "./BlogsCards.module.css"
import Link from "next/link";

interface BlogsCardsProps {
  title: string;
  image: { src: string; alt: string };
  description: string;
  slug: string;
  id: string;
  commentCount: number;
  authId: string;
  bookmark?: boolean;
  likesCount: number;
  meLike?: boolean;
  baseurl: string;
}

const BlogsCards: FC<BlogsCardsProps> = ({
  id,
  image,
  title,
  description,
  slug,
  commentCount,
  authId,
  bookmark = false,
  likesCount,
  meLike,
  baseurl,
  ...props
}) => {
  return (
    <div className="w-full">
      <Link href={`/post/${slug}`} target="_blank">
        <div className="flex flex-col flex-shrink-0 flex-grow-0 max-w-full bg-white shadow-md rounded-lg overflow-hidden m-4">
          <div className="pb-[56.25%] relative">
            <Image
              className="w-full absolute"
              alt={"image.alt"}
              width={1000}
              height={1000}
              src={image.src}
            />
          </div>
          <div className="p-6">
            <h2 className="text-xl font-semibold">Drive (2011)</h2>
            <p className="mt-3 leading-7 ">{title}</p>
          </div>
        </div>
      </Link>
      
    </div>
  );
};

export default BlogsCards;
