'use client';

import {
   Tooltip,
   TooltipContent,
   TooltipProvider,
   TooltipTrigger,
} from "@/components/ui/tooltip"
import { toast } from "../ui/use-toast";
import ImageComponent from "../image/image-with-token";


export function ClientDetails({ data }: { data: any }) {

   function handleCopyClick(code: string) {
      const tempTextArea = document.createElement("textarea");
      tempTextArea.value = code;
      document.body.appendChild(tempTextArea);
      tempTextArea.select();
      document.execCommand('copy');
      document.body.removeChild(tempTextArea);
      toast({
         variant: "default",
         title: "Nusxalandi!",
         description: code,
      });
   }

   console.log(data.files)

   return (
      <div className="border-t-2 py-4">
         <div className="flex items-center">
            <h1 className="text-2xl font-semibold mr-3">
               {data.full_name}
            </h1>
            <TooltipProvider>
               <Tooltip>
                  <TooltipTrigger
                     onClick={() => handleCopyClick(data.code.toString())}
                     className="p-2 py-1 bg-indigo-600 dark:bg-foreground dark:text-default_text_color dark:font-semibold text-white rounded-sm text-xs cursor-pointer"
                  >
                     {data.code}
                  </TooltipTrigger>
                  <TooltipContent>
                     <p>Nusxalash uchun bosing!</p>
                  </TooltipContent>
               </Tooltip>
            </TooltipProvider>
         </div>
         <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 py-6">
            <div className="w-full col-span-1 flex justify-start lg:justify-center">
               <ImageComponent path={data.files[0].path} classes="w-56 h-[250px]" />
            </div>
            <div className="lg:col-span-2">
               <div className="details_list">
                  <div className="flex items-center mb-2">
                     <span className="basis-1/4 font-semibold text-indigo-700 dark:text-foreground">Tug'ilgan sana:</span>
                     <span className="basis-3/4">{data.birth_date}</span>
                  </div>
                  <div className="flex items-center mb-2">
                     <span className="basis-1/4 font-semibold text-indigo-700 dark:text-foreground">Ish lavozmi:</span>
                     <span className="basis-3/4">{data.job}</span>
                  </div>
                  <div className="flex items-center mb-2">
                     <span className="basis-1/4 font-semibold text-indigo-700 dark:text-foreground">PINFL:</span>
                     <span className="basis-3/4">{data.pinfl}</span>
                  </div>
                  <div className="flex mb-2">
                     <span className="basis-1/4 font-semibold text-indigo-700 dark:text-foreground">Hujjatlari:</span>
                     <span className="basis-3/4">
                        {data.passports.map((passport: any) => (
                           <span className="block mb-2" key={passport.id}>
                              {passport.series} {passport.number}
                           </span>
                        ))}
                     </span>
                  </div>
                  <div className="flex mb-2">
                     <span className="basis-1/4 font-semibold text-indigo-700 dark:text-foreground">Doimiy manzili:</span>
                     <span className="basis-3/4">
                        {data.addresses.map((address: any) => (
                           address.status &&
                           <span className="block mb-2" key={address.id}>
                              {address.region.name}, {address.district.name}, {address.address}
                           </span>
                        ))}
                     </span>
                  </div>
                  <div className="flex mb-2">
                     <span className="basis-1/4 font-semibold text-indigo-700 dark:text-foreground">Telefon raqamlari:</span>
                     <span className="basis-3/4">
                        {data.phones.map((phone: any) => (
                           (phone.status) &&
                           <span className="block mb-2" key={phone.id}>{phone.phone}</span>
                        ))}
                     </span>
                  </div>
               </div>
            </div>
         </div>
      </div>
   )
}