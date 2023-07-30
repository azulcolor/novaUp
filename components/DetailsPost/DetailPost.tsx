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

export default function PostDetail({ post }: Props) {
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
      <>
         <div className="post-detail-layout gap-4 lg:mt-8">
            <div className="">
               <p
                  className="text-3xl 
                  xl:text-4xl xl:mb-8
                  font-semibold mb-2 
                  mt-2"
               >
                  {post.title}
               </p>
            </div>

            <div className="lg:row-span-2 xl:mt-10">
               <Image
                  className="rounded-xl h-full w-full"
                  src={imageSelected || '/assets/images/logo.png'}
                  alt="logo"
                  width={800}
                  height={450}
               />
            </div>
            <div className="lg:row-span-3">
               <p className="text-neutral-500 text-base xl:text-lg whitespace-pre-line lg:pr-12">
                  {post.description}
               </p>
            </div>
            <div className="grid grid-cols-4 gap-4 px-2">
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
         <div className="pt-8 flex justify-center">
            <iframe
               className="h-60 md:w-1/2 lg:w-1/2 lg:h-96"
               width="800"
               height="487"
               src="https://www.youtube.com/embed/zaKnUdYUCHM"
               title="YouTube video player"
               allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            ></iframe>
         </div>
      </>
   );
}
