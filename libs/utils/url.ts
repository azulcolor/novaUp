export const url = {
   home: () => '/',
   posts: () => '/posts',
   adminPosts: () => '/admin/posts',
   adminPostsEditable: (id: number) => `/admin/posts/${id}`,
   adminUsers: () => '/admin/users',
};
