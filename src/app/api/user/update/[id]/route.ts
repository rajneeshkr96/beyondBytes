import { dataBasePrisma } from "@/databasePrisma";
import { User } from "@prisma/client";
import { currentUserId } from "@/lib/authDet";
import { NextResponse, NextRequest } from "next/server";

interface UserUpdate {
  userName: string;
  bio: string;
}

export async function PUT(
  req: NextRequest,
  context: { params: { id: string } }
) {
  console.log("hellowrorld jksfjvc")   
  try {

    const { userName, bio }:UserUpdate = await req.json();
    const userId = await currentUserId();
    console.log("userid/////////////",userId);
    
    const { id } = context.params;
    console.log(id);

    if (userId !== id) {
      return NextResponse.json(
        { success: false, message: "Unauthorized access" },
        { status: 401 }
      );
    }
    if (userName) {
      const user: User = await dataBasePrisma.user.update({
        where: { id },
        data: { username: userName},
      });
    }
    if (bio) {
      const user: User = await dataBasePrisma.user.update({
        where: { id },
        data: { about: bio },
      });
    }
    return NextResponse.json(
      { success: true, message: "User updated successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, message: error }, { status: 500 });
  }
}
