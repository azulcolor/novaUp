import React from 'react';
import { CustomSelect } from '@/components/CustomInputs/CustomSelect';
import { apiRequest } from '@/libs/axios-api';
import { InputSearch } from '@/components/CustomInputs/InputSearch';

interface Props {
   children: React.ReactNode;
}

export default async function PostLayout({ children }: Props) {
   const categories = await apiRequest.getCategories();
   const extraOption = {
      id: 0,
      name: 'Recientes',
   };

   return (
      <>
         <div className="post-layout">
            <CustomSelect
               options={categories}
               defaultOption={extraOption}
               select={extraOption}
            />
            <InputSearch />
         </div>
         {children}
      </>
   );
}
