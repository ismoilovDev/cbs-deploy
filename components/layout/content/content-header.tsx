import React from 'react'
import Link from 'next/link'
import { CirclePlus, ListFilter } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Title from '@/components/title/title'

export default function ContentHeader({ title, navigate }: { title: string, navigate: string }) {
   return (
      <div className='flex justify-between'>
         <Title>{title}</Title>
         <div className='flex space-x-4'>
            <Button
               variant={'secondary'}
               className='flex space-x-2'
            >
               <ListFilter className='w-5' />
               <span>Filter</span>
            </Button>
            <Button
               className='flex space-x-2 bg-indigo-600 border-indigo-600 border-2 hover:bg-transparent hover:text-indigo-600 dark:text-white dark:hover:text-white dark:hover:border-white'
            >
               <Link className='flex space-x-2 items-center' href={navigate}>
                  <CirclePlus className='w-5' />
                  <span>Qo'shish</span>
               </Link>
            </Button>
         </div>
      </div>
   )
}
