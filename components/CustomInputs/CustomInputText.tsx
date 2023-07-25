'use client';
import React from 'react';

interface Props {
   label: string;
   attributeToChangue: string;
   value: string;
   onChangueValue: (attributeToChangue: string, value: string) => void;
}

export const CustomInputText = ({
   label,
   attributeToChangue,
   value,
   onChangueValue,
}: Props) => {
   return (
      <div className="flex w-full justify-between">
         <span>{label}:</span>
         <input
            type="text"
            value={value}
            onChange={(e) => onChangueValue(attributeToChangue, e.target.value)}
         />
      </div>
   );
};
