'use client'
import React from 'react';
import { IPostRequest } from '@/interfaces';

interface Props {
    formData: IPostRequest; 
    setFormData: React.Dispatch<React.SetStateAction<IPostRequest>>;
}

export const FormAddImage = (props: Props) => {
   return (
      <div>
        add image
      </div>
   );
};