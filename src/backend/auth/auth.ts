import NextAuth from "next-auth"
import authConfig from "./auth.config"
import {PrismaAdapter}  from "@auth/prisma-adapter"
import { dataBasePrisma } from "../../../prisma/databasePrisma"

export const {
  handlers: { GET, POST },
  auth,
} = NextAuth({
  adapter: PrismaAdapter(dataBasePrisma),
  ...authConfig,
})