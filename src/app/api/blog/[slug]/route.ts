import { NextResponse,NextRequest } from "next/server";
import { dataBasePrisma } from "@/databasePrisma";


export async function GET(req: NextRequest,context: { params: { slug: string } }) {
  try {
    const slug = context.params.slug
    if(slug === undefined) return NextResponse.json({ success: false,message:"slug is undefined" }, { status: 400 });
    const blog = await dataBasePrisma.blog.findUnique({
      where: {
        slug: slug,
      },
      include:{
        author:true,
      }
    })
    if(blog === null) return NextResponse.json({ success: false,message:"blog not found" }, { status: 404 });
    return NextResponse.json({ success: true,message:"fetched successfully", data: blog }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false,message:error }, { status: 500 });
  }
}
