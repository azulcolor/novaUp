import { ICatalogGen } from '@/app/interfaces';
import React from 'react';

interface Props {
   placeholder: string;
   options: ICatalogGen[];
   select?: ICatalogGen;
   disabled?: boolean;
   containerStyles?: string;
}

export const CustomSelect = ({
   placeholder,
   options,
   select,
   disabled,
   containerStyles,
}: Props) => {
   return (
      <div>
         <select>
            <option value={select ? select.id || 0 : 0}>
               {select ? select.name : placeholder}
            </option>
         </select>
      </div>
   );
};
