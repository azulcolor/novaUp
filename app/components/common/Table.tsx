import React from 'react';
import { TableProps } from '@/app/types';

export const Table = ({ data }: TableProps) => {
   const headers = Object.keys(data[0] || {});

   return (
      <table>
         <thead>
            <tr>
               {headers.map((header, index) => (
                  <th key={index}>{header}</th>
               ))}
            </tr>
         </thead>
         <tbody>
            {data.map((row, index) => (
               <tr key={index}>
                  {headers.map((header, index) => (
                     <td key={index}>{row[header]}</td>
                  ))}
               </tr>
            ))}
         </tbody>
      </table>
   );
};
