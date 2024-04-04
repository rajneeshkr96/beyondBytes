
import { dataBasePrisma } from "@/databasePrisma";
import { NextResponse, NextRequest } from "next/server";

import { currentRole } from "@/lib/authDet";
import { currentUserId } from "@/lib/authDet";

export async function GET(req: NextRequest,context: { params: { id: string } }) {
    try {
        const writerId = context.params.id;
        // find all user details who follows the writerid
        const allFollower = await dataBasePrisma.user.findMany({
            where:{
                followers:{
                    some:{
                        followingId:writerId
                    }
                }
            },
            select:{
                id:true,
                name:true,
                image:true
            }
        });
           
        const length = allFollower.length;
        return NextResponse.json({success:true,followers:length,allFollower},{status:200})
    } catch (error) {
        return NextResponse.json({success:false,message:error},{status:400})
    }
}