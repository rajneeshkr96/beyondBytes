// add comments on post 
import { NextResponse } from "next/server";
import { dataBasePrisma } from "@/databasePrisma";
import { currentUser } from "@/lib/authDet";
import { NextRequest } from "next/server";
export async function POST(req:NextRequest,context:{params:{id:string}}) {
    const tempUserid = "65e6de30136474657e223231"
    try {
        const user = await currentUser();
        console.log(user);
        const blogId = context.params.id;
        const {  comment } = await req.json();
        
        if (comment === undefined || blogId === undefined)
        return NextResponse.json(
            { success: false, message: "comment or blogId is undefined" },
            { status: 400 }
        );
        // check comment is allready exist or not 
        const isCommentExist = await dataBasePrisma.comment.findFirst({
        where: {
            BlogId: blogId,
            UserId: tempUserid,
        },
        });
        if (isCommentExist){
        return NextResponse.json(
            { success: false, message: "comment already exist" },
            { status: 400 }
        );
        }
        const commentData = await dataBasePrisma.comment.create({
        data: {
            comment: comment,
            BlogId: blogId,
            UserId: tempUserid,
        },
        });
        // update blog comment count
        await dataBasePrisma.blog.update({
            where: {
                id: blogId,
            },
            data: {
                commentsCount: {
                    increment: 1,
                },
            },
        });
        return NextResponse.json(
        { success: true, message: "comment added successfully", data: commentData },
        { status: 200 }
        );
    } catch (error) {
        console.error(error);
        return NextResponse.json({ success: false, message: error }, { status: 500 });
    }
    }
