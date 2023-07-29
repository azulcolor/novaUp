'use client';
import React from 'react';

import { IPostForm } from '@/interfaces';

interface Props {
   formData: IPostForm;
   setFormData: React.Dispatch<React.SetStateAction<IPostForm>>;
}

export const FormAddLink = (props: Props) => {
   const { formData, setFormData } = props;
   return <div>add link</div>;
};
