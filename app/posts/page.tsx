import React from 'react';
import { apiRequest } from '@/libs/axios-api';
import { NextRequest } from 'next/server';
import { Posts } from '@/components/common/Posts';

export default async function Categories() {
   const posts = await apiRequest.getPosts('');
   return (
      <>
         <Posts posts={posts} />
      </>
   );
}
