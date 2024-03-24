import { NextResponse,NextRequest } from "next/server";
import { dataBasePrisma } from "@/databasePrisma";

export async function GET(req: NextRequest,context: { params: { slug: string[] } }) {
  try {

    const slug = context.params.slug[0];

    if(slug === undefined) return NextResponse.json({ success: false,message:"slug is undefined" }, { status: 400 });

    const userId = context.params.slug[1];
    let blog;
    console.log(userId,slug);
    if(userId !== 'undefined'){
      console.log("its not me" ,userId !== undefined);
      blog = await dataBasePrisma.blog.findUnique({
       where: {
         slug: slug,
       },
       include:{
         author:true,
         likes:{
           where:{
             UserId: userId,
           },
           select:{
            like: true
           }
         },
         bookmarks:{
           where:{
             UserId: userId,
           },
           select:{
             bookmark: true
           }
         }
       }
     })
    }else{
      console.log(slug);
      blog = await dataBasePrisma.blog.findUnique({
        where: {
          slug: slug,
        },
        include:{
          author:true
        }
      })
    }
    if(blog === null) return NextResponse.json({ success: false,message:"blog not found" }, { status: 404 });
    return NextResponse.json({ success: true,message:"fetched successfully", data: blog }, { status: 200 });
  } catch (error) {
    // console.error(error);
    return NextResponse.json({ success: false,message:error }, { status: 500 });
  }
}
