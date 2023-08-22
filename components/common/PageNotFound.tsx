'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import { ImageComponent } from '@/components/common/ImageComponent';
import { CustomButton } from '@/components/CustomInputs/CustomButton';
import { url } from '@/libs/utils/url';

interface Props {
   title?: string;
}

export const PageNotFound = ({ title = '¡Oops! No encontramos la página' }: Props) => {
   const router = useRouter();
   return (
      <div className="w-full flex justify-center flex-col">
         <ImageComponent
            src="/svg/404-cat.svg"
            w={550}
            h={250}
            containerStyles="flex justify-center"
         />
         <h1 className="text-center text-2xl font-bold mb-4">{title}</h1>
         <div className="flex flex-row justify-center">
            <CustomButton
               title="Volver al inicio"
               containerStyles="mr-4 btn-primary"
               handleClick={() => router.push(url.home())}
            />
            <CustomButton
               title="Ver categorias"
               containerStyles="btn-primary"
               handleClick={() => router.push(url.posts())}
            />
         </div>
      </div>
   );
};
