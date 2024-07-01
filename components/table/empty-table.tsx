import React from "react";

import {
   ColumnDef,
   SortingState,
   flexRender,
   getCoreRowModel,
   getPaginationRowModel,
   getSortedRowModel,
   useReactTable,
} from "@tanstack/react-table";

import {
   Table,
   TableBody,
   TableCell,
   TableHead,
   TableHeader,
   TableRow,
} from "@/components/ui/table";
import { RotateCw, TriangleAlert } from "lucide-react";
import { Button } from "../ui/button";


interface DataTableProps<TData, TValue> {
   columns: ColumnDef<TData, TValue>[],
   refetchHandler: () => void
}

export function EmptyTable<TData, TValue>({
   columns,
   refetchHandler
}: DataTableProps<TData, TValue>) {
   const [sorting, setSorting] = React.useState<SortingState>([])
   const data: any = []

   const table = useReactTable({
      data,
      columns,
      getCoreRowModel: getCoreRowModel(),
      getPaginationRowModel: getPaginationRowModel(),
      onSortingChange: setSorting,
      getSortedRowModel: getSortedRowModel(),
      state: {
         sorting,
      },
   })

   return (
      <div className="rounded-md border">
         <Table>
            <TableHeader>
               {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id}>
                     {headerGroup.headers.map((header) => {
                        return (
                           <TableHead key={header.id} className="h-16 sm:h-14 bg-muted hover:bg-slate-200 dark:bg-darkcontainer dark:text-white text-black" >
                              {header.isPlaceholder
                                 ? null
                                 : flexRender(
                                    header.column.columnDef.header,
                                    header.getContext()
                                 )}
                           </TableHead>
                        )
                     })}
                  </TableRow>
               ))}
            </TableHeader>
            <TableBody>
               <TableRow>
                  <TableCell colSpan={table.getHeaderGroups()[0].headers.length} >
                     <div className="w-full flex items-center justify-center flex-col">
                        <span className="p-2">
                           <TriangleAlert className="block text-red-800 w-8" />
                        </span>
                        <span>Ma'lumotlar yuklanmadi.</span>
                        <Button className="mt-4 flex" onClick={() => refetchHandler()}>
                           <span>
                              <RotateCw className="w-4 mr-2" />
                           </span>
                           <span>
                              Qayta yuklash
                           </span>
                        </Button>
                     </div>
                  </TableCell>
               </TableRow>
            </TableBody>
         </Table>
      </div>
   )
}
