import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import type { NextAuthConfig } from "next-auth";
import { dataBasePrisma } from "../../../prisma/databasePrisma";
import { UserRole } from "@prisma/client";

const nextAuthConfig: NextAuthConfig = {
  providers: [
    GitHub({
      clientId: process.env.GIT_CLIENT_ID!,
      clientSecret: process.env.GIT_CLIENT_SECRET!,
    }),
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  trustHost: true,

  callbacks: {
    async redirect({ url, baseUrl }) {
      console.log(process.env.NEXTAUTH_URL,url, baseUrl,"......jlsdfjlksdjflkjfsdlk");
      return process.env.NEXTAUTH_URL || baseUrl;
    },
    async session({ session, token }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }
      if (token.role && session.user) {
        session.user.role = token.role as UserRole;
      }
      if (session.user) {
        session.user.userId = token.userId as string;
        session.user.name = token.name;
        session.user.userName = token.userName as string;
        session.user.email = token.email as string;
        session.user.image = token.picture as string;
        session.user.isOAuth = token.isOAuth as boolean;
      }
      return session;
    },
    async jwt({ token, user }) {
      try {
        await dataBasePrisma.$connect();
        if (!token.sub) return token;

        const existingUser = await dataBasePrisma.user.findUnique({
          where: { email: token.email as string },
        });
        if (!existingUser) {
          const userName = token?.email?.split('@')[0];
          const newUser = await dataBasePrisma.user.create({
            data: {
              username: userName,
              email: token.email,
              name: token.name,
              role: UserRole.USER,
              image: token.picture,
            },
          });
          token.role = newUser.role;
          token.name = newUser.name;
          token.email = newUser.email;
          token.userId = newUser.id;
          token.userName = newUser.username;
          return token;
        }

        token.name = existingUser.name;
        token.email = existingUser.email;
        token.role = existingUser.role;
        token.userId = existingUser.id;
        token.image = existingUser.image;
        token.userName = existingUser.username;
        return token;
      } finally {
        await dataBasePrisma.$disconnect();
      }
    },
  },
};

export default nextAuthConfig;
