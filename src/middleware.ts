import authConfig from "@/backend/auth/auth.config"
import NextAuth from "next-auth"
import { NextRequest, NextResponse } from "next/server";
const {auth} = NextAuth(authConfig);

import {defaultRedirectUrl,publicRoutes,apiAuthPrefix,authRoutes} from "./route"

export default auth((req:NextRequest) => {
  console.log("Middleware.....................", req.nextUrl.pathname)
  const {nextUrl} = req;
  const isLoggedIn = !!req.url;
  console.log("Middleware.....................", isLoggedIn,req.url)
  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);
  console.log("Middleware.....................", isPublicRoute,isAuthRoute)

  if(isApiAuthRoute){
    return NextResponse.next();
  }

  if(isApiAuthRoute){
    if(isLoggedIn){
      return NextResponse.redirect(new URL(defaultRedirectUrl,nextUrl));
    }
    return NextResponse.next();
  }
  if(!isLoggedIn && !isPublicRoute){
    return NextResponse.redirect(new URL("/",nextUrl));
  }




    console.log("Middleware.....................", req.nextUrl.pathname)
    console.log("isloggedin.....................", isLoggedIn)
    
  })


export const config = {
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
  }