import React, { useTransition } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { AddressType } from "@/types";
import { BaseApi } from "@/app/api/[...nextauth]/route";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { FormFieldItem } from "@/components/form/form-field-item";
import { cn } from "@/lib/utils";
import { AddressFormSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";

const regionOptions = [
   { value: "da9ffec6-6b0c-432d-81a4-7c7fc1c2ce92", label: "Qoraqalpog'iston Respublikasi" },
   { value: "2", label: "Toshkent shahri" },
   { value: "3", label: "Andijon viloyati" },
   { value: "4", label: "Buxoro viloyati" },
   { value: "5", label: "Farg'ona viloyati" },
]

const districtOptions = [
   { value: "1", label: "Qoraqalpog'iston Respublikasi" },
   { value: "5251adf6-0ba2-4af7-b3b6-1d805d31c5b7", label: "Toshkent shahri" },
   { value: "3", label: "Andijon viloyati" },
   { value: "4", label: "Buxoro viloyati" },
   { value: "5", label: "Farg'ona viloyati" },
]

interface ProfileFormProps {
   setIsOpen: (isOpen: boolean) => void;
   defaultValues: AddressType;
   addresses: AddressType[];
   setAddresses: React.Dispatch<React.SetStateAction<AddressType[]>>;
   client_id?: string;
   className?: string;
}

export function AddressForm({
   setIsOpen,
   defaultValues,
   client_id,
   className,
   addresses,
   setAddresses
}: ProfileFormProps) {
   const [isPending, startTransition] = useTransition();

   const form = useForm({
      defaultValues: {
         ...defaultValues
      },
      resolver: zodResolver(AddressFormSchema),
   });

   const onSubmit = async (values: z.infer<typeof AddressFormSchema>) => {
      startTransition(async () => {
         try {
            if (defaultValues.id) {
               const res = await BaseApi.patch(`/addresses/${defaultValues.id}`, values);
               if (res.data) {
                  const updatedAddresses = addresses.map(address =>
                     address.id === defaultValues.id ? { ...address, ...values } : address
                  );
                  setAddresses(updatedAddresses);
               }
            } else {
               const data = { client_id, ...values };
               const res: any = await BaseApi.post(`/addresses`, data);
               if (res.data) {
                  const newAddress = { id: res.data.id, ...values };
                  setAddresses((prevAddresses: AddressType[]) => [...prevAddresses, newAddress]);
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
                     classes={"basis-2/5"}
                     control={form.control}
                     name={`region_id`}
                     label="Viloyat/Respublika"
                     placeholder="Viloyat/Respublika"
                     disabled={isPending}
                     options={regionOptions}
                  />
                  <FormFieldItem
                     classes={"basis-2/5"}
                     control={form.control}
                     name={`district_id`}
                     label="Tuman"
                     placeholder="Tuman"
                     disabled={isPending}
                     options={districtOptions}
                  />
                  <FormFieldItem
                     control={form.control}
                     name={`address`}
                     label="To'liq manzili"
                     placeholder="Toshkent shahar Yunusobod tumani Bog'ishamol ko'chasi, 12-uy"
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
