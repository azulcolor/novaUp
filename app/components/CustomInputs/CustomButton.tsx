'use client';

import React from 'react';
import { CustomButtonProps } from '../../types';

export const CustomButton = ({
   title,
   handleClick,
   containerStyles = '',
   btnType = 'button',
   disabled = false,
}: CustomButtonProps) => {
   return (
      <button
         disabled={disabled}
         type={btnType}
         className={`btn ${containerStyles}`}
         onClick={handleClick}>
         <span className="flex justify-center">{title}</span>
      </button>
   );
};
