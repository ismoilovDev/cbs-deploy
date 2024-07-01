import { FilePenLine, FilePlus, Printer, Send } from "lucide-react";
import {
   Menubar,
   MenubarContent,
   MenubarItem,
   MenubarMenu,
   MenubarTrigger,
} from "@/components/ui/menubar"
import Link from "next/link";

export async function ClientControlBtns() {
   return (
      <div className="flex flex-wrap gap-3 my-4">
         <Link className="h-9 inline-flex space-x-2 items-center px-3 bg-indigo-600 rounded text-white" href="/clients/edit">
            <span>
               <FilePenLine className="w-4" />
            </span>
            <span className="inline-flex items-center justify-center pl-2 h-full text-xs border-l-2">
               O'zgartirish
            </span>
         </Link>
         <Menubar className="p-0 h-9">
            <MenubarMenu>
               <MenubarTrigger className="h-9 inline-flex space-x-2 items-center py-0 px-3 border-none bg-lime-700 rounded text-white">
                  <span>
                     <FilePlus className="w-4" />
                  </span>
                  <span className="inline-flex items-center justify-center pl-2 h-full text-xs border-l-2">
                     Qo'shish
                  </span>
               </MenubarTrigger>
               <MenubarContent>
                  <MenubarItem>
                     <Link href="/clients/edit">Ta'minot qo'shish</Link>
                  </MenubarItem>
                  <MenubarItem>
                     <Link href="/clients/edit">Buyurtma qo'shish</Link>
                  </MenubarItem>
                  <MenubarItem>
                     <Link href="/clients/edit">Shartnoma qo'shish</Link>
                  </MenubarItem>
                  <MenubarItem>
                     <Link href="/clients/edit">Monitoring qilish</Link>
                  </MenubarItem>
               </MenubarContent>
            </MenubarMenu>
         </Menubar>
         <Menubar className="p-0 h-9">
            <MenubarMenu>
               <MenubarTrigger className="h-9 inline-flex space-x-2 items-center py-0 px-3 border-none bg-slate-500 rounded text-white">
                  <span>
                     <Printer className="w-4" />
                  </span>
                  <span className="inline-flex items-center justify-center pl-2 h-full text-xs border-l-2">
                     Chop etish
                  </span>
               </MenubarTrigger>
               <MenubarContent>
                  <MenubarItem>
                     <Link href="/clients/edit">Passport ma'lumotlari</Link>
                  </MenubarItem>
                  <MenubarItem>
                     <Link href="/clients/edit">Boshqa...</Link>
                  </MenubarItem>
               </MenubarContent>
            </MenubarMenu>
         </Menubar>
         <Link className="h-9 inline-flex space-x-2 items-center px-3 bg-violet-600 rounded text-white" href="/clients/edit">
            <span>
               <Send className="w-4" />
            </span>
            <span className="inline-flex items-center justify-center pl-2 h-full text-xs border-l-2">
               Xabar jo'natish
            </span>
         </Link>
      </div>
   )
}