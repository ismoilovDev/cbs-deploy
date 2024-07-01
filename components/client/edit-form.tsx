"use client";

import React, { useEffect, useState, useTransition } from 'react';
import { z } from 'zod';
import { Edit, Loader2, MessageSquarePlus, Trash2 } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { PhoneType, AddressType, PassportType } from '@/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { ClientUpdateSchema } from '@/schemas';
import { Form } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { FormFieldItem } from '@/components/form/form-field-item';
import { BaseApi } from '@/app/api/[...nextauth]/route';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { useFileHandler } from '@/app/hooks/use-file-upload';
import { Modal } from '../modal/modal';
import { PhoneForm } from '../form/phone-form';
import { AddressForm } from '../form/address-form';
import { DetailItem } from './detail-item';
import { PassportForm } from '../form/passport-form';
import FileUploader from '@/components/uploader/file-uploader';
import ImageComponent from '../image/image-with-token';

interface Props {
   client_id: string,
   data: any;
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

const defaultPassport: PassportType = {
   fileable_type: "passport",
   fileable_id: "",
   type: "qadimgi emes",
   series: "",
   number: "",
   registration_date: "",
   registration_place: "",
   expiration_date: "",
   personal_identification: "",
   images: []
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

export const EditForm: React.FC<Props> = ({ client_id, data, btn_txt }) => {
   const [isPending, startTransition] = useTransition();
   const [phones, setPhones] = useState<PhoneType[]>([])
   const [addresses, setAddresses] = useState<AddressType[]>([])
   const [passports, setPassports] = useState<PassportType[]>([])
   const [selectedPhone, setSelectedPhone] = useState<PhoneType>(defaultPhone)
   const [selectedAddress, setSelectedAddress] = useState<AddressType>(defaultAddress)
   const [selectedPassport, setSelectedPassport] = useState<PassportType>(defaultPassport)
   const [isOpen, setIsOpen] = useState<boolean>(false)
   const [modalType, setModalType] = useState('')
   const clientFiles = useFileHandler();
   const { toast } = useToast();

   useEffect(() => {
      if (data && data.phones) {
         setPhones([...data.phones]);
      }
      if (data && data.addresses) {
         setAddresses([...data.addresses])
      }
      if (data && data.passports) {
         setPassports([...data.passports])
      }
   }, [data, isOpen]);

   const defaultValues = {
      ...data,
      "branch_id": data?.branch?.id,
   }

   const form = useForm({
      resolver: zodResolver(ClientUpdateSchema),
      defaultValues: {
         ...defaultValues,
      },
   });

   const MemoizedFileUploaderClient = React.memo(FileUploader);

   const openEditForm = (type: string, item: any) => {
      setModalType(type)
      setIsOpen(true)
      if (type === "phone") {
         setSelectedPhone(item)
      }
      if (type === "address") {
         setSelectedAddress(item)
      }
      if (type === "passport") {
         setSelectedPassport(item)
      }
   }

   const openAddForm = (type: string) => {
      setModalType(type)
      setIsOpen(true)
      if (type === "phone") {
         setSelectedPhone(defaultPhone)
      }
      if (type === "address") {
         setSelectedAddress(defaultAddress)
      }
      if (type === "passport") {
         setSelectedPassport(defaultPassport)
      }
   }

   const removeItem = async (id: string) => {
      try {
         const res = await BaseApi.delete(`/phones/${id}`)
         if (res.data) {
            const new_phones_list = phones.filter(phone => phone.id !== id)
            setPhones([...new_phones_list])

            toast({
               variant: "default",
               title: "Telefon o'chirildi!",
               description: JSON.stringify(new Date())
            });
         }
      } catch (error: any) {
         toast({
            variant: "destructive",
            title: error.response.data.message.toUpperCase() || "Xatolik yuz berdi",
            description: JSON.stringify(new Date())
         });
      }
   }

   const onSubmit = async (values: z.infer<typeof ClientUpdateSchema>) => {
      const data = {
         ...values,
         images: clientFiles.uploadedFilePaths.length !== 0 ? clientFiles.uploadedFilePaths : ["http://localhost:8000/files/passports/20240520151957_bEDx04fHWG.JPG"]
      };

      startTransition(async () => {
         try {
            const res = await BaseApi.patch(`/clients/${client_id}`, data);
            if (res.data) {
               console.log(res.data)
               toast({
                  variant: "default",
                  title: "Mijoz yangilandi!",
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
      <React.Fragment>
         <Form {...form}>
            <form
               className="space-y-6"
               autoComplete="off"
               onSubmit={form.handleSubmit(onSubmit)}
            >
               <Accordion defaultValue={['item-5']} type="multiple" className="w-full">
                  <AccordionItem value="item-1" className='border shadow-sm'>
                     <AccordionTrigger className='px-4 font-medium'>
                        <p>Asosiy</p>
                     </AccordionTrigger>
                     <AccordionContent>
                        <div className="w-full grid grid-cols-2 gap-4 p-4">
                           <FormFieldItem control={form.control} name="code" label="Mijoz kodi" placeholder="000000" type="number" disabled={isPending} />
                           <FormFieldItem control={form.control} name="surname" label="Familya" placeholder="Usmonov" type="text" disabled={isPending} />
                           <FormFieldItem control={form.control} name="firstname" label="Ism" placeholder="Usmon" type="text" disabled={isPending} />
                           <FormFieldItem control={form.control} name="lastname" label="Sharif" placeholder="Usmonovich" type="text" disabled={isPending} />
                           <FormFieldItem control={form.control} name="branch_id" label="Filial" placeholder="" disabled={isPending} options={branchOptions} />
                           <FormFieldItem control={form.control} name="pinfl" label="PINFL/JShShIR" placeholder="45448484" type="text" disabled={isPending} />
                           <FormFieldItem control={form.control} name="open_date" label="Mijoz kiritilgan sana" placeholder="20.05.2024" type="date" disabled={isPending} />
                           <FormFieldItem control={form.control} name="close_date" label="Mijoz chiqarilgan vaqt" placeholder="20.05.2024" type="date" disabled={isPending} />
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
                           <FormFieldItem control={form.control} name="gender" label="Jinsi" placeholder="Jinsi" disabled={isPending} options={genderOptions} />
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
                     <AccordionContent>
                        <div className='mt-2'>
                           <div className='p-2 lg:ml-2'>
                              <Button
                                 type='button'
                                 className='bg-green-600 hover:bg-green-700 dark:text-white dark:hover:bg-green-700'
                                 onClick={() => openAddForm('phone')}
                              >
                                 <span className='inline-block w-4 mr-3'>
                                    <MessageSquarePlus />
                                 </span>
                                 <span>
                                    Qo'shish
                                 </span>
                              </Button>
                           </div>
                           {data.phones.map((phone: any, index: number) => (
                              <div key={phone.id} className='mt-2 relative border-t p-4'>
                                 <div className="flex justify-between items-center mb-4">
                                    <p className='font-semibold text-base text-indigo-800 dark:text-foreground'>
                                       {index + 1} - Telefon raqami
                                    </p>
                                    <div className="btns flex items-center space-x-2">
                                       <Button
                                          type='button'
                                          className='flex justify-center space-x-2 bg-indigo-600 dark:text-white dark:hover:bg-indigo-700'
                                          onClick={() => openEditForm('address', phone)}
                                       >
                                          <span>
                                             <Edit className='w-4 h-4' />
                                          </span>
                                          <span>
                                             O'zgaritish
                                          </span>
                                       </Button>
                                       {phones.length > 1 && (
                                          <Button
                                             type='button'
                                             className='flex justify-center items-center space-x-2 bg-red-700 hover:bg-red-700 hover:text-white dark:text-white'
                                             onClick={() => removeItem(phone.id as string)}
                                          >
                                             <span>
                                                <Trash2 className='w-4 h-4' />
                                             </span>
                                             <span>
                                                O'chirish
                                             </span>
                                          </Button>
                                       )}
                                    </div>
                                 </div>
                                 <div className="w-full grid grid-cols-1 lg:grid-cols-3 gap-4">
                                    <DetailItem title='Egasi' value={phone.title} />
                                    <DetailItem title='Nomer' value={phone.phone} />
                                    <DetailItem title='Aktiv' value={phone.status ? "Ha" : "Yo'q"} />
                                 </div>
                              </div>
                           ))}
                        </div>
                     </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-4" className='border shadow-sm'>
                     <AccordionTrigger className='px-4 font-medium'>
                        <p>Yashash mazillari</p>
                     </AccordionTrigger>
                     <AccordionContent>
                        <div className='mt-2'>
                           <div className='p-2 lg:ml-2'>
                              <Button
                                 type='button'
                                 className='bg-green-600 hover:bg-green-700 dark:text-white dark:hover:bg-green-700'
                                 onClick={() => openAddForm('address')}
                              >
                                 <span className='inline-block w-4 mr-3'>
                                    <MessageSquarePlus />
                                 </span>
                                 <span>
                                    Qo'shish
                                 </span>
                              </Button>
                           </div>
                           {addresses.map((address, index) => (
                              <div key={address.id} className='mt-2 relative border-t p-4'>
                                 <div className="flex justify-between items-center mb-4">
                                    <p className='font-semibold text-base text-indigo-800 dark:text-foreground'>
                                       {index + 1} - Yashash manzili
                                    </p>
                                    <div className="btns flex items-center space-x-2">
                                       <Button
                                          type='button'
                                          className='flex justify-center space-x-2 bg-indigo-600 dark:text-white dark:hover:bg-indigo-700'
                                          onClick={() => openEditForm('address', address)}
                                       >
                                          <span>
                                             <Edit className='w-4 h-4' />
                                          </span>
                                          <span>
                                             O'zgaritish
                                          </span>
                                       </Button>
                                       {addresses.length > 1 && (
                                          <Button
                                             type='button'
                                             className='flex justify-center items-center space-x-2 bg-red-700 hover:bg-red-700 hover:text-white dark:text-white'
                                             onClick={() => removeItem(address.id as string)}
                                          >
                                             <span>
                                                <Trash2 className='w-4 h-4' />
                                             </span>
                                             <span>
                                                O'chirish
                                             </span>
                                          </Button>
                                       )}
                                    </div>
                                 </div>
                                 <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-4">
                                    <DetailItem title='Viloyat/Respublika' value={address.region.name} />
                                    <DetailItem title='Tuman' value={address.district.name} />
                                    <DetailItem title='Manzil' value={address.address} />
                                    <DetailItem title='Aktiv' value={address.status ? "Ha" : "Yo'q"} />
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
                        <div className='mt-2'>
                           <div className='p-2 lg:ml-2'>
                              <Button
                                 type='button'
                                 className='bg-green-600 hover:bg-green-700 dark:text-white dark:hover:bg-green-700'
                                 onClick={() => openAddForm('passport')}
                              >
                                 <span className='inline-block w-4 mr-3'>
                                    <MessageSquarePlus />
                                 </span>
                                 <span>
                                    Qo'shish
                                 </span>
                              </Button>
                           </div>

                           {passports.map((passport: any, index: number) => (
                              <div key={passport.id} className='mt-2 relative border-t p-4'>
                                 <div className="flex justify-between items-center mb-4">
                                    <p className='font-semibold text-base text-indigo-800 dark:text-foreground'>
                                       {index + 1} - Shaxsini tasdiqlovchi hujjati
                                    </p>
                                    <div className="btns flex items-center space-x-2">
                                       <Button
                                          type='button'
                                          className='flex justify-center space-x-2 bg-indigo-600 dark:text-white dark:hover:bg-indigo-700'
                                          onClick={() => openEditForm('passport', passport)}
                                       >
                                          <span>
                                             <Edit className='w-4 h-4' />
                                          </span>
                                          <span>
                                             O'zgaritish
                                          </span>
                                       </Button>
                                       {passports.length > 1 && (
                                          <Button
                                             type='button'
                                             className='flex justify-center items-center space-x-2 bg-red-700 hover:bg-red-700 hover:text-white dark:text-white'
                                             onClick={() => removeItem(passport.id as string)}
                                          >
                                             <span>
                                                <Trash2 className='w-4 h-4' />
                                             </span>
                                             <span>
                                                O'chirish
                                             </span>
                                          </Button>
                                       )}
                                    </div>
                                 </div>
                                 <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
                                    <DetailItem title='Shaxsini tasdiqlovchi hujjat' value={passport.type} />
                                    <DetailItem title='Seriya va raqami' value={`${passport.series}${passport.number}`} />
                                    <DetailItem title='Hujjat berilgan joyi' value={passport.registration_place} />
                                    <DetailItem title='Hujjat berilgan sanasi' value={passport.registration_date} />
                                    <DetailItem title='Hujjat tugash sanasi' value={passport.expiration_date} />
                                 </div>

                                 {passport.files.length > 0 &&
                                    <div className="mb-4 border-t-2 p-2">
                                       <p className='font-semibold text-indigo-800 dark:text-foreground mt-4'>
                                          Hujjat rasmlari
                                       </p>
                                       <div className="w-full grid grid-cols-1 lg:grid-cols-3 2xl:grid-cols-4 gap-4 p-4">
                                          {
                                             passport.files.map((file: any) => (
                                                <ImageComponent key={file.id} path={file.path} />
                                             ))
                                          }
                                       </div>
                                    </div>
                                 }
                              </div>
                           ))}
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
         {
            isOpen &&
            <Modal
               isOpen={isOpen}
               setIsOpen={setIsOpen}
               title={
                  modalType === "phone" ?
                     "Telefon raqamni ma'lumotlarini o'zgartirish yoki qo'shish" :
                     modalType === "address" ?
                        "Telefon raqamni ma'lumotlarini o'zgartirish yoki qo'shish" :
                        modalType === "passport" ?
                           "Telefon raqamni ma'lumotlarini o'zgartirish yoki qo'shish" :
                           "O'chirish"
               }
            >
               {
                  modalType === "phone" ?
                     <PhoneForm
                        defaultValues={selectedPhone}
                        client_id={client_id}
                        setIsOpen={setIsOpen}
                        phones={phones}
                        setPhones={setPhones}
                     /> :
                     modalType === "address" ?
                        <AddressForm
                           defaultValues={selectedAddress}
                           client_id={client_id}
                           setIsOpen={setIsOpen}
                           addresses={addresses}
                           setAddresses={setAddresses}
                        /> :
                        modalType === "passport" ?
                           <PassportForm
                              defaultValues={selectedPassport}
                              client_id={client_id}
                              pinfl={data?.pinfl}
                              setIsOpen={setIsOpen}
                              passports={passports}
                              setPassports={setPassports}
                           /> :
                           <p>Test</p>
               }
            </Modal>
         }
      </React.Fragment>
   );
};
