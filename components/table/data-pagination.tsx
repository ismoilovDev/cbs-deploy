'use client';


import {
   Select,
   SelectContent,
   SelectGroup,
   SelectItem,
   SelectTrigger,
   SelectValue,
} from "@/components/ui/select"

import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { usePathname, useSearchParams, useRouter } from 'next/navigation';

export default function Pagination({ totalPages, table }: { totalPages: number, table: any }) {
   const { replace } = useRouter();
   const pathname = usePathname();
   const searchParams = useSearchParams();
   const currentPage = Number(searchParams.get('page')) || 1;

   const createPageURL = (pageNumber: number | string) => {
      const params = new URLSearchParams(searchParams);
      params.set('page', pageNumber.toString());
      return `${pathname}?${params.toString()}`;
   };

   const handelShowItemSize = (value: string) => {
      const params = new URLSearchParams(searchParams);
      if (value) {
         params.set('limit', value.toString());
         table.setPageSize(Number(value))
      } else {
         params.delete('limit');
      }
      replace(`${pathname}?${params.toString()}`);
   }

   return (
      <div className="flex items-center justify-end space-x-2 py-4">
         <Select
            value={table.getState().pagination.pageSize.toString()}
            onValueChange={(value: string) => handelShowItemSize(value)}
         >
            <SelectTrigger className="w-16">
               <SelectValue placeholder="" />
            </SelectTrigger>
            <SelectContent>
               <SelectGroup>
                  {
                     ["5", "10", "15", "20", "25", "30"].map((item) => (
                        <SelectItem key={item} value={item}>{item}</SelectItem>
                     ))
                  }
               </SelectGroup>
            </SelectContent>
         </Select>
         <Button
            variant="outline"
            size="sm"
         // onClick={() => table.previousPage()}
         // disabled={!table.getCanPreviousPage()}
         >
            <ChevronLeft />
         </Button>
         <Button
            variant="outline"
            size="sm"
         // onClick={() => table.nextPage()}
         // disabled={!table.getCanNextPage()}
         >
            <ChevronRight />
         </Button>
      </div>
   )
}