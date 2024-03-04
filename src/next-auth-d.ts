import { UserRole } from "@prisma/client";
import NextAuth, { type DefaultSession } from "next-auth";
import { User } from "@prisma/client";

export type ExtendedUser = DefaultSession["user"] & {
  role: UserRole;
  isTwoFactorEnabled: boolean;
  isOAuth: boolean;
  email: string;
};

declare module "next-auth" {
  interface Session {
    user: ExtendedUser;
  }
}
