//get all likes of a blog post 
import { dataBasePrisma } from "@/databasePrisma";
import { NextResponse,NextRequest } from "next/server";

export async function GET(req: NextRequest) {
    try {
        const likes = await dataBasePrisma.like.findMany();
        //get like length
        const likeLength = likes.length;


        return NextResponse.json({message: "fetched likes successfully ",data:likes,length:likeLength} ,{status:200})
    } catch (error) {
        return NextResponse.json({message:"something went wrong"},{status:500})
    }
}

