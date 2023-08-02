import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { CustomButton } from '@/components/CustomInputs/CustomButton';
import { IPost } from '@/interfaces';
import { url } from '@/libs/utils/url';

interface Props {
   post: IPost;
}

export default function CarouselCard({ post }: Props) {
   const router = useRouter();
   return (
      <div className="cardcarousel">
         <div className="cardcarousel__body">
            <div>
               <div className="cardcarousel__title">{post.title}</div>
               <div className="cardcarousel__summary">
                  <p>{post.summary}</p>
               </div>
            </div>
            <div className="cardcarousel__button">
               <CustomButton
                  title={'Ver detalles'}
                  handleClick={() => {
                     router.push(url.postDetail(post.id));
                  }}
                  containerStyles="btn-primary"
               />
            </div>
         </div>
         <div className="cardcarousel__image">
            <Image
               src={post.coverImage || '/assets/images/image-not-found.png'}
               alt="logo"
               width={500}
               height={480}
            />
         </div>
      </div>
   );
}
