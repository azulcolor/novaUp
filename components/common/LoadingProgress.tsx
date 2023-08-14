import React from 'react';
import { HammondLoader } from '@/components/common/HammondLoader';

export const LoadingProgress = () => {
   return (
      <div className="w-screen h-screen flex justify-center align-center mt-auto mb-auto ">
         <HammondLoader />
         <div className="progress-loader">
            <div className="progress" />
         </div>
      </div>
   );
};
