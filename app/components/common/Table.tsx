import React from 'react';
import { TableProps } from '@/app/types';

export const Table = ({ data }: TableProps) => {
   return (
      <table>
         <thead>
            <tr>
               {Object.entries(data).map((item) => {
                  return '';
               })}
            </tr>
         </thead>
      </table>
   );
};
