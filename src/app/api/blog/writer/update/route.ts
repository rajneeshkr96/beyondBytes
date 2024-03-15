// update blog 

import { dataBasePrisma } from "@/databasePrisma";
import { NextRequest,NextResponse } from "next/server";
import { currentRole, currentUserId } from "@/lib/authDet";
import { BlogPops } from "../create/route";

interface Blog extends BlogPops{
  id: string;
}

export async function PUT(request: NextRequest) {
  try {
    const {id,title,image,content,metaTitle,metaDesc}:Blog = await request.json();
    const authorId = await currentUserId() || "65e6de30136474657e223231";
    const blog = await dataBasePrisma.blog.update({
      where: {
        id: id,
        authorId: authorId
      },
      data: {
        title: title,
        image: image,
        content: content,
        metaTitle: metaTitle,
        metaDesc: metaDesc,
      },
    });
    return NextResponse.json({ success: true, message: "Blog updated successfully", data: blog }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, message: error }, { status: 500 });
  }
}