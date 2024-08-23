
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    console.log('BASE_URL:', process.env.BASE_URL,"env.......................");
    console.log('DATABASE_URL:', process.env.DATABASE_URL);
    console.log('GOOGLE_CLIENT_ID:', process.env.GOOGLE_CLIENT_ID);
    console.log('GOOGLE_CLIENT_SECRET:', process.env.GOOGLE_CLIENT_SECRET);
    console.log('NEXTAUTH_SECRET:', process.env.NEXTAUTH_SECRET);
    console.log('UPLOADTHING_APP_ID:', process.env.UPLOADTHING_APP_ID);
    console.log('UPLOADTHING_SECRET:', process.env.UPLOADTHING_SECRET);

    try {
        return NextResponse.json({ success: true, message: "Token saved successfully" }, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ success: false, message: "error.message" }, { status: 500 });
    }
}
