import Credentials from 'next-auth/providers/credentials';
import type { NextAuthConfig } from "next-auth";
import { LoginSchema } from '@/schemas/index';

async function login(credentials: { email: string, password: string }) {
   try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/sign-in`, {
         method: 'POST',
         headers: {
            'Content-Type': 'application/json',
         },
         body: JSON.stringify(credentials),
      })
      if (response.ok) {
         const user = await response.json();
         return user.data;
      } else {
         console.error('Failed to login:', response);
         return null;
      }

   } catch (error) {
      console.error('Failed to login:', error);
      return null;
   }
}

export const authConfig = {
   providers: [
      Credentials({
         async authorize(credentials) {
            const validatedFields = LoginSchema.safeParse(credentials);

            if (validatedFields.success) {
               const user = await login(validatedFields.data);
               return user;
            }
            return null;
         },
      }),
   ],

   callbacks: {
      async authorized({ auth, request: { nextUrl } }) {
         const isLoggedIn = !!auth?.user;
         const isOnDashboard = nextUrl.pathname.startsWith('/');
         if (isOnDashboard) {
            if (isLoggedIn) return true;
            return false;
         } else if (isLoggedIn) {
            return Response.redirect(new URL('/', nextUrl));
         }
         return true;
      },
   },
} satisfies NextAuthConfig
