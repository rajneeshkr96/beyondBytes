// get all comments by post id 
import { NextResponse } from "next/server";
import { dataBasePrisma } from "@/databasePrisma";
import { NextRequest } from "next/server";
import {  currentUserId } from "@/lib/authDet";
export async function GET(req:NextRequest,context:{params:{id:string}}) {
    try {
        const user = await currentUserId();
        const blogId = context.params.id;
        if (blogId === undefined)
        return NextResponse.json(
            { success: false, message: "blogId is undefined" },
            { status: 400 }
        );
        const comments =await dataBasePrisma.comment.findMany({
            where:{
                BlogId:blogId
            }
        });
        
    console.log(comments);

        return NextResponse.json(
        { success: true, message: "comments fetched successfully", data: comments },
        { status: 200 }
        );
    } catch (error) {
        console.error(error);
        return NextResponse.json({ success: false, message: error }, { status: 500 });
    }
    }