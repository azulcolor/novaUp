'use client';

import React, { ChangeEvent, useEffect, useState } from 'react';
import { IPost, IPostRequest } from '@/interfaces';
import { CustomTextarea } from '../CustomInputs/CustomTextarea';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import { CustomButton } from '../CustomInputs/CustomButton';
import { FormAddImage } from './FormAddImage';
import { FormAddPDF } from './FormAddPDF';
import { FormAddLink } from './FormAddLink';

interface Props {
   post: IPost;
}

export default function FormPost({ post }: Props) {
   useEffect(() => {
        console.log(post);
    }, []);

    const [showForm, setShowForm] = useState('Image')
    const [formData, setFormData] = useState<IPostRequest>({
        id: 0,
        category: {id: 0, name: 'Deportes'},
        career: {id: 0, name: ''},
        coverImage: '',
        assets: [],
        isPinned: false,
        title: '',
        description: '',
        summary: '',
        publishDate: '',
        eventDate: '',
        isApproved: false,
        isCanceled: false,
        type: '',
        tags: '',
        comments: '',
    });

    const handleInput = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const fieldName = e.target.name;
      const fieldValue = e.target.value;
    
      setFormData((prevState: IPostRequest) => ({
        ...prevState,
        [fieldName]: fieldValue
      }));
    }

    const handleImage = () => {
        setShowForm('Image')
    }
    const handlePDF = () => {
        setShowForm('PDF')
    }
    const handleLink = () => {
        setShowForm('Link')
    }

   return (
      <div className="form__post">
        <div className="container__text">
            <div className="container__subtitle">
                <PlayArrowIcon sx={{ transform: 'rotate(180deg)', color: '#607EE9'}}/>
                <h3>Regresar</h3>
            </div>
            <div className="container__inputs">
                <CustomTextarea name={'title'} value={formData.title} minRows={1} onChangueValue={handleInput} placeholder={'Encabezado'} boldText={true}/>
                <CustomTextarea name={'summary'} value={formData.summary} minRows={3} onChangueValue={handleInput} placeholder={'Descripción corta'}/>
                <CustomTextarea name={'description'} value={formData.description} minRows={20} onChangueValue={handleInput} placeholder={'Artículo'}/>
            </div>
        </div>
        <div className="container__multimedia">
            <div className="container__subtitle">
                <h3>Multimedia</h3>
            </div>
            <div className="">
                <p>Presiona el formato que deseas subir</p>
                <div className="container__btns__multimedia">
                    <CustomButton title={'Imagen'} handleClick={handleImage} containerStyles={'w-1/5 py-2 h-auto bg-primary rounded-lg text-background'}/>  
                    <CustomButton title={'PDF'} handleClick={handlePDF} containerStyles={'w-1/5 py-2 h-auto bg-secondary rounded-lg text-background'}/>  
                    <CustomButton title={'Link'} handleClick={handleLink} containerStyles={'w-1/5 py-2 h-auto bg-redBtn rounded-lg text-background'}/>  
                </div>
                {showForm === 'Image' ? <FormAddImage props={formData, setFormData}/> : null}
                {showForm === 'PDF' ? <FormAddPDF formData={formData} setFormData={setFormData}/> : null}
                {showForm === 'Link' ? <FormAddLink formData={formData} setFormData={setFormData}/> : null}
            </div>
        </div>
      </div>
   );
}


