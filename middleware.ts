import NextAuth from 'next-auth';
import { authConfig } from './auth.config';
import {
   DEFAULT_LOGIN_REDIRECT,
   authRoutes,
} from "./routes";

const { auth } = NextAuth(authConfig);

export default auth((req) => {
   const { nextUrl } = req;
   const isLoggedIn = !!req.auth;

   const isAuthRoute = authRoutes.includes(nextUrl.pathname);
   if (isAuthRoute) {
      if (isLoggedIn) {
         return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
      }
      return null;
   }

   if (!isLoggedIn) {
      let callbackUrl = nextUrl.pathname;
      if (nextUrl.search) {
         callbackUrl += nextUrl.search;
      }

      const encodedCallbackUrl = encodeURIComponent(callbackUrl);

      return Response.redirect(new URL(
         `/auth/login?callbackUrl=${encodedCallbackUrl}`,
         nextUrl
      ));
   }

   return null;
})

export const config = {
   matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
};