'use client';

import { CustomButton } from '@/components/CustomInputs/CustomButton';
import { CustomInputText } from '@/components/CustomInputs/CustomInputText';
import { IUser } from '@/interfaces';
import { apiRequest } from '@/libs/axios-api';
import { getCookie } from 'cookies-next';
import { cookies } from 'next/headers';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

interface Props {
   closeModal: () => void;
   userData?: IUser;
   action: 'create' | 'edit';
}

export const UsersDetails = ({ closeModal, userData = undefined, action }: Props) => {
   const [user, SetUser] = useState(userData);
   const router = useRouter();

   const token = getCookie('nova-access-token')?.toString() || '';

   const handleSaveUser = async () => {
      if (action === 'create') {
         const save = await apiRequest.newUser(token, user as any);
         if (save) router.refresh();
      } else {
         const save = await apiRequest.putUser(token, user as any);
         if (save) router.refresh();
      }
   };

   const handleChangueValue = (attribute: string, value: any) => {
      SetUser((prev: any) => ({ ...(prev || {}), [attribute]: value }));
   };

   return (
      <div className="modal-container">
         <div className="modal">
            <div className="modal__title">
               {action === 'create' ? 'Nuevo usuario' : 'Editar usuario'}
            </div>
            <div className="modal__control">
               <CustomInputText
                  label="Email"
                  attributeToChangue="email"
                  value={user?.email || ''}
                  onChangueValue={handleChangueValue}
               />
               <CustomInputText label="" />
            </div>
            <div className="modal__body">
               <div>
                  <CustomButton
                     title="Cancelar"
                     handleClick={closeModal}
                     containerStyles="btn-secondary mr-5"
                  />
                  <CustomButton
                     title="Guardar"
                     handleClick={handleSaveUser}
                     containerStyles="btn-primary"
                  />
               </div>
            </div>
         </div>
      </div>
   );
};
