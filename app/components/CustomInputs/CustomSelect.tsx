import { ICatalogGen } from '@/app/interfaces';
import React from 'react';

interface Props {
   placeholder: string;
   options: ICatalogGen[];
   select?: ICatalogGen;
   disabled?: boolean;
   containerStyles: string;
}

export const CustomSelect = ({
   placeholder,
   options,
   select,
   disabled,
   containerStyles,
}: Props) => {
   return <div>CustomSelect</div>;
};
