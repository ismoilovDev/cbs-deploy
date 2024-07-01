'use client'

import ContentHeader from "@/components/layout/content/content-header"
import ContentCard from "@/components/layout/content/content-card"
import { DataTable } from "@/components/table/data-table"
import { BaseApi } from "@/app/api/[...nextauth]/route"
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Users, columns as createColumns } from "./columns"
import { deleteRequest } from "@/actions/delete"

interface UsersPromise {
   data: Users[]
}

async function getData(): Promise<Users[]> {
   try {
      const { data } = await BaseApi.get<UsersPromise>('/users');
      return data.data;
   } catch (error: any) {
      throw new Error(error.message);
   }
}


export default function UsersPage() {
   const queryClient = useQueryClient()

   const { data, isLoading, isError } = useQuery({
      queryKey: ['users'],
      queryFn: getData,
   })

   if (isLoading) {
      return <div>Loading...</div>;
   }

   if (isError) {
      return <div>Error fetching user data</div>;
   }

   if (!data) {
      return <div>No data available</div>;
   }

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

   return (
      <div className="mx-auto py-10">
         <ContentHeader title="Foydalanuvchilar" navigate="/helper/users/add" />
         <ContentCard>
            <DataTable columns={columns} data={data} />
         </ContentCard>
      </div>
   )
}
