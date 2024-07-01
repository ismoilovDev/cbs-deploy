import React from 'react'
import { Metadata } from 'next';
import { BarChart3, CircleUserRound, Container, CreditCard, FileBadge, HandCoins, Mail, NotebookTabs, ReceiptText, Vault } from 'lucide-react'
import { CustomTabs } from '@/components/assets/tabs';
import ContentCard from '@/components/layout/content/content-card';

export const metadata: Metadata = {
   title: {
      default: "Mijoz Tafsilotlari",
      template: "%s | Mijoz Tafsilotlari",
   },
};

export default async function Layout({
   children,
   params: { id },
}: Readonly<{
   children: React.ReactNode;
   params: { id: string };
}>) {

   const tabs = [
      { title: 'Guruh haqida', url: `/groups/${id}`, icon: <CircleUserRound className='w-4' /> },
      { title: 'A\'zolar', url: `/groups/${id}/members`, icon: <Container className='w-4' /> },
      { title: 'Buyurtmalar', url: `/groups/${id}/orders`, icon: <CreditCard className='w-4' /> },
      { title: 'Hujjatlar', url: `/groups/${id}/documents`, icon: <ReceiptText className='w-4' /> },
      { title: 'Shartnomalar', url: `/groups/${id}/contracts`, icon: <NotebookTabs className='w-4' /> },
      { title: 'To\'lovlar', url: `/groups/${id}/payments`, icon: <HandCoins className='w-4' /> },
      { title: 'Fayllar', url: `/groups/${id}/files`, icon: <FileBadge className='w-4' /> },
      { title: 'Xabarlar', url: `/groups/${id}/messeges`, icon: <Mail className='w-4' /> },
   ]

   return (
      <div className='mx-auto mt-5'>
         <ContentCard classes='pt-2'>
            <CustomTabs tabs={tabs} />
            {children}
         </ContentCard>
      </div>
   )
}
