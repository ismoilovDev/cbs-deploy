import NextAuth from 'next-auth';
import { authConfig } from './auth.config';

export const {
   handlers: { GET, POST },
   auth,
   signIn,
   signOut
} = NextAuth({
   pages: {
      signIn: "/auth/login"
   },
   ...authConfig,
   callbacks: {
      async jwt({ token, user }) {
         return { ...token, ...user }
      },
      async session({ session, token }) {
         session.user = token as any
         return session;
      },
   },
});