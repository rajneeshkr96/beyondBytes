import { dataBasePrisma } from "@/databasePrisma";
import { NextResponse, NextRequest } from "next/server";
import { currentUser } from "@/lib/authDet";

export async function GET(req:NextRequest,  context: { params: { id: string } }){
   try {
      const writerId = context.params.id;
      const user = await currentUser();
      if(!user){
          return NextResponse.redirect('/login');
      }
      const follow = await dataBasePrisma.follows.findFirst({
          where:{
              followingId:writerId
          }
      });
      if(!follow){
         return NextResponse.json({success:false,message:"You are not following this user"})
      }
      const writerBlogs = await dataBasePrisma.blog.findMany({
         where:{
            authorId:writerId
         }
      })
      if(!writerBlogs){
         return NextResponse.json({success:false,message:"No Blogs writen By Writer..."})
      }
      return NextResponse.json({success:true,data:writerBlogs},{status:200})

      
    
   } catch (error:any) {
      return NextResponse.json({success:false, message:error.message},{status:400})
    
   }
    
}