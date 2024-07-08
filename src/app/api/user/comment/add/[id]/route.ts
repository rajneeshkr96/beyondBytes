// add comments on post 
import { NextResponse } from "next/server";
import { dataBasePrisma } from "@/databasePrisma";
import { currentUser } from "@/lib/authDet";
import { NextRequest } from "next/server";
import { currentUserId } from "@/lib/authDet";
export async function POST(req:NextRequest,context:{params:{id:string}}) {

    const userId:string = await currentUserId();
   
    
    try {
        const userName = "Guptaashish2003"
        const user = await currentUser();
        
        console.log("user...........",user);
        const { id } = context.params;
        Response.json({ success: true, message: "Comment added successfully" }, { status: 200 });
       
    } catch (error) {
        console.error(error);
        return NextResponse.json({ success: false, message: error }, { status: 500 });
    }
    }
