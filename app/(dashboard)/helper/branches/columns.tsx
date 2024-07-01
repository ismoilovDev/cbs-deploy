"use client"

import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, MoreHorizontal, SquarePen, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuItem,
   DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

export type Payment = {
   id: number
   short_name: string
   address: string
   city: string
}

export const columns: ColumnDef<Payment>[] = [
   {
      accessorKey: "idx",
      header: "",
      cell: ({ row }) => {
         return <span>{row.index + 1}</span>
      }
   },
   {
      accessorKey: "short_name",
      header: ({ column }) => {
         return (
            <Button
               variant="ghost"
               onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
               Nomi
               <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
         )
      },
   },
   {
      accessorKey: "address",
      header: "Manzil"
   },
   {
      accessorKey: "city",
      header: "Kod"
   },
   {
      accessorKey: "actions",
      cell: ({ row }) => {
         const payment = row.original

         return (
            <DropdownMenu>
               <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="h-8 w-8 p-0">
                     <span className="sr-only">Open menu</span>
                     <MoreHorizontal className="h-4 w-4" />
                  </Button>
               </DropdownMenuTrigger>
               <DropdownMenuContent className="p-0" align="center">
                  <DropdownMenuItem>
                     <Link className="flex items-center text-xs/5" href={`/helper/branches/edit`}>
                        <SquarePen className="w-3" />
                        <span className="pl-2">O'zgartirsh</span>
                     </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="text-xs/5" >
                     <Trash2 className="w-3" />
                     <span className="pl-2">O'chirish</span>
                  </DropdownMenuItem>
               </DropdownMenuContent>
            </DropdownMenu>
         )
      },
   }
]
