"use client";

import * as z from "zod";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { useState, useTransition } from "react";
import { useRouter } from 'next/navigation';
import { EyeIcon, EyeOffIcon, Loader2 } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginSchema } from "@/schemas";
import { Input } from "@/components/ui/input";
import {
   Form,
   FormControl,
   FormField,
   FormItem,
   FormLabel,
   FormMessage,
} from "@/components/ui/form";
import { CardWrapper } from "@/components/auth/card-wrapper"
import { Button } from "@/components/ui/button";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";
import { login } from "@/actions/login";

export const LoginForm = () => {
   const { push } = useRouter();
   const [error, setError] = useState<string | undefined>("");
   const [success, setSuccess] = useState<string | undefined>("");
   const [showPassword, setShowPassword] = useState(false)
   const [isPending, startTransition] = useTransition();

   const form = useForm<z.infer<typeof LoginSchema>>({
      resolver: zodResolver(LoginSchema),
      defaultValues: {
         email: "",
         password: "",
      },
   });

   const onSubmit = async (values: z.infer<typeof LoginSchema>) => {
      setError("");
      setSuccess("");

      startTransition(() => {
         login(values)
            .then((data) => {
               if (data?.error) {
                  form.reset();
                  setError(data.error);
               } else {
                  form.reset();
                  setSuccess('Kirish muvaffaqiyatli!');
               }
            })
            .catch(() => setError('Kirish muvaffaqiyatsiz!'));
      });
   };

   return (
      <CardWrapper>
         <Form {...form}>
            <form
               onSubmit={form.handleSubmit(onSubmit)}
               className="space-y-6"
            >
               <div className="space-y-4">

                  <FormField
                     control={form.control}
                     name="email"
                     render={({ field }) => (
                        <FormItem>
                           <FormLabel>Email</FormLabel>
                           <FormControl>
                              <Input
                                 {...field}
                                 disabled={isPending}
                                 placeholder="+998931233303"
                                 type="email"
                              />
                           </FormControl>
                           <FormMessage />
                        </FormItem>
                     )}
                  />
                  <FormField
                     control={form.control}
                     name="password"
                     render={({ field }) => (
                        <FormItem className="relative">
                           <FormLabel>Parol</FormLabel>
                           <FormControl>
                              <Input
                                 {...field}
                                 className="hide-password-toggle pr-10"
                                 disabled={isPending}
                                 placeholder="******"
                                 type={showPassword ? "text" : "password"}
                              />
                           </FormControl>
                           <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              className="absolute right-0 -top-3 h-full px-3 hover:bg-transparent"
                              onClick={() => setShowPassword((prev) => !prev)}
                           >
                              {showPassword ? (
                                 <EyeIcon
                                    className="h-4 w-4"
                                    aria-hidden="true"
                                 />
                              ) : (
                                 <EyeOffIcon
                                    className="h-4 w-4"
                                    aria-hidden="true"
                                 />
                              )}
                           </Button>
                           <Button
                              size="sm"
                              variant="link"
                              asChild
                              className="px-0 font-normal"
                           >
                              <Link href="/auth/reset">
                                 Parol esdan chiqdimi?
                              </Link>
                           </Button>
                           <FormMessage />
                        </FormItem>
                     )}
                  />
               </div>
               <FormError message={error} />
               <FormSuccess message={success} />
               <Button
                  disabled={isPending}
                  type="submit"
                  className="w-full"
               >
                  {isPending ? <Loader2 className="animate-spin" /> : 'Kirish'}
               </Button>
            </form>
         </Form>
      </CardWrapper>
   );
};