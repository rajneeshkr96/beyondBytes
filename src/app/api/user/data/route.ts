import { dataBasePrisma } from "@/databasePrisma";
import { NextResponse,NextRequest } from "next/server";
import { currentUserId } from "@/lib/authDet";

export async function GET(req: NextRequest) {
    const userId = await currentUserId()
  try {
    const user = await dataBasePrisma.user.findUnique(
        {
            where: {
            id: userId,
            },
        }
    )

    return NextResponse.json({ success: true,message:"fetched successfully", data: user }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ success: false,message:error }, { status: 500 });
  }
}