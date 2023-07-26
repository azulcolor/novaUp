import React from 'react';
import { cookies } from 'next/headers';

import { CustomSelect } from '@/components/CustomInputs/CustomSelect';
import { InputSearch } from '@/components/CustomInputs/InputSearch';
import { Posts } from '@/components/common/Posts';

import { apiRequest } from '@/libs/axios-api';

export default async function AdminPosts() {
   const extraOption = {
      id: 0,
      name: 'Recientes',
   };

   const cookieStore = cookies();
   const token = cookieStore.get('nova-access-token')?.value || '';
   const categories = await apiRequest.getCategories();
   const posts = await apiRequest.getPosts(token, false);
   return (
      <>
         {/* <div className="post-layout">
            <CustomSelect
               attributeToChangue="category"
               options={categories}
               defaultOption={extraOption}
               select={extraOption}
            />
            <InputSearch />
         </div> */}
         <Posts posts={posts} />
      </>
   );
}
