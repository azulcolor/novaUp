import { ICatalogGen } from '@/interfaces';
import React from 'react';

interface Props {
   options: ICatalogGen[];
   select?: ICatalogGen;
   defaultOption: ICatalogGen;
   disabled?: boolean;
   containerStyles?: string;
}

export const CustomSelect = ({
   options,
   select,
   defaultOption,
   disabled,
   containerStyles,
}: Props) => {
   return (
      <div className={containerStyles}>
         <select
            disabled={disabled}
            defaultValue={defaultOption?.id || options[0]?.id || 0}>
            {select && <option value={select.id || 0}>{select.name}</option>}
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
