"use client"

import React, { useEffect, useState } from 'react';
import { CircleDollarSign, GripHorizontal } from 'lucide-react';
import axios from 'axios';

import {
   Select,
   SelectContent,
   SelectGroup,
   SelectItem,
   SelectLabel,
   SelectTrigger,
   SelectValue,
} from "@/components/ui/select";
import { cn } from '@/lib/utils';


type Currency = {
   Ccy: string;
   Rate: string;
   id: string;
};

type SelectType = {
   label: string;
   value: any;
};

const goldProofs = [500, 583, 585, 750, 800, 916, 950, 999];

const addSpacesToNumber = (numberString: string): string => {
   return numberString.replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
};

const Indicator: React.FC = () => {
   const [selectedGold, setSelectedGold] = useState<boolean>(true);
   const [currencies, setCurrencies] = useState<SelectType[]>([]);
   const [gold, setGold] = useState<SelectType[]>([]);

   useEffect(() => {
      fetchData();
   }, []);

   const fetchData = async () => {
      try {
         const [currencyResponse, goldResponse] = await Promise.all([
            axios.get<Currency[]>('https://cbu.uz/uz/arkhiv-kursov-valyut/json/'),
            axios.get('https://data-asg.goldprice.org/dbXRates/USD')
         ]);

         const currencyData = currencyResponse.data;
         const goldData = goldResponse.data;

         const countries_1 = currencyData.slice(0, 3);
         const countries_2 = currencyData.slice(34, 35);

         const currencyArr = [...countries_1, ...countries_2].map((item) => ({
            label: `${item?.Ccy} = ${addSpacesToNumber(item?.Rate)}`,
            value: item?.id
         }));

         setCurrencies(currencyArr);

         const goldArr = goldProofs.map((item, index) => {
            let num: number = goldData?.items[0]?.xauPrice / 31.103 || 0;
            let rate: any = currencyData[0]?.Rate || 1;

            return {
               label: `${item}пр = ${((num / 999) * item * rate)?.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
               value: index + 1
            };
         });


         setGold(goldArr);
      } catch (error) {
         console.error('Error fetching data:', error);
      }
   };

   return (
      <div className='indicator flex h-10 items-center space-x-2 bg-gray-100 dark:bg-slate-700 rounded-xl px-4 py-2'>
         <div className="indicator_selector">
            <Select>
               <SelectTrigger className="w-[180px] h-8 focus:border-none focus:outline-none">
                  <SelectValue placeholder={selectedGold ? gold[0]?.label : currencies[0]?.label} />
               </SelectTrigger>
               <SelectContent>
                  <SelectGroup>
                     <SelectLabel>{selectedGold ? 'Tilla' : 'Valyuta'}</SelectLabel>
                     {selectedGold ? (
                        gold.map(item => (
                           <SelectItem key={item.value} value={item.label}>{item.label}</SelectItem>
                        ))
                     ) : (
                        currencies.map(item => (
                           <SelectItem key={item.value} value={item.label}>{item.label}</SelectItem>
                        ))
                     )}
                  </SelectGroup>
               </SelectContent>
            </Select>
         </div>
         <div
            className="indicator_change_btns relative flex items-center rounded-lg space-x-1 bg-white dark:bg-slate-900 h-8 px-1"
         >
            <GripHorizontal
               className={cn(selectedGold ? 'bg-slate-100 dark:bg-slate-700' : 'bg-transparent', 'p-1 text-orange-400 rounded cursor-pointer text-sm')}
               onClick={() => setSelectedGold(true)}
            />
            <CircleDollarSign
               className={cn(!selectedGold ? 'bg-slate-100 dark:bg-slate-700' : 'bg-transparent', 'p-1 text-orange-400 rounded cursor-pointer')}
               onClick={() => setSelectedGold(false)}
            />
         </div>
      </div>
   );
};

export default Indicator;
