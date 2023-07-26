import React from 'react';
import SearchIcon from '@mui/icons-material/Search';
import Image from 'next/image';

export const InputSearch = () => {
   return (
      <div className="search-container">
         <i className="icon-left">
            <Image src="/svg/Student.svg" width={24} height={24} alt="student-svg" />
         </i>
         <input type="text" className="search-input" placeholder="Buscar..." />
         <i className="icon-right">
            <SearchIcon />
         </i>
      </div>
   );
};
