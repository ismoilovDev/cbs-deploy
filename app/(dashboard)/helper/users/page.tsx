'use client'

import ContentHeader from "@/components/layout/content/content-header"
import ContentCard from "@/components/layout/content/content-card"
import { DataTable } from "@/components/table/data-table"
import { BaseApi } from "@/app/api/[...nextauth]/route"
import { useQuery } from '@tanstack/react-query'
import { Users, columns } from "./columns"

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


   return (
      <div className="mx-auto py-10">
         <ContentHeader title="Foydalanuvchilar" navigate="/helper/users/add" />
         <ContentCard>
            <DataTable columns={columns} data={data} />
         </ContentCard>
      </div>
   )
}

export const handleDelete = async (id: string) => {
   try {
      await BaseApi.delete(`/clients/${id}`);
   } catch (error: any) {
      throw new Error(error.message);
   }
}