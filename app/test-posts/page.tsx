import { apiRequest } from '../libs/axios-api';

async function getPosts() {
   const res = apiRequest.getPosts('', true);

   return res;
}

export default async function Page() {
   const posts = await apiRequest.getPosts('', true);
   console.log(posts);
   return (
      <>
         <div style={{ width: '100%' }}>
            {posts?.length &&
               posts.map((post) => (
                  <ul key={post.id}>
                     <li>{post.title}</li>
                  </ul>
               ))}
         </div>
      </>
   );
}
