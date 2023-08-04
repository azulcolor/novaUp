'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

import { CustomButton } from '@/components/CustomInputs/CustomButton';
import { CustomTextarea } from '@/components/CustomInputs/CustomTextarea';

import { apiRequest } from '@/libs/axios-api';
import { getCookie } from 'cookies-next';
import { toast } from 'react-hot-toast';
import { INovaUser } from '@/interfaces';

interface Props {
   status: boolean;
   target: number;
   user: INovaUser | false;
   currentComments?: string;
}

export const FormApproved = ({ status, target, user, currentComments }: Props) => {
   const [comments, setComments] = useState('');
   const [isOpened, setIsOpened] = useState(false);
   const [isLoading, setIsLoading] = useState(false);

   const router = useRouter();

   const handleOnConfirmation = async () => {
      setIsLoading(true);
      const token = getCookie('nova-access-token');
      const res = await apiRequest.setStatusPost(String(token), target, comments);
      if (res.status === 'Success') {
         toast.success('Se ha actualizado el estado de la publicación');
         setTimeout(() => {
            router.refresh();
         }, 2000);
      } else {
         toast.error('Ha ocurrido un error al actualizar el estado de la publicación');
      }
      setIsOpened(false);
      setIsLoading(false);
   };

   if (!isOpened)
      return (
         <CustomButton
            title={
               user && user?.role?.id !== 3
                  ? status
                     ? 'Cancelar publicación'
                     : 'Aprobar publicación'
                  : status
                  ? 'Publicación aprobada'
                  : 'Publicación cancelada'
            }
            handleClick={() => setIsOpened(true)}
            containerStyles={'btn-primary'}
         />
      );
   return (
      <div>
         <div className="modal-container">
            <div className="modal">
               <div className="modal__title">
                  <h3 className="subtitle">
                     {user && user?.role?.id !== 3
                        ? 'Confirmacion de aprovación'
                        : 'Estado de la publicación'}
                  </h3>
                  {user && user?.role?.id !== 3 && (
                     <span>
                        agrega comentarios para notificar problemas en la publicación
                     </span>
                  )}
               </div>
               <div className="flex py-2 justify-center">
                  {user && user?.role?.id !== 3 ? (
                     <CustomTextarea
                        name="comments"
                        placeholder="Motivo"
                        minRows={5}
                        value={comments}
                        onChangueValue={(e) => setComments(e.target.value)}
                     />
                  ) : currentComments && currentComments?.length > 0 ? (
                     <p>{currentComments}</p>
                  ) : (
                     <span>La publicación no tiene comentarios</span>
                  )}
               </div>
               <div className="modal__body">
                  <CustomButton
                     title="Cerrar"
                     handleClick={() => setIsOpened(() => false)}
                     containerStyles="btn-secondary"
                  />
                  {user && user?.role?.id !== 3 && (
                     <CustomButton
                        title={
                           status || comments.length > 0
                              ? 'Cancelar publicación'
                              : 'Aprobar publicación'
                        }
                        handleClick={handleOnConfirmation}
                        containerStyles="btn-primary"
                        isLoading={isLoading}
                     />
                  )}
               </div>
            </div>
         </div>
      </div>
   );
};
