'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';

interface Props {
   src: string;
   handleClick?: () => void;
   containerStyles?: string;
   alt?: string;
   defaultImg?: string;
   w: number;
   h: number;
}

export const ImageComponent = ({
   src,
   handleClick,
   containerStyles = '',
   alt = 'Imagen Original',
   defaultImg = '/assets/images/image-not-found.png',
   w,
   h,
}: Props) => {
   const [image, setImage] = useState(src);

   const handleImageError = () => {
      setImage(defaultImg);
   };

   useEffect(() => {
      setImage(src);
   }, [src]);

   return (
      <Image
         src={image}
         alt={alt}
         width={w}
         height={h}
         onError={handleImageError}
         className={containerStyles}
         onClick={image !== defaultImg && handleClick ? handleClick : () => {}}
      />
   );
};
