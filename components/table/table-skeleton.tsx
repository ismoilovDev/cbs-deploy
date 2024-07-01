import React, { useMemo } from "react";
import {
   Table,
   TableBody,
   TableCell,
   TableHead,
   TableHeader,
   TableRow,
} from "@/components/ui/table";
import { Skeleton } from "../ui/skeleton";


export function DataTableSkeleton() {
   const skeletonRows = useMemo(() => Array(4).fill(null), []);

   return (
      <div className="rounded-md border">
         <Table>
            <TableHeader>
               <TableRow>
                  <TableHead className="h-16 sm:h-14 bg-container dark:bg-darkcontainer">
                     <Table>
                        <TableHeader>
                           <TableRow className="border-none">
                              {skeletonRows.map((_, index) => (
                                 <TableHead key={index}>
                                    <Skeleton className="h-4 bg-gray-200 dark:bg-muted w-full" />
                                 </TableHead>
                              ))}
                           </TableRow>
                        </TableHeader>
                     </Table>
                  </TableHead>
               </TableRow>
            </TableHeader>
            <TableBody>
               {skeletonRows.map((_, index) => (
                  <TableRow key={index} className="cursor-pointer">
                     <TableCell>
                        <Skeleton className="h-4 w-full" />
                     </TableCell>
                  </TableRow>
               ))}
            </TableBody>
         </Table>
      </div>
   )
}