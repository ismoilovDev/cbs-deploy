"use server"

import * as z from "zod";
import { AuthError } from "next-auth";
import { LoginSchema } from "@/schemas";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { signIn } from "@/auth";

export const login = async (
   values: z.infer<typeof LoginSchema>,
) => {
   const validatedFields = LoginSchema.safeParse(values)

   if (!validatedFields.success) {
      return { error: "Maydon xato kiritildi!" }
   }

   const { email, password } = values

   try {
      await signIn("credentials", {
         email,
         password,
      });
   } catch (error) {
      if (error instanceof AuthError) {
         switch (error.type) {
            case 'CredentialsSignin':
               return { error: "Email yoki parol xato!" }
            default:
               return { error: "Something went wrong!" }
         }
      }
      throw error;
   }
}