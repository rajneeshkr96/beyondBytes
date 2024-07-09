import { NextResponse } from "next/server";
import { dataBasePrisma } from "@/databasePrisma";
import { currentUser } from "@/lib/authDet";
import { NextRequest } from "next/server";

export async function POST(req:NextRequest,context:{params:{id:string}}) {
    try {
        const commentId = context.params.id;
        const {comment} = await req.json();
        const user = await currentUser();
        const userComment = await dataBasePrisma.comment.findMany({
            where:{
                UserId:user?.id,
            }
        });
        const usr = await dataBasePrisma.user.findUnique({
            where:{
                id:user?.id
            },
            select:{
                username:true,
                image:true,
            }
        });
        if(!userComment){
            return NextResponse.json( { success: false, message: "comment not found" }, { status: 404 });
        }
        const res = await dataBasePrisma.comment.create({
            data:{
                comment:comment,
                parentId:commentId,
                UserId: user!.userId,
                UserName:usr?.username,
                UserImage:usr?.image,
                ReplyUserName:user!.userName, 
            }
        });
        return NextResponse.json(
            { success: true, message: "comment added successfully", data: res },
            { status: 200 }
        );
        
    } catch (error) {
        console.error(error);
        return NextResponse.json({ success: false, message: error }, { status: 500 });
        
    }
}