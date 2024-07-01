import { BankTableType, columns } from "./columns"
import { DataTable } from "./data-table"
import ContentHeader from "@/components/layout/content/content-header"
import ContentCard from "@/components/layout/content/content-card"
import { cookies } from 'next/headers'


async function getData(): Promise<BankTableType[]> {
   return [
      {
         id: 1,
         short_name: "Aloqa Bank",
         code: 118454,
         name: "AloqaBank Amaliyot HKXKM"
      },
      {
         id: 2,
         short_name: "Sanoat Qurulish Bank",
         code: 118454,
         name: "Sanoat Qurulish Bank Amaliyot HKXKM"
      },
      {
         id: 3,
         short_name: "Hamkor Bank",
         code: 118454,
         name: "HamkorBank Amaliyot HKXKM"
      },
      {
         id: 2,
         short_name: "Xalq Bank",
         code: 118454,
         name: "Xalq Bank Amaliyot HKXKM"
      },
   ]
}

export default async function Banks() {
   const data = await getData()

   return (
      <div className="mx-auto py-10">
         <ContentHeader title="Banklar" navigate="/helper/banks/add" />
         <ContentCard>
            <DataTable columns={columns} data={data} />
         </ContentCard>
      </div>
   )
}
