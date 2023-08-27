/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import React, { use, useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useSession } from 'next-auth/react';
import jwt from 'jsonwebtoken';
import { getCookie } from 'cookies-next';

import { CustomButton } from '@/components/CustomInputs/CustomButton';
import { SelectorDetails } from '@/components/common/modals/details/SelectorDetails';
import MutateUsersContext from '@/context/MutateUsersContext';

import { url } from '@/libs/utils/url';
import { IPost, IUser } from '@/interfaces';
import MutatePostsContext from '@/context/MutatePostsContext';
import { InputSearch } from '@/components/CustomInputs/InputSearch';
import { CustomSelect } from '@/components/CustomInputs/CustomSelect';
import { apiRequest } from '@/libs/axios-api';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
   const router = useRouter();
   const pathname = usePathname();
   const { data: session } = useSession();
   const [users, setUsers] = useState<IUser[]>([]);
   const [posts, setPosts] = useState<IPost[]>([]);
   const [categories, setCategories] = useState<any[]>([]);
   const [user, setUser] = useState<IUser>({} as any);

   const activeTab = pathname.toLowerCase().includes('post');

   const extraOption = {
      id: 0,
      name: 'Recientes',
   };

   useEffect(() => {
      (async () => {
         const token = getCookie('nova-access-token');
         const categories = await apiRequest.getCategories();
         setCategories(categories);
         if (token) {
            const decoded = jwt.decode(String(token)) as any;
            const user = decoded?.user;
            if (user) {
               setUser(() => user);
               if (user.role.id === 1) {
                  router.prefetch(url.adminUsers());
               }
            }
         } else {
            setTimeout(() => {
               if (!session) {
                  router.push(url.home());
               }
            }, 2000);
         }
      })();
   }, [session]);

   return (
      <>
         <MutateUsersContext.Provider value={{ users, setUsers }}>
            {session && (
               <section>
                  {pathname.includes('/admin/posts/') ? null : (
                     <nav className="admin-layout">
                        <div className="admin-layout__nav">
                           <CustomButton
                              title="Publicaciones"
                              handleClick={() => router.push(url.adminPosts())}
                              containerStyles={
                                 (activeTab ? 'btn-secondary--tab' : 'btn-primary--tab') +
                                 ' btn-left--tab'
                              }
                           />
                           {user && user?.role?.id === 1 && (
                              <CustomButton
                                 title="Usuarios"
                                 handleClick={() => router.push(url.adminUsers())}
                                 containerStyles={
                                    (!activeTab
                                       ? 'btn-secondary--tab'
                                       : 'btn-primary--tab') + ' btn-right--tab'
                                 }
                              />
                           )}
                        </div>

                        <div className="admin-layout__filters">
                           <CustomSelect
                              attributeToChangue="category"
                              options={categories}
                              defaultOption={extraOption}
                              isChangueQuery={true}
                              containerStyles="categories-container"
                           />
                           <CustomSelect
                              attributeToChangue="status"
                              options={[
                                 { id: 0, name: 'Pendiente' },
                                 { id: 1, name: 'Aprobado' },
                                 { id: 2, name: 'Rechazado' },
                              ]}
                              defaultOption={{ id: 0, name: 'Pendiente' }}
                              isChangueQuery={true}
                              containerStyles="status-container"
                           />
                           <InputSearch />
                        </div>

                        <div>
                           <SelectorDetails
                              tabSelector={activeTab ? 'posts' : 'users'}
                              action="create"
                           />
                        </div>
                     </nav>
                  )}
                  <MutatePostsContext.Provider value={{ posts, setPosts }}>
                     {children}
                  </MutatePostsContext.Provider>
               </section>
            )}
         </MutateUsersContext.Provider>
      </>
   );
}
