import { getSession, useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export type DistrictType = {
   id: string;
   code: string;
   name: string;
}

export function useDistricts(id: string) {
   const [districts, setDistricts] = useState<DistrictType[] | []>([]);
   const session = useSession()

   useEffect(() => {
      async function fetchDistricts() {
         try {
            const response = await fetch(`/regions/${id}/districts`, {
               headers: {
                  'Authorization': `Bearer ${session.data?.user.token}`
               }
            });
            if (response.ok) {
               const data: any = response.json()
               setDistricts(data.data.districts);
            }
         } catch (error) {
            console.error(error);
         }
      }
      fetchDistricts();
   }, [id]);

   return districts;
}