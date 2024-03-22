import { dataBasePrisma } from "@/databasePrisma";
import { NextResponse, NextRequest } from "next/server";
import { currentRole } from "@/lib/authDet";


export async function Post(req:NextRequest,context:{params:{id:string}}){
    try {
        const userRole = await currentRole();
        if(userRole !== "ADMIN"){
            return NextResponse.json({success:false,message:"You are not an Admin"},{status:400})
        }
        const writerId = context.params.id;
        const checkWriter = await dataBasePrisma.user.findUnique({
            where:{
                id:writerId
            }
        })
        if(!checkWriter){
            return NextResponse.json({success:false,message:"Writer Not Found"},{status:400})
        }

        const suspend = await dataBasePrisma.user.update({
            where:{
                id:writerId
            },
            data:{
                isSuspend:true
            }
        })
        return NextResponse.json({success:true,message:"Writer Suspended"},{status:200})
    } catch (error) {
        return NextResponse.json({success:false,message:error},{status:400})
    }
}