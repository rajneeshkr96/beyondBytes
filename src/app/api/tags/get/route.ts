// get all comments by post id 
import { NextResponse } from "next/server";
import { dataBasePrisma } from "@/databasePrisma";
import { NextRequest } from "next/server";

export async function GET(req:NextRequest) {
    try {

        const tag = await dataBasePrisma.tags.findMany();
        return NextResponse.json(
        { success: true, message: "all tags successfully", data: tag },
        { status: 200 }
        );
    } catch (error) {
        console.error(error);
        return NextResponse.json({ success: false, message: error }, { status: 500 });
    }
    }