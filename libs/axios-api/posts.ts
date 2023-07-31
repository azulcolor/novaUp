import { api } from '@/libs/axios-api/axios';
import { IPost } from '@/interfaces';

export const apiPosts = {
   getPosts: async (token: string, status: boolean = true): Promise<IPost[]> =>
      await fetch(
         `${process.env.NEXTAUTH_URL}/api/posts${status ? '?approved=true' : ''}`,
         {
            method: 'GET',
            headers: {
               'Content-Type': 'application/json',
               Authorization: `Bearer ${token}`,
            },
            next: { revalidate: 60 },
         }
      )
         .then((res) => res.json())
         .catch((e) => []),
   getPostsCrud: async (token: string, status: boolean = true): Promise<IPost[]> =>
      await api('next', 'GET', `/posts${status ? '?approved=true' : ''}`, {
         Authorization: `Bearer ${token}`,
      })
         .then((data) => data)
         .catch((e) => []),

   getPostById: async (token: string, id: number): Promise<IPost> =>
      await api('next', 'GET', `/posts/${id}`, { Authorization: `Bearer ${token}` })
         .then((data) => data)
         .catch(() => {}),

   getPostsLatest: async (limit: number): Promise<IPost> =>
      await api('next', 'GET', `/posts/latest?limit=${limit}`)
         .then((data) => data)
         .catch((e) => []),

   getPostsPinned: async (): Promise<IPost[]> =>
      await api('next', 'GET', '/posts/pinned')
         .then((data) => data)
         .catch((e) => []),

   newPost: async (token: string, post: IPost) =>
      await api('next', 'POST', '/posts', { Authorization: `Bearer ${token}` }, post)
         .then((data) => data)
         .catch((e) => false),

   putPost: async (token: string, post: IPost) =>
      await api('next', 'PUT', '/posts', { Authorization: `Bearer ${token}` }, post)
         .then((data) => data)
         .catch((e) => false),

   deletePost: async (token: string, id: number) =>
      await api('next', 'DELETE', `/posts/${id}`, { Authorization: `Bearer ${token}` })
         .then(() => true)
         .catch((e) => false),

   getPostsByCategory: async (
      token: string,
      id: number,
      status: boolean = true
   ): Promise<IPost[]> =>
      await api('next', 'GET', `/posts/category/${id}${status ? '?approved=true' : ''}`, {
         Authorization: `Bearer ${token}`,
      })
         .then((data) => data)
         .catch((e) => {
            return [];
         }),
};
