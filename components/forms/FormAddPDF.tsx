'use client';
import React, { useState } from 'react';
import ClearIcon from '@mui/icons-material/Clear';

import { Info } from '@/components/alerts/Info';
import CustomFileInput from '@/components/CustomInputs/CustomFileInput';

import { IPostForm } from '@/interfaces';

interface Props {
   formData: IPostForm;
   setFormData: React.Dispatch<React.SetStateAction<IPostForm>>;
}

export const FormAddPDF = (props: Props) => {
   const { formData, setFormData } = props;
   const [filesError, setFilesError] = useState('');
   const limit = 5;

   const handleAddPDF = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (!e.target.files) return;
      setFilesError(() => '');

      const currentSlots = formData.pdfs ? formData.pdfs.length : 0;

      if (currentSlots >= limit) {
         setFilesError(() => `Solo puedes subir un maximo de ${limit} archivos`);
         return;
      }

      const selectedFiles = Array.from(e.target.files).slice(0, limit - currentSlots); // Limitar a 10 archivos
      const validFiles = selectedFiles.filter((file) => file.size <= 2000000); // 2MB límite

      if (currentSlots + e.target.files.length > limit) {
         setFilesError(() => `Solo puedes subir un maximo de ${limit} archivos`);
      }

      if (validFiles.length < selectedFiles.length) {
         setFilesError(() => 'Algunos archivos son demasiado grandes');
      }
      // Almacenar los objetos File directamente en el estado
      setFormData({ ...formData, pdfs: [...formData.pdfs, ...validFiles] });
   };

   const handleDeletePDF = (name: string) => {
      setFormData({
         ...formData,
         pdfs: formData.pdfs.filter((file) => file.name !== name),
      });
   };

   return (
      <div className="container-form-files">
         <Info message="Puedes subir hasta 5 pdfs, no mayores a 2MB" />

         <CustomFileInput
            name="image"
            label="Cargar PDF's"
            onChange={handleAddPDF}
            error={filesError}
            accept="application/pdf"
         />

         <div className="form-files">
            {formData.pdfs.map((file, index) => (
               <div className="file--pdf" key={index}>
                  <div>
                     <span className="file-name">{file.name}</span>
                     <span className="file-size">
                        ({(file.size / 1000000).toFixed(2)}MB)
                     </span>
                  </div>
                  <button
                     className="file-delete"
                     onClick={() => handleDeletePDF(file.name)}>
                     <ClearIcon />
                  </button>
               </div>
            ))}
         </div>
      </div>
   );
};
