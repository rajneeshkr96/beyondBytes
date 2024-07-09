// do like a blog post with particular userid with particular blogid

import { dataBasePrisma } from "@/databasePrisma";
import { NextResponse,NextRequest } from "next/server";
import { currentUserId } from "@/lib/authDet";

export async function POST(req: NextRequest,context:{params:{id:string}}) {
    // todo remove temp id 
    const tempUserid = await currentUserId() || "65e6de30136474657e223231"
    try {
        const  commentId = context.params.id;
        
        
        if(commentId === undefined){
            return NextResponse.json({success:false,message:"blogId is required"},{status:400})
        }
          // if user allready like the blog do unlike and decrement the like count
          const isLikeExist = await dataBasePrisma.commentLikes.findFirst({
            where:{
                 CommentId:commentId,
                UserId:tempUserid
            }
        })
        if(isLikeExist){
            await dataBasePrisma.commentLikes.delete({
                where:{
                    CommentId:commentId,
                    id:isLikeExist.id
                }
            })
            await dataBasePrisma.comment.update({
                where:{
                    id:commentId
                },
                data:{
                    likesCount:{
                        decrement:1
                    }
                }
            })
            return NextResponse.json({success:true,message:"unliked successfully",data:{like:false}},{status:200})
        }
        const like = await dataBasePrisma.commentLikes.create({
            data:{
                CommentId:commentId,
                UserId:tempUserid
            }
        })
       let comment = await dataBasePrisma.comment.update({
            where:{
                id:commentId
            },
            data:{
                likesCount:{
                    increment:1
                }
            }
        })
      
        // updata blog like count
        console.log(comment);
        return NextResponse.json({success:true, message:"liked successfully",data:{like:true}},{status:200})
    } catch (error:any) {
        console.log(error);
        return NextResponse.json({success:false,message:"something went wrong"},{status:500})
    }
}