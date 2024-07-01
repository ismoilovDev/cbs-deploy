'use client'

import React, { useCallback } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useTitle } from "@/app/hooks/use-meta-title";
import ContentHeader from "@/components/layout/content/content-header"
import ContentCard from "@/components/layout/content/content-card";
import { DataTableSkeleton } from "@/components/table/table-skeleton";
import { EmptyTable } from "@/components/table/empty-table";
import { DataTable } from "@/components/table/data-table";
import { BaseApi } from "@/app/api/[...nextauth]/route";
import { columns as createColumns } from "./columns"
import { deleteRequest } from "@/actions/delete";
import { ClientListType } from "@/types";
import { Filters } from "./filters";

interface ClientPromise {
   data: ClientListType[]
}

async function getData(): Promise<ClientListType[]> {
   try {
      const response = await BaseApi.get<ClientPromise>('/clients');
      return response.data.data;
   } catch (error: any) {
      throw new Error(error.message);
   }
}

export default function JuridicalClients() {
   const queryClient = useQueryClient()
   useTitle("Yuridik shaxslar");

   const { data, isLoading, isError, refetch } = useQuery({
      queryKey: ['clients'],
      queryFn: getData,
   })

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

   const renderContent = useCallback(() => {
      if (isLoading) {
         return <DataTableSkeleton />;
      }
      if (isError) {
         return <EmptyTable columns={columns} refetchHandler={refetch} />;
      }
      return <DataTable columns={columns} data={[]} single_path="/physical-clients" />;
   }, [isLoading, isError, data, refetch]);

   return (
      <React.Fragment>
         <div className="mx-auto py-10">
            <ContentHeader title="Yuridik shaxslar" navigate="/physical-clients/add" />
            <Filters />
            <ContentCard>
               {renderContent()}
            </ContentCard>
         </div>
      </React.Fragment>
   )
}
