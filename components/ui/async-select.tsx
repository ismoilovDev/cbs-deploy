import { memo, useEffect, useState, useCallback } from "react";
import { useDebouncedCallback } from "use-debounce";
import { BaseApi } from "@/app/api/[...nextauth]/route";
import Select, { MultiValue, ActionMeta } from 'react-select';
import { Label } from "./label";

type OptionType = {
   label: string;
   value: string;
}

type Props = {
   isMulti?: boolean
   text?: string;
   isClearable?: boolean;
   selectedOptions: OptionType[];
   onSelectionChange: (items: OptionType[]) => void;
}

export const ClientsMultiSelect = memo(({ isMulti, text, isClearable, selectedOptions, onSelectionChange }: Props) => {
   const [page, setPage] = useState(1);
   const [query, setQuery] = useState('');
   const [options, setOptions] = useState<OptionType[]>([]);
   const [totalPage, setTotalPage] = useState(1);
   const [isLoading, setIsLoading] = useState(false);
   const [hasMoreOptions, setHasMoreOptions] = useState(true);

   const fetchOptions = useCallback(async () => {
      setIsLoading(true);
      try {
         const { data } = await BaseApi.get(`/clients?search=${query}&page=${page}`);
         const newOptions = data?.data?.map((item: { id: string, full_name: string }) => ({
            label: item.full_name,
            value: item.id
         }));
         if (page === 1) {
            setOptions(newOptions);
         } else {
            setOptions((prevOptions) => [...prevOptions, ...newOptions]);
         }
         if (newOptions.length === 0) {
            setHasMoreOptions(false);
         }
         setTotalPage(data?.paginate?.total_pages);
      } catch (error) {
         console.log(error);
      } finally {
         setIsLoading(false);
      }
   }, [query, page]);

   useEffect(() => {
      fetchOptions();
   }, [fetchOptions]);

   useEffect(() => {
      setPage(1);
      setOptions([]);
   }, [query]);

   const handleMenuScroll = (event: WheelEvent | TouchEvent) => {
      let target: EventTarget | null = null;

      if (event.type === 'wheel') {
         target = event.currentTarget as HTMLDivElement;
      } else if (event.type === 'touchmove' || event.type === 'touchend') {
         target = event.target as HTMLDivElement;
      }

      if (target && target instanceof HTMLDivElement) {
         if (target.scrollHeight - target.scrollTop === target.clientHeight && hasMoreOptions) {
            setPage((prevPage) => prevPage + 1);
         }
      }
   };


   const handleChange = useDebouncedCallback((inputValue) => {
      setQuery(inputValue);
   }, 450);


   const handleSelectChange = (newValue: MultiValue<OptionType>, actionMeta: ActionMeta<OptionType>) => {
      onSelectionChange(newValue as OptionType[]);
   };

   return (
      <>
         <Label className='font-medium text-[.85rem]' htmlFor='clients_id'>
            {text || "Mijozlar"}
         </Label>
         <Select
            isMulti
            id='clients_id'
            options={options}
            isLoading={isLoading}
            placeholder='Mijozlar'
            value={selectedOptions}
            isDisabled={!hasMoreOptions}
            isClearable={isClearable || false}
            onInputChange={handleChange}
            onChange={handleSelectChange}
            onMenuScrollToBottom={handleMenuScroll}
            loadingMessage={() => "Qidirilmoqda..."}
         />
      </>
   );
});
