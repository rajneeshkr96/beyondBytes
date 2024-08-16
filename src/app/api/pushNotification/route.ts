import { dataBasePrisma } from "@/databasePrisma";
import { currentUser } from "@/lib/authDet";
import { NextRequest, NextResponse } from "next/server";


export async function POST(req: NextRequest) {
    
    try {
        const email = await currentUser();
        const { token } = await req.json();
        const isExist = await dataBasePrisma.pushNotificationToken.findUnique(
            {
                where: { token:token},
              }
        );
        if (!isExist) {
            
            await dataBasePrisma.pushNotificationToken.create({data:{
                token: token,
                email: email?.email
            }});
        }
        return NextResponse.json({ success: true, message: "Token saved successfully" }, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ success: false, message: error }, { status: 500 });

    }

}