import React from 'react'
import Head from 'next/head'
import Title from '@/components/title/title'
import ContentCard from '@/components/layout/content/content-card'
import { BranchType } from '@/types'
import { BranchForm } from '@/components/branches/branch-form'



export default function CreateBranch() {

   const defaultValues: BranchType = {
      name: "",
      short_name: "",
      code: 0,
      committee: "",
      contract: "",
      address: "",
      bank_details: "",
      itn: "",
      phone: ['+99893 111 12 13'],
      city: "",
      judge: "",
      limit: 0,
   }

   return (
      <>
         <Head>
            <title>Branch Create</title>
         </Head>
         <div className='mx-auto py-10'>
            <Title>Filial qo'shish</Title>
            <ContentCard>
               <BranchForm defaultValues={defaultValues} btn_txt="Kiritish" />
            </ContentCard>
         </div>
      </>
   )
}
