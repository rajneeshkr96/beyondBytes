// only user can follows the writer and writer can follow the other writer

import { dataBasePrisma } from "@/databasePrisma";
import { NextResponse, NextRequest } from "next/server";
import { currentUser } from "@/lib/authDet";

export async function GET(
  req: NextRequest,
  context: { params: { id: string } }
) {
  try {
    const user = await currentUser();
    const writerId = context.params.id;
    // check writerId is undefined or not
    const isWriterExist = await dataBasePrisma.user.findFirst({
      where: {
        id: writerId,
      },
    });
    if (writerId === undefined)
      return NextResponse.json(
        { success: false, message: "writerId is undefined" },
        { status: 400 }
      );
    //    user can follow writer and writer can follow other writer but writer cannot follow user
    if (isWriterExist === null) {
      return NextResponse.json(
        { success: false, message: "writerId is not exist" },
        { status: 400 }
      );
    }
    if(user?.role !== "WRITER" && user?.role !== "ADMIN"){
      return NextResponse.json(
        { success: false, message: "user is not a writer" },
        { status: 400 }
      );
    }
    const myWriter = await dataBasePrisma.follows.findFirst({
      where: {
        followingId: writerId,
        followerId: user.userId,
      },
    });
    console.log("user",user.userId,"writer",writerId,"follow",myWriter)
    if (myWriter === null) {
      return NextResponse.json(
        { success: true, message: "its not follow",data:{follow:false} },
        { status: 200 }
      );
    }
    return NextResponse.json(
      { success: true, message: "its follow", data: {follow:true} },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error },
      { status: 500 }
    );
  }
}
