import React from 'react';
import { CustomSelect } from '@/components/CustomInputs/CustomSelect';
import { apiRequest } from '@/libs/axios-api';
import { InputSearch } from '@/components/CustomInputs/InputSearch';

interface Props {
   children: React.ReactNode;
   params: { [key: string]: string | string[] };
   searchParams?: { [key: string]: string | string[] | undefined };
}

export default async function PostLayout({ children, params, searchParams }: Props) {
   const categories = await apiRequest.getCategories();
   const extraOption = {
      id: 0,
      name: 'Recientes',
   };

   return (
      <>
         <div className="post-layout">
            <CustomSelect
               attributeToChangue="category"
               options={categories}
               select={extraOption}
               defaultOption={extraOption}
            />
            <InputSearch />
         </div>
         {children}
      </>
   );
}
