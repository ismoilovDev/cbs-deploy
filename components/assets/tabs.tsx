'use client'

import React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"


type Props = {
   tabs: {
      title: string,
      url: string,
      icon: React.ReactNode
   }[]
}

export const CustomTabs = ({ tabs }: Props) => {
   const pathname = usePathname();

   return (
      <div className="border-b-2 overflow-x-auto overflow-y-hidden">
         <ul className="flex flex-nowrap -mb-px text-sm font-medium text-center text-gray-500 dark:text-gray-400">
            {tabs.map((tab, index) => {
               const isActive = pathname === tab.url;
               return (
                  <li key={index} className="me-2">
                     <Link
                        href={tab.url}
                        className={
                           cn("inline-flex flex-nowrap items-center justify-center p-4 border-b-2 border-transparent rounded-t-lg hover:text-indigo-800 hover:border-indigo-800 dark:hover:text-white dark:hover:border-white group",
                              isActive && "text-indigo-800 border-b-[3px] border-indigo-800 dark:text-white dark:border-white ")
                        }>
                        <span className="mr-2">
                           {tab.icon}
                        </span>
                        <span className="text-nowrap">
                           {tab.title}
                        </span>
                     </Link>
                  </li>
               )
            })}
         </ul>
      </div>
   )
}
