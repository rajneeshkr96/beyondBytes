import authConfig from "@/backend/auth/auth.config"
import NextAuth from "next-auth"
import { NextRequest, NextResponse } from "next/server";
const { auth } = NextAuth(authConfig);


export default auth((req: NextRequest) => {
  // const isAuthenticated = !!req?.auth;
  // console.log(req);
  // console.log(isAuthenticated,"lllllllllcheckkkl.........");
  // if (req.nextUrl.pathname.startsWith('/write/') && !isAuthenticated) {
  //   return NextResponse.redirect(new URL('/', req.url))
  // }else if (req.nextUrl.pathname.startsWith('/adminstrative/') && !isAuthenticated){
  //   return NextResponse.redirect(new URL('/', req.url))
  // }
  // else if (req.nextUrl.pathname.startsWith('/profile/' ) && !isAuthenticated){
  //   return NextResponse.redirect(new URL('/', req.url))
  // }
  // else if (req.nextUrl.pathname.startsWith('/me/') && !isAuthenticated){
  //   return NextResponse.redirect(new URL('/', req.url))
  // }else {
  //   // Allow authenticated or unauthenticated users for other routes
  //   return NextResponse.next();
  // }

})


export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}