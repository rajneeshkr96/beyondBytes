// only user can follows the writer and writer can follow the other writer

import { dataBasePrisma } from "@/databasePrisma";
import { NextResponse, NextRequest } from "next/server";

import { currentRole } from "@/lib/authDet";
import { currentUserId } from "@/lib/authDet";

export async function GET(
  req: NextRequest,
  context: { params: { blogId: string } }
) {
  try {
    const userId = await currentUserId();
    const userRole = await currentRole();
    const blogId = context.params.blogId;
    if (blogId === undefined)
    return NextResponse.json(
      { success: false, message: "blogId is undefined" },
      { status: 400 }
    );
    const isWriterExist = await dataBasePrisma.blog.findUnique({
      where:{
        id: blogId,
      },
      select:{
        author:true,
      }
    })

    //    user can follow writer and writer can follow other writer but writer cannot follow user
    if (isWriterExist === null) {
      return NextResponse.json(
        { success: false, message: "writer not exist" },
        { status: 400 }
      );
    }
    const isAlreadyFollow = await dataBasePrisma.follows.findFirst({
        where: {
          followingId:isWriterExist.author.id,
          followerId:userId,
        },
      })
      
    // const = {follow: true,isAlreadyFollow.}

    return NextResponse.json(
      { success: true, message: "followed successfully", data: "follow" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error },
      { status: 500 }
    );
  }
}
