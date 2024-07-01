import { Payment, columns } from "./columns"
import { DataTable } from "./data-table"
import ContentHeader from "@/components/layout/content/content-header"
import ContentCard from "@/components/layout/content/content-card"


async function getData(): Promise<Payment[]> {
   return [
      {
         "id": 1,
         "short_name": "Chirchiq filiali",
         "address": "Toshkent viloyati, Chirchiq shahri, A.Navoiy shoh ko\u2018chasi, 192-uy, 5-xonadon.",
         "city": "Chirchiq shahar"
      },
      {
         "id": 2,
         "short_name": "Olmaliq filiali",
         "address": "Toshkent viloyati, Olmaliq shahri, Amir Temur ko\u2018chasi, 39-uy, 1-qavat",
         "city": "Olmaliq shahar"
      },
      {
         "id": 3,
         "short_name": "Nukus filiali",
         "address": "Qoraqalpog\u2018iston Respublikasi, Nukus shahri, \u201cAyd\u044bn-jol\u201d MFY, Yernazar Alakuz ko\u2018chasi, 5\/3, 5\/4-uy.",
         "city": "Nukus shahar"
      },
      {
         "id": 4,
         "short_name": "Guliston filiali",
         "address": "Sirdaryo viloyati, Guliston shahri, Samarqand ko\u2018chasi, Yangi bozor mavzesi, Xumo savdo majmuasi.",
         "city": "Guliston shahar"
      },
      {
         "id": 5,
         "short_name": "Bo\u2018ka filiali",
         "address": "Toshkent viloyati, Bo\u2018ka tumani,  Yangi Xayot M.F.Y., Paxtakor ko\u2018chasi, 1-uy.",
         "city": "Bo\u2018ka tumani"
      },
      {
         "id": 6,
         "short_name": "Qarshi filiali",
         "address": "Qashqadaryo viloyati, Qarshi shahar, Chaqar M.F.Y., Nasaf ko\u2018chasi.",
         "city": "Qarshi shahar"
      },
      {
         "id": 7,
         "short_name": "Shahrisabz filiali",
         "address": "Qashqadaryo viloyati, Shahrisabz shahar, Pillakashlik M.F.Y., Ipak yo\u2018li ko\u2018chasi 105 uy.",
         "city": "Shahrisabz shahar"
      },
      {
         "id": 8,
         "short_name": "Jizzax filiali",
         "address": "Jizzax viloyati, Jizzax shahar, Zilol M.F.Y.,Zilol ko\u2018chasi 1A-uy",
         "city": "Jizzax shahar"
      },
      {
         "id": 9,
         "short_name": "Bekobod filiali",
         "address": "Toshkent viloyati, Bekobod shahri, Buyuk Ipak Yo\u2018li ko\u2018chasi, 337-uy",
         "city": "Bekobod shahar"
      },
      {
         "id": 99,
         "short_name": "Bosh ofis",
         "address": "Toshkent viloyati, O\u2018rta Chirchiq tumani, Sholikor M.F.Y., Madaniyat ko\u2018chasi",
         "city": "Toshkent shahar"
      },
      {
         "id": 100,
         "short_name": "Bektemir filiali",
         "address": "Toshkent shahar, Bektemir tumani, Bektemir shoh ko\u2018chasi, 196-uy.",
         "city": "Toshkent shahar"
      },
      {
         "id": 101,
         "short_name": "Mirbozor filiali",
         "address": "Samarqand viloyati, Narpay tumani, Oqtosh shahri, I.Buxoriy ko\u2018chasi",
         "city": "Oqtosh shahar"
      },
      {
         "id": 102,
         "short_name": "To'rtko'l filiali",
         "address": "Qoraqalpog'iston Respublikasi, To'rtko'l tuman istiqlol 1 uy",
         "city": "To'rtko\u2018l tumani"
      },
      {
         "id": 103,
         "short_name": "Yangibozor filiali",
         "address": "Toshkent viloyati, Yuqorichirchiq tumani, Marifat MFY, Mustaqillik ko'chasi 67 uy",
         "city": "Toshkent viloyati"
      }
   ]
}

export default async function Branches() {
   const data = await getData()

   return (
      <div className="mx-auto py-10">
         <ContentHeader title="Filiallar" navigate="/helper/branches/add" />
         <ContentCard>
            <DataTable columns={columns} data={data} />
         </ContentCard>
      </div>
   )
}
