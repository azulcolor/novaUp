'use client';

import React, { ChangeEvent, useEffect, useState } from 'react';
import { getCookie } from 'cookies-next';
import { useRouter } from 'next/navigation';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import AddIcon from '@mui/icons-material/Add';

import { CustomSelect } from '@/components/CustomInputs/CustomSelect';
import { CustomInputText } from '@/components/CustomInputs/CustomInputText';
import { CustomTextarea } from '@/components/CustomInputs/CustomTextarea';
import { CustomButton } from '@/components/CustomInputs/CustomButton';
import { FormAddImage } from '@/components/forms/FormAddImage';
import { FormAddPDF } from '@/components/forms/FormAddPDF';
import { FormAddLink } from '@/components/forms/FormAddLink';

import {
   ICatalogGen,
   IPost,
   IPostCurrentResources,
   IPostRequest,
   IPostResources,
   IUser,
} from '@/interfaces';

import { Error } from '../alerts/Error';
import { CustomTag } from '../common/CustomTag';
import CustomInputDate from '../CustomInputs/CustomInputDate';
import {
   serializedAssetsByPost,
   serializedNewPost,
   serializedPostUpdate,
} from '@/libs/utils/serializers';
import { apiRequest } from '@/libs/axios-api';
import { url, urlApi } from '@/libs/utils/url';
import { getTitleVideos } from '@/libs/utils/common-functions';
import { toast } from 'react-hot-toast';
import { FormApproved } from './FormApproved';

interface Props {
   post: IPost;
   categories: ICatalogGen[];
   typesPost: ICatalogGen[];
   user: IUser | false;
}

