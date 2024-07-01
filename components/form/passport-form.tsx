import React, { useEffect, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { PassportType } from "@/types";
import { BaseApi } from "@/app/api/[...nextauth]/base-api";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { FormFieldItem } from "@/components/form/form-field-item";
import { cn } from "@/lib/utils";
import { PassportFormSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFileHandler } from "@/app/hooks/use-file-upload";
import FileUploader from "../uploader/file-uploader";
import { useSessionClientComponent } from "@/app/hooks/use-session-client-component";
import { getImagesWithToken } from "@/app/hooks/use-image-token";

const passportOptions = [
   { value: '1', label: "O'zR fuqarosining ID kartasi" },
   { value: '2', label: "O'zR Fuqarosining biometrik pasporti" },
   { value: '3', label: "Harbiy xizmatchi guvohnomasi" },
   { value: '4', label: "Xizmat guvohnomasi" },
   { value: '5', label: "Xorijiy fuqaro pasporti" },
   { value: '6', label: "Tug'ulganlik haqidagi guvohnoma" },
   { value: '7', label: "O'zR fuqarosining yangi namunadagi haydovchilik guvohnomasi" },
   { value: '8', label: "Boshqa" }
]

interface PassportFormProps {
   setIsOpen: (isOpen: boolean) => void;
   defaultValues: PassportType;
   passports: PassportType[];
   setPassports: React.Dispatch<React.SetStateAction<PassportType[]>>;
   client_id?: string;
   className?: string;
   pinfl: string
}

export function PassportForm({
   setIsOpen,
   defaultValues,
   client_id,
   className,
   pinfl,
   passports,
   setPassports
}: PassportFormProps) {
   const [isPending, startTransition] = useTransition();
   const [selectedFiles, setSelectedFiles] = useState([])
   const passportFiles = useFileHandler();
   const { token } = useSessionClientComponent();

   // useEffect(() => {
   //    const selectedWithType = defaultValues.files?.map(file => {
   //       return {
   //          id: file.id,
   //          name: "string",
   //          url: getImagesWithToken(file.path, token as string),
   //          type: "image",
   //          size: 2000,
   //       }
   //    })
   //    setSelectedFiles(selectedWithType)
   // }, [])

   const form = useForm({
      defaultValues: {
         ...defaultValues
      },
      resolver: zodResolver(PassportFormSchema),
   });

   const MemoizedFileUploaderPassport = React.memo(FileUploader);

   const onSubmit = async (values: z.infer<typeof PassportFormSchema>) => {
      startTransition(async () => {
         try {
            if (defaultValues.id) {
               const data = {
                  ...values,
                  fileable_type: "passport",
                  fileable_id: client_id,
                  personal_identification: pinfl,
                  images: passportFiles.uploadedFilePaths
               }
               const res = await BaseApi.patch(`/addresses/${defaultValues.id}`, data);
               if (res.data) {
                  console.log(passports)
                  // const updatedAddresses = addresses.map(address =>
                  //    address.id === defaultValues.id ? { ...address, ...values } : address
                  // );
                  // setAddresses(updatedAddresses);
               }
            } else {
               console.log(passports)
               // const data = { client_id, ...values };
               // const res: any = await BaseApi.post(`/addresses`, data);
               // if (res.data) {
               //    const newAddress = { id: res.data.id, ...values };
               //    setAddresses((prevAddresses: AddressType[]) => [...prevAddresses, newAddress]);
               // }
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
            <div className="relative my-6 border-t rounded-sm">
               <div className="w-full grid grid-cols-1 md:grid-cols-temp-2 gap-4 my-4">
                  <FormFieldItem
                     control={form.control}
                     name={`type`}
                     label="Shaxsini tasdiqlovchi hujjat turi"
                     placeholder="Passport turi"
                     disabled={isPending}
                     options={passportOptions}
                  />
                  <FormFieldItem
                     control={form.control}
                     name={`series`}
                     label="Hujjat seriyasi"
                     placeholder="AA"
                     type="text"
                     disabled={isPending}
                  />
                  <FormFieldItem
                     control={form.control}
                     name={`number`}
                     label="Hujjat raqami"
                     placeholder="1234567"
                     type="text"
                     disabled={isPending}
                  />
                  <FormFieldItem
                     control={form.control}
                     name={`registration_date`}
                     label="Hujjat berilgan sana"
                     placeholder="20.05.2024"
                     type="date"
                     disabled={isPending}
                  />
                  <FormFieldItem
                     control={form.control}
                     name={`expiration_date`}
                     label="Amal qilish muddati"
                     placeholder="20.05.2024"
                     type="date"
                     disabled={isPending}
                  />
                  <FormFieldItem
                     control={form.control}
                     name={`registration_place`}
                     label="Hujjat berilgan joyi"
                     placeholder="Toshkent shahar Yunusobod tumani Bog'ishamol ko'chasi, 12-uy"
                     type="text"
                     disabled={isPending}
                  />
               </div>
               <MemoizedFileUploaderPassport
                  isPending={isPending}
                  handleUpload={() => passportFiles.uploadFiles('passport')}
                  selectedFiles={passportFiles.files}
                  handleFilesSelect={passportFiles.handleFilesSelect}
                  removeSelectedFile={passportFiles.removeSelectedFile}
               />
            </div>
            <Button type="submit" disabled={isPending}>
               {defaultValues.id ? "O'zgartirish" : "Qo'shish"}
            </Button>
         </form>
      </Form>
   );
}
