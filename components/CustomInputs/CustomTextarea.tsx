'use client';
import React from 'react';

interface Props {
   name: string;
   value: string;
   onChangueValue: () => void;
}

export const CustomTextarea = ({
   name,
   value,
   onChangueValue,
}: Props) => {
   return (
      <div className="flex w-full justify-between">
         <input
            type="text"
            name={name}
            value={value}
            onChange={(e) => onChangueValue()}
         />
      </div>
   );
};
