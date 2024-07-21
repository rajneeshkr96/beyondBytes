
import { NextResponse, NextRequest } from "next/server";


export async function POST (req: NextRequest, context: { params: { id: string } }) {
    try {
       
        return NextResponse.json({success:true, message: "blog bookmarked successfully", data: 'bookmark' }, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({success:false, message: "something went wrong" }, { status: 500 });
    }
}