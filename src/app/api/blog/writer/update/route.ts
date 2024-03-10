// update blog 

import { dataBasePrisma } from "@/databasePrisma";
import { NextRequest,NextResponse } from "next/server";
import { currentRole } from "@/lib/authDet";

interface Blog {
  id: string;
  title: string;
  image: string;
  content: string;
  postData: string;
  metaTitle: string;
  metaDesc: string;
  authorId: string;
}

export async function PUT(request: NextRequest) {
  try {
    const {id,title,image,content,postData,metaTitle,metaDesc,authorId}:Blog = await request.json();
    const blog = await dataBasePrisma.blog.update({
      where: {
        id: id,
      },
      data: {
        title: title,
        image: image,
        content: content,
        postData: postData,
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