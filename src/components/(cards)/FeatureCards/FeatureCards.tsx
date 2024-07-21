import React, { FC } from 'react'
import { CardsProps } from '../MainCard/MainCard'
import Image from 'next/image'
import Link from 'next/link'
import { CiCalendar } from "react-icons/ci";
import { FaBlog } from "react-icons/fa";
import { MdKeyboardArrowRight } from "react-icons/md";
import localFont from 'next/font/local'

export const monaRegular = localFont({
  src: './HubotSans-Regular.otf',
  display: 'swap',
})
interface FeatureCardProps extends CardsProps{
  category?: string
}
const FeatureCards: FC<FeatureCardProps> = ({
  id,
  image,
  title,
  slug,
  author,
  createdAt,
  category,
  ...props
}

) => {
  return (
    <div {...props} className='w-[80vw] h-full !min-w-96 flex justify-center gap-x-8 mx-auto my-4 capitalize flex-wrap max-md:flex-col cursor-pointer'>
      <div className='w-[45%] max-h-64 max-md:w-[90%]'>
        <Image src={image.src} alt={image.alt} width={2000} height={2000} className='rounded-xl w-full h-full object-cover' />
      </div>
      <div className='w-[45%] px-2 max-md:w-[90%] py-4'>
      <span className='flex justify-start items-center gap-4 ' >
            <FaBlog /> {category}
          </span>
        <h2 className={`${monaRegular.className} font-semibold line-clamp-2 text-2xl ca`}>
          <Link href={`/post/${slug}`}>{title}</Link>
        </h2>
        <div className='text-[#6a6a6a] text-sm capitalize flex gap-x-2 px-2 py-3' >
          <span className='flex justify-center items-center gap-1 ' ><Image
            src={author.image}
            alt={author.name}
            width={20}
            height={20}
            className="w-4 h-4 rounded-full"
          ></Image> {author.name}</span>
          <span className='flex justify-center items-center gap-1'><CiCalendar />
            {new Date(createdAt).toLocaleDateString()}
          </span>
        </div>
          <Link href={`/post/${slug}`} className='flex justify-start items-center gap-1 text-[#0f7391] mx-4 font-medium'>
            Read Full article <MdKeyboardArrowRight />
          </Link>

      </div>

    </div>
  )
}

export default FeatureCards
