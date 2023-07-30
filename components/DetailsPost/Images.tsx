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
      { url: image.url + '4' },
      { url: image.url + '5' },
      { url: image.url + '6' },
      { url: image.url + '7' },
      { url: image.url + '8' },
      { url: image.url + '9' },
      { url: image.url + '10' },
   ];
   const [imageSelected, setImageSelected] = useState(post.coverImage);

   return (
      <div className="flex flex-col items-center p-4 mt-12">
         <div className="pb-6">
            <Image
               className="rounded-xl h-full w-full"
               src={imageSelected || '/assets/images/logo.png'}
               alt="logo"
               width={800}
               height={450}
            />
         </div>
         <div className="grid grid-cols-4 gap-4 px-4">
            {images.map((image, i) => {
               return (
                  <Image
                     key={i}
                     className={`rounded-xl w-full h-full max-h-28 ${
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
