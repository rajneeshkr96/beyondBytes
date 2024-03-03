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
      try {
        await dataBasePrisma.$connect();

        const { name, email } = session.user;
        const user = await dataBasePrisma.user.findUnique({ where: { email } });

        if (!user) {
          const newUser = await dataBasePrisma.user.create({
            data: {
              name,
              email,
              role: "USER",
            },
          });
          session.user.id = newUser.id;
         session.user.name = newUser.name;
         
          
        } 

        return session;
      } finally {
        await dataBasePrisma.$disconnect();
      }
    },
  },


  adapter : PrismaAdapter(dataBasePrisma),
  session : { strategy : "jwt" },
  pages : {
    signIn : "/login"
  },

  ...authConfig

})