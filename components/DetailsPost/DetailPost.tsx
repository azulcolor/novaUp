'use client';

import { IPost } from '@/interfaces';
import Image from 'next/image';
import { useEffect, useState } from 'react';

interface Props {
   post: IPost;
}

const url = 'https://fakeimg.pl/1600x900/ff6600/ba00ba?text=';

export default function PostDetail({ post }: Props) {
   const [imageSelected, setImageSelected] = useState(post.coverImage);
   const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });

   useEffect(() => {
      const handleResize = () => {
         setWindowSize({
            width: window.innerWidth,
            height: window.innerHeight,
         });
      };
      window.addEventListener('resize', handleResize);
      handleResize();
      return () => {
         window.removeEventListener('resize', handleResize);
      };
   }, []);

   const isMobile = windowSize.width <= 768;

   const images = [
      { url: post.coverImage },
      { url: url + '1' },
      { url: url + '2' },
      { url: url + '3' },
      { url: url + '4' },
      { url: url + '5' },
      { url: url + '6' },
      { url: url + '7' },
      { url: url + '8' },
      { url: url + '9' },
      { url: url + '10' },
   ];

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

            <div className="md:row-span-2 lg:row-span-2 md:mt-10 xl:mt-10">
               <Image
                  className="rounded-xl h-full w-full"
                  src={imageSelected || '/assets/images/logo.png'}
                  alt="logo"
                  width={800}
                  height={450}
               />
            </div>
            <div className="md:row-span-2 lg:row-span-3">
               <p className="text-neutral-500 text-base xl:text-lg 2xl:text-xl whitespace-pre-line lg:pr-12">
                  {post.description}
               </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 px-2">
               {images.map((image, i) => {
                  return (
                     <Image
                        key={i}
                        className={`rounded-xl w-full h-full md:max-h-20 lg:max-h-28 ${
                           image.url === imageSelected
                              ? 'md:contrast-50 lg:contrast-50'
                              : ''
                        }`}
                        src={`${image.url}`}
                        alt="other image"
                        width={800}
                        height={450}
                        onClick={isMobile ? () => {} : () => setImageSelected(image.url)}
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
