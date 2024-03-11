import { dataBasePrisma } from "@/databasePrisma";
import { NextResponse, NextRequest } from "next/server";
import { currentUserId } from "@/lib/authDet";

export async function POST (req: NextRequest, context: { params: { id: string } }) {
    try {
        const userId = await currentUserId();
        console.log(userId);
        const  blogId  = context.params.id;
        const isBookMarked = await dataBasePrisma.bookmarks.findFirst({
            where: {
                UserId: userId,
                BlogId: blogId
            }
        });
        if (isBookMarked) {
            await dataBasePrisma.bookmarks.delete({
                where: {
                    id: isBookMarked.id
                }
            });
            return NextResponse.json({ message: "blog already bookmarked" }, { status: 400 });
        }
        
        const bookmark = await dataBasePrisma.bookmarks.create({
            data: {
                UserId: userId,
                BlogId: blogId
            }
        });
        
        return NextResponse.json({ message: "blog bookmarked successfully", data: bookmark }, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: "something went wrong" }, { status: 500 });
    }
}