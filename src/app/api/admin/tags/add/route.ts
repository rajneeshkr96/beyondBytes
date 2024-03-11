import { NextResponse,NextRequest } from "next/server";
import { dataBasePrisma } from "@/databasePrisma";


interface Data {
    title:string;
    value:string[];
}
export async function POST(req:NextRequest, res:NextResponse){
    try {
        const user = "65e6de30136474657e223231"
        const {title,value}:Data = await req.json();
        if(!title  || !value){
            return NextResponse.json({ success: false, message: "please fill all fields" }, { status: 500 });
        }
        console.log(title || value);
        const tag = await dataBasePrisma.tags.create({
            data:{
                title: title,
                value: value,
                UserId:user,
            }
        })

        return NextResponse.json({ success: true, message:"tags created successfully",data:tag }, { status:201})

    } catch (error) {
        return NextResponse.json({ success: false, message: error }, { status: 500 }); 
    }
}