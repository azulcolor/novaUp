import { PageNotFound } from '@/components/common/PageNotFound';
import React from 'react';

export default function notFound() {
   return (
      <div className="flex align-center h-[80vh]">
         <PageNotFound />;
      </div>
   );
}
