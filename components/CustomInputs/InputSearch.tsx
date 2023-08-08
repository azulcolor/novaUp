'use client';
import React from 'react';
import SearchIcon from '@mui/icons-material/Search';
import Image from 'next/image';
import { useRouter, usePathname } from 'next/navigation';
import { ImageComponent } from '../common/ImageComponent';

export const InputSearch = () => {
   const router = useRouter();
   const path = usePathname();
   const handleSearchChangue = (search: string) => {
      router.replace(`${path}?search=${search}`);
   };
   return (
      <div className="search-container">
         <i className="icon-left">
            <ImageComponent src="/svg/Student.svg" w={24} h={24} alt="student-svg" />
         </i>
         <input
            type="text"
            className="search-input"
            placeholder="Buscar publicación..."
            onChange={(e) => handleSearchChangue(e.target.value)}
         />
         <i className="icon-right">
            <SearchIcon />
         </i>
      </div>
   );
};
