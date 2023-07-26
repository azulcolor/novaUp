'use client';

import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { CustomButton } from '@/components/CustomInputs/CustomButton';
import { url } from '@/libs/utils/url';
import { IPost } from '@/interfaces';

interface Props {
   post: IPost;
}

export default function Card({ post }: Props) {
   const router = useRouter();
   return (
      <div className="card">
         <div className="card__body">
            <div className="card__title">{post.title}</div>
            <div className="card__summary">
               <p>{post.summary}</p>
            </div>
            <div>
               <CustomButton
                  title={'Ver detalles'}
                  handleClick={() => {
                     router.push(url.postDetail(post.id));
                  }}
                  containerStyles="btn-primary"
               />
            </div>
         </div>
         <div className="card__image">
            <Image
               src={post.coverImage || '/assets/images/logo.png'}
               alt="logo"
               width={500}
               height={480}
            />
         </div>
      </div>
   );
}
