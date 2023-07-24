'use client';

import React from 'react';

interface Props {
   title: string;
   handleClick: () => void;
   containerStyles?: string;
   btnType?: 'button' | 'submit';
   disabled?: boolean;
}

export const CustomButton = ({
   title,
   handleClick,
   containerStyles = '',
   btnType = 'button',
   disabled = false,
}: Props) => {
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
