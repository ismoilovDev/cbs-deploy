"use client";

import React, { useState, useTransition } from 'react';
import { z } from 'zod';
import { useRouter } from "next/navigation";
import { Loader2, Trash2 } from 'lucide-react';
import { useFieldArray, useForm } from 'react-hook-form';
import { ClientType, PhoneType, AddressType } from '@/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { ClientSchema } from '@/schemas';
import { Form } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { FormFieldItem } from '@/components/form/form-field-item';
import { BaseApi } from '@/app/api/[...nextauth]/base-api';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import FileUploader from '@/components/uploader/file-uploader';
import { useFileHandler } from '@/app/hooks/use-file-upload';

interface Props {
   defaultValues: ClientType;
   btn_txt: string;
}

const defaultPhone: PhoneType = {
   title: '',
   phone: '',
   status: true
}

const defaultAddress: AddressType = {
   address: '',
   region_id: '',
   district_id: '',
   status: true
}

const branchOptions = [
   { value: "1", label: "Chirchiq filiali" },
   { value: "07d1eabb-d7da-4a28-8c34-798565219521", label: "Bektemir filiali" },
   { value: "3", label: "Olmaliq filiali" },
   { value: "4", label: "Bekobod filiali" },
   { value: "5", label: "Bo'ka filiali" },
   { value: "6", label: "Nukus filiali" },
   { value: "7", label: "Mirbozor filiali" }
]

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

const residentOptions = [
   { value: true, label: "Ha" },
   { value: false, label: "Yo'q" }
]

const genderOptions = [
   { value: "male", label: "Erkak" },
   { value: "female", label: "Ayol" }
]

const citizenshipOptions = [
   { value: "uk", label: "British, UK" },
   { value: "Karakalpak", label: "Karakalpak, KR" },
   { value: "ru", label: "Russian, RU" },
   { value: "uz", label: "Uzbekistan, UZ" },
   { value: "tr", label: "Turkish" }
]

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

