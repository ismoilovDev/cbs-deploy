import React, { Suspense } from "react";
import ContentHeader from "@/components/layout/content/content-header"
import ContentCard from "@/components/layout/content/content-card";
import { DataTableSkeleton } from "@/components/table/table-skeleton";
import { Filters } from "./filters";
import { Table } from "./list";

export default async function PhysicalClients({
   searchParams,
}: {
   searchParams?: {
      search?: string;
      gender?: string;
      region?: string;
      district?: string;
      date?: string;
      from_created_at?: string;
      to_created_at?: string;
      page?: number;
      limit?: number;
   };
}) {
   const queries = {
      search: searchParams?.search || '',
      gender: searchParams?.gender || '',
      region: searchParams?.region || '',
      district: searchParams?.district || '',
      date: searchParams?.date || '',
      from_created_at: searchParams?.from_created_at || '',
      to_created_at: searchParams?.to_created_at || '',
      page: searchParams?.page || 1,
      limit: searchParams?.limit || 10,
   }

   return (
      <React.Fragment>
         <div className="mx-auto py-10">
            <ContentHeader title="Jismoniy shaxslar" navigate="/physical-clients/add" />
            <Filters />
            <ContentCard>
               <Suspense fallback={<DataTableSkeleton />}>
                  <Table queries={queries} />
               </Suspense>
            </ContentCard>
         </div>
      </React.Fragment>
   )
}
