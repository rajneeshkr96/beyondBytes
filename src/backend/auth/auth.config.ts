import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import type { NextAuthConfig } from "next-auth";

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

  // Explicitly set the NEXTAUTH_URL if necessary
  callbacks: {
    async redirect({ url, baseUrl }) {
      console.log(process.env.NEXTAUTH_URL, baseUrl,"url.............")
      if(process.env.NEXTAUTH_URL) return process.env.NEXTAUTH_URL
      return baseUrl;
    },
  },
};

export default nextAuthConfig satisfies NextAuthConfig;
