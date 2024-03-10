// update comment by id 
import { NextResponse } from "next/server";
import { dataBasePrisma } from "@/databasePrisma";
import { NextRequest } from "next/server";
import { currentUser } from "@/lib/authDet";
export async function PUT(req:NextRequest,context:{params:{id:string}}) {
    const tempUserid = "65e6de30136474657e223231"
    try {
        const user = await currentUser();
        console.log(user);
        const commentId = context.params.id;
        const { comment } = await req.json();
        if (comment === undefined || commentId === undefined)
        return NextResponse.json(
            { success: false, message: "comment or commentId is undefined" },
            { status: 400 }
        );
        const isCommentExist = await dataBasePrisma.comment.findFirst({
        where: {
            id: commentId,
            UserId: tempUserid,
        },
        });
        if (!isCommentExist){
        return NextResponse.json(
            { success: false, message: "comment not found" },
            { status: 400 }
        );
        }
        const updatedComment = await dataBasePrisma.comment.update({
        where: {
            id: commentId,
        },
        data: {
            comment: comment,
        },
        });
        return NextResponse.json(
        { success: true, message: "comment updated successfully", data: updatedComment },
        { status: 200 }
        );
    } catch (error) {
        console.error(error);
        return NextResponse.json({ success: false, message: error }, { status: 500 });
    }
    }
    