export default function FormPost(props: Props) {
   const { post, categories, typesPost, user } = props;
   const router = useRouter();

   const [showForm, setShowForm] = useState('Image');
   const [isLoading, setIsLoading] = useState(false);
   const [currentFiles, setCurrentFiles] = useState<IPostCurrentResources>({
      images: post?.assets?.filter((asset) => asset.type === 'Imagen') || [],
      pdfs: post?.assets?.filter((asset) => asset.type === 'PDF') || [],
      videos: [],
   });

   const [resources, setResources] = useState<IPostResources>({
      coverImage: post?.coverImage
         ? `${urlApi}/${post?.coverImage}`
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
         tagsList: [...(prevState.tagsList || []), prevState.currentTag || '']?.filter(
            (tag) => tag !== ''
         ),
         currentTag: '',
      }));
   };

   const handleSubmit = async () => {
      setIsLoading(true);
      const token = getCookie('nova-access-token')?.toString() || '';
      if (formData.id) {
         const data = serializedPostUpdate(formData);
         const setPost = await apiRequest.setPost(token, data, formData.id);

         if (setPost.status === 'Success') {
            const formDataNewAssets = new FormData();
            const serializedAssets = serializedAssetsByPost(resources);
            Object.keys(serializedAssets).forEach((key) => {
               const value = resources[key as keyof typeof resources];

               if (value) {
                  if (
                     Array.isArray(value) &&
                     value.length > 0 &&
                     value[0] instanceof File
                  ) {
                     // Si es un array de archivos, los agregamos uno por uno
                     value.forEach((file) => formDataNewAssets.append(key, file as any));
                  } else if (value instanceof File) {
                     // Si es un archivo individual
                     formDataNewAssets.append(key, value);
                  } else {
                     // Otros valores se convierten a cadena
                     formDataNewAssets.append(key, value.toString());
                  }
               }
            });

            const assets = await apiRequest.setAssetsPost(
               token,
               formDataNewAssets,
               formData.id
            );

            if (assets?.status === 'Success') {
               toast.success('Publicación actualizada');
               router.push('/admin/posts');
            }
         } else {
            toast.error('Error al actualizar publicación');
         }
      } else {
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

         const savePost = await apiRequest.newPost(token, formDataNewPost);
         if (savePost.status === 'Success') {
            toast.success('Publicación guardada');
            router.push('/admin/posts');
         } else {
            toast.error('Error al guardar publicación');
         }
      }
      setIsLoading(false);
   };

   const handlePinned = async () => {
      setIsLoading(true);
      const token = getCookie('nova-access-token')?.toString() || '';
      const pinnedPost = await apiRequest.pinnedPost(token, post.id);
      if (pinnedPost.status === 'Success') {
         toast.success('Publicación fijada');
         router.refresh();
      } else {
         toast.error('Error al fijar publicación');
      }
      setIsLoading(false);
   };

   const handleSelector = (slug: 'Image' | 'PDF' | 'Link') => setShowForm(slug);
   const handleBack = () => router.push(url.adminPosts());

   useEffect(() => {
      (async () => {
         if (post && post.id !== 0 && post.assets?.length) {
            const videos = ((await getTitleVideos(
               post.assets?.filter((asset) => asset.type === 'Enlace')
            )) || []) as any;
            setCurrentFiles((prevState) => ({
               ...prevState,
               videos,
            }));
         }
      })();
   }, [post]);

   return (
      <div className="form__post">
         <div className="container__text">
            <div className="container__subtitle cursor-pointer" onClick={handleBack}>
               <PlayArrowIcon sx={{ transform: 'rotate(180deg)', color: '#607EE9' }} />
               <h3>Regresar</h3>
            </div>
            <div className="container__inputs">
               <div className="flex w-full justify-between">
                  <CustomInputDate
                     name="eventDate"
                     onChange={handleInput}
                     value={formData.eventDate}
                     label="Fecha del evento"
                  />
                  {typeof post?.id === 'number' && post?.id !== 0 && (
                     <FormApproved
                        status={post?.isApproved}
                        target={post?.id}
                        user={user}
                        currentComments={post?.comments}
                     />
                  )}
                  {post?.isApproved &&
                     post?.category?.id === 8 &&
                     post?.type?.toLocaleLowerCase()?.includes('convocatoria') && (
                        <CustomButton
                           title={post?.isPinned ? 'Fijada' : 'Fijar'}
                           containerStyles={
                              post?.isPinned ? 'btn-secondary' : 'btn-primary'
                           }
                           disabled={post?.isPinned}
                           handleClick={handlePinned}
                           isLoading={isLoading}
                        />
                     )}
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
                        'w-1/5 py-2 h-auto btn-left--tab ' +
                        (showForm === 'Image' ? 'btn-primary--tab' : 'btn-secondary--tab')
                     }
                  />

                  <CustomButton
                     title={'PDF'}
                     handleClick={() => handleSelector('PDF')}
                     containerStyles={
                        'w-1/5 py-2 h-auto ' +
                        (showForm === 'PDF' ? 'btn-primary--tab' : 'btn-secondary--tab')
                     }
                  />

                  <CustomButton
                     title={'Link'}
                     handleClick={() => handleSelector('Link')}
                     containerStyles={
                        'w-1/5 py-2 h-auto btn-right--tab ' +
                        (showForm === 'Link' ? 'btn-primary--tab' : 'btn-secondary--tab')
                     }
                  />
               </div>
               {showForm === 'Image' ? (
                  <FormAddImage
                     currentFiles={currentFiles}
                     setCurrentFiles={setCurrentFiles}
                     formData={resources}
                     setFormData={setResources}
                  />
               ) : null}

               {showForm === 'PDF' ? (
                  <FormAddPDF
                     currentFiles={currentFiles}
                     setCurrentFiles={setCurrentFiles}
                     formData={resources}
                     setFormData={setResources}
                  />
               ) : null}

               {showForm === 'Link' ? (
                  <FormAddLink
                     currentFiles={currentFiles}
                     setCurrentFiles={setCurrentFiles}
                     formData={resources}
                     setFormData={setResources}
                  />
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
            <div>
               <CustomButton
                  title={formData.id === 0 ? 'Crear publicación' : 'Guardar'}
                  handleClick={handleSubmit}
                  containerStyles="btn-primary px-5"
                  isLoading={isLoading}
               />
            </div>
         </div>
      </div>
   );
}
