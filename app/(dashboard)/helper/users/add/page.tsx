import React from 'react'
import Head from 'next/head'
import ContentCard from '@/components/layout/content/content-card'
import { UserForm } from '@/components/users/user-form'
import Title from '@/components/title/title'
import { UserType } from '@/types'



export default function CreateUser() {

   const defaultValues: UserType = {
      name: "",
      email: "",
      password: ""
   }

   return (
      <>
         <Head>
            <title>User Create</title>
         </Head>
         <div className='mx-auto py-10'>
            <Title>Foydalanuvchi qo'shish</Title>
            <ContentCard>
               <UserForm defaultValues={defaultValues} btn_txt="Kiritish" />
            </ContentCard>
         </div>
      </>
   )
}
