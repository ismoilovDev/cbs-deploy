"use client"

import { ColumnDef } from "@tanstack/react-table"
import { MoreHorizontal, SquarePen, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuItem,
   DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Link from "next/link"
import { TableTh } from "@/components/table/table-th"

export type ClientT = {
   id: string,
   code: number,
   full_name: string
   open_date: string,
   close_date: string,
   branch: object,
}

interface ColumnsProps {
   handleDelete: (id: string) => void;
}

export const columns = ({ handleDelete }: ColumnsProps): ColumnDef<ClientT>[] => [
   {
      accessorKey: "id",
      header: "#",
      cell: ({ row }) => {
         return <span>{row.index + 1}</span>
      }
   },
   {
      accessorKey: "name",
      header: ({ column }) => {
         return (
            <TableTh
               title="Nomi"
               column={column}
            />
         )
      }
   },
   {
      accessorKey: "code",
      header: ({ column }) => {
         return (
            <TableTh
               title="Kodi"
               column={column}
            />
         )
      },
   },
   {
      accessorKey: "branch.name",
      header: ({ column }) => {
         return (
            <TableTh
               title="Filial"
               column={column}
            />
         )
      },
   },
   {
      id: "actions",
      cell: ({ row }) => {
         const id = row.original.id

         return (
            <DropdownMenu>
               <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="h-8 w-8 p-0">
                     <MoreHorizontal className="h-4 w-4" />
                  </Button>
               </DropdownMenuTrigger>
               <DropdownMenuContent className="p-0" align="center">
                  <DropdownMenuItem>
                     <Link className="flex w-full h-full items-center text-xs/5" href={`/groups/${id}`}>
                        <SquarePen className="w-3" />
                        <span className="pl-2">Batafsil</span>
                     </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                     <Link className="flex w-full h-full items-center text-xs/5" href={`/groups/${id}`}>
                        <SquarePen className="w-3" />
                        <span className="pl-2">O'zgartirsh</span>
                     </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="text-xs/5" >
                     <Button
                        variant="ghost"
                        className="flex items-center justify-start h-auto w-full p-0 text-xs/5 font-normal"
                        onClick={() => handleDelete(id)}
                     >
                        <Trash2 className="w-3" />
                        <span className="pl-2">O'chirish</span>
                     </Button>
                  </DropdownMenuItem>
               </DropdownMenuContent>
            </DropdownMenu>
         )
      },
   }
]