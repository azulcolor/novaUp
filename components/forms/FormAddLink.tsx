'use client';
import React, { ChangeEvent, useState } from 'react';
import toast from 'react-hot-toast';
import AddIcon from '@mui/icons-material/Add';
import ClearIcon from '@mui/icons-material/Clear';

import { CustomInputText } from '@/components/CustomInputs/CustomInputText';
import { Error } from '@/components/alerts/Error';

import { IPostResources } from '@/interfaces';
import { apiRequest } from '@/libs/axios-api';

interface Props {
   formData: IPostResources;
   setFormData: React.Dispatch<React.SetStateAction<IPostResources>>;
}

export const FormAddLink = (props: Props) => {
   const { formData, setFormData } = props;
   const [currentLink, setCurrentLink] = useState('');

   const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
      setCurrentLink(() => e.target.value);
   };

   const handleAddLink = async () => {
      let title = `video_${formData.videos.length + 1}}`;
      const urlMatch = currentLink.match(/src="([^"]+)"/);

      if (urlMatch) {
         const url = urlMatch[1];
         const parts = url?.split('/');
         const videoId = parts[parts?.length - 1];

         const snipeds = await apiRequest.getYoutubeSnippet(videoId);
         if (snipeds?.items?.length > 0) {
            title = snipeds?.items[0]?.snippet?.title;
         }
         setFormData({
            ...formData,
            videos: [...formData.videos, { title, url: currentLink }],
         });
      } else {
         toast.error('El link no es valido');
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
                        setFormData((prev: IPostResources) => ({
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
