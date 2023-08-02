'use client';

import React, { ChangeEvent, useEffect, useState } from 'react';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import AddIcon from '@mui/icons-material/Add';

import { CustomSelect } from '@/components/CustomInputs/CustomSelect';
import { CustomInputText } from '@/components/CustomInputs/CustomInputText';
import { CustomTextarea } from '@/components/CustomInputs/CustomTextarea';
import { CustomButton } from '@/components/CustomInputs/CustomButton';
import { FormAddImage } from '@/components/forms/FormAddImage';
import { FormAddPDF } from '@/components/forms/FormAddPDF';
import { FormAddLink } from '@/components/forms/FormAddLink';

import { ICatalogGen, IPost, IPostRequest, IPostResources } from '@/interfaces';
import { Error } from '../alerts/Error';
import { CustomTag } from '../common/CustomTag';
import { useRouter } from 'next/navigation';
import CustomInputDate from '../CustomInputs/CustomInputDate';
import { serializedNewPost } from '@/libs/utils/serializers';
import { apiRequest } from '@/libs/axios-api';
import { getCookie } from 'cookies-next';
import { urlApi } from '@/libs/utils/url';

interface Props {
   post: IPost;
   categories: ICatalogGen[];
   typesPost: ICatalogGen[];
}

export default function FormPost(props: Props) {
   const { post, categories, typesPost } = props;
   const router = useRouter();

   const [showForm, setShowForm] = useState('Image');
   const [isLoading, setIsLoading] = useState(false);
   const [resources, setResources] = useState<IPostResources>({
      coverImage: post.coverImage
         ? `${urlApi}/${post.coverImage}`
         : '/assets/images/image-not-found.png',
      images: [],
      videos: [],
      pdfs: [],
   });

   const [formData, setFormData] = useState<IPostRequest>({
      id: post.id || 0,
      category: post.category || { id: 0, name: 'Categorías' },
      assets: post.assets || [],
      title: post.title || '',
      description: post.description || '',
      summary: post.summary || '',
      publishDate: '',
      eventDate: '',
      typeSelect: post.type
         ? { id: 0, name: post.type }
         : { id: 0, name: 'Tipo de publicación' },
      type: post.type || '',
      tags: post.tags || '',
      tagsList: post.tags ? post.tags.split(',') : [],
      currentTag: '',
      comments: post.comments || '',
   });

   const handleInput = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const fieldName = e.target.name;
      const fieldValue = e.target.value;

      setFormData((prevState: IPostRequest) => ({
         ...prevState,
         [fieldName]: fieldValue,
      }));
   };

   const handleChangueSelectInput = (attribute: string, value: ICatalogGen) => {
      setFormData((prevState: IPostRequest) => ({
         ...prevState,
         [attribute]: value,
      }));
   };

   const handleAddTag = () => {
      if (formData.currentTag === '' || !formData.currentTag) return;
      setFormData((prevState: IPostRequest) => ({
         ...prevState,
         tagsList: [...(prevState.tagsList || []), prevState.currentTag || ''].filter(
            (tag) => tag !== ''
         ),
         currentTag: '',
      }));
   };

   const handleSubmit = async () => {
      setIsLoading(true);
      const token = getCookie('nova-access-token')?.toString() || '';
      const preData = { ...formData, ...resources };
      const data = serializedNewPost(preData);
      const formDataNewPost = new FormData();

      Object.keys(data).forEach((key) => {
         const value = data[key as keyof typeof data];

         if (value) {
            if (Array.isArray(value) && value.length > 0 && value[0] instanceof File) {
               // Si es un array de archivos, los agregamos uno por uno
               value.forEach((file) => formDataNewPost.append(key, file));
            } else if (value instanceof File) {
               // Si es un archivo individual
               formDataNewPost.append(key, value);
            } else {
               // Otros valores se convierten a cadena
               formDataNewPost.append(key, String(value));
            }
         }
      });

      if (formData.id) {
         console.log('update post axios');
      } else {
         const savePost = await apiRequest.newPost(token, formDataNewPost);
         console.log(savePost);
      }
      setIsLoading(false);
   };

   const handleSelector = (slug: 'Image' | 'PDF' | 'Link') => setShowForm(slug);
   const handleBack = () => router.back();

   return (
      <div className="form__post">
         <div className="container__text">
            <div className="container__subtitle cursor-pointer" onClick={handleBack}>
               <PlayArrowIcon sx={{ transform: 'rotate(180deg)', color: '#607EE9' }} />
               <h3>Regresar</h3>
            </div>
            <div className="container__inputs">
               <div>
                  <CustomInputDate
                     name="eventDate"
                     onChange={handleInput}
                     value={formData.eventDate}
                     label="Fecha del evento"
                  />
               </div>
               <CustomTextarea
                  name={'title'}
                  value={formData.title}
                  minRows={1}
                  onChangueValue={handleInput}
                  placeholder={'Encabezado'}
                  boldText={true}
               />
               <Error
                  message={
                     formData.title.length > 80
                        ? `Excedio el limite de caracteres ${formData.title.length} de 80`
                        : ''
                  }
               />
               <CustomTextarea
                  name={'summary'}
                  value={formData.summary}
                  minRows={3}
                  onChangueValue={handleInput}
                  placeholder={'Descripción corta'}
               />
               <Error
                  message={
                     formData.summary.length > 120
                        ? `Excedio el limite de caracteres ${formData.summary.length} de 120`
                        : ''
                  }
               />
               <CustomTextarea
                  name={'description'}
                  value={formData.description}
                  minRows={20}
                  onChangueValue={handleInput}
                  placeholder={'Artículo'}
               />
            </div>
         </div>
         <div className="container__multimedia">
            <div className="container__subtitle">
               <h3>Multimedia</h3>
            </div>

            <div className="">
               <p>Presiona el formato que deseas subir</p>
               <div className="container__btns__multimedia">
                  <CustomButton
                     title={'Imagen'}
                     handleClick={() => handleSelector('Image')}
                     containerStyles={
                        'w-1/5 py-2 h-auto bg-primary rounded-lg text-background'
                     }
                  />

                  <CustomButton
                     title={'PDF'}
                     handleClick={() => handleSelector('PDF')}
                     containerStyles={
                        'w-1/5 py-2 h-auto bg-secondary rounded-lg text-background'
                     }
                  />

                  <CustomButton
                     title={'Link'}
                     handleClick={() => handleSelector('Link')}
                     containerStyles={
                        'w-1/5 py-2 h-auto bg-redBtn rounded-lg text-background'
                     }
                  />
               </div>
               {showForm === 'Image' ? (
                  <FormAddImage formData={resources} setFormData={setResources} />
               ) : null}

               {showForm === 'PDF' ? (
                  <FormAddPDF formData={resources} setFormData={setResources} />
               ) : null}

               {showForm === 'Link' ? (
                  <FormAddLink formData={resources} setFormData={setResources} />
               ) : null}
            </div>
            <div className="container-identifiers">
               <div className="container__subtitle">
                  <h3>Identificadores</h3>
               </div>

               <div className="container-indentifiers__body">
                  <CustomSelect
                     attributeToChangue="category"
                     defaultOption={formData.category}
                     options={categories}
                     onChangueValue={handleChangueSelectInput}
                  />
                  <CustomSelect
                     attributeToChangue="typeSelect"
                     defaultOption={formData.typeSelect!}
                     options={typesPost}
                     onChangueValue={handleChangueSelectInput}
                  />
               </div>

               <div className="w-full p-5" />

               <CustomInputText
                  placeholder="Tags"
                  attributeToChangue="currentTag"
                  value={formData.currentTag || ''}
                  onChangueValue={handleInput}>
                  <button
                     className="custom-text__btn"
                     onClick={handleAddTag}
                     disabled={formData.currentTag === ''}>
                     <AddIcon />
                  </button>
               </CustomInputText>

               <div className="container__tags">
                  {formData.tagsList?.map((tag, index) => (
                     <CustomTag
                        key={index}
                        tag={tag}
                        onDelete={() => {
                           setFormData((prev: IPostRequest) => ({
                              ...prev,
                              tagsList: prev.tagsList?.filter(
                                 (tagFilter: string) => tagFilter !== tag
                              ),
                           }));
                        }}
                     />
                  ))}
               </div>
            </div>
            <CustomButton
               title={'Crear publicación'}
               handleClick={handleSubmit}
               containerStyles="bg-primary w-1/3"
               isLoading={isLoading}
            />
         </div>
      </div>
   );
}