export const ClientForm: React.FC<Props> = ({ defaultValues, btn_txt }) => {
   const [error, setError] = useState<string | undefined>("");
   const [success, setSuccess] = useState<string | undefined>("");
   const [isPending, startTransition] = useTransition();
   const passportFiles = useFileHandler();
   const clientFiles = useFileHandler();
   const { toast } = useToast();
   const router = useRouter()

   const form = useForm({
      resolver: zodResolver(ClientSchema),
      defaultValues: {
         ...defaultValues,
         phones: defaultValues?.phones || [defaultPhone],
         addresses: defaultValues?.addresses || [defaultAddress]
      },
   });

   const { fields: phones, append: appendPhone, remove: removePhone } = useFieldArray({
      control: form.control,
      name: "phones"
   });

   const { fields: addresses, append: appendAddress, remove: removeAddress } = useFieldArray({
      control: form.control,
      name: "addresses"
   });

   const MemoizedFileUploaderPassport = React.memo(FileUploader);
   const MemoizedFileUploaderClient = React.memo(FileUploader);

   const onSubmit = async (values: z.infer<typeof ClientSchema>) => {
      setError("");
      setSuccess("");
      console.log(values)
      const data = {
         ...values,
         passport: {
            ...values.passport,
            personal_identification: values.pinfl,
            files: passportFiles.uploadedFilePaths.length !== 0 ? passportFiles.uploadedFilePaths : ["http://localhost:8000/files/passports/20240520151957_bEDx04fHWG.JPG"]
         },
         files: clientFiles.uploadedFilePaths.length !== 0 ? clientFiles.uploadedFilePaths : ["http://localhost:8000/files/passports/20240520151957_bEDx04fHWG.JPG"]
      };
      startTransition(async () => {
         try {
            const res = await BaseApi.post("/clients", data);
            if (res.data) {
               console.log(res.data)
               setSuccess("Mijoz muvaffaqiyatli qo'shildi");
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
   };

   return (
      <Form {...form}>
         <form
            className="space-y-6"
            autoComplete="off"
            onSubmit={form.handleSubmit(onSubmit)}
         >
            <Accordion defaultValue={['item-1']} type="multiple" className="w-full">
               <AccordionItem value="item-1" className='border shadow-sm'>
                  <AccordionTrigger className='px-4 font-medium'>
                     <p>Asosiy</p>
                  </AccordionTrigger>
                  <AccordionContent>
                     <div className="w-full grid grid-cols-2 gap-4 p-4">
                        <FormFieldItem control={form.control} name="surname" label="Familya" placeholder="Usmonov" type="text" disabled={isPending} />
                        <FormFieldItem control={form.control} name="firstname" label="Ism" placeholder="Usmon" type="text" disabled={isPending} />
                        <FormFieldItem control={form.control} name="lastname" label="Sharif" placeholder="Usmonovich" type="text" disabled={isPending} />
                        <FormFieldItem control={form.control} name="branch_id" label="Filial" placeholder="" disabled={isPending} options={branchOptions} />
                        <FormFieldItem control={form.control} name="pinfl" label="PINFL/JShShIR" placeholder="45448484" type="text" disabled={isPending} />
                        <FormFieldItem control={form.control} name="open_date" label="Mijoz kiritilgan sana" placeholder="20.05.2024" type="date" disabled={isPending} />
                        <FormFieldItem control={form.control} name="close_date" label="Mijoz chiqarilgan vaqt" placeholder="20.05.2024" type="date" disabled={isPending} />
                        <FormFieldItem control={form.control} name="gender" label="Jinsi" placeholder="Jinsi" disabled={isPending} options={genderOptions} />
                     </div>
                  </AccordionContent>
               </AccordionItem>
               <AccordionItem value="item-2" className='border shadow-sm'>
                  <AccordionTrigger className='px-4 font-medium'>
                     <p>Mijoz haqida</p>
                  </AccordionTrigger>
                  <AccordionContent>
                     <div className="w-full grid grid-cols-2 gap-4 p-4">
                        <FormFieldItem control={form.control} name="birth_date" label="Tug'ilgan sana" placeholder="20.05.2024" type="date" disabled={isPending} />
                        <FormFieldItem control={form.control} name="is_resident" label="Rezidentlik" placeholder="Mijoz rezidentmi?" disabled={isPending} options={residentOptions} />
                        <FormFieldItem control={form.control} name="nationality" label="Fuqarolik" placeholder="Fuqarolik" disabled={isPending} options={citizenshipOptions} />
                        <FormFieldItem control={form.control} name="job" label="Ish joyi" placeholder="Fido xususiy korxonasi" type="text" disabled={isPending} />
                     </div>
                  </AccordionContent>
               </AccordionItem>
               <AccordionItem value="item-3" className='border shadow-sm'>
                  <AccordionTrigger className='px-4 font-medium'>
                     <p>Telefon raqamlari</p>
                  </AccordionTrigger>
                  <AccordionContent className='p-4'>
                     <Button type='button' className='border mt-2' onClick={() => appendPhone(defaultPhone)}>
                        <p>Telefon raqam qo'shish</p>
                     </Button>
                     <div className='mt-2'>
                        {phones.map((item, index) => (
                           <div key={item.id} className='relative shadow-lg dark:shadow-cyan-950 p-2 my-6 border-t rounded-sm'>
                              <div className="p-2">
                                 <p className='font-semibold text-base'>
                                    {index + 1} - Telefon raqami
                                 </p>
                              </div>
                              <div key={item.id} className="w-full grid grid-cols-2 gap-4 my-4">
                                 <FormFieldItem control={form.control} name={`phones.${index}.title`} label="Egasi" placeholder="O'ziniki" type="text" disabled={isPending} />
                                 <div className='w-full flex items-center space-x-3'>
                                    <FormFieldItem classes={"basis-3/4"} control={form.control} name={`phones.${index}.phone`} label="Telefon raqami" placeholder="Telefon raqami" type="text" disabled={isPending} />
                                    <FormFieldItem classes={"basis-1/4"} control={form.control} name={`phones.${index}.status`} label="Aktiv qilish" placeholder="Aktivligi" type="text" is_checkbox={true} />
                                 </div>
                                 {phones.length > 1 && (
                                    <Button
                                       type='button'
                                       className='absolute rounded-full flex justify-center items-center bg-red-700 hover:bg-red-700 hover:text-white dark:text-white -top-2 -right-2 w-8 h-8'
                                       onClick={() => removePhone(index)}
                                    >
                                       <Trash2 className='absolute w-4 h-4' />
                                    </Button>
                                 )}
                              </div>
                           </div>
                        ))}
                     </div>
                  </AccordionContent>
               </AccordionItem>
               <AccordionItem value="item-4" className='border shadow-sm'>
                  <AccordionTrigger className='px-4 font-medium'>
                     <p>Yashash manzillari</p>
                  </AccordionTrigger>
                  <AccordionContent className='p-4'>
                     <Button type='button' className='border mt-2' onClick={() => appendAddress(defaultAddress)}>
                        <p>Manzil qo'shish</p>
                     </Button>
                     <div className='mt-2'>
                        {addresses.map((item, index) => (
                           <div key={item.id} className='relative shadow-lg dark:shadow-cyan-950 p-2 my-6 border-t rounded-sm'>
                              <div className="p-2">
                                 <p className='font-semibold text-base'>
                                    {index + 1} - Manzil
                                 </p>
                              </div>
                              <div key={item.id} className="w-full grid grid-cols-1 grid-rows-2 gap-4 my-4">
                                 <div className='w-full flex items-center space-x-3'>
                                    <FormFieldItem classes={"basis-2/5"} control={form.control} name={`addresses.${index}.region_id`} label="Viloyat/Respublika" placeholder="Viloyat/Respublika" disabled={isPending} options={regionOptions} />
                                    <FormFieldItem classes={"basis-2/5"} control={form.control} name={`addresses.${index}.district_id`} label="Tuman" placeholder="Tuman" disabled={isPending} options={districtOptions} />
                                    <FormFieldItem classes={"basis-1/4"} control={form.control} name={`addresses.${index}.status`} label="Aktiv qilish" placeholder="Aktivligi" type="text" is_checkbox={true} />
                                 </div>
                                 <FormFieldItem control={form.control} name={`addresses.${index}.address`} label="To'liq manzili" placeholder="Toshkent shahar Yunusobod tumani Bog'ishamol ko'chasi, 12-uy" type="text" disabled={isPending} />
                                 {addresses.length > 1 && (
                                    <Button
                                       type='button'
                                       className='absolute rounded-full flex justify-center items-center bg-red-700 hover:bg-red-700 hover:text-white dark:text-white -top-2 -right-2 w-8 h-8'
                                       onClick={() => removeAddress(index)}
                                    >
                                       <Trash2 className='absolute w-4 h-4' />
                                    </Button>
                                 )}
                              </div>
                           </div>
                        ))}
                     </div>
                  </AccordionContent>
               </AccordionItem>
               <AccordionItem value="item-5" className='border shadow-sm'>
                  <AccordionTrigger className='px-4 font-medium'>
                     <p>Shaxsini tasdiqlovchi hujjatlari</p>
                  </AccordionTrigger>
                  <AccordionContent>
                     <div className="w-full p-4">
                        <div className="grid grid-cols-2 gap-4">
                           <FormFieldItem control={form.control} name={`passport.type`} label="Shaxsini tasdiqlovchi hujjat turi" placeholder="Passport turi" disabled={isPending} options={passportOptions} />
                           <FormFieldItem control={form.control} name={`passport.series`} label="Hujjat seriyasi" placeholder="AA" type="text" disabled={isPending} />
                           <FormFieldItem control={form.control} name={`passport.number`} label="Hujjat raqami" placeholder="1234567" type="text" disabled={isPending} />
                           <FormFieldItem control={form.control} name={`passport.registration_date`} label="Hujjat berilgan sana" placeholder="20.05.2024" type="date" disabled={isPending} />
                           <FormFieldItem control={form.control} name={`passport.expiration_date`} label="Amal qilish muddati" placeholder="20.05.2024" type="date" disabled={isPending} />
                           <FormFieldItem control={form.control} name={`passport.registration_place`} label="Hujjat berilgan joyi" placeholder="Toshkent shahar Yunusobod tumani Bog'ishamol ko'chasi, 12-uy" type="text" disabled={isPending} />
                        </div>
                        <MemoizedFileUploaderPassport
                           isPending={isPending}
                           handleUpload={() => passportFiles.uploadFiles('passport')}
                           selectedFiles={passportFiles.files}
                           handleFilesSelect={passportFiles.handleFilesSelect}
                           removeSelectedFile={passportFiles.removeSelectedFile}
                        />
                     </div>
                  </AccordionContent>
               </AccordionItem>
               <AccordionItem value="item-6" className='border shadow-sm'>
                  <AccordionTrigger className='px-4 font-medium'>
                     <p>Mijoz rasmlari</p>
                  </AccordionTrigger>
                  <AccordionContent>
                     <div className='w-full p-4'>
                        <MemoizedFileUploaderClient
                           isPending={isPending}
                           handleUpload={() => clientFiles.uploadFiles('client')}
                           selectedFiles={clientFiles.files}
                           handleFilesSelect={clientFiles.handleFilesSelect}
                           removeSelectedFile={clientFiles.removeSelectedFile}
                        />
                     </div>
                  </AccordionContent>
               </AccordionItem>
            </Accordion>
            <div className="flex justify-end">
               <Button disabled={isPending} type="submit" className="tracking-wide bg-blue-700 hover:bg-indigo-500 text-white">
                  {isPending ? <Loader2 className="animate-spin" /> : btn_txt}
               </Button>
            </div>
         </form>
      </Form >
   );
};
