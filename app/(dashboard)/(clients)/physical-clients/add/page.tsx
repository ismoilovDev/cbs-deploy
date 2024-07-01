import React from 'react'
import { Metadata } from 'next'
import { ClientType } from '@/types'
import { ClientForm } from '@/components/client/client-form'
import ContentCard from '@/components/layout/content/content-card'
import Title from '@/components/title/title'

export const metadata: Metadata = {
   title: "Mijoz Qo'shish",
};


export default function AddClient() {

   // const defaultValues: ClientType = {
   //    branch_id: 1,
   //    open_date: '',
   //    close_date: '',
   //    is_resident: true,
   //    firstname: '',
   //    surname: '',
   //    lastname: '',
   //    gender: '',
   //    birth_date: '',
   //    job: '',
   //    nationality: '',
   //    addresses: [
   //       {
   //          status: true,
   //          region_id: '',
   //          district_id: '',
   //          address: '',
   //       }
   //    ],
   //    photo: [
   //       {
   //          title: '',
   //          phone: '',
   //          status: true
   //       }
   //    ],
   //    phone: [
   //       {
   //          title: '',
   //          phone: '',
   //          status: true
   //       }
   //    ],
   //    pinfl: 0,
   //    passport: {
   //       type: '',
   //       series: '',
   //       number: Number(''),
   //       registration_date: '',
   //       expiration_date: '',
   //       registration_place: '',
   //       images: [],
   //    },
   //    // images: []
   // }

   const defaultValues: ClientType = {
      "branch_id": "07d1eabb-d7da-4a28-8c34-798565219521",
      "pinfl": '54845454894453',
      "firstname": "Salauat",
      "lastname": "Sharafat uli",
      "surname": "Joldasbaev",
      "gender": "male",
      "job": "developer",
      "nationality": "Karakalpak",
      "birth_date": "2023-09-19",
      "is_resident": false,
      "open_date": "2022-01-01",
      "close_date": "2022-01-01",
      "addresses": [
         {
            "status": true,
            "region_id": "da9ffec6-6b0c-432d-81a4-7c7fc1c2ce92",
            "district_id": "5251adf6-0ba2-4af7-b3b6-1d805d31c5b7",
            "address": "Tashkent, Yunusabad, 12-12-12"
         }
      ],
      "passport": {
         "expiration_date": "2025-10-10",
         "series": "KA",
         "registration_date": "2023-10-10",
         "number": '1285216',
         "type": "2",
         "registration_place": "Shumanay",
         "personal_identification": '54845454894',
         "files": [
            "http://localhost:8000/files/passports/20240520151957_bEDx04fHWG.JPG"
         ]
      },
      "phones": [
         {
            "status": true,
            "title": "o'ziniki",
            "phone": "+9953558899",
         }
      ],
      "files": [
         "http://localhost:8000/files/passports/20240520151957_bEDx04fHWG.JPG"
      ]
   }

   return (
      <div className='mx-auto py-10'>
         <Title>Mijoz qo'shish</Title>
         <ContentCard>
            <ClientForm defaultValues={defaultValues} btn_txt="Kiritish" />
         </ContentCard>
      </div>
   )
}
