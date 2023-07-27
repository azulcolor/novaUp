import React from 'react';
import { apiRequest } from '@/libs/axios-api';
import { NextRequest } from 'next/server';
import { Posts } from '@/components/common/Posts';
import { CustomSelect } from '@/components/CustomInputs/CustomSelect';
import { InputSearch } from '@/components/CustomInputs/InputSearch';

export default async function Categories() {
   const categories = await apiRequest.getCategories();
   const extraOption = {
      id: 0,
      name: 'Recientes',
   };
   const posts = await apiRequest.getPosts('');
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
         <Posts posts={posts} />
      </>
   );
}
