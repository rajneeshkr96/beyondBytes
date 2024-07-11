import { NextResponse } from "next/server";
import { dataBasePrisma } from "@/databasePrisma";
import { NextRequest } from "next/server";
import {  currentUserId } from "@/lib/authDet";

export async function GET(req:NextRequest,context:{params:{id:string}}) {
    try {
        const commentid = context.params.id;
        const user = await currentUserId();
        const comments =await dataBasePrisma.comment.findMany({
            where:{
                parentId:commentid
            }
        });
        return NextResponse.json(
        { success: true, message: "comments fetched successfully", data: comments },
        { status: 200 }
        );
    } catch (error) {
        console.error(error);
        return NextResponse.json({ success: false, message: error }, { status: 500 });        
    }
}