import { dataBasePrisma } from "@/databasePrisma";
import { NextResponse, NextRequest } from "next/server";

export async function GET(
  req: NextRequest,
  context: { params: { id: string } }
) {
  try {
    const id = context.params.id;
    const bookmarks = await dataBasePrisma.blog.findMany({
      where: {
        bookmarks: {
          some: {
            UserId: id,
          },
        },
      },
      select: {
        id: true,
        title: true,
        image: true,
        createdAt: true,
        slug: true,
        metaDesc: true,

      },
    });
    const length = bookmarks.length;
    return NextResponse.json({sucess:true,message:"bookmarks fetched successfully",
    totalBookmark:length,data:bookmarks}, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "something went wrong" },
      { status: 500 }
    );
  }
}
