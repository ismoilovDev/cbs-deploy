'use client'

import { useQuery } from '@tanstack/react-query';
import { BaseApi } from '@/app/api/[...nextauth]/route';

interface User {
   id: string;
   username: string;
   email: string;
   is_email_verified: boolean;
   roles: string[];
}

async function getData({ id }: any): Promise<User[]> {
   try {
      const { data } = await BaseApi.get<User[]>(`/users/${id}`);
      return data.data;
   } catch (error: any) {
      throw new Error(error.message);
   }
}

const UserPage = ({ params }: any) => {
   if (!params?.id) {
      return <div>No user ID provided</div>;
   }

   const { data, isLoading, isError } = useQuery({
      queryKey: ['user', params.id],
      queryFn: () => getData({ id: params.id })
   });

   if (isLoading) {
      return <div>Loading...</div>;
   }

   if (isError) {
      return <div>Error fetching user data</div>;
   }

   const user = data;

   return (
      <div>
         <h1>User Details</h1>
         <p>Name: {user.username}</p>
         {/* Render other user details */}
      </div>
   );
};

export default UserPage;