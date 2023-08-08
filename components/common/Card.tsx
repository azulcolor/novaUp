'use client';

import React from 'react';
import { usePathname, useRouter } from 'next/navigation';

import { CustomButton } from '@/components/CustomInputs/CustomButton';
import { ConfirmationModal } from '@/components/common/modals/ConfirmationModal';
import { ImageComponent } from '@/components/common/ImageComponent';

import { urlApi } from '@/libs/utils/url';
import { IPost } from '@/interfaces';

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
                     <ImageComponent
                        src={
                           post.isApproved
                              ? '/svg/post-approved.svg'
                              : '/svg/post-pending.svg'
                        }
                        alt="status"
                        w={30}
                        h={30}
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
            <ImageComponent
               src={
                  post.coverImage.includes('/')
                     ? `${urlApi}/${post.coverImage}`
                     : '/assets/images/image-not-found.png' ||
                       '/assets/images/logo-clasic.png'
               }
               alt={`${post.id}-cover-image`}
               w={500}
               h={480}
            />
         </div>
      </div>
   );
};
