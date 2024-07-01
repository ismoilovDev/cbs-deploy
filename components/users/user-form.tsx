"use client";

import * as z from "zod";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { useState, useTransition } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { UserSchema } from "@/schemas";
import { Input } from "@/components/ui/input";
import {
   Form,
   FormControl,
   FormField,
   FormItem,
   FormLabel,
   FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { UserType } from "@/types";

interface Props {
   defaultValues: UserType
   btn_txt: string
}

export const UserForm = ({ defaultValues, btn_txt }: Props) => {
   const [error, setError] = useState<string | undefined>("");
   const [success, setSuccess] = useState<string | undefined>("");
   const [isPending, startTransition] = useTransition();
   const { toast } = useToast()

   const form = useForm<z.infer<typeof UserSchema>>({
      resolver: zodResolver(UserSchema),
      defaultValues: defaultValues,
   });

   const onSubmit = (values: z.infer<typeof UserSchema>) => {
      const date = new Date
      setError("");
      setSuccess("");

      startTransition(() => {
         console.log(values)
         toast({
            title: "Foydalanuvchi o'zgartirildi",
            description: JSON.stringify(date),
         })
      });
   };

   return (
      <Form {...form}>
         <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6"
            autoComplete="off"
         >
            <div className="space-y-4">

               <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                     <FormItem>
                        <FormLabel>Ism</FormLabel>
                        <FormControl>
                           <Input
                              {...field}
                              disabled={isPending}
                              placeholder="Kamol"
                              type="text"
                           />
                        </FormControl>
                        <FormMessage />
                     </FormItem>
                  )}
               />
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
                              placeholder="example@mail.uz"
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
                     <FormItem>
                        <FormLabel>Parol</FormLabel>
                        <FormControl>
                           <Input
                              {...field}
                              disabled={isPending}
                              placeholder="******"
                              type="text"
                              autoComplete="new-password"
                           />
                        </FormControl>
                        <FormMessage />
                     </FormItem>
                  )}
               />
            </div>
            <div className="flex justify-end">
               <Button
                  disabled={isPending}
                  type="submit"
                  className="tracking-wide"
               >
                  {isPending ? <Loader2 className="animate-spin" /> : btn_txt}
               </Button>
            </div>
         </form>
      </Form>
   );
};