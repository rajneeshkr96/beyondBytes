import { dataBasePrisma } from "@/databasePrisma";
import { NextResponse, NextRequest } from "next/server";


export async function GET(req:NextRequest,context:{params:{id:string}}){
    try {
        const userId = context.params.id;
        // find all writers  which userId follows the other writer or user
        const allFollowing = await dataBasePrisma.user.findMany({
            where:{
                followers:{
                    some:{
                        followerId:userId
                    }
                }
            },
            select:{
                id:true,
                name:true,
                image:true,
                username:true,
                role:true
            }
        

        });
        console.log(allFollowing)
        const followingLength = allFollowing.length;
        return NextResponse.json({success:true,following:followingLength,data:{allFollowing}},{status:200})
        
    } catch (error) {
        return NextResponse.json({success:false,message:error},{status:400})
    }

}