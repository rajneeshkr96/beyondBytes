import { NextResponse } from "next/server";
import { dataBasePrisma } from "@/databasePrisma";
import { currentUser } from "@/lib/authDet";
import { NextRequest } from "next/server";

export async function POST(req:NextRequest,context:{params:{id:string}}) {
    const COMMENT_SELECT_FIELDS = {
        id: true,
        comment: true,
        parentId: true,
        createdAt: true,
        User: {
          select: {
            id: true,
            name: true,
          },
        },
      }
    try {
        const commentId = context.params.id;
        const {comment} = await req.json();
        const user = await currentUser();
        console.log("user",user);
        console.log("comment",comment);
        console.log("commentId",commentId);
        const userComment = await dataBasePrisma.comment.findMany({
            where:{
                id:commentId
            }
        });
        const parentUserDet = await dataBasePrisma.user.findUnique({
            where:{
                id:userComment[0].UserId
            },
            select:{
                username:true,
                image:true,
                
            }
        });
        console.log("parentUserDet.......",parentUserDet);
        console.log("userComment",userComment);
        const usr = await dataBasePrisma.user.findUnique({
            where:{
                id:user?.userId
            },
            select:{
                id:true,
                username:true,
                image:true,
            }
        });
        console.log("usr",usr);
        if(!userComment){
            return NextResponse.json( { success: false, message: "comment not found" }, { status: 404 });
        }
        const res = await dataBasePrisma.comment.create({
            data: {
              comment: comment,
              parentId: commentId,
              UserId: usr!.id,
              UserName: usr?.username,
              UserImage: usr?.image,
              ReplyUserName: parentUserDet?.username,
              
            },
            select: COMMENT_SELECT_FIELDS,
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