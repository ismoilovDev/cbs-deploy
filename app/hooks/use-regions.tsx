import { useEffect, useState } from "react";
import { BaseApi } from "../api/[...nextauth]/base-api";

type RegionType = {
   id: string;
   code: string;
   name: string;
}

export function useRegions() {
   const [regions, setRegions] = useState<RegionType[] | []>([]);

   useEffect(() => {
      async function fetchRegions() {
         try {
            const { data } = await BaseApi.get('/regions');
            setRegions(data.data);
         } catch (error) {
            console.error(error);
         }
      }
      fetchRegions();
   }, []);

   return regions;
}