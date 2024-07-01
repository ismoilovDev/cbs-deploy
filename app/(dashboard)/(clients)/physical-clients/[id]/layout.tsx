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
      { title: 'Mijoz haqida', url: `/physical-clients/${id}`, icon: <CircleUserRound className='w-4' /> },
      { title: 'Ta\'minotlar', url: `/physical-clients/${id}/supplies`, icon: <Container className='w-4' /> },
      { title: 'Buyurtmalar', url: `/physical-clients/${id}/orders`, icon: <CreditCard className='w-4' /> },
      { title: 'Shartnoma', url: `/physical-clients/${id}/contracts`, icon: <ReceiptText className='w-4' /> },
      { title: 'Ochiq kredit', url: `/physical-clients/${id}/open-contracts`, icon: <NotebookTabs className='w-4' /> },
      { title: 'Monitoring', url: `/physical-clients/${id}/monitoring`, icon: <BarChart3 className='w-4' /> },
      { title: 'Depozit', url: `/physical-clients/${id}/depozit`, icon: <Vault className='w-4' /> },
      { title: 'To\'lovlar', url: `/physical-clients/${id}/payments`, icon: <HandCoins className='w-4' /> },
      { title: 'Fayllar', url: `/physical-clients/${id}/files`, icon: <FileBadge className='w-4' /> },
      { title: 'Xabarlar', url: `/physical-clients/${id}/messeges`, icon: <Mail className='w-4' /> },
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
