
import BlogCard from "@/components/BlogCard/BlogCard";
import FeatureCards from "@/components/FeatureCards/FeatureCards";
import HeroSlide from "@/components/HeroSection/HeroSlide";
import TagSlide from "@/components/TagSlide/TagSlide";
import axios from "axios";
import { currentUserId } from "@/lib/authDet";
import { notFound } from "next/navigation";
interface Bookmarks{
  bookmark:boolean
}
interface Likes{
  like:boolean
}
export interface BlogcardProps{
  id: string;
  tags?:Array<string>;
  bookmarks?:Array<Bookmarks> ;
  likesCount?:number;
  disableBtn?:boolean;
  likes?:Array<Likes>;
  title: string;
  metaDesc: string;
  image: {src: string, alt:string};
  createdAt: Date;
  author: {id:string; name:string, email:string,image:string,role:string};
  slug: string;
  readTime: string;
}
export default async function Home() {
  let blog;
  const id = await currentUserId();
  let success = false;
 try {
  const res = await axios.get(`${process.env.BASE_URL}/api/blog/all?id=${id}&sort=createdAt&fields=id,tags,likesCount,author,title,metaDesc,image,createdAt,slug,readTime`);
  if(res.data.success){
    blog = res.data.data;
    success = true;
  }
 } catch (error) {
  success = false;
  console.log(error);
 }
  if (!success) {
    return notFound();
  }
 
  return (
    
    <main className="min-h-screen">
      <HeroSlide/>
      <FeatureCards/>
      <TagSlide/>
      <h2 className="text-4xl font-bold px-4 max-sm:px-6   ">Feature Blogs</h2>
      <section className="flex justify-center  flex-wrap ">
      {blog.map((data:BlogcardProps)=>
      <BlogCard
        key={data.id}
        disableBtn={true}
        id={data.id}
        tags={data.tags}
        meLike={data.likes && data?.likes[0]?.like} 
        bookmark={data.bookmarks && data?.bookmarks[0]?.bookmark }
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
      
      
   
    </main>

 
  );
}
