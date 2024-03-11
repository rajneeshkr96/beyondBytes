// delete comment by id 
import { NextResponse,NextRequest } from "next/server";
import { dataBasePrisma } from "@/databasePrisma";
import { currentUser } from "@/lib/authDet";

export default async function DELETE(req: NextRequest,context:{params:{id:string}}) {
    try {
        const  id = context.params.id;
        if(id === undefined){
            return NextResponse.json({message:"id is required"},{status:400})
        }
        const comment = await dataBasePrisma.comment.delete({
            where:{
                id:id
            }
        })
        return NextResponse.json({message:"comment deleted successfully"},{status:200})
        
    } catch (error) {
        return NextResponse.json({message:"something went wrong"},{status:500})
        
    }
    }