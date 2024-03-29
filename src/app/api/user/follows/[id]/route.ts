// only user can follows the writer and writer can follow the other writer

import { dataBasePrisma } from "@/databasePrisma";
import { NextResponse, NextRequest } from "next/server";

import { currentRole } from "@/lib/authDet";
import { currentUserId } from "@/lib/authDet";

export async function POST(
  req: NextRequest,
  context: { params: { id: string } }
) {
  try {
    const userId = await currentUserId();
    const userRole = await currentRole();
    const blogId = context.params.id;
    // check writerId is undefined or not
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

    // check user already follow the writer or not
    const isAlreadyFollow = await dataBasePrisma.follows.findFirst({
      where: {
        followingId:isWriterExist.author.id,
        followerId:userId,
      },
    })
    if (isAlreadyFollow !== null) {
      await dataBasePrisma.follows.delete({
        where: {
          id:isAlreadyFollow.id,
        },
      })
      return NextResponse.json(
        { success: false, message: "unfollow successfully" },
        { status: 400 }
      );
    }
    //follow the writer
    const follow = await dataBasePrisma.follows.create({
      data: {
        followingId:isWriterExist.author.id,
        followerId:userId,
      },
    });
    return NextResponse.json(
      { success: true, message: "followed successfully", data: follow },
      { status: 200 }
    );
  } catch (error) {
    console.log(error)
    return NextResponse.json(
      { success: false, message: error },
      { status: 500 }
    );
  }
}
