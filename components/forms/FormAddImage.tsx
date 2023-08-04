'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import ClearIcon from '@mui/icons-material/Clear';

import CustomFileInput from '@/components/CustomInputs/CustomFileInput';
import { Info } from '@/components/alerts/Info';

import { IPostCurrentResources, IPostResources } from '@/interfaces';
import { toast } from 'react-hot-toast';
import { ConfirmationModal } from '../common/modals/ConfirmationModal';
import { urlApi } from '@/libs/utils/url';

interface Props {
   currentFiles: IPostCurrentResources;
   setCurrentFiles: React.Dispatch<React.SetStateAction<IPostCurrentResources>>;
   formData: IPostResources;
   setFormData: React.Dispatch<React.SetStateAction<IPostResources>>;
}

export const FormAddImage = (props: Props) => {
   const { currentFiles, setCurrentFiles, formData, setFormData } = props;
   const limit = 10;

   const handleAddImage = (
      e: React.ChangeEvent<HTMLInputElement>,
      isCoverImage = false
   ) => {
      if (!e.target.files) return;

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
         toast.error('Solo puedes subir archivos de imagen');
      }

      const currentSlots = formData.images ? formData.images.length : 0;

      if (currentSlots >= limit) {
         toast.error(`Solo puedes subir un maximo de ${limit} archivos`);
         return;
      }

      const selectedFiles = Array.from(e.target.files)
         .filter((file) => file.type && acceptedTypes.includes(file.type))
         .slice(0, limit - currentSlots); // Limitar a 10 archivos

      const validFiles = selectedFiles.filter((file) => file.size <= 5000000); // 5MB límite

      if (currentSlots + e.target.files.length > limit) {
         toast.error('Solo puedes subir un maximo de 10 archivos');
      }

      if (validFiles.length < selectedFiles.length) {
         toast.error('Algunos archivos son demasiado grandes');
      }
      // Almacenar los objetos File directamente en el estado
      if (isCoverImage) {
         setFormData({ ...formData, coverImage: validFiles[0] });
      } else {
         setFormData({ ...formData, images: [...formData.images, ...validFiles] });
      }
   };

   const handleDeleteImage = (name: string) => {
      setFormData({
         ...formData,
         images: formData.images.filter((file) => file.name !== name),
      });
   };

   const handleDeleteCoverImage = () => {
      setFormData({
         ...formData,
         coverImage: '',
      });
   };

   return (
      <div className="container-form-files">
         <Info message="Puedes subir hasta 10 imágenes, no mayores a 5MB" />
         <div className="flex flex-row justify-between w-full">
            <CustomFileInput
               name="cover-image"
               label="Cargar Portada"
               multiple={false}
               onChange={(e) => handleAddImage(e, true)}
               accept="image/*"
            />
            <CustomFileInput
               name="image"
               label="Cargar imagenes"
               onChange={handleAddImage}
               accept="image/*"
            />
         </div>
         <div className="form-files">
            <div className="file">
               <button className="file__delete" onClick={handleDeleteCoverImage}>
                  <ClearIcon />
               </button>
               <Image
                  src={
                     formData?.coverImage instanceof File
                        ? URL.createObjectURL(formData.coverImage)
                        : formData.coverImage || '/assets/images/image-not-found.png'
                  }
                  alt={`cover-image`}
                  width={500}
                  height={480}
               />
            </div>
            {currentFiles.images.map((file, index: number) => (
               <div key={index} className="file">
                  <ConfirmationModal
                     title="¿Seguro que deseas eliminar esta imagen?"
                     target={file.id}
                     fetcher="delete-asset"
                     extraReloadFunc={() =>
                        setCurrentFiles((prev) => ({
                           ...prev,
                           images: prev.images.filter((f) => f.id !== file.id),
                        }))
                     }>
                     <ClearIcon />
                  </ConfirmationModal>
                  <Image
                     src={`${urlApi}/${file.name}`}
                     alt={`image-${index}`}
                     width={500}
                     height={480}
                  />
               </div>
            ))}
            {formData.images.map((file, index: number) => (
               <div key={index} className="file">
                  <button
                     className="file__delete"
                     onClick={() => handleDeleteImage(file.name)}>
                     <ClearIcon />
                  </button>
                  <Image
                     src={URL.createObjectURL(file)}
                     alt=""
                     width={500}
                     height={480}
                  />
               </div>
            ))}
         </div>
      </div>
   );
};
