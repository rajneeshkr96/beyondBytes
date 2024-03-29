import { dataBasePrisma } from "@/databasePrisma";
import { NextResponse, NextRequest } from "next/server";

import { currentRole } from "@/lib/authDet";
import { currentUserId } from "@/lib/authDet";

export async function GET(req:NextRequest){
    try {
        const userId = await currentUserId();
        const userRole = await currentRole();
        const allFollowing = await dataBasePrisma.follows.findMany({
            where:{
                followerId:userId
            },
            include:{
                following:true
            }
        })
        const followingLength = allFollowing.length;
        return NextResponse.json({success:true,following:followingLength,data:{allFollowing}},{status:200})
        
    } catch (error) {
        return NextResponse.json({success:false,message:error},{status:400})
    }

}