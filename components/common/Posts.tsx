/* eslint-disable react-hooks/exhaustive-deps */
'use client';
import { IPost } from '@/interfaces';
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Card } from '@/components/common/Card';
import { handlesearchItems } from '@/libs/utils/common-functions';

interface Props {
   posts: IPost[];
}

export const Posts = ({ posts }: Props) => {
   const [filteredPosts, setFilteredPosts] = useState<IPost[]>(posts);
   const searchParams = useSearchParams();
   const category = searchParams.get('category');
   const search = searchParams.get('search');

   const filterPosts = (posts: IPost[]) => {
      if (category && category !== '0') {
         return posts.filter((post) => post.category.id === Number(category));
      }
      if (search && typeof search === 'string') {
         return handlesearchItems(posts, search);
      }
      return posts;
   };

   useEffect(() => {
      setFilteredPosts(filterPosts(posts));
   }, [searchParams, posts]);

   return (
      <div className="post-container">
         {filteredPosts.length
            ? filteredPosts.map((post, index) => (
                 <Card key={`${post.id}-${index}`} post={post} />
              ))
            : null}
      </div>
   );
};
