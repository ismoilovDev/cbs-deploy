import React from 'react'
import { Metadata } from 'next';
import { auth } from '@/auth';
import { Link } from 'lucide-react';
import { ClientControlBtns } from '@/components/client/client-control-btns';
import { ClientDetails } from '@/components/client/client-details';
import { ClientDetailsList } from '@/components/client/client-details-list';

export const metadata: Metadata = {
   title: {
      default: "Mijoz Haqida",
      template: "%s | Mijoz Haqida",
   },
};

async function getClientDetails(id: string, token: string) {
   const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/clients/${id}`, {
      headers: {
         'Authorization': `Bearer ${token}`
      }
   });
   if (!response.ok) {
      throw new Error('Failed to fetch client details');
   }
   return await response.json();
}

export default async function ClientSingle({
   params: { id },
}: {
   params: { id: string }
}) {
   const session = await auth();
   const data = await getClientDetails(id, session?.user.token as string);

   if (!session?.user.token) {
      return <div>Iltimos Avtorizatsiyadan o'ting <Link href='/auth/login'>Login</Link></div>
   }

   return (
      <React.Fragment>
         <ClientControlBtns />
         <ClientDetails data={data.data} />
         <ClientDetailsList data={data.data} />
      </React.Fragment>
   )
}