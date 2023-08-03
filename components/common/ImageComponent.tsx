'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';

interface Props {
   src: string;
   handleClick?: () => void;
   containerStyles?: string;
   defaultImg?: string;
   w: number;
   h: number;
}

export const ImageComponent = ({
   src,
   handleClick,
   containerStyles = '',
   defaultImg = 'http://localhost:3000/assets/images/image-not-found_2.png',
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
         alt="Imagen Original"
         width={w}
         height={h}
         onError={handleImageError}
         className={containerStyles}
         onClick={handleClick}
      />
   );
};
