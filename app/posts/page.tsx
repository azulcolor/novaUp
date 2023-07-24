import React from 'react';
import Card from '../components/common/Card';
import { apiRequest } from '../libs/axios-api';

export default async function Categories() {
   const posts = await apiRequest.getPosts('');
   console.log(posts);
   return (
      <>
         <div className="body">
            <div className="top-utilies"></div>
            <div className="content">
               {posts.length &&
                  posts.map((post, index) => (
                     <Card key={`${post.id}-${index}`} post={post} />
                  ))}
            </div>
         </div>
      </>
   );
}
