import { Metadata } from "next";
import { GroupForm } from "@/components/group/group-form";
import ContentCard from "@/components/layout/content/content-card";
import Title from "@/components/title/title";

export const metadata: Metadata = {
   title: "Mijoz Qo'shish",
};


export default async function CreateGroup() {
   const defaultValues = {
      "branch_id": "07d1eabb-d7da-4a28-8c34-798565219521",
      "name": "Test",
      "code": '2220'
   }

   return (
      <div className='mx-auto py-10'>
         <Title>Guruh qo'shish</Title>
         <ContentCard>
            <GroupForm defaultValues={defaultValues} btn_txt="Kiritish" />
         </ContentCard>
      </div>
   )
}