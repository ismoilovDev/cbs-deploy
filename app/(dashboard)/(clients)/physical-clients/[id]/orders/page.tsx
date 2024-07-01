import React from 'react'
import { Metadata } from 'next';

export const metadata: Metadata = {
   title: "Mijoz Buyurtmalari",
};

export default function ClientSingle({
   params: { id },
}: {
   params: { id: string }
}) {

   return (
      <React.Fragment>
         <p>
            Mijoz Buyurtmalari
         </p>
      </React.Fragment>
   )
}