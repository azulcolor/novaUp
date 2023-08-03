'use client';

import { IPost } from '@/interfaces';
import { urlApi } from '@/libs/utils/url';
import Image from 'next/image';
import { useEffect, useState } from 'react';

interface Props {
   post: IPost;
}
enum assets {
   Imagen = 'Imagen',
}

export default function PostDetail({ post }: Props) {
   const [imageSelected, setImageSelected] = useState(post.coverImage);
   const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });
   const images = post.assets.filter((asset) => asset.type === assets.Imagen);
   images.unshift({ id: 0, name: post.coverImage, type: assets.Imagen });

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

   return (
      <>
         <div className="post-detail-layout gap-4 lg:mt-8">
            <div className="">
               <p
                  className="
                  text-3xl font-semibold mb-2 mt-2
                  xl:text-4xl xl:mb-8"
               >
                  {post.title}
               </p>
            </div>

            <div className="md:row-span-2 md:mt-10">
               <Image
                  className="rounded-xl w-full h-auto"
                  src={`${urlApi}/${imageSelected}` || '/assets/images/logo.png'}
                  alt="logo"
                  width={828}
                  height={466}
               />
            </div>
            <div className="md:row-span-2 lg:row-span-3">
               <p
                  className="
               text-neutral-500 text-base whitespace-pre-line
               lg:pr-12
               xl:text-lg 
               2xl:text-xl"
               >
                  {post.description}
               </p>
            </div>
            <div
               className="
            grid grid-cols-1 gap-4 px-2
            md:grid-cols-2 
            lg:grid-cols-4"
            >
               {images.map((image, i) => {
                  return (
                     <Image
                        key={i}
                        className={`
                        rounded-xl w-full h-full 
                        md:max-h-20 lg:max-h-28 
                        ${image.name === imageSelected ? 'md:contrast-50' : ''}`}
                        src={`${urlApi}/${image.name}`}
                        alt="other image"
                        width={828}
                        height={466}
                        onClick={isMobile ? () => {} : () => setImageSelected(image.name)}
                     />
                  );
               })}
            </div>
         </div>
         <div className="pt-8 flex justify-center">
            <iframe
               className="
               h-60 
               md:w-1/2
               lg:h-96"
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
