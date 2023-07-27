'use client';
import { IPost } from '@/interfaces';
import Image from 'next/image';
import { useState } from 'react';

interface Props {
   post: IPost;
}

const image = {
   url: 'https://fakeimg.pl/1600x900/ff6600/ba00ba?text=',
};

export default function ImagesDetail({ post }: Props) {
   const images = [
      { url: post.coverImage },
      { url: image.url + '1' },
      { url: image.url + '2' },
      { url: image.url + '3' },
   ];
   const [imageSelected, setImageSelected] = useState(post.coverImage);

   return (
      <div className="flex flex-col items-center p-4 mt-12">
         <div className="pb-2">
            <Image
               className="rounded-xl h-full w-full"
               src={imageSelected || '/assets/images/logo.png'}
               alt="logo"
               width={800}
               height={450}
            />
         </div>
         <div className="flex flex-wrap pt-4  justify-center">
            {images.map((image, i) => {
               return (
                  <Image
                     key={i}
                     className={`mb-2 mx-2 rounded-xl ${
                        image.url === imageSelected ? 'contrast-50' : ''
                     }`}
                     src={`${image.url}`}
                     alt="other image"
                     width={150}
                     height={75}
                     onClick={() => {
                        setImageSelected(image.url);
                     }}
                  />
               );
            })}
         </div>
      </div>
   );
}
