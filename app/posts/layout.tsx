import React from 'react';
import { CustomSelect } from '@/components/CustomInputs/CustomSelect';

interface Props {
   children: React.ReactNode;
}

export default function PostLayout({ children }: Props) {
   return (
      <>
         <div className="post-layout">
            <CustomSelect
               placeholder="Recientes"
               options={[]}
               select={{ id: 0, name: '' }}
            />
         </div>
         {children}
      </>
   );
}
