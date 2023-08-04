import FormPost from '@/components/forms/FormPost';
import { apiRequest } from '@/libs/axios-api';
import { cookies } from 'next/headers';

interface Props {
   params: {
      id: string;
   };
}

export default async function AdminPostById({ params }: Props) {
   const cookieStore = cookies();
   const token = cookieStore.get('nova-access-token')?.value || '';
   const user = apiRequest.getCurrentUser(token);

   const post = await apiRequest.getPostById(token, Number(params.id));
   const categories = await apiRequest.getCategories();
   const typesPost = await apiRequest.getTypesPost();
   return (
      <FormPost
         post={post}
         categories={categories}
         typesPost={typesPost}
         user={user ? user.user : user}
      />
   );
}
