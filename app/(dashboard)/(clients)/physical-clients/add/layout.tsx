'use client'

import React from 'react'
import { CheckInn } from '@/components/client/check-inn';
import { useTitle } from '@/app/hooks/use-meta-title';

export default function Layout({
   children,
}: Readonly<{
   children: React.ReactNode;
}>) {
   const [isCheckedClient, setIsCheckedClient] = React.useState(true)
   useTitle("Mijoz qo'shish");

   return (
      <section>
         {!isCheckedClient && <CheckInn setIsCheckedClient={setIsCheckedClient} />}
         {isCheckedClient && children}
      </section>
   )
}
