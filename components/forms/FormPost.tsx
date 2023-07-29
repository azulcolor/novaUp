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

import { ICatalogGen, IPost, IPostForm } from '@/interfaces';
import { Error } from '../alerts/Error';
import { CustomTag } from '../common/CustomTag';
import { useRouter } from 'next/navigation';

interface Props {
   post: IPost;
   categories: ICatalogGen[];
   typesPost: ICatalogGen[];
}

export default function FormPost(props: Props) {
   const { post, categories, typesPost } = props;
   const router = useRouter();

   useEffect(() => {
      console.log(post);
   }, []);

   const [showForm, setShowForm] = useState('Image');
   const [descriptionError, setDescriptionError] = useState('');
   const [filesError, setFilesError] = useState('');
   const [formData, setFormData] = useState<IPostForm>({
      id: post.id || 0,
      category: post.category || { id: 0, name: 'Deportes' },
      coverImage: post.coverImage || '',
      assets: post.assets || [],
      isPinned: post.isPinned || false,
      title: post.title || '',
      description: post.description || '',
      summary: post.summary || '',
      publishDate: '',
      eventDate: '',
      isApproved: false,
      typeSelect: post.type
         ? { id: 0, name: post.type }
         : { id: 0, name: 'Tipo de publicación' },
      type: post.type || '',
      tags: post.tags || '',
      currentTag: '',
      tagsList: post.tags ? post.tags.split(',') : [],
      comments: post.comments || '',
   });

   const handleInput = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const fieldName = e.target.name;
      const fieldValue = e.target.value;

      setFormData((prevState: IPostForm) => ({
         ...prevState,
         [fieldName]: fieldValue,
      }));
   };

   const handleAddTag = () => {
      if (formData.currentTag === '' || !formData.currentTag) return;
      setFormData((prevState: IPostForm) => ({
         ...prevState,
         tagsList: [...(prevState.tagsList || []), prevState.currentTag || ''].filter(
            (tag) => tag !== ''
         ),
         currentTag: '',
      }));
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
                     formData.title.length > 120
                        ? `Excedio el limite de caracteres ${formData.title.length} de 120`
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
                  <FormAddImage formData={formData} setFormData={setFormData} />
               ) : null}

               {showForm === 'PDF' ? (
                  <FormAddPDF formData={formData} setFormData={setFormData} />
               ) : null}

               {showForm === 'Link' ? (
                  <FormAddLink formData={formData} setFormData={setFormData} />
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
                  />
                  <CustomSelect
                     attributeToChangue="typeSelect"
                     defaultOption={formData.typeSelect!}
                     options={typesPost}
                  />
               </div>

               <div className="w-full p-5" />

               <CustomInputText
                  placeholder="Tags"
                  attributeToChangue="currentTag"
                  value={formData.currentTag || ''}
                  onChangueValue={handleInput}>
                  <button className="custom-text__btn" onClick={handleAddTag}>
                     <AddIcon />
                  </button>
               </CustomInputText>

               <div className="container__tags">
                  {formData.tagsList?.map((tag, index) => (
                     <CustomTag
                        key={index}
                        tag={tag}
                        onDelete={() => {
                           setFormData((prev: IPostForm) => ({
                              ...prev,
                              tagsList: prev.tagsList?.filter(
                                 (tagFilter) => tagFilter !== tag
                              ),
                           }));
                        }}
                     />
                  ))}
               </div>
            </div>
         </div>
      </div>
   );
}
