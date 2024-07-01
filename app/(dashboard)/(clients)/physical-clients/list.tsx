"use client"

import { DataTable } from "@/components/table/data-table"
import { columns as createColumns } from "./columns"
import { ClientListType } from "@/types";
import { BaseApi } from "@/app/api/[...nextauth]/route";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteRequest } from "@/actions/delete";
import { EmptyTable } from "@/components/table/empty-table";
import { useEffect, useState } from "react";

interface ClientPromise {
   data: ClientListType[]
   paginate: any
}

interface TableProps {
   search: string;
   gender: string;
   region: string;
   district: string;
   date: string;
   page: number;
   limit: number;
}

async function getData(query: string): Promise<ClientPromise> {
   try {
      const response = await BaseApi.get<ClientPromise>(`/clients${query}`);
      return response.data;
   } catch (error: any) {
      throw new Error(error.message);
   }
}

export function Table({
   queries
}: {
   queries: TableProps
}) {
   const queryClient = useQueryClient()
   const [totalPages, setTotalPages] = useState<number>(1)
   const search = `?search=${queries.search}&gender=${queries.gender}&page=${queries.page}&limit=${queries.limit}`

   const { data, isError, refetch } = useQuery({
      queryKey: ['clients', search],
      queryFn: () => getData(search),
      enabled: !!search
   })

   useEffect(() => {
      setTotalPages(data?.paginate.total_pages)
   }, [data])

   const deleteMuatation = useMutation({
      mutationFn: deleteRequest,
      onSuccess: () => {
         queryClient.invalidateQueries({ queryKey: ['clients'] })
      }
   });

   const handleDelete = (id: string) => {
      deleteMuatation.mutate(`/clients/${id}`)
   }

   const columns = createColumns({ handleDelete });

   if (isError) {
      return <EmptyTable columns={columns} refetchHandler={refetch} />;
   }

   return <DataTable columns={columns} data={data?.data || []} totalPages={totalPages} single_path="/physical-clients" />
}