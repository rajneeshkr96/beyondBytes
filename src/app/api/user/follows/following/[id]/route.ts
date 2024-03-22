import { dataBasePrisma } from "@/databasePrisma";
import { NextResponse, NextRequest } from "next/server";
import { currentUserId } from "@/lib/authDet";

export async function GET(req:NextRequest , context: { params: { id: string } }){
    try {
        const userId = await currentUserId();

        const writerId = context.params.id;
        const allFollowing = await dataBasePrisma.follows.findMany({
            where:{
                followerId:writerId,
                followingId:userId
            },
           
        })
        if(!allFollowing){
            return NextResponse.json({success:false,message:"You are not following this user"})
        }
        return NextResponse.json({success:true,data:{allFollowing,follow:true}},{status:200})
        
    } catch (error) {
        return NextResponse.json({success:false,message:error},{status:400})
    }

}