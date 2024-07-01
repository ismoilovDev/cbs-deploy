import React from 'react'
import Head from 'next/head'
import { UserType } from '@/types'
import { UserForm } from '@/components/users/user-form'
import Title from '@/components/title/title'
import ContentCard from '@/components/layout/content/content-card'

export default async function UpdateUser() {

   const defaultValues: UserType = {
      name: "Abbos",
      email: "a@mail.uz",
      password: "54848fd4df"
   }

   return (
      <>
         <Head>
            <title>User Update</title>
         </Head>
         <div className='mx-auto py-10'>
            <Title>Foydalanuvchini yangilash</Title>
            <ContentCard>
               <UserForm defaultValues={defaultValues} btn_txt="O'zgartirish" />
            </ContentCard>
         </div>
      </>
   )
}
