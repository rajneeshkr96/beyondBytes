declare module "next-auth" {
    interface Session extends DefaultSession {
      user: {
        uid: string
        email: string
        role: string[]

      }
  }
}