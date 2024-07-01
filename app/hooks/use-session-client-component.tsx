import { useState, useEffect } from 'react';
import { getSession } from 'next-auth/react';

interface UseSessionState {
   token: string | null | undefined;
   loading: boolean;
   error: Error | null;
}

const getSessionToken = async () => {
   try {
      const session = await getSession();
      return session?.user?.token;
   } catch (error) {
      console.error("Error retrieving session:", error);
      return null;
   }
};

export const useSessionClientComponent = (): UseSessionState => {
   const [token, setToken] = useState<string | null | undefined>(null);
   const [loading, setLoading] = useState<boolean>(true);
   const [error, setError] = useState<Error | null>(null);

   useEffect(() => {
      const fetchToken = async () => {
         try {
            setLoading(true);
            const sessionToken = await getSessionToken();
            setToken(sessionToken);
         } catch (err) {
            setError(err as Error);
         } finally {
            setLoading(false);
         }
      };

      fetchToken();
   }, []);

   return { token, loading, error };
};
