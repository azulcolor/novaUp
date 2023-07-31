'use client';

import React, { ChangeEvent, useEffect, useState } from 'react';
import { getCookie } from 'cookies-next';
import { useRouter } from 'next/navigation';

import { CustomButton } from '@/components/CustomInputs/CustomButton';
import { CustomInputText } from '@/components/CustomInputs/CustomInputText';
import { CustomSelect } from '@/components/CustomInputs/CustomSelect';

import { ICatalogGen, IUser } from '@/interfaces';
import { apiRequest } from '@/libs/axios-api';
import { Error } from '@/components/alerts/Error';

interface Props {
   closeModal: () => void;
   action: 'create' | 'edit';
   data?: any;
}

export const UsersDetails = ({ closeModal, action, data = {} as IUser }: Props) => {
   const [user, SetUser] = useState<IUser>(data as IUser);
   const [departments, setDepartments] = useState<ICatalogGen[]>([]);
   const [roles, setRoles] = useState<ICatalogGen[]>([]);
   const [stateMessage, setStateMessage] = useState<string>('');
   const router = useRouter();

   const handleSaveUser = async () => {
      setStateMessage(() => '');
      const token = getCookie('nova-access-token')?.toString() || '';
      if (action === 'create') {
         const save = await apiRequest.newUser(token, user as any);

         if (save && !save.error) {
            closeModal();
            router.refresh();
            return;
         }
         setStateMessage(() => 'Error al crear usuario, verifique el campo email');
      } else {
         const save = await apiRequest.putUser(token, user as any);

         if (save && !save.error) {
            closeModal();
            router.refresh();
            return;
         }
         setStateMessage(() => 'Error al guardar, verifique el campo email');
      }
   };

   const handleChangueText = (e: ChangeEvent<HTMLInputElement>) => {
      SetUser((prev: any) => ({ ...(prev || {}), [e.target.name]: e.target.value }));
   };

   const handleChangueValue = (attribute: string, value: any) => {
      SetUser((prev: any) => ({ ...(prev || {}), [attribute]: value }));
   };

   useEffect(() => {
      (async () => {
         const departments = await apiRequest.getDepartments();
         const roles = await apiRequest.getRoles();

         setDepartments(() => departments);
         setRoles(() => roles);
      })();
   }, []);

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
                  placeholder="Email"
                  value={user?.email || ''}
                  onChangueValue={handleChangueText}
               />

               <div className="flex justify-between">
                  <span>Departamento</span>
                  <CustomSelect
                     attributeToChangue="department"
                     options={departments}
                     defaultOption={user?.department as any}
                     onChangueValue={handleChangueValue}
                  />
               </div>

               <div className="flex justify-between">
                  <span>Rol</span>
                  <CustomSelect
                     attributeToChangue="role"
                     options={roles}
                     defaultOption={user?.role as any}
                     onChangueValue={handleChangueValue}
                  />
               </div>
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
                  <Error message={stateMessage} />
               </div>
            </div>
         </div>
      </div>
   );
};
