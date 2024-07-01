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
      const { data } = await BaseApi.get(`/users/${id}`);
      return data.data;
   } catch (error: any) {
      throw new Error(error.message);
   }
}

const UserPage = ({
   params: { id },
}: {
   params: { id: string }
}) => {

   const { data, isLoading, isError } = useQuery({
      queryKey: ['user', id],
      queryFn: () => getData({ id })
   });

   if (isLoading) {
      return <div>Loading...</div>;
   }

   if (isError) {
      return <div>Error fetching user data</div>;
   }

   return (
      <div>
         <h1>User Details</h1>
         <p>Name: </p>
      </div>
   );
};

export default UserPage;