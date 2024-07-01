'use client'

import React from 'react'
import { usePathname } from 'next/navigation'
import {
   Breadcrumb,
   BreadcrumbItem,
   BreadcrumbLink,
   BreadcrumbList,
   BreadcrumbPage,
   BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { ChevronRight, Slash } from "lucide-react"
import Link from 'next/link'

type TBreadCrumbProps = {
   capitalizeLinks?: boolean
}

const NextBreadcrumb = ({ capitalizeLinks }: TBreadCrumbProps) => {

   const paths = usePathname()
   const pathNames = paths.split('/').filter(path => path)
   const currentPath = document.title

   return (
      <Breadcrumb>
         <BreadcrumbList className='text-gray-700 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-800 dark:border-gray-700 p-2'>
            {!(pathNames.length === 0) && <BreadcrumbItem><BreadcrumbLink href={'/'}>Asosiy</BreadcrumbLink></BreadcrumbItem>}
            {pathNames.length > 0 &&
               <BreadcrumbSeparator>
                  <ChevronRight />
               </BreadcrumbSeparator>
            }
            {
               pathNames.map((link, index) => {
                  let href = `/${pathNames.slice(0, index + 1).join('/')}`
                  let itemLink = capitalizeLinks ? link[0].toUpperCase() + link.slice(1, link.length) : link
                  return (
                     <React.Fragment key={index}>
                        <BreadcrumbItem>
                           {
                              pathNames.length === index + 1 ?
                                 <BreadcrumbPage>{itemLink}</BreadcrumbPage> :
                                 <Link href={href}>{itemLink}</Link>
                           }
                        </BreadcrumbItem>
                        {pathNames.length !== index + 1 &&
                           <BreadcrumbSeparator>
                              <ChevronRight />
                           </BreadcrumbSeparator>
                        }
                     </React.Fragment>
                  )
               })
            }
         </BreadcrumbList>
      </Breadcrumb>
   )
}

export default NextBreadcrumb