'use client'

import { DateFilter, DistrictFilter, GenderFilter, QueryFilter, RegionFilter } from "@/components/filters/table-filters";
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';

export function Filters() {
   const { replace } = useRouter();
   const pathname = usePathname();
   const searchParams = useSearchParams();

   const handleSearch = useDebouncedCallback((term: string, type: string) => {
      const params = new URLSearchParams(searchParams);
      if (term) {
         params.set(type, term);
      } else {
         params.delete(type);
      }
      replace(`${pathname}?${params.toString()}`);
   }, 400)

   function handleSelect(value: string, type: string) {
      const params = new URLSearchParams(searchParams);
      if (value) {
         if (value === "all") {
            params.set(type, '')
         } else {
            params.set(type, value);
         }
      } else {
         params.delete(type);
      }
      replace(`${pathname}?${params.toString()}`);
   }

   return (
      <div className="filters grid grid-cols-4 gap-4 my-2 py-2">
         <QueryFilter handleSearch={handleSearch} />
         <RegionFilter handleSelect={handleSelect} />
         <DistrictFilter handleSelect={handleSelect} />
         <GenderFilter handleSelect={handleSelect} />
         <DateFilter handleSearch={handleSearch} />
      </div>
   )
}