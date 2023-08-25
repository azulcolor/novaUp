'use client';
import FormPost from '@/components/forms/FormPost';
import { apiRequest } from '@/libs/axios-api';
import { useEffect, useState } from 'react';
import { ICatalogGen } from '@/interfaces';
import { getCookie } from 'cookies-next';

interface Props {
   params: {
      id: string;
   };
}
export const dynamic = 'force-dynamic';

export default function AdminPostById({ params }: Props) {
   const [categories, setCategories] = useState<ICatalogGen[]>([]);
   const [typesPost, setTypesPost] = useState<ICatalogGen[]>([]);
   const [user, setUser] = useState<any>({});

   useEffect(() => {
      (async () => {
         const token = getCookie('nova-access-token')?.toString() || '';
         const user = apiRequest.getCurrentUser(token);
         const categories = await apiRequest.getCategories();
         const typesPost = await apiRequest.getTypesPost();
         setUser(user);
         setCategories(categories);
         setTypesPost(typesPost);
      })();
   }, []);
   return (
      <FormPost
         id={Number(params.id)}
         categories={categories}
         typesPost={typesPost}
         user={user ? user.user : user}
      />
   );
}
