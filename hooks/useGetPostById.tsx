/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
'use client';
import React, { useEffect, useState } from 'react';

import { IPost, IAssets } from '@/interfaces';
import { apiRequest } from '@/libs/axios-api';
import { getCookie } from 'cookies-next';

const useNovaAccessToken = () => getCookie('nova-access-token')?.toString() || '';

export const usePostData = (id: number) => {
   const [currentPost, setCurrentPost] = useState<IPost>({} as any);

   const getPostById = async (id: number) => {
      const token = useNovaAccessToken();

      const post = await apiRequest.getPostById(token, id);
      setCurrentPost(post);
   };

   useEffect(() => {
      getPostById(id);
   }, [id]);

   return currentPost;
};
