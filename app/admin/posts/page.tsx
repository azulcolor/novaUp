'use client';
import React, { useEffect, useState } from 'react';
import { getCookie } from 'cookies-next';

import { LoadingProgress } from '@/components/common/LoadingProgress';
import { Posts } from '@/components/common/Posts';

import { apiRequest } from '@/libs/axios-api';
import { IPost } from '@/interfaces';

export default function AdminPosts() {
   const [posts, setPosts] = useState<IPost[]>([]);
   const [isLoading, setIsLoading] = useState<boolean>(true);

   useEffect(() => {
      (async () => {
         const token = getCookie('nova-access-token');
         const posts = await apiRequest.getPostsCrud(String(token), false);
         setPosts(() => posts);
         setIsLoading(() => false);
      })();
   }, []);

   return (
      <>
         {isLoading && <LoadingProgress />}
         {!isLoading && posts?.length && <Posts posts={posts} />}
      </>
   );
}
