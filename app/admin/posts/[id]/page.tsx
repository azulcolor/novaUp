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

   const post = await apiRequest.getPostById(token, Number(params.id));
   return <h1>{post.title}</h1>;
}
