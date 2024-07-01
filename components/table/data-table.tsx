'use client'

import React from "react";
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import {
   ColumnDef,
   SortingState,
   PaginationState,
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
import Pagination from "./data-pagination";


interface DataTableProps<TData, TValue> {
   columns: ColumnDef<TData, TValue>[];
   data: TData[];
   single_path: string;
   totalPages: number;
}

export function DataTable<TData, TValue>({
   columns,
   data,
   single_path,
   totalPages
}: DataTableProps<TData, TValue>) {
   const router = useRouter()
   const pathname = usePathname();
   const searchParams = useSearchParams();
   const [sorting, setSorting] = React.useState<SortingState>([])
   const [pagination, setPagination] = React.useState<PaginationState>({
      pageIndex: 1,
      pageSize: 10,
   });

   const table = useReactTable({
      data,
      columns,
      getCoreRowModel: getCoreRowModel(),
      getPaginationRowModel: getPaginationRowModel(),
      onSortingChange: setSorting,
      onPaginationChange: setPagination,
      getSortedRowModel: getSortedRowModel(),
      state: {
         sorting,
         pagination
      },
   })

   return (
      <div>
         <div className="rounded-md border">
            <Table>
               <TableHeader>
                  {table.getHeaderGroups().map((headerGroup) => (
                     <TableRow key={headerGroup.id}>
                        {headerGroup.headers.map((header) => {
                           return (
                              <TableHead key={header.id} className="h-16 sm:h-14 bg-muted hover:dark:bg-slate-800 hover:bg-slate-200 dark:bg-darkcontainer dark:text-white text-black" >
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
                  {table.getRowModel().rows?.length ? (
                     table.getRowModel().rows.map((row) => (
                        <TableRow
                           key={row.id}
                           className="cursor-pointer"
                           data-state={row.getIsSelected() && "selected"}
                           onDoubleClick={() => router.push(`${single_path}/${(row.original as { id?: string }).id?.toString()}`)}
                        >
                           {row.getVisibleCells().map((cell) => (
                              <TableCell key={cell.id} >
                                 {flexRender(cell.column.columnDef.cell, cell.getContext())}
                              </TableCell>
                           ))}
                        </TableRow>
                     ))
                  ) : (
                     <TableRow>
                        <TableCell colSpan={columns.length} className="h-24 text-center">
                           Ma'lumotlar mavjud emas.
                        </TableCell>
                     </TableRow>
                  )}
               </TableBody>
            </Table>
         </div>
         <Pagination table={table} totalPages={totalPages} />
      </div>
   )
}
