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
    const writerId = context.params.id;
    // check writerId is undefined or not
    const isWriterExist = await dataBasePrisma.user.findFirst({
      where: {
        id: writerId,
        role: "WRITER",
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
    if (userRole === "WRITER") {
      return NextResponse.json(
        { success: false, message: "writer cannot follow writer" },
        { status: 400 }
      );
    }
    // // check user already follow the writer or not
    // const isAlreadyFollow = await dataBasePrisma.follows.findFirst({
    //   where: {
    //     followerId: userId,
    //     followingId: writerId,
    //   },
    // });
    // if (isAlreadyFollow !== null) {
    //   return NextResponse.json(
    //     { success: false, message: "you already follow this writer" },
    //     { status: 400 }
    //   );
    // }
    // //follow the writer
    // const follow = await dataBasePrisma.follows.create({
    //   data: {
    //     followerId: userId,
    //     followingId: writerId,
    //   },
    // });
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
