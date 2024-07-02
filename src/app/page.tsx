

import HeroSection from "@/components/layoutComponents/HeroSection/HeroSection";
import axios from "axios";
import { currentUserId } from "@/lib/authDet";
import { notFound } from "next/navigation";
import MainCard from "@/components/(cards)/MainCard/MainCard";
import CategorySlide from "@/components/categorySlide/CategorySlide";
import MediaQuery from "@/components/layoutComponents/MediaQuery";



export const metadata = {
  description: "Explore the world of technology, lifestyle, travel, and more at BiyondBytes. Discover insightful articles across all categories and stay updated on the latest trends. Join us as we dive deep into diverse topics beyond the ordinary, only at BiyondBytes",

};
interface Bookmarks {
  bookmark: boolean
}
interface Likes {
  like: boolean
}
export interface BlogcardProps {
  title: string;
  image: { src: string; alt: string };
  slug: string;
  id: string;
  author: { id: string; name: string, email: string, image: string, role: string };
  createdAt: Date;
}
export default async function Home() {
  let blog;
  const id: string = await currentUserId();
  let success = false;
  try {
    const res = await axios.get(`${process.env.BASE_URL}/api/blog/all?id=${id}&sort=-createdAt&fields=id,tags,likesCount,author,title,metaDesc,image,createdAt,slug,readTime`);
    if (res.data.success) {
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
      <MediaQuery minSize={999}>
        <div className="heroSection w-screen h-screen">
          <HeroSection />
        </div>
      </MediaQuery>
      <section className="my-12 featureSection">
        <CategorySlide data={blog} />
      </section>


      <section className="flex justify-center  flex-wrap ">

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

      </section>
    </main>


  );
}
