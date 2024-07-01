"use client";

import * as z from "zod";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { useState, useTransition } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { BranchSchema } from "@/schemas";
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
import { BranchType } from "@/types";

interface Props {
   defaultValues: BranchType
   btn_txt: string
}

export const BranchForm = ({ defaultValues, btn_txt }: Props) => {
   const [error, setError] = useState<string | undefined>("");
   const [success, setSuccess] = useState<string | undefined>("");
   const [isPending, startTransition] = useTransition();
   const { toast } = useToast()

   const form = useForm<z.infer<typeof BranchSchema>>({
      resolver: zodResolver(BranchSchema),
      defaultValues: defaultValues,
   });

   const onSubmit = (values: z.infer<typeof BranchSchema>) => {
      const date = new Date
      setError("");
      setSuccess("");

      startTransition(() => {
         console.log(values)
         toast({
            title: "Filial qo'shildi",
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
                     <FormItem className="basis-1/2">
                        <FormLabel>Nomi:</FormLabel>
                        <FormControl>
                           <Input
                              {...field}
                              disabled={isPending}
                              placeholder='"Renesans Mikromoliya Tashkiloti" MChJ Chirchiq filiali'
                              type="text"
                           />
                        </FormControl>
                        <FormMessage />
                     </FormItem>
                  )}
               />
               <FormField
                  control={form.control}
                  name="short_name"
                  render={({ field }) => (
                     <FormItem className="basis-1/2">
                        <FormLabel>Qisqa nomi:</FormLabel>
                        <FormControl>
                           <Input
                              {...field}
                              disabled={isPending}
                              placeholder="Chirchiq filiali"
                              type="text"
                           />
                        </FormControl>
                        <FormMessage />
                     </FormItem>
                  )}
               />
               <FormField
                  control={form.control}
                  name="code"
                  render={({ field }) => (
                     <FormItem className="basis-1/2">
                        <FormLabel>Filial kodi:</FormLabel>
                        <FormControl>
                           <Input
                              {...field}
                              disabled={isPending}
                              placeholder="999"
                              type="text"
                           />
                        </FormControl>
                        <FormMessage />
                     </FormItem>
                  )}
               />
               <FormField
                  control={form.control}
                  name="contract"
                  render={({ field }) => (
                     <FormItem className="basis-1/2">
                        <FormLabel>Shartnoma:</FormLabel>
                        <FormControl>
                           <Input
                              {...field}
                              disabled={isPending}
                              placeholder="Filial Nizomiga ko‘ra ishonchnoma"
                              type="text"
                           />
                        </FormControl>
                        <FormMessage />
                     </FormItem>
                  )}
               />
               <FormField
                  control={form.control}
                  name="committee"
                  render={({ field }) => (
                     <FormItem className="basis-1/2">
                        <FormLabel>Qo'mita:</FormLabel>
                        <FormControl>
                           <Input
                              {...field}
                              disabled={isPending}
                              placeholder="Kredit Komissiyasi"
                              type="text"
                           />
                        </FormControl>
                        <FormMessage />
                     </FormItem>
                  )}
               />
               <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                     <FormItem className="basis-1/2">
                        <FormLabel>Manzil:</FormLabel>
                        <FormControl>
                           <Input
                              {...field}
                              disabled={isPending}
                              placeholder="Toshkent viloyati, Chirchiq shahri, A.Navoiy shoh ko‘chasi, 192-uy, 5-xonadon."
                              type="text"
                           />
                        </FormControl>
                        <FormMessage />
                     </FormItem>
                  )}
               />
               <FormField
                  control={form.control}
                  name="bank_details"
                  render={({ field }) => (
                     <FormItem className="basis-1/2">
                        <FormLabel>Bank rekvizitlari:</FormLabel>
                        <FormControl>
                           <Input
                              {...field}
                              disabled={isPending}
                              placeholder="H/r 20 216 000 904 636 656 005 MFO 00973 ATB Universal Bank Toshkent filiali"
                              type="text"
                           />
                        </FormControl>
                        <FormMessage />
                     </FormItem>
                  )}
               />
               <FormField
                  control={form.control}
                  name="itn"
                  render={({ field }) => (
                     <FormItem className="basis-1/2">
                        <FormLabel>ITN:</FormLabel>
                        <FormControl>
                           <Input
                              {...field}
                              disabled={isPending}
                              placeholder="STIR 300 515 648 OKED 64920"
                              type="text"
                           />
                        </FormControl>
                        <FormMessage />
                     </FormItem>
                  )}
               />
               <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                     <FormItem className="basis-1/2">
                        <FormLabel>Telefon:</FormLabel>
                        <FormControl>
                           <Input
                              {...field}
                              disabled={isPending}
                              placeholder="+998(70)715-32-32"
                              type="text"
                           />
                        </FormControl>
                        <FormMessage />
                     </FormItem>
                  )}
               />
               <FormField
                  control={form.control}
                  name="city"
                  render={({ field }) => (
                     <FormItem className="basis-1/2">
                        <FormLabel>Shahar:</FormLabel>
                        <FormControl>
                           <Input
                              {...field}
                              disabled={isPending}
                              placeholder="Chirchiq shahar"
                              type="text"
                           />
                        </FormControl>
                        <FormMessage />
                     </FormItem>
                  )}
               />
               <FormField
                  control={form.control}
                  name="judge"
                  render={({ field }) => (
                     <FormItem className="basis-1/2">
                        <FormLabel>Sudi:</FormLabel>
                        <FormControl>
                           <Input
                              {...field}
                              disabled={isPending}
                              placeholder="Fuqarolik ishlari bo‘yicha Mirobod tumanlararo Sudi"
                              type="text"
                           />
                        </FormControl>
                        <FormMessage />
                     </FormItem>
                  )}
               />
               <FormField
                  control={form.control}
                  name="limit"
                  render={({ field }) => (
                     <FormItem className="basis-1/2">
                        <FormLabel>Kredit limiti:</FormLabel>
                        <FormControl>
                           <Input
                              {...field}
                              disabled={isPending}
                              placeholder="50 000 000"
                              type="number"
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