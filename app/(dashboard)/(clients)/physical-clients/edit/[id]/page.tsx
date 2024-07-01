"use client"

import React from 'react'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { EditForm } from '@/components/client/edit-form'
import { BaseApi } from '@/app/api/[...nextauth]/route'
import { useTitle } from '@/app/hooks/use-meta-title'
import ContentCard from '@/components/layout/content/content-card'
import Title from '@/components/title/title'

async function getClientDetails(id: string) {
   try {
      const response = await BaseApi(`/clients/${id}`)
      return response.data.data
   }
   catch (error: any) {
      throw new Error(error.message);
   }

}

export default function AddClient({
   params: { id },
}: {
   params: { id: string }
}) {
   const queryClient = useQueryClient()
   useTitle("Mijozni yangilash");

   const { data, isLoading, isError, refetch } = useQuery({
      queryKey: ['client', id],
      queryFn: () => getClientDetails(id),
   })

   if (isLoading) {
      return <div>Loading...</div>
   }

   if (isError) {
      return <div>Error</div>
   }

   console.log(data)
   const defaultValues: any = {
      ...data,
      "branch_id": data?.branch?.id,
   }


   return (
      <>
         <div className='mx-auto py-10'>
            <Title>Mijozni yangilash</Title>
            <ContentCard>
               <EditForm client_id={id} data={defaultValues} btn_txt="O'zgartirish" />
            </ContentCard>
         </div>
      </>
   )
}
