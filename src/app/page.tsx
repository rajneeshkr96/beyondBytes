
import BlogCard, { BlogcardProps } from "@/components/BlogCard/BlogCard";
import FeatureCards from "@/components/FeatureCards/FeatureCards";
import HeroSlide from "@/components/HeroSection/HeroSlide";
import TagSlide from "@/components/TagSlide/TagSlide";
import axios from "axios";


export default async function Home() {
  let blog;
  
 try {
  const res = await axios.get(`${process.env.BASE_URL}/api/blog/all?sort=createdAt&fields=id,tags,likesCount,title,metaDesc,image,createdAt,author,slug,readTime`);
  console.log(res.data);
  if(res.data.success){
    blog = res.data.data;
  }
 } catch (error) {
  console.log(error);
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
        id={data.id}
        tags={data.tags}
        bookmark={data.bookmark}
        likesCount={data.likesCount}
        meLike={data.meLike}
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
