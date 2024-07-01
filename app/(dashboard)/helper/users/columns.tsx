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

export type Users = {
   id: string
   username: string
   email: string,
   is_email_verified: boolean
}

interface ColumnsProps {
   handleDelete: (id: string) => void;
}

export const columns = ({ handleDelete }: ColumnsProps): ColumnDef<Users>[] => [
   {
      accessorKey: "id",
      header: "",
      cell: ({ row }) => {
         return <span>{row.index + 1}</span>
      }
   },
   {
      accessorKey: "username",
      header: ({ column }) => {
         return (
            <Button
               variant="ghost"
               onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
               Ism
               <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
         )
      },
   },
   {
      accessorKey: "email",
      header: ({ column }) => {
         return (
            <Button
               variant="ghost"
               onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
               Email
               <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
         )
      },
   },
   {
      id: "is_email_verified",
      header: "Email tasdiqlangan",
      cell: ({ row }) => {
         const is_email_verified = row.original.is_email_verified
         return (
            <Badge variant={is_email_verified ? "secondary" : "destructive"}>{is_email_verified ? "Tasdiqlangan" : "Tasdiqlanmagan"}</Badge>
         )
      }
   },
   {
      id: "actions",
      cell: ({ row }) => {
         const id = row.original.id

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
                     <Link className="flex items-center text-xs/5" href={`/helper/users/${id}`}>
                        <SquarePen className="w-3" />
                        <span className="pl-2">Batafsil</span>
                     </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                     <Link className="flex items-center text-xs/5" href={`/helper/users/edit`}>
                        <SquarePen className="w-3" />
                        <span className="pl-2">O'zgartirsh</span>
                     </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="text-xs/5" >
                     <Button
                        variant="ghost"
                        className="flex items-center h-auto w-auto"
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
