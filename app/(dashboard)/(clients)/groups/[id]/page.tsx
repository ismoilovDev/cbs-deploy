import React from 'react'
import { Metadata } from 'next';
import { auth } from '@/auth';
import { Link } from 'lucide-react';
import { GroupEditForm } from '@/components/group/group-edit-form';

export const metadata: Metadata = {
   title: {
      default: "Guruh haqida",
      template: "%s | Guruh haqida",
   },
};

async function getGroupDetails(id: string, token: string) {
   const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/groups/${id}`, {
      headers: {
         'Authorization': `Bearer ${token}`
      }
   });
   if (!response.ok) {
      throw new Error('Failed to fetch Group details');
   }
   return await response.json();
}

export default async function GroupSingle({
   params: { id },
}: {
   params: { id: string }
}) {
   const session = await auth();
   const { data } = await getGroupDetails(id, session?.user.token as string);

   if (!session?.user.token) {
      return <div>Iltimos Avtorizatsiyadan o'ting <Link href='/auth/login'>Login</Link></div>
   }

   return (
      <React.Fragment>
         <GroupEditForm defaultValues={data} btn_txt="O'zgartirish" />
      </React.Fragment>
   )
}