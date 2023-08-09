'use client';
import { useEffect, useState } from 'react';

import { ImageComponent } from '@/components/common/ImageComponent';

import { IAssets, IPost } from '@/interfaces';
import { urlApi } from '@/libs/utils/url';

interface Props {
   post: IPost;
}

enum Assets {
   Imagen = 'Imagen',
   Enlace = 'Enlace',
   File = 'File',
}

const moocAsset: IAssets[] = [
   { id: 1001, name: 'https://www.youtube.com/embed/zaKnUdYUCHM', type: Assets.Enlace },
   { id: 1002, name: 'https://www.youtube.com/embed/zaKnUdYUCHM', type: Assets.Enlace },
   { id: 1003, name: 'https://www.youtube.com/embed/SqrV4fs2qJk', type: Assets.Enlace },
   {
      id: 1004,
      name: 'https://upqroo.edu.mx/wp-content/uploads/2023/04/guia_inscripcion_NI20231.pdf',
      type: Assets.File,
   },
   {
      id: 1005,
      name: 'https://upqroo.edu.mx/wp-content/uploads/2023/04/guia_inscripcion_NI20231.pdf',
      type: Assets.File,
   },
   {
      id: 1006,
      name: 'https://upqroo.edu.mx/wp-content/uploads/2023/04/guia_inscripcion_NI20231.pdf',
      type: Assets.File,
   },
];

export default function PostDetail({ post }: Props) {
   post.assets ? post.assets.concat(moocAsset) : (post.assets = moocAsset);
   const [imageSelected, setImageSelected] = useState(post.coverImage);
   const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });
   const assets = post.assets
      ? {
           images: post.assets.filter((asset) => asset.type === Assets.Imagen),
           videos: moocAsset.filter((asset) => asset.type === Assets.Enlace),
           pdf: moocAsset.filter((asset) => asset.type === Assets.File),
        }
      : { images: [], videos: [], pdf: [] };

   assets.images.unshift({ id: 0, name: post.coverImage, type: Assets.Imagen });

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
                  xl:text-4xl xl:mb-8">
                  {post.title}
               </p>
            </div>

            
               <ImageComponent
                  src={`${urlApi}/${imageSelected}`}
                  w={1600}
                  h={900}
                  containerStyles="mx-auto md:row-span-2 md:mt-10"
                  imageStyle='cover__image rounded-xl object-cover'
               />
            
            <div className="md:row-span-2 lg:row-span-3">
               <p
                  className="
               text-neutral-500 text-base whitespace-pre-line text-justify
               lg:pr-12
               xl:text-lg 
               2xl:text-xl">
                  {post.description}
               </p>
            </div>
            <div
               className="
            grid grid-cols-1 gap-4 px-2 mx-auto
            md:grid-cols-2 
            lg:grid-cols-4">
               {assets.images.map((image, i) => {
                  return (
                     <ImageComponent
                        key={i}
                        src={`${urlApi}/${image.name}`}
                        w={828}
                        h={466}
                        containerStyles=''
                        imageStyle={`
                        rounded-xl w-full h-full 
                        md:max-h-20 lg:max-h-28 
                        ${image.name === imageSelected ? 'md:contrast-50' : ''}`}
                              handleClick={
                                 isMobile ? () => {} : () => setImageSelected(image.name)
                              }
                        addLoader={true}
                     />
                  );
               })}
            </div>
         </div>
         <div className="pt-8 flex flex-wrap justify-start">
            {assets.videos.map((video) => {
               return (
                  <div
                     key={video.id}
                     className="
                  py-2 md:p-4
                  w-full
                  h-auto
                  lg:w-1/2
                  ">
                     <iframe
                        className="video__post mx-auto"
                        width="800"
                        height="500"
                        src={video.name}
                        title="YouTube video player"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"></iframe>
                  </div>
               );
            })}
         </div>
         <div className="pt-8 flex flex-wrap justify-start">
            {assets.pdf.map((pdf) => {
               return (
                  <div
                     key={pdf.id}
                     className="
                  py-2 md:p-4
                  w-full
                  h-auto
                  lg:w-1/2
                  ">
                     <iframe
                        className="video__post mx-auto"
                        width="800"
                        height="500"
                        src={pdf.name}
                        title="YouTube video player"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"></iframe>
                  </div>
               );
            })}
         </div>
      </>
   );
}
