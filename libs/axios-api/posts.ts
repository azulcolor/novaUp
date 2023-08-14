import { api } from '@/libs/axios-api/axios';
import { ICatalogGen, IPost, IPostPatch, IPostResources } from '@/interfaces';

export const apiPosts = {
   getPosts: async (token: string, status: boolean = true): Promise<IPost[]> =>
      await fetch(
         `${process.env.NEXT_PUBLIC_URL_BASE}/api/posts${status ? '?approved=true' : ''}`,
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

   getPostsCrud: async (token: string): Promise<IPost[]> =>
      await api('next', 'GET', '/posts', {
         Authorization: `Bearer ${token}`,
      })
         .then((data) => data)
         .catch((e) => []),

   getPostById: async (token: string, id: number): Promise<IPost> =>
      await api('next', 'GET', `/posts/${id}`, { Authorization: `Bearer ${token}` })
         .then((data) => data)
         .catch(() => {}),

   getPostsLatest: async (limit: number): Promise<IPost> =>
      await fetch(`${process.env.NEXT_PUBLIC_URL_BASE}/api/posts/latest?limit=${limit}`, {
         method: 'GET',
         headers: {
            'Content-Type': 'application/json',
         },
         next: { revalidate: 60 },
      })
         .then((res) => res.json())
         .catch((e) => []),

   getPostsPinned: async (): Promise<IPost[]> =>
      await fetch(`${process.env.NEXT_PUBLIC_URL_BASE}/api/posts/pinned`, {
         method: 'GET',
         headers: {
            'Content-Type': 'application/json',
         },
         next: { revalidate: 60 },
      })
         .then((res) => res.json())
         .catch((e) => []),

   newPost: async (token: string, post: any /* haven't interface */) =>
      await api(
         'next',
         'POST',
         '/posts',
         { Authorization: `Bearer ${token}`, 'Content-Type': 'multipart/form-data' },
         post
      )
         .then((data) => data)
         .catch((e) => false),

   setPost: async (token: string, post: IPostPatch, id: number) =>
      await api(
         'next',
         'PATCH',
         `/posts/${id}`,
         { Authorization: `Bearer ${token}` },
         post
      )
         .then((data) => data)
         .catch((e) => false),

   setAssetsPost: async (token: string, files: any, id: number) =>
      await api(
         'next',
         'POST',
         `/posts/${id}/assets`,
         { Authorization: `Bearer ${token}`, 'Content-Type': 'multipart/form-data' },
         files
      )
         .then((data) => data)
         .catch((e) => false),

   deletePost: async (token: string, id: number) =>
      await api('next', 'DELETE', `/posts/${id}`, { Authorization: `Bearer ${token}` })
         .then(() => true)
         .catch((e) => false),

   deleteAssetsPost: async (token: string, target: ICatalogGen) =>
      await api('next', 'DELETE', `/posts/${target.id}/assets?name=${target.name}`, {
         Authorization: `Bearer ${token}`,
      })
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

   pinnedPost: async (token: string, id: number) =>
      await api('next', 'PATCH', `/posts/pin/${id}`, {
         Authorization: `Bearer ${token}`,
      }),

   setStatusPost: async (token: string, id: number, comments: string) =>
      await api(
         'next',
         'PATCH',
         `/posts/approved/${id}`,
         {
            Authorization: `Bearer ${token}`,
         },
         { comments }
      ),
};
