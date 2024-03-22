
import { dataBasePrisma } from "@/databasePrisma";
import { NextResponse, NextRequest } from "next/server";

import { currentRole } from "@/lib/authDet";
import { currentUserId } from "@/lib/authDet";

export async function GET(){
    try {
        const userId = await currentUserId();
        const userRole = await currentRole();
        if(userRole !== "WRITER" && userRole !== "ADMIN"){
            return NextResponse.json({success:false,message:"You are not a writer"},{status:400})
        }
        const allFollower = await dataBasePrisma.follows.findMany({
            where:{
                followingId:userId
            },
            include:{
                follower:true
            }
        })
        return NextResponse.json({success:true,allFollower},{status:200})
    } catch (error) {
        return NextResponse.json({success:false,message:error},{status:400})
    }
}