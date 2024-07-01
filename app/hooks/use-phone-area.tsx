import { useState, useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { PhoneType } from '@/types/index';

const defaultPhone: PhoneType = {
   id: uuidv4(),
   title: "O'ziniki",
   phone: '',
   status: true,
};

export const usePhones = (initialPhones = [defaultPhone]) => {
   const [phones, setPhones] = useState<PhoneType[]>(initialPhones);

   const addPhone = useCallback(() => {
      setPhones([...phones, { ...defaultPhone, id: uuidv4() }]);
   }, [phones]);

   const removePhone = useCallback((id: string | undefined | number) => {
      if (phones.length > 1) {
         setPhones(phones.filter(phone => phone.id !== id));
      }
   }, [phones]);

   return {
      phones,
      addPhone,
      removePhone,
   };
};
