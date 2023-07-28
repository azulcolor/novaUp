/* eslint-disable react-hooks/exhaustive-deps */
'use client';
import React, { useEffect, useRef } from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';

import { ICatalogGen } from '@/interfaces';

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
   const currentRefAttribute = useRef<HTMLInputElement>(null);
   const router = useRouter();
   const path = usePathname();
   const searchParams = useSearchParams();

   const handleChangueValue = (id: number) => {
      if (!isChangueQuery && onChangueValue) {
         const selected = options.find((option) => option.id === id);
         if (!selected) return;
         onChangueValue(attributeToChangue, selected);
      } else {
         router.replace(`${path}?${attributeToChangue}=${id}`);
      }
   };

   useEffect(() => {
      if (onChangueValue) onChangueValue(attributeToChangue, options[0]);
   }, [options]);

   useEffect(() => {
      const currentAttribute = searchParams.get(attributeToChangue);
      if (!currentAttribute && defaultOption) {
         if (currentRefAttribute?.current?.value) {
            currentRefAttribute.current.value = String(defaultOption.id);
         }
      }
   }, [searchParams]);

   return (
      <div className={containerStyles}>
         <select
            ref={currentRefAttribute as any}
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
