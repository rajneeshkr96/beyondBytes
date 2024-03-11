import { dataBasePrisma } from "@/databasePrisma";
import { NextResponse, NextRequest } from "next/server";

export async function GET(req: NextRequest) {
    try {
        const bookmarks = await dataBasePrisma.bookmarks.findMany();
        //get like length
        const bookmarkLength = bookmarks.length;
        return NextResponse.json({ message: "fetched bookmarks successfully ",length: bookmarkLength, data: bookmarks  }, { status: 200 });
    }
    catch (error) {
        return NextResponse.json({ message: "something went wrong" }, { status: 500 });
    }
}