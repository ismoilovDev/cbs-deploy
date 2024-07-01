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

// export const columns: ColumnDef<Client>[] = [
//    {
//       accessorKey: "idx",
//       header: "",
//       cell: ({ row }) => {
//          return <span>{row.index + 1}</span>
//       }
//    },
//    {
//       accessorKey: "name",
//       header: ({ column }) => {
//          return (
//             <Button
//                variant="ghost"
//                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
//             >
//                F.I.SH
//                <ArrowUpDown className="ml-2 h-4 w-4" />
//             </Button>
//          )
//       },
//    },
//    {
//       accessorKey: "pinfl",
//       header: "Pinfl",
//    },
//    {
//       accessorKey: "city",
//       header: "Shahar",
//       cell: ({ row }) => {
//          const status = row.original.district.name_uz
//          return (
//             <span>{status}</span>
//          )
//       }
//    },
//    {
//       id: "actions",
//       cell: ({ row }) => {
//          const payment = row.original

//          return (
//             <DropdownMenu>
//                <DropdownMenuTrigger asChild>
//                   <Button variant="ghost" className="h-8 w-8 p-0">
//                      <span className="sr-only">Open menu</span>
//                      <MoreHorizontal className="h-4 w-4" />
//                   </Button>
//                </DropdownMenuTrigger>
//                <DropdownMenuContent className="p-0" align="center">
//                   <DropdownMenuItem>
//                      <Link className="flex items-center text-xs/5" href={`/helper/users/edit`}>
//                         <SquarePen className="w-3" />
//                         <span className="pl-2">O'zgartirsh</span>
//                      </Link>
//                   </DropdownMenuItem>
//                   <DropdownMenuItem className="text-xs/5" >
//                      <Trash2 className="w-3" />
//                      <span className="pl-2">O'chirish</span>
//                   </DropdownMenuItem>
//                </DropdownMenuContent>
//             </DropdownMenu>
//          )
//       },
//    }
// ]

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
      accessorKey: "full_name",
      header: ({ column }) => {
         return (
            <TableTh
               title="F.I.SH"
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
      accessorKey: "open_date",
      header: ({ column }) => {
         return (
            <TableTh
               title="Kiritilgan sana"
               column={column}
            />
         )
      },
   },
   {
      accessorKey: "close_date",
      header: ({ column }) => {
         return (
            <TableTh
               title="Chiqarilgan sana"
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
                     <span className="sr-only">Menu</span>
                     <MoreHorizontal className="h-4 w-4" />
                  </Button>
               </DropdownMenuTrigger>
               <DropdownMenuContent className="p-0" align="center">
                  <DropdownMenuItem>
                     <Link className="flex w-full h-full items-center text-xs/5" href={`/physical-clients/${id}`}>
                        <SquarePen className="w-3" />
                        <span className="pl-2">Batafsil</span>
                     </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                     <Link className="flex w-full h-full items-center text-xs/5" href={`/physical-clients/edit/${id}`}>
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