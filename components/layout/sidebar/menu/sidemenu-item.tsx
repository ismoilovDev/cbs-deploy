
import { ReactNode } from "react"
import {
   Accordion,
   AccordionContent,
   AccordionItem,
   AccordionTrigger,
} from "@/components/ui/accordion"
import Link from "next/link"
import { SidebarLink } from "./sidebar-link"

type Link = {
   content: string,
   path: string
}

type PropsType = {
   title: string,
   icon: ReactNode
   contents: Link[]
}

export function SidemenuItem({ details }: { details: PropsType }) {
   return (
      <Accordion type="single" collapsible className="w-full">
         <AccordionItem value="item-1" className="border-none data-[state=open]:shadow-none data-[state=open]:my-0">
            <AccordionTrigger className="data-[state=open]:bg-slate-100/80 data-[state=open]:font-medium dark:data-[state=open]:bg-gray-700 p-2 rounded">
               <div className="flex space-x-2 text-sm rounded">
                  <span className="flex items-center">
                     {details.icon}
                  </span>
                  <span className="block">
                     {details.title}
                  </span>
               </div>
            </AccordionTrigger>
            <AccordionContent className="data-[state=open]:border-none pl-4 py-0">
               <ul>
                  {details.contents.map((link, index) => (
                     <SidebarLink key={index} path={link.path} content={link.content} />
                  ))}
               </ul>
            </AccordionContent>
         </AccordionItem>
      </Accordion>
   )
}
