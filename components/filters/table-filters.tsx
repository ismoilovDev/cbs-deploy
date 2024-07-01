'use client'

import React, { useCallback, useEffect, useState } from "react";
import { Label } from "@radix-ui/react-dropdown-menu";
import { Input } from "../ui/input";
import {
   Select,
   SelectContent,
   SelectGroup,
   SelectItem,
   SelectTrigger,
   SelectValue,
} from "@/components/ui/select"
import { Button } from "../ui/button";
import { useRegions } from "@/app/hooks/use-regions";
import { useDistricts } from "@/app/hooks/use-district-with-region-id";
import { useSearchParams } from "next/navigation";

interface QueryFilterProps {
   handleSearch: (value: string, type: string) => void;
}

interface SelectFilterProps {
   handleSelect: (value: string, type: string) => void;
}

export function QueryFilter({ handleSearch }: QueryFilterProps) {
   const searchParams = useSearchParams();
   return (
      <div className="grid w-full items-center gap-1.5">
         <Label className="text-sm font-semibold shod drop-shadow-md">Matn</Label>
         <Input
            type="text"
            id="query_text"
            onChange={(e) => handleSearch(e.target.value, 'search')}
            defaultValue={searchParams.get('search')?.toString()}
            placeholder="Matn..."
         />
      </div>
   )
}

export function RegionFilter({ handleSelect }: SelectFilterProps) {
   const searchParams = useSearchParams();
   const regions = useRegions()

   return (
      <div className="grid w-full items-center gap-1.5">
         <Label className="text-sm font-semibold shod drop-shadow-md">Hudud</Label>
         <Select value={searchParams.get('region')?.toString()} onValueChange={(value) => handleSelect(value, 'region')}>
            <SelectTrigger className="w-full">
               <SelectValue placeholder="Hududni tanlang" />
            </SelectTrigger>
            <SelectContent>
               <SelectGroup>
                  <SelectItem value="all">Barchasi</SelectItem>
                  {
                     regions.map(item => (
                        <SelectItem key={item.id} value={item.id}>{item.name}</SelectItem>
                     ))
                  }
               </SelectGroup>
            </SelectContent>
         </Select>
      </div>
   )
}

export function DistrictFilter({ handleSelect }: SelectFilterProps) {
   const searchParams = useSearchParams();
   const region = searchParams.get('region')?.toString() || '';

   const districts = useDistricts(region);

   return (
      <div className="grid w-full items-center gap-1.5">
         <Label className="text-sm font-semibold shod drop-shadow-md">Tuman</Label>
         <Select value={searchParams.get('district')?.toString()} onValueChange={(value) => handleSelect(value, 'district')}>
            <SelectTrigger className="w-full">
               <SelectValue placeholder="Tumanni tanlang" />
            </SelectTrigger>
            <SelectContent>
               <SelectGroup>
                  <SelectItem value="all">Barchasi</SelectItem>
                  {
                     districts.map(item => (
                        <SelectItem key={item.id} value={item.id}>{item.name}</SelectItem>
                     ))
                  }
               </SelectGroup>
            </SelectContent>
         </Select>
      </div>
   )
}

export function GenderFilter({ handleSelect }: SelectFilterProps) {
   const searchParams = useSearchParams();
   return (
      <div className="grid w-full items-center gap-1.5">
         <Label className="text-sm font-semibold shod drop-shadow-md">Jinsi</Label>
         <Select value={searchParams.get('gender')?.toString()} onValueChange={(value) => handleSelect(value, 'gender')}>
            <SelectTrigger className="w-full">
               <SelectValue placeholder="Jinsini tanlang" />
            </SelectTrigger>
            <SelectContent>
               <SelectGroup>
                  <SelectItem value="all">Barchasi</SelectItem>
                  <SelectItem value="male">Erkak</SelectItem>
                  <SelectItem value="female">Ayol</SelectItem>
               </SelectGroup>
            </SelectContent>
         </Select>
      </div>
   )
}

export function DateFilter({ handleSearch }: QueryFilterProps) {
   const searchParams = useSearchParams();
   return (
      <div className="grid w-full items-center gap-1.5">
         <Label className="text-sm font-semibold shod drop-shadow-md">Davr (...dan, ...gacha)</Label>
         <div className="flex items-center space-x-2">
            <Input
               type="date"
               id="from"
               defaultValue={searchParams.get('from_created_at')?.toString()}
               onChange={(e) => handleSearch(e.target.value, "from_created_at")}
               placeholder="Boshlanish"
            />
            <Input
               type="date"
               id="to"
               placeholder="Tugash"
               defaultValue={searchParams.get('to_created_at')?.toString()}
               onChange={(e) => handleSearch(e.target.value, "to_created_at")}
            />
         </div>
      </div>
   )
}

export function BranchFilter() {
   return (
      <div className="grid w-20 items-end gap-1.5">
         <Button>Filterlani tozalash</Button>
      </div>
   )
}