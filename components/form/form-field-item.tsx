import React from 'react';
import { cn } from '@/lib/utils';
import { Control, Controller } from 'react-hook-form';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { FormControl, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Switch } from '../ui/switch';

interface FormFieldItemProps {
   classes?: string;
   control: Control<any>;
   name: string;
   label: string;
   placeholder: string;
   type?: string;
   disabled?: boolean;
   options?: { value: string | boolean; label: string }[];
   is_checkbox?: boolean;
}

export const FormFieldItem: React.FC<FormFieldItemProps> = ({
   classes,
   control,
   name,
   label,
   placeholder,
   type,
   disabled = false,
   options,
   is_checkbox
}) => (
   <Controller
      control={control}
      name={name}
      render={({ field }) => (
         <FormItem className={cn(classes, 'my-1')}>
            <FormLabel className='font-medium text-[.85rem]'>{label}</FormLabel>
            <FormControl className='focus-visible:ring-0 focus-visible:ring-offset-0  focus-visible:border-2 focus-visible:border-blue-600'>
               {options ? (
                  <Select onValueChange={field.onChange} {...field} disabled={disabled} defaultValue={typeof field.value === "boolean" ? field.value ? "true" : "false" : field.value}>
                     <SelectTrigger className="focus:border-none focus:outline-none">
                        <SelectValue placeholder={placeholder} />
                     </SelectTrigger>
                     <SelectContent>
                        <SelectGroup>
                           {options.map(({ value, label }) => (
                              <SelectItem key={label} value={typeof value === "boolean" ? value ? "true" : "false" : value}>{label}</SelectItem>
                           ))}
                        </SelectGroup>
                     </SelectContent>
                  </Select>
               ) : is_checkbox ? (
                  <div className={cn(classes, "flex items-center space-x-2")}>
                     <Switch
                        {...field}
                        onCheckedChange={(value) => field.onChange(value)}
                        defaultChecked={field.value}
                        disabled={disabled}
                        id="terms"
                     />
                  </div>
               ) : (
                  <Input className='basis-full' {...field} disabled={disabled} placeholder={placeholder} type={type ? type : 'text'} />
               )}
            </FormControl>
            <FormMessage />
         </FormItem>
      )}
   />
);
