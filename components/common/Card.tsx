'use client';

import React from 'react';
import Image from 'next/image';
import { getCookie } from 'cookies-next';

import { CustomButton } from '@/components/CustomInputs/CustomButton';
import { IPost } from '@/interfaces';
import { usePathname, useRouter } from 'next/navigation';
import { ConfirmationModal } from './modals/ConfirmationDeleteModal';
import { apiRequest } from '@/libs/axios-api';
import { urlApi } from '@/libs/utils/url';

interface Props {
   post: IPost;
}

export const Card = ({ post }: Props) => {
   const router = useRouter();
   const pathname = usePathname();

   const handleSolveNavigation = () => {
      if (pathname.includes('admin')) {
         router.push(`/admin/posts/${post.id}`);
      } else {
         router.push(`/posts/${post.id}`);
      }
   };

   return (
      <div className="card">
         <div className="card__body">
            <div className="card__title">{post.title}</div>
            <div className="card__summary">
               <p>{post.summary}</p>
            </div>
            <div>
               {pathname.includes('admin') ? (
                  <div className="flex justify-between">
                     <Image
                        src={
                           post.isApproved
                              ? '/svg/post-approved.svg'
                              : '/svg/post-pending.svg'
                        }
                        alt="status"
                        width={30}
                        height={30}
                     />
                     <div className="card__body-details--editable">
                        <ConfirmationModal
                           title={`¿Seguro que deseas eliminar el post "${post.title}"?`}
                           target={post.id}
                           fetcher="posts">
                           <CustomButton
                              title="Eliminar"
                              containerStyles="btn-danger"
                              handleClick={() => {}}
                           />
                        </ConfirmationModal>
                        <CustomButton
                           title={'Editar'}
                           handleClick={() => handleSolveNavigation()}
                           containerStyles="btn-primary"
                        />
                     </div>
                  </div>
               ) : (
                  <CustomButton
                     title={'Ver detalles'}
                     handleClick={() => handleSolveNavigation()}
                     containerStyles="btn-primary card__body-details"
                  />
               )}
            </div>
         </div>
         <div className="card__image">
            <Image
               src={
                  post.coverImage.includes('/')
                     ? `${urlApi}/${post.coverImage}`
                     : '/assets/images/image-not-found.png' ||
                       '/assets/images/logo-clasic.png'
               }
               alt={`${post.id}-cover-image`}
               width={500}
               height={480}
            />
         </div>
      </div>
   );
};
