
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

  // const blog = [
  //   {
  //     id:"c1",
  //     tag:["web development"],
  //     bookmark:false,
  //     like:78,
  //     meLike:true,
  //     title:"Wisden Leading Cricketer in the World for three consecutive years, from 2016 to 2018. At the national level, Kohli was honoured with the Arjuna Award in 2013, the Padma Shri in 2017 and India's highest sporting honour, the Khel Ratna award, in 2018.",
  //     description:"n 1998, the West Delhi Cricket Academy (WCDA) was created. On 30 May of that year, Prem Kohli, who'd espoused his younger son's fervour for cricket, assisted nine-year-old Kohli's aspirations and arranged for him to meet Rajkumar Sharma, who initially perceived him to be just another enthusiastic and determined young boy. However, two weeks later, Sharma was impressed by Kohli's accuracy and power in throwing.[11] Upon the suggestion of their neighbours, Kohli's father considered enrolling his son in a professional cricket academy, as they believed that his cricketing abilities merited more than just playing in gully cricket.[12] Despite his abilities, he faced the setback of being unable to secure a place in the under-14 Delhi team, not due to a lack of merit but due to extraneous factors. Prem Kohli received offers to relocate his son to influential clubs, which would have ensured his selection, but he declined the proposals, as he was determined that Kohli should earn his recognition based on his own merit and overcome the system of nepotism and deceit prevalent in the Delhi and District Cricket Association (DDCA). ",
  //     image:"/img1.jpg",
  //     userProfile:"/img1.jpg",
  //     date:"2017-02-89",
  //     author:"admin guru",
  //     slug:"home",
  //     readTime:"1 min"
  //   },
  //   {
  //     id:"c2",
  //     tag:["web development"],
  //     bookmark:false,
  //     like:78,
  //     meLike:true,
  //     title:"Wisden Leading Cricketer in the World for three consecutive years, from 2016 to 2018. At the national level, Kohli was honoured with the Arjuna Award in 2013, the Padma Shri in 2017 and India's highest sporting honour, the Khel Ratna award, in 2018.",
  //     description:"n 1998, the West Delhi Cricket Academy (WCDA) was created. On 30 May of that year, Prem Kohli, who'd espoused his younger son's fervour for cricket, assisted nine-year-old Kohli's aspirations and arranged for him to meet Rajkumar Sharma, who initially perceived him to be just another enthusiastic and determined young boy. However, two weeks later, Sharma was impressed by Kohli's accuracy and power in throwing.[11] Upon the suggestion of their neighbours, Kohli's father considered enrolling his son in a professional cricket academy, as they believed that his cricketing abilities merited more than just playing in gully cricket.[12] Despite his abilities, he faced the setback of being unable to secure a place in the under-14 Delhi team, not due to a lack of merit but due to extraneous factors. Prem Kohli received offers to relocate his son to influential clubs, which would have ensured his selection, but he declined the proposals, as he was determined that Kohli should earn his recognition based on his own merit and overcome the system of nepotism and deceit prevalent in the Delhi and District Cricket Association (DDCA). ",
  //     image:"/img2.jpg",
  //     userProfile:"/img2.jpg",
  //     date:"2017-02-89",
  //     author:"admin guru",
  //     slug:"home",
  //     readTime:"1 min"
  //   },
  //   {
  //     id:"c3",
  //     tag:["web development"],
  //     bookmark:false,
  //     like:78,
  //     meLike:true,
  //     title:"Wisden Leading Cricketer in the World for three consecutive years, from 2016 to 2018. At the national level, Kohli was honoured with the Arjuna Award in 2013, the Padma Shri in 2017 and India's highest sporting honour, the Khel Ratna award, in 2018.",
  //     description:"n 1998, the West Delhi Cricket Academy (WCDA) was created. On 30 May of that year, Prem Kohli, who'd espoused his younger son's fervour for cricket, assisted nine-year-old Kohli's aspirations and arranged for him to meet Rajkumar Sharma, who initially perceived him to be just another enthusiastic and determined young boy. However, two weeks later, Sharma was impressed by Kohli's accuracy and power in throwing.[11] Upon the suggestion of their neighbours, Kohli's father considered enrolling his son in a professional cricket academy, as they believed that his cricketing abilities merited more than just playing in gully cricket.[12] Despite his abilities, he faced the setback of being unable to secure a place in the under-14 Delhi team, not due to a lack of merit but due to extraneous factors. Prem Kohli received offers to relocate his son to influential clubs, which would have ensured his selection, but he declined the proposals, as he was determined that Kohli should earn his recognition based on his own merit and overcome the system of nepotism and deceit prevalent in the Delhi and District Cricket Association (DDCA). ",
  //     image:"/img3.jpg",
  //     date:"2017-02-89",
  //     author:"admin guru",
  //     slug:"home",
  //     readTime:"1 min"
  //   },
  //   {
  //     id:"c4",
  //     tag:["web development"],
  //     bookmark:false,
  //     like:78,
  //     meLike:true,
  //     title:"Wisden Leading Cricketer in the World for three consecutive years, from 2016 to 2018. At the national level, Kohli was honoured with the Arjuna Award in 2013, the Padma Shri in 2017 and India's highest sporting honour, the Khel Ratna award, in 2018.",
  //     description:"n 1998, the West Delhi Cricket Academy (WCDA) was created. On 30 May of that year, Prem Kohli, who'd espoused his younger son's fervour for cricket, assisted nine-year-old Kohli's aspirations and arranged for him to meet Rajkumar Sharma, who initially perceived him to be just another enthusiastic and determined young boy. However, two weeks later, Sharma was impressed by Kohli's accuracy and power in throwing.[11] Upon the suggestion of their neighbours, Kohli's father considered enrolling his son in a professional cricket academy, as they believed that his cricketing abilities merited more than just playing in gully cricket.[12] Despite his abilities, he faced the setback of being unable to secure a place in the under-14 Delhi team, not due to a lack of merit but due to extraneous factors. Prem Kohli received offers to relocate his son to influential clubs, which would have ensured his selection, but he declined the proposals, as he was determined that Kohli should earn his recognition based on his own merit and overcome the system of nepotism and deceit prevalent in the Delhi and District Cricket Association (DDCA). ",
  //     image:"/img4.jpg",
  //     userProfile:"/img4.jpg",
  //     date:"2017-02-89",
  //     author:"admin guru",
  //     slug:"home",
  //     readTime:"1 min"
  //   },
  //   {
  //     id:"c5",
  //     tag:["web development"],
  //     bookmark:false,
  //     like:78,
  //     meLike:true,
  //     title:"Wisden Leading Cricketer in the World for three consecutive years, from 2016 to 2018. At the national level, Kohli was honoured with the Arjuna Award in 2013, the Padma Shri in 2017 and India's highest sporting honour, the Khel Ratna award, in 2018.",
  //     description:"n 1998, the West Delhi Cricket Academy (WCDA) was created. On 30 May of that year, Prem Kohli, who'd espoused his younger son's fervour for cricket, assisted nine-year-old Kohli's aspirations and arranged for him to meet Rajkumar Sharma, who initially perceived him to be just another enthusiastic and determined young boy. However, two weeks later, Sharma was impressed by Kohli's accuracy and power in throwing.[11] Upon the suggestion of their neighbours, Kohli's father considered enrolling his son in a professional cricket academy, as they believed that his cricketing abilities merited more than just playing in gully cricket.[12] Despite his abilities, he faced the setback of being unable to secure a place in the under-14 Delhi team, not due to a lack of merit but due to extraneous factors. Prem Kohli received offers to relocate his son to influential clubs, which would have ensured his selection, but he declined the proposals, as he was determined that Kohli should earn his recognition based on his own merit and overcome the system of nepotism and deceit prevalent in the Delhi and District Cricket Association (DDCA). ",
  //     image:"/img1.jpg",
  //     userProfile:"/img1.jpg",
  //     date:"2017-02-89",
  //     author:"admin guru",
  //     slug:"home",
  //     readTime:"1 min"
  //   },

  // ]
  return (
    
    <main className="min-h-screen">
      <HeroSlide/>
      <FeatureCards/>
      <TagSlide/>
      <h2 className="text-4xl font-bold px-4 max-sm:px-6   ">Feature Blogs</h2>
      <section className="flex justify-start  flex-wrap ">
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
