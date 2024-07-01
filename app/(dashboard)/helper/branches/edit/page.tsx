import React from 'react'
import Head from 'next/head'
import ContentCard from '@/components/layout/content/content-card'
import { UserForm } from '@/components/users/user-form'
import Title from '@/components/title/title'
import { BranchType } from '@/types'
import { BranchForm } from '@/components/branches/branch-form'



export default function CreateBranch() {

   const defaultValues: BranchType = {
      name: '"Renesans Mikromoliya Tashkiloti" MChJ Chirchiq filiali',
      short_name: "Chirchiq filiali",
      code: 10,
      contract: "Filial Nizomiga ko‘ra Ishonchnoma",
      committee: "Kredit Komissiyasi",
      address: "Toshkent viloyati, Chirchiq shahri, A.Navoiy shoh ko‘chasi, 192-uy, 5-xonadon.",
      bank_details: "H/r 20 216 000 904 636 656 005 MFO 00973 ATB Universal Bank Toshkent filiali",
      itn: "STIR 300 515 648 OKED 64920",
      phone: ['+99893 111 12 13'],
      city: "Chirchiq shahar",
      judge: "Fuqarolik ishlari bo‘yicha Mirobod tumanlararo Sudi",
      limit: 100_000_000,
   }

   return (
      <>
         <Head>
            <title>Branch Create</title>
         </Head>
         <div className='mx-auto py-10'>
            <Title>Filialni o'zgartirish</Title>
            <ContentCard>
               <BranchForm defaultValues={defaultValues} btn_txt="Kiritish" />
            </ContentCard>
         </div>
      </>
   )
}
