import { useEffect, useState } from "react";
import { BaseApi } from "../api/[...nextauth]/base-api";

export type DistrictType = {
   id: string;
   code: string;
   name: string;
}

export function useDistricts(id: string) {
   const [districts, setDistricts] = useState<DistrictType[] | []>([]);

   useEffect(() => {
      async function fetchDistricts() {
         try {
            const { data } = await BaseApi.get(`/regions/${id}/districts`);
            setDistricts(data.data.districts);
         } catch (error) {
            console.error(error);
         }
      }
      fetchDistricts();
   }, [id]);

   return districts;
}