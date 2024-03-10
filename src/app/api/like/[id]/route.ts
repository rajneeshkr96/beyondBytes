// do like a blog post with particular userid with particular blogid

import { dataBasePrisma } from "@/databasePrisma";
import { NextResponse,NextRequest } from "next/server";
import { currentUser } from "@/lib/authDet";

export async function POST(req: NextRequest,context:{params:{id:string}}) {
    const tempUserid = "65e6de30136474657e223231"
    try {
        const  blogId = context.params.id;
        
        if(blogId === undefined){
            return NextResponse.json({message:"blogId is required"},{status:400})
        }
          // if user allready like the blog do unlike and decrement the like count
          const isLikeExist = await dataBasePrisma.like.findFirst({
            where:{
                BlogId:blogId,
                UserId:tempUserid
            }
        })
        if(isLikeExist){
            await dataBasePrisma.like.delete({
                where:{
                    id:isLikeExist.id
                }
            })
            await dataBasePrisma.blog.update({
                where:{
                    id:blogId
                },
                data:{
                    likesCount:{
                        decrement:1
                    }
                }
            })
            return NextResponse.json({message:"unliked successfully"},{status:200})
        }
        const like = await dataBasePrisma.like.create({
            data:{
                BlogId:blogId,
                UserId:tempUserid
            }
        })
        await dataBasePrisma.blog.update({
            where:{
                id:blogId
            },
            data:{
                likesCount:{
                    increment:1
                }
            }
        })
      
        // updata blog like count
       
        return NextResponse.json({message:"liked successfully"},{status:200})
    } catch (error) {
        return NextResponse.json({message:"something went wrong"},{status:500})
    }
}