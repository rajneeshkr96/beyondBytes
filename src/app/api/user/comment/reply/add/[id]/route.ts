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
        repliesCount: true,
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
        const usr = await dataBasePrisma.user.findUnique({
            where:{
                id:user?.userId
            },
            select:{
                id:true,
                username:true,
                image:true,
                name:true,
            }
        });
        if(!userComment){
            return NextResponse.json( { success: false, message: "comment not found" }, { status: 404 });
        }
        const parentIds =[...userComment[0]?.parentId,commentId];
        const res = await dataBasePrisma.comment.create({
            data: {
              comment: comment,
              parentId: { set: parentIds },
              UserId: usr!.id,
              UserName: usr?.username,
              UserImage: usr?.image,
              ReplyUserName: parentUserDet?.username,     
              name: usr?.name,     
            },
            select: COMMENT_SELECT_FIELDS,
          });
          console.log("0.................",res.parentId[0])
          
       if(res.parentId ){

        console.log("pareneidndidid....",res.parentId)
        const updateParentComment = await dataBasePrisma.comment.update({
            where: {
                id: res.parentId[0],
            },
            data: {
                repliesCount:{
                    increment:1
                },

                // append comment id from last
                
                
            },
        });
        console.log("updateParentComment",updateParentComment);
       } 
       
        return NextResponse.json(
            { success: true, message: "comment added successfully", data: res },
            { status: 200 }
        );
        
    } catch (error) {
        console.error(error);
        return NextResponse.json({ success: false, message: error }, { status: 500 });
        
    }
}