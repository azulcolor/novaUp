'use client';

import React, { useState } from 'react';
import { CustomButton } from '../../CustomInputs/CustomButton';
import { apiRequest } from '@/libs/axios-api';
import { getCookie } from 'cookies-next';
import { usePathname, useRouter } from 'next/navigation';

interface Props {
   title: string;
   children: React.ReactNode;
   target: number;
}

export const ConfirmationModal = ({ title, children, target }: Props) => {
   const router = useRouter();
   const pathname = usePathname();
   const [isOpen, setIsOpen] = useState(false);

   if (!isOpen) return <button onClick={() => setIsOpen(() => true)}>{children}</button>;

   const fetchers = {
      users: async (token: string, id: number) => await apiRequest.deleteUser(token, id),
      posts: async (token: string, id: number) => await apiRequest.deletePost(token, id),
   };

   const handleOnConfirmation = async () => {
      const token = getCookie('nova-access-token');

      let fetcher: 'users' | 'posts' = 'users';
      if (pathname.includes('posts')) fetcher = 'posts';
      if (!token) return;

      const response = await fetchers[fetcher](token as any, target);
      if (response) {
         router.refresh();
      }
   };

   return (
      <div className="modal-container">
         <div className="modal">
            <div className="modal__title">{title}</div>
            <div className="modal__body">
               <CustomButton
                  title="Cancelar"
                  handleClick={() => setIsOpen(() => false)}
                  containerStyles="btn-secondary"
               />
               <CustomButton
                  title="Confirmar"
                  handleClick={handleOnConfirmation}
                  containerStyles="btn-primary"
               />
            </div>
         </div>
      </div>
   );
};
