// add comments on post 
import { NextResponse } from "next/server";
import { dataBasePrisma } from "@/databasePrisma";
import { currentUser } from "@/lib/authDet";
import { NextRequest } from "next/server";


export async function POST(req:NextRequest,context:{params:{id:string}}) {

    try {
        const {id} = context.params;
        const {comment} = await req.json();
        console.log("comment.......................",comment);
        const user = await currentUser();
        const usr = await dataBasePrisma.user.findUnique({
            where:{
                id:user?.userId
            },select:{
                username:true,
                image:true,
                name:true
            }
        });
        // user can write maximum 5 comments on a post
        const userComment = await dataBasePrisma.comment.findMany({
            where:{
                UserId:user?.userId
            }
        });
        if(userComment.length > 5){
            return NextResponse.json( { success: false, message: "you can write maximum 5 comments on a post" }, { status: 400 });
        }
        const res = await dataBasePrisma.comment.create({
            data:{
                comment:comment,
                BlogId:id,
                UserId:user!.userId,
                UserName:user!.userName,
                UserImage:usr?.image,
                name:usr?.name,
            }
        });
        console.log(res);
        return NextResponse.json(
            { success: true, message: "comment added successfully", data: res },
            { status: 200 }
        );

        
    } catch (error) {
        console.error(error);
        return NextResponse.json({ success: false, message: error }, { status: 500 });
        
    }
   
    
    
}
