import NextAuth from "next-auth";

declare module "next-auth" {
   interface Session {
      user: {
         id: string,
         username: string,
         email: string,
         is_email_verified: boolean,
         created_at: string,
         roles: string[],
         token: string,
         expires_at: string
      };
   }
}