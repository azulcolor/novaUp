'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import ClearIcon from '@mui/icons-material/Clear';

import CustomFileInput from '@/components/CustomInputs/CustomFileInput';
import { Info } from '@/components/alerts/Info';

import { IPostForm } from '@/interfaces';

interface Props {
   formData: IPostForm;
   setFormData: React.Dispatch<React.SetStateAction<IPostForm>>;
}

export const FormAddImage = (props: Props) => {
   const { formData, setFormData } = props;
   const [filesError, setFilesError] = useState('');
   const limit = 10;

   const handleAddImage = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (!e.target.files) return;
      setFilesError(() => '');

      const acceptedTypes = [
         'image/jpeg',
         'image/png',
         'image/jpg',
         'image/gif',
         'image/webp',
         'image/svg+xml',
         'image/apng',
      ];
      const validateType = Array.from(e.target.files).some(
         (file) => file.type && !acceptedTypes.includes(file.type)
      );

      if (validateType) {
         setFilesError(() => 'Solo puedes subir archivos de imagen');
      }

      const currentSlots = formData.images ? formData.images.length : 0;

      if (currentSlots >= limit) {
         setFilesError(() => `Solo puedes subir un maximo de ${limit} archivos`);
         return;
      }

      const selectedFiles = Array.from(e.target.files)
         .filter((file) => file.type && acceptedTypes.includes(file.type))
         .slice(0, limit - currentSlots); // Limitar a 10 archivos

      const validFiles = selectedFiles.filter((file) => file.size <= 5000000); // 5MB límite

      if (currentSlots + e.target.files.length > limit) {
         setFilesError(() => 'Solo puedes subir un maximo de 10 archivos');
      }

      if (validFiles.length < selectedFiles.length) {
         setFilesError(() => 'Algunos archivos son demasiado grandes');
      }
      // Almacenar los objetos File directamente en el estado
      setFormData({ ...formData, images: [...formData.images, ...validFiles] });
   };

   const handleDeleteImage = (name: string) => {
      setFormData({
         ...formData,
         images: formData.images.filter((file) => file.name !== name),
      });
   };

   return (
      <div className="container-form-files">
         <Info message="Puedes subir hasta 10 imágenes, no mayores a 5MB" />
         <CustomFileInput
            name="image"
            label="Cargar imagenes"
            onChange={handleAddImage}
            error={filesError}
            accept="image/*"
         />
         <div className="form-files">
            {formData.images.map((file, index) => (
               <div key={index} className="file">
                  <button onClick={() => handleDeleteImage(file.name)}>
                     <ClearIcon />
                  </button>
                  <Image
                     src={URL.createObjectURL(file)}
                     alt=""
                     width={120}
                     height={120}
                  />
               </div>
            ))}
         </div>
      </div>
   );
};
