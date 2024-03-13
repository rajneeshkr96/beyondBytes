import { NextResponse,NextRequest } from "next/server";
import { dataBasePrisma } from "@/databasePrisma";
export async function GET(req: NextRequest) {
  try {

    const blog = await dataBasePrisma.blog.findMany()
    const length = blog.length
    return NextResponse.json({ success: true,message:"fetched successfully",length:length, data: blog }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false,message:error }, { status: 500 });
  }
}
