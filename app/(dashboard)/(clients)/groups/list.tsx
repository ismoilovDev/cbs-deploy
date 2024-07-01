"use client"

import { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { DataTable } from "@/components/table/data-table"
import { EmptyTable } from "@/components/table/empty-table";
import { columns as createColumns } from "./columns"
import { GroupListType, PaginationType } from "@/types";
import { BaseApi } from "@/app/api/[...nextauth]/base-api";
import { deleteRequest } from "@/actions/delete";

interface GroupsPromise {
   data: GroupListType[];
   paginate: PaginationType;
}

interface TableProps {
   search: string;
   page: number;
   from_created_at: string;
   to_created_at: string;
   limit: number;
}

async function getData(query: string): Promise<GroupsPromise> {
   try {
      const response = await BaseApi.get<GroupsPromise>(`/groups${query}`);
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
   const search = `?search=${queries.search}&page=${queries.page}&limit=${queries.limit}`

   const { data, isError, refetch } = useQuery({
      queryKey: ['groups', search],
      queryFn: () => getData(search),
      enabled: !!search
   })

   useEffect(() => {
      setTotalPages(data?.paginate.total_pages as number)
   }, [data])

   const deleteMuatation = useMutation({
      mutationFn: deleteRequest,
      onSuccess: () => {
         queryClient.invalidateQueries({ queryKey: ['groups'] })
      }
   });

   const handleDelete = (id: string) => {
      deleteMuatation.mutate(`/groups/${id}`)
   }

   const columns = createColumns({ handleDelete });

   if (isError) {
      return <EmptyTable columns={columns} refetchHandler={refetch} />;
   }

   return <DataTable columns={columns} data={data?.data || []} totalPages={totalPages} single_path="/physical-clients" />
}