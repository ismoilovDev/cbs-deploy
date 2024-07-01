import React, { useTransition } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { PhoneType } from "@/types";
import { BaseApi } from "@/app/api/[...nextauth]/route";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { FormFieldItem } from "@/components/form/form-field-item";
import { cn } from "@/lib/utils";
import { PhoneFormSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";

interface ProfileFormProps {
   setIsOpen: (isOpen: boolean) => void;
   defaultValues: PhoneType;
   phones: PhoneType[];
   setPhones: React.Dispatch<React.SetStateAction<PhoneType[]>>;
   client_id?: string;
   className?: string;
}

export function PhoneForm({
   setIsOpen,
   defaultValues,
   client_id,
   className,
   phones,
   setPhones
}: ProfileFormProps) {
   const [isPending, startTransition] = useTransition();
   const form = useForm({
      defaultValues: {
         ...defaultValues
      },
      resolver: zodResolver(PhoneFormSchema),
   });

   const onSubmit = async (values: z.infer<typeof PhoneFormSchema>) => {
      startTransition(async () => {
         try {
            if (defaultValues.id) {
               const res = await BaseApi.patch(`phones/${defaultValues.id}`, values);
               if (res.data) {
                  const updatedPhones = phones.map(phone =>
                     phone.id === defaultValues.id ? { ...phone, ...values } : phone
                  );
                  setPhones(updatedPhones);
               }
            } else {
               const data = { client_id, ...values };
               const res: any = await BaseApi.post(`phones`, data);
               if (res.data) {
                  const newPhone = { id: res.data.id, ...values };
                  setPhones((prevPhones: PhoneType[]) => [...prevPhones, newPhone]);
               }
            }
            setIsOpen(false);
         } catch (error: any) {
            console.log(error);
         }
      });
   };

   return (
      <Form {...form}>
         <form onSubmit={form.handleSubmit(onSubmit)} className={cn("grid items-start gap-4", className)}>
            <div className="relative shadow-lg dark:shadow-cyan-950 p-2 my-6 border-t rounded-sm">
               <div className="w-full grid grid-cols-1 gap-4 my-4">
                  <FormFieldItem
                     classes="items-end"
                     control={form.control}
                     name="status"
                     label="Aktiv qilish"
                     placeholder="Aktivligi"
                     type="text"
                     is_checkbox={true}
                     disabled={isPending}
                  />
                  <FormFieldItem
                     control={form.control}
                     name="title"
                     label="Egasi"
                     placeholder="O'ziniki"
                     type="text"
                     disabled={isPending}
                  />
                  <FormFieldItem
                     control={form.control}
                     name="phone"
                     label="Telefon raqami"
                     placeholder="Telefon raqami"
                     type="text"
                     disabled={isPending}
                  />
               </div>
            </div>
            <Button type="submit" disabled={isPending}>
               {defaultValues.id ? "O'zgartirish" : "Qo'shish"}
            </Button>
         </form>
      </Form>
   );
}
