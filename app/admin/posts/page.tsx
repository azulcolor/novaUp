import React from 'react';
import { cookies } from 'next/headers';

import { Posts } from '@/components/common/Posts';

import { apiRequest } from '@/libs/axios-api';

export default async function AdminPosts() {
   const cookieStore = cookies();
   const token = cookieStore.get('nova-access-token')?.value || '';

   const posts = await apiRequest.getPosts(token, false);
   return (
      <>
         <Posts posts={posts} />
      </>
   );
}
