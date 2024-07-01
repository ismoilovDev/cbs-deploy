export const getImagesWithToken = async (path: string, token: string): Promise<string> => {
   const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${path}`, {
      headers: {
         'Authorization': `Bearer ${token}`
      }
   });

   if (!response.ok) {
      throw new Error('Failed to fetch image');
   }

   const blob = await response.blob();
   return URL.createObjectURL(blob);
};
