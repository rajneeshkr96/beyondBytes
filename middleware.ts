import authConfig from "@/backend/auth/auth.config"
import NextAuth from "next-auth"

const {auth} = NextAuth(authConfig);

export default auth((req) => {
    console.log("Middleware.....................", req.nextUrl.pathname)
    
  })


export const config = {
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
  }