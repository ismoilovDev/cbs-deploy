import { useState, useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { AddressType } from '@/types/index';

const defaultAddress: AddressType = {
   id: uuidv4(),
   address: '',
   region_id: '',
   district_id: '',
   status: true,
};

export const useAddresses = (initialAddresses = [defaultAddress]) => {
   const [addresses, setAddresses] = useState<AddressType[]>(initialAddresses);

   const addAddress = useCallback(() => {
      setAddresses([...addresses, { ...defaultAddress, id: uuidv4() }]);
   }, [addresses]);

   const removeAddress = useCallback((id: string | number | undefined) => {
      if (addresses.length > 1) {
         setAddresses(addresses.filter(address => address.id !== id));
      }
   }, [addresses]);

   return {
      addresses,
      addAddress,
      removeAddress,
   };
};
