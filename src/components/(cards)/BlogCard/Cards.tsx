import React, { FC,useState} from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { IoHeartCircleSharp, IoHeartDislikeCircle, IoChatboxEllipses, IoShareSocial } from "react-icons/io5";
import { MdBookmarkAdd, MdOutlineBookmark } from "react-icons/md";
import ActionBtn from "@/components/layoutComponents/Button/ActionBtn";
import ActionOptions from "@/components/(cards)/BlogCard/ActionOptions";
import { toast } from 'react-toastify';
import axios from 'axios';
import { errorToastHandler } from '@/components/errorTostHandler';
import { useSession } from "next-auth/react";
import ShareOptions from "../../post/postFeatures/shareOptions";
import Link from "next/link";

interface CardsProps {
  title: string;
  image: { src: string; alt: string };
  description: string;
  slug: string;
  id: string;
  commentCount: number
  authId: string,
  bookmark?: boolean,
  likesCount: number,
  meLike?: boolean,
  baseurl:string
}

const Cards: FC<CardsProps> = ({
  id,
  image,
  title,
  description,
  slug,
  commentCount,
  authId,
  bookmark=false,
  likesCount,
  meLike,
  baseurl,
  ...props
}) => {
  const router = useRouter();
  const session = useSession();
  const [viewCmt, setViewCmt] = useState(false);
  const [likesCounts,setLikeCounts] = useState(likesCount);
  const [meLikes,setMeLikes] = useState(meLike);
  const [meBookmark,setMeBookmark] = useState(bookmark);
  const [loading,setLoading] = useState(false);

  const onLikesClick = async () => {

      if(session.status === 'authenticated'){
          try {
              setLoading(true);
              if(meLikes){
                  setMeLikes(false);
                  setLikeCounts(likesCounts-1);
              }else{
                  setMeLikes(true);
                  setLikeCounts(likesCounts+1);
              }
              const res = await axios.post(`/api/user/like/${id}`)
              console.log(res.data);
              setLoading(false);
              if(res.data.success){
                  toast.success(res.data.message)
              }
              
          } catch (error:any) {
              setLoading(false);
              errorToastHandler(error);
          }
      }else{
          toast.error("Please login first");
      }
    
  }
  const onBookmarkClick = async () => {
      if(session.status === 'authenticated'){
        setMeBookmark(!meBookmark);
        try {
          setLoading(true);
            const res = await axios.post(`/api/user/bookmark/add/${id}`)
            console.log(res.data);
            if(res.data.success){
                toast.success(res.data.message)
            }
            setLoading(false);
          } catch (error:any) {
              setLoading(false);
              errorToastHandler(error);
          }
      }else{
          toast.error("Please login first");
      }

  };

 
  return (
    <div className="border-2 my-2">
    
      <div
        {...props}
        className=" group relative cursor-pointer  max-sm:w-[99%] max-sm:h-[50vh] "
      >
        <Link
          href={`/post/${slug}`}
          target='_blank'
        >
          <Image
            src={image.src}
            alt={image.alt}
            width={1000}
            height={1000}
            className="w-full h-auto max-sm:h-[50vh] mx-auto object-cover rounded-lg cursor-pointer transition duration-300 transform group-hover:scale-105"
           
          />
        </Link>
        <div className="absolute p-6 text-[1em] top-0 left-0 w-full h-0 flex flex-col justify-between text-start  bg-half-transparent cursor-pointer opacity-0 group-hover:h-full group-hover:opacity-100 duration-500">
          <h1 className=" text-white duration-300">{title}</h1>
        </div>
      </div>
      <div className="hide-on-large  w-1/4 max-sm:w-[99%]">
      <div className="flex justify-between w-full my-2 text-4xl">
                <span className='flex gap-x-6 items-center '>
                    <span className='flex items-end'>
                        <span className='cursor-pointer' onClick={onLikesClick}>
                            {meLikes ? <IoHeartCircleSharp /> : <IoHeartDislikeCircle />}
                        </span>
                        <p className='text-[#5f5f5f] text-base '>{likesCounts}</p>
                    </span>
                    <IoChatboxEllipses className='cursor-pointer' onClick={() => setViewCmt(!viewCmt)} />
                </span>
                <span className='flex gap-x-2 items-center'>
                    
                    <ActionBtn className='text-lg ' width='w-56' actionIcon={<IoShareSocial className='cursor-pointer text-3xl' />}  >
                        <ShareOptions link={baseurl+"/post/"+slug}/>
                    </ActionBtn>
                    <span className='cursor-pointer' onClick={onBookmarkClick}>
                        {meBookmark ? <MdOutlineBookmark  /> : <MdBookmarkAdd  />}
                    </span>
                    
                </span>
            </div>
        <p className="text-[1em]">{title}</p>
      </div>
    </div >
  );
};

export default Cards;
