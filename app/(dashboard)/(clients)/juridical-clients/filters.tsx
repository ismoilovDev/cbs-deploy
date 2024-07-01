import { DateFilter, DistrictFilter, GenderFilter, QueryFilter, RegionFilter } from "@/components/filters/table-filters";

export function Filters() {
   return (
      <div className="filters grid grid-cols-4 gap-4 my-2 py-2">
         <QueryFilter />
         <RegionFilter />
         <DistrictFilter />
         <GenderFilter />
         <DateFilter />
      </div>
   )
}