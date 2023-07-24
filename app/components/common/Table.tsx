'use client';

import React, { useState } from 'react';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

import { TableProps } from '@/app/types';
import { ConfirmationModal } from './ConfirmationModal';

export const Table = ({ data, itemsPage }: TableProps) => {
   const [currentPage, setCurrentPage] = useState(1);
   const headers = Object.keys(data[0] || {});

   const totalPages = data.length;
   const pages = Math.trunc(totalPages / itemsPage);

   const handleNextPage = () => {
      if (currentPage >= totalPages) return;
      setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
   };

   const handlePreviusPage = () => {
      if (currentPage <= 0) return;
      setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
   };

   return (
      <div>
         <table>
            <thead>
               <tr>
                  {headers.map((header, index) => (
                     <th key={index}>{header}</th>
                  ))}
                  <th />
               </tr>
            </thead>
            <tbody>
               {data
                  .slice((currentPage - 1) * itemsPage, currentPage * itemsPage)
                  .map((row, index) => (
                     <tr key={index}>
                        {headers.map((header, index) => (
                           <td key={index}>{row[header]}</td>
                        ))}
                        <td>
                           <ConfirmationModal
                              title={`¿Seguro que quieres borrar ${
                                 row['Titulo'] || row['Email']
                              }?`}
                              target={row['id']}>
                              <DeleteForeverIcon />
                           </ConfirmationModal>
                        </td>
                     </tr>
                  ))}
            </tbody>
         </table>
         <div className="table-control">
            <button onClick={handlePreviusPage}>
               <ArrowBackIosIcon />
            </button>
            {Array.from({ length: pages || 1 }, (_, i) => (
               <button key={`page-${i + 1}`} onClick={() => setCurrentPage(() => i + 1)}>
                  {i + 1}
               </button>
            ))}
            <button onClick={handleNextPage}>
               <ArrowForwardIosIcon />
            </button>
         </div>
      </div>
   );
};
