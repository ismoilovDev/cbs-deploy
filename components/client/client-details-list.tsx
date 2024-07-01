import { DetailItem } from './detail-item';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import ImageComponent from '../image/image-with-token';

export async function ClientDetailsList({ data }: { data: any }) {

   return (
      <div className='border-t-2 py-6'>
         <Accordion type="multiple" className="w-full">
            <AccordionItem value="item-1" className='border shadow-sm'>
               <AccordionTrigger className='px-4 font-semibold text-indigo-800 dark:text-foreground'>
                  <p>Asosiy</p>
               </AccordionTrigger>
               <AccordionContent>
                  <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-4 p-4">
                     <DetailItem title='Mijoz kodi' value={data.code} />
                     <DetailItem title='Familiyasi' value={data.surname} />
                     <DetailItem title='Ismi' value={data.firstname} />
                     <DetailItem title='Sharifi' value={data.lastname} />
                     <DetailItem title="Tug'ilgan sana" value={data.birth_date} />
                     <DetailItem title='Jinsi' value={data.gender} />
                     <DetailItem title='PINFL/JSHSHIR' value={data.pinfl} />
                  </div>
               </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2" className='border shadow-sm'>
               <AccordionTrigger className='px-4 font-semibold text-indigo-800 dark:text-foreground'>
                  <p>Mijoz haqida</p>
               </AccordionTrigger>
               <AccordionContent>
                  <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-4 p-4">
                     <DetailItem title='Filial' value={data.branch.name} />
                     <DetailItem title='Rezidentligi' value={data.is_resident ? "Ha" : "Yo'q"} />
                     <DetailItem title='Fuqarolik' value={data.nationality} />
                     <DetailItem title='Ish Joyi' value={data.job} />
                     <DetailItem title='Mijoz kiritilgan sana' value={data.open_date} />
                     <DetailItem title='Mijoz chiqarilgan sana' value={data.close_date} />
                  </div>
               </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3" className='border shadow-sm'>
               <AccordionTrigger className='px-4 font-semibold text-indigo-800 dark:text-foreground'>
                  <p>Telefon raqamlari</p>
               </AccordionTrigger>
               <AccordionContent>
                  {data.phones.map((phone: any, index: number) => (
                     <div key={phone.id} className='p-4'>
                        <div className="mb-4">
                           <p className='font-semibold text-base text-indigo-800 dark:text-foreground'>
                              {index + 1} - Telefon raqami
                           </p>
                        </div>
                        <div className="w-full grid grid-cols-1 lg:grid-cols-3 gap-4">
                           <DetailItem title='Egasi' value={phone.title} />
                           <DetailItem title='Nomer' value={phone.phone} />
                           <DetailItem title='Aktiv' value={phone.status ? "Ha" : "Yo'q"} />
                        </div>
                     </div>
                  ))}
               </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-4" className='border shadow-sm'>
               <AccordionTrigger className='px-4 font-semibold text-indigo-800 dark:text-foreground'>
                  <p>Yashash manzillari</p>
               </AccordionTrigger>
               <AccordionContent>
                  {data.addresses.map((address: any, index: number) => (
                     <div key={address.id} className='p-4'>
                        <div className="mb-4">
                           <p className='font-semibold text-base text-indigo-800 dark:text-foreground'>
                              {index + 1} - Yashash manzili
                           </p>
                        </div>
                        <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-4">
                           <DetailItem title='Viloyat/Respublika' value={address.region.name} />
                           <DetailItem title='Tuman' value={address.district.name} />
                           <DetailItem title='Manzil' value={address.address} />
                           <DetailItem title='Aktiv' value={address.status ? "Ha" : "Yo'q"} />
                        </div>
                     </div>
                  ))}
               </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-5" className='border shadow-sm'>
               <AccordionTrigger className='px-4 font-semibold text-indigo-800 dark:text-foreground'>
                  <p>Shaxsini tasdiqlovchi hujjatlari</p>
               </AccordionTrigger>
               <AccordionContent>
                  {data.passports.map((passport: any, index: number) => (
                     <div key={passport.id} className='p-4'>
                        <div className="mb-4">
                           <p className='font-semibold text-base text-indigo-800 dark:text-foreground'>
                              {index + 1} - Shaxsini tasdiqlovchi hujjati
                           </p>
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
               </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-6" className='border shadow-sm'>
               <AccordionTrigger className='px-4 font-semibold text-indigo-800 dark:text-foreground'>
                  <p>Mijoz rasmlari</p>
               </AccordionTrigger>
               <AccordionContent>
                  <div className="w-full grid grid-cols-1 lg:grid-cols-3 2xl:grid-cols-4 gap-4 p-4">
                     {
                        data.files.map((file: any) => (
                           <ImageComponent key={file.id} path={file.path} classes='w-full h-300' />
                        ))
                     }
                  </div>
               </AccordionContent>
            </AccordionItem>
         </Accordion>
      </div>
   )
}