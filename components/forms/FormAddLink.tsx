'use client';
import React, { ChangeEvent, useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import ClearIcon from '@mui/icons-material/Clear';

import { CustomInputText } from '@/components/CustomInputs/CustomInputText';

import { IPostForm } from '@/interfaces';
import { apiRequest } from '@/libs/axios-api';

interface Props {
   formData: IPostForm;
   setFormData: React.Dispatch<React.SetStateAction<IPostForm>>;
}

export const FormAddLink = (props: Props) => {
   const { formData, setFormData } = props;
   const [currentLink, setCurrentLink] = useState('');
   const [errorLink, setErrorLink] = useState('');

   const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
      setCurrentLink(() => e.target.value);
   };

   const handleAddLink = async () => {
      let title = `video_${formData.videos.length + 1}}`;
      const urlMatch = currentLink.match(/src="([^"]+)"/);

      if (urlMatch) {
         const url = urlMatch[1];
         const parts = url.split('/');
         const videoId = parts[parts.length - 1];

         const snipeds = await apiRequest.getYoutubeSnippet(videoId);
         title = snipeds?.items[0]?.snippet?.title;
         setFormData({
            ...formData,
            videos: [...formData.videos, { title, url: currentLink }],
         });
         setCurrentLink(() => '');
      } else {
         setErrorLink(() => 'El link no es valido');
      }
   };
   return (
      <div className="container-form-files">
         <CustomInputText
            placeholder="Youtube link"
            attributeToChangue="currentTag"
            value={currentLink || ''}
            onChangueValue={handleInput}>
            <button
               className="custom-text__btn"
               onClick={handleAddLink}
               disabled={currentLink === ''}>
               <AddIcon />
            </button>
         </CustomInputText>

         <div className="container__tags">
            {formData.videos?.map((link, index) => (
               <div key={index} className="custom-tag">
                  <p>{link.title}</p>
                  <button
                     className="custom-tag__btn"
                     onClick={() => {
                        setFormData((prev: IPostForm) => ({
                           ...prev,
                           videos: prev.videos?.filter(
                              (linkFilter) => linkFilter !== link
                           ),
                        }));
                     }}>
                     <ClearIcon />
                  </button>
               </div>
            ))}
         </div>
      </div>
   );
};
