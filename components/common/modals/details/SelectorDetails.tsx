'use client';
import React, { useState } from 'react';
import { UsersDetails } from './UsersDetails';
import { CustomButton } from '@/components/CustomInputs/CustomButton';
import { useRouter } from 'next/navigation';
import { url } from '@/libs/utils/url';
import { IUser } from '@/interfaces';

interface Props {
   tabSelector: 'users' | 'posts';
   action: 'create' | 'edit';
   user?: IUser;
}

export const SelectorDetails = ({ tabSelector, action, user }: Props) => {
   const [isOpen, setIsOpen] = useState<boolean>(false);
   const router = useRouter();

   const handleActionByTabSelector = () => {
      if (tabSelector === 'posts') {
         router.push(url.adminPostsEditable(0));
         return;
      } else {
         setIsOpen(() => true);
      }
   };

   if (!isOpen)
      return (
         <CustomButton
            title="Crear nuevo"
            handleClick={handleActionByTabSelector}
            containerStyles="btn-primary"
         />
      );

   if (isOpen && tabSelector === 'users')
      return (
         <UsersDetails
            closeModal={() => setIsOpen(false)}
            userData={user}
            action={action}
         />
      );
};
