'use client';
import { ICatalogGen } from '@/interfaces';
import { useRouter, usePathname } from 'next/navigation';
import React from 'react';

interface Props {
   options: ICatalogGen[];
   defaultOption: ICatalogGen;
   attributeToChangue: string;
   isChangueQuery?: boolean;
   onChangueValue?: (attributeToChangue: string, value: number) => void;
   select?: ICatalogGen;
   disabled?: boolean;
   containerStyles?: string;
}

export const CustomSelect = ({
   options,
   defaultOption,
   attributeToChangue,
   isChangueQuery = false,
   onChangueValue,
   select,
   disabled,
   containerStyles,
}: Props) => {
   const router = useRouter();
   const path = usePathname();
   const handleChangueValue = (id: number) => {
      if (!isChangueQuery && onChangueValue) {
         onChangueValue(attributeToChangue, id);
      } else {
         router.replace(`${path}?${attributeToChangue}=${id}`);
      }
   };

   return (
      <div className={containerStyles}>
         <select
            disabled={disabled}
            defaultValue={defaultOption?.id || 0}
            onChange={(e) => handleChangueValue(Number(e.target.value))}>
            {select && (
               <option value={defaultOption?.id || select.id || 0}>
                  {defaultOption?.name || select.name}
               </option>
            )}
            {options?.length &&
               options?.map((option, i) => (
                  <option key={`${option.name}-${i}`} value={option.id}>
                     {option.name}
                  </option>
               ))}
         </select>
      </div>
   );
};
