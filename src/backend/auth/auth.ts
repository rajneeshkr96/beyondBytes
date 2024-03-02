import NextAuth from "next-auth"
import authConfig from "./auth.config"
import {PrismaAdapter}  from "@auth/prisma-adapter"
import { dataBasePrisma } from "../../../prisma/databasePrisma"

interface User {
  id: number;
  email: string;
  name?: string;
  image?: string;
  role?: string;
}


export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  callbacks: {
    async session({ session, token }) {
      if (session.user?.id === token.sub) {
        const existingUser = await dataBasePrisma.user.findUnique({
          where: { id: token.sub },
        });

        session.user = {
          ...session.user,
          ...(existingUser ? existingUser : {}), // Include data from database if found
        };
      }

      return session;
    },

    async jwt({ token }) {
      if (token.sub) {
        const existingUser = await dataBasePrisma.user.findUnique({
          where: { email: token.email },
        });

        if (existingUser) {
          token.role = existingUser.role;
        } else {
          // Create new user if not existing
          await dataBasePrisma.user.create({
            data: {
              email: token.email,
              name: token.name,
              image: token.picture, // Assuming "picture" is available in token
            },
          });
        }
      }

      return token;
    },
  },
  adapter : PrismaAdapter(dataBasePrisma),
  session : { strategy : "jwt" },
  pages : {
    signIn : "/login"
  },

  ...authConfig

})