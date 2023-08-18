'use client';
import React, { useEffect, useState } from 'react';
import ClearIcon from '@mui/icons-material/Clear';

import { IAssets } from '@/interfaces';
import { urlApi } from '@/libs/utils/url';
import { ImageComponent } from '../ImageComponent';

interface Props {
   file: IAssets | any;
   isImage?: boolean;
   children: React.ReactNode;
}

export const FrameViewerModal = ({ file, isImage = false, children }: Props) => {
   const [isOpen, setIsOpen] = useState(false);

   const handleIdentifyClick = (e: any) => {
      if (isImage && e.target.tagName !== 'IMG') return;
      setIsOpen(() => true);
   };

   useEffect(() => {
      const handleKeyDown = (e: KeyboardEvent) => {
         if (e.key === 'Escape') setIsOpen(() => false);
      };

      document.addEventListener('keydown', handleKeyDown);

      return () => {
         document.removeEventListener('keydown', handleKeyDown);
      };
   }, []);

   if (!isOpen)
      return (
         <div
            onClick={handleIdentifyClick as any}
            className={`cursor-pointer ${isImage ? 'w-full h-full' : ''}`}>
            {children}
         </div>
      );

   return (
      <div className="modal-container p-5">
         <div
            key={file.id}
            className={`${
               file.type !== 'Pdf' ? '' : 'h-full '
            }pt-6 w-full bg-white lg:w-1/2 relative rounded-lg shadow-lg text-black
                  `}>
            <button
               className="absolute top-0 right-0 "
               onClick={() => setIsOpen(() => false)}>
               <ClearIcon />
            </button>
            {isImage ? (
               <ImageComponent
                  src={`${urlApi}/${file.name}`}
                  alt={file.name}
                  w={1024}
                  h={768}
               />
            ) : (
               <iframe
                  width="100%"
                  height={file.type !== 'Pdf' ? '500' : '100%'}
                  src={
                     file.type === 'Enlace'
                        ? file.name
                        : file.tempPath || `${urlApi}/${file.name}`
                  }
                  title={`view-${file.id}-${file.name}`}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"></iframe>
            )}
         </div>
      </div>
   );
};