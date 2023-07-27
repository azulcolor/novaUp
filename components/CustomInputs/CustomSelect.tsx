/* eslint-disable react-hooks/exhaustive-deps */
'use client';
import { ICatalogGen } from '@/interfaces';
import { useRouter, usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react';

interface Props {
   options: ICatalogGen[];
   defaultOption: ICatalogGen;
   attributeToChangue: string;
   isChangueQuery?: boolean;
   onChangueValue?: (attributeToChangue: string, value: ICatalogGen) => void;
   disabled?: boolean;
   containerStyles?: string;
}

export const CustomSelect = ({
   options,
   defaultOption,
   attributeToChangue,
   isChangueQuery = false,
   onChangueValue,
   disabled,
   containerStyles,
}: Props) => {
   const router = useRouter();
   const path = usePathname();

   useEffect(() => {
      if (onChangueValue) onChangueValue(attributeToChangue, options[0]);
   }, [options]);

   const handleChangueValue = (id: number) => {
      if (!isChangueQuery && onChangueValue) {
         const selected = options.find((option) => option.id === id);
         if (!selected) return;
         onChangueValue(attributeToChangue, selected);
      } else {
         router.replace(`${path}?${attributeToChangue}=${id}`);
      }
   };

   return (
      <div className={containerStyles}>
         <select
            disabled={disabled}
            defaultValue={defaultOption ? defaultOption.id : 0}
            onChange={(e) => handleChangueValue(Number(e.target.value))}>
            {defaultOption && (
               <option value={defaultOption.id}>{defaultOption.name}</option>
            )}
            {options?.length > 0 &&
               options?.map((option, i) =>
                  option?.id === defaultOption?.id ? null : (
                     <option key={`${option.name}-${i}`} value={option.id}>
                        {option.name}
                     </option>
                  )
               )}
         </select>
      </div>
   );
};
