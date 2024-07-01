import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

type RegionType = {
   id: string;
   code: string;
   name: string;
}

export function useRegions() {
   const [regions, setRegions] = useState<RegionType[] | []>([]);
   const session = useSession()

   useEffect(() => {
      async function fetchRegions() {
         try {
            const response = await fetch(`/regions`, {
               headers: {
                  'Authorization': `Bearer ${session.data?.user.token}`
               }
            });
            if (response.ok) {
               const data: any = response.json()
               setRegions(data.data);
            }
         } catch (error) {
            console.error(error);
         }
      }
      fetchRegions();
   }, []);

   return regions;
}