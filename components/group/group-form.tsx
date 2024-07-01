'use client'

import { z } from "zod";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/components/ui/use-toast";
import { Form } from "@/components/ui/form";
import { GroupSchema } from "@/schemas";
import { GroupType } from "@/types";
import { FormFieldItem } from "../form/form-field-item";
import { BaseApi } from "@/app/api/[...nextauth]/route";
import { Button } from "../ui/button";
import { ClientsMultiSelect } from "../ui/async-select";

const branchOptions = [
   { value: "1", label: "Chirchiq filiali" },
   { value: "07d1eabb-d7da-4a28-8c34-798565219521", label: "Bektemir filiali" },
   { value: "3", label: "Olmaliq filiali" },
   { value: "4", label: "Bekobod filiali" },
   { value: "5", label: "Bo'ka filiali" },
   { value: "6", label: "Nukus filiali" },
   { value: "7", label: "Mirbozor filiali" }
]

type OptionType = {
   label: string;
   value: string;
}

interface Props {
   defaultValues: GroupType;
   btn_txt: string;
}

export function GroupForm({ defaultValues, btn_txt }: Props) {
   const [error, setError] = useState<string | undefined>("");
   const [success, setSuccess] = useState<string | undefined>("");
   const [selected, setSelected] = useState<string[]>([])
   const [selectedOptions, setSelectedOptions] = useState<OptionType[]>([])
   const [isPending, startTransition] = useTransition();
   const { toast } = useToast();
   const router = useRouter();

   const form = useForm({
      resolver: zodResolver(GroupSchema),
      defaultValues: {
         ...defaultValues,
      },
   });


   function selectedClient(items: OptionType[]) {
      if (items && items.length <= 5) {
         let selectedId = items.map(item => {
            return item.value
         })
         setSelected([...selectedId])
         setSelectedOptions([...items]);
      } else if (items.length > 5) {
         toast({
            variant: "destructive",
            title: "Guruh a'zolari ko'p"
         })
         const truncatedSelection = items.slice(0, 5)
         setSelectedOptions(truncatedSelection)
      }
   }

   const onSubmit = async (values: z.infer<typeof GroupSchema>) => {
      setError("");
      setSuccess("");
      if (selected.length < 2) {
         startTransition(async () => {
            const postData = { ...values, clients_id: selected }
            try {
               const res = await BaseApi.post("/groups", postData);
               if (res.data) {
                  setSuccess("Guruh muvaffaqiyatli qo'shildi");
                  router.push('/groups', { scroll: false })
                  toast({
                     variant: "default",
                     title: "Guruh muvaffaqiyatli qo'shildi",
                     description: JSON.stringify(new Date())
                  });
               }
            }
            catch (error: any) {
               toast({
                  variant: "destructive",
                  title: error.response.data.message.toUpperCase() || "Xatolik yuz berdi",
                  description: JSON.stringify(new Date())
               });
            }
         })
      } else {
         toast({
            variant: "destructive",
            title: "Guruhda yetarli odam mavjud emas!",
            description: JSON.stringify(new Date())
         });
      }
   };

   return (
      <Form {...form}>
         <form
            className="space-y-6"
            autoComplete="off"
            onSubmit={form.handleSubmit(onSubmit)}
         >
            <div className="w-full grid grid-cols-1 gap-4 p-4">
               <FormFieldItem control={form.control} name="code" label="Guruh kodi" placeholder="1524" type="text" disabled={isPending} />
               <FormFieldItem control={form.control} name="name" label="Guruh nomi" placeholder="Tirikchilik" type="text" disabled={isPending} />
               <FormFieldItem control={form.control} name="branch_id" label="Filial" placeholder="" disabled={isPending} options={branchOptions} />
               <ClientsMultiSelect
                  isMulti={true}
                  onSelectionChange={selectedClient}
                  selectedOptions={selectedOptions}
               />
            </div>
            <div className="flex justify-end">
               <Button disabled={isPending} type="submit" className="tracking-wide bg-blue-700 hover:bg-indigo-500 text-white">
                  {isPending ? <Loader2 className="animate-spin" /> : btn_txt}
               </Button>
            </div>
         </form>
      </Form>
   )
}