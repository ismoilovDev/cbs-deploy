import { ReactNode } from "react";
import NextBreadcrumb from "@/components/assets/breadcrumb";

export function Container({ children }: { children: ReactNode }) {
   return (
      <div id="app-container" className='relative w-full h-[calc(100vh-6rem)] top-16 bottom-8 overflow-y-auto p-4 bg-container dark:bg-darkcontainer sm:p-7'>
         <div className="min-h-full">
            <NextBreadcrumb capitalizeLinks />
            {children}
         </div>
      </div>
   )
}